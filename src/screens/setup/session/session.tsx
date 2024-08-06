import PageLayout from "../../../layouts/pageLayout/pageLayout";
import { ReactComponent as GraterThan } from "../../../assets/chevron_forward.svg";
import { ReactComponent as Add } from "../../../assets/add.svg";
import { ReactComponent as Search } from "../../../assets/search.svg";
import { ReactComponent as Filter } from "../../../assets/Frame 48095998 (1).svg";
import { Dropdown, Modal, Table, Button as AntButton, MenuProps, Spin, App } from "antd";
import { Form, Formik } from "formik";
import styles from "../styles.module.scss";
import Button from "../../../custom/button/button";
import { useState } from "react";
import SearchInput from "../../../custom/searchInput/searchInput";
import AddFaculty from "./AddSession";
import { ReactComponent as Ellipsis } from "../../../assets/ellipsis.svg";
import { useMutation, useQuery } from "@tanstack/react-query";
import { deleteSession, getAllAcademicSession } from "../../../requests";
import { ColumnsType } from "antd/es/table";

const Session = () => {
  const { notification } = App.useApp();
  const [showSearch, setShowSearch] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [showAllFilter, setShowAllFilter] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [session, setSession] = useState<Session>({} as Session);

  const deleteSessionMutation = useMutation({ mutationFn: deleteSession});

  const {data, isLoading, isError, error, refetch } = useQuery({
    queryKey: ["getAll-sessions"],
    queryFn: getAllAcademicSession
  })

  const handleSearch = (e: any) => {
    setSearchTerm(e.target.value);
  };

  const items: MenuProps["items"] = [
    {
      key: "1",
      label: <button style={{border:'0rem'}} onClick={() => setOpenEdit(true)}>Edit</button>,
    },
  ];
  const columns: ColumnsType<Session> = [
    {
      key: "id",
      title: "ID",
      dataIndex: "id",
    },
    {
      key: "name",
      title: "Session",
      dataIndex: "name",
    },
    {
      key: "status",
      title: "Status",
      dataIndex: "activeStatus",
      render: (_, {activeStatus}) => (activeStatus ? "Active" : "Inactive"),
    },
    {
      key: "action",
      title: "",
      render: (_, record) => {
        const items: MenuProps["items"] = [
          {
            key: "1",
            label: "Edit",
            onClick: () => {
              setSession(record);
              setOpenEdit(true);
            }
          },
          {
            key: "2",
            label: "Delete",
            onClick: async () => {
              try {
                await deleteSessionMutation.mutateAsync(record.id, {
                  onSuccess: (data) => {
                    notification.success({
                      message: "Success",
                      description: data?.message,
                    });
                    refetch();
                  },
                });
              } catch (error: any) {
                notification.error({
                  message: "Error",
                  description: error?.response?.data?.message,
                });
              }

            }
          }
        ];
        return(
          <Dropdown menu={{ items }} trigger={["click"]}>
          <AntButton type="text" icon={<Ellipsis />} />
        </Dropdown>
        );
      },
    },
  ];

  if (isLoading) {
    return <Spin/>;
  }
  if (isError) {
    return <div>Error: {error?.message}</div>;
  }

  const sessionData = data?.data as Session[];

  return (
    <main>
      <PageLayout
        paragraph="Session Setup"
        firstText="Setup Programs"
        secondText="Session Setup"
        iconBefore={<GraterThan />}
        headerActions={
          <Button
            onClick={() => setShowAddModal(true)}
            iconBefore={<Add />}
            text="Setup"
          />
        }
      />
      <section className={styles.card}>
        <div className={styles.inside}>
          <p>Showing 1-11 of 88</p>
          <div>
            {!showSearch && (
              <span>
                <Search
                  onClick={() => setShowSearch((showSearch) => !showSearch)}
                />
              </span>
            )}
            {showSearch && (
              <SearchInput value={searchTerm} onChange={handleSearch} />
            )}

            {!showAllFilter && (
              <Filter
                onClick={() =>
                  setShowAllFilter((showAllFilter) => !showAllFilter)
                }
              />
            )}
          </div>
        </div>
        <Table
          dataSource={sessionData}
          columns={columns}
          pagination={{ position: ["bottomCenter"] }}
          rowKey={(record) => record?.id}
          scroll={{ x: true}}
        />
      </section>
     
      <Modal
        open={showAddModal}
        onCancel={() => setShowAddModal(false)}
        centered
        title="Session Setup "
        footer={() => (
          <div className="btn-group">
            <Button
              onClick={() => setShowAddModal(false)}
              variant="text"
              text="Cancel"
            />
            <Button text="Create" />
          </div>
        )}
      >
        
        <Formik initialValues={{}} onSubmit={() => {}}>
          <Form>
            <AddFaculty handleClose={() => setOpenEdit(false)} />
          </Form>
        </Formik>
      </Modal>

      <Modal
        open={openEdit}
        onCancel={() => setOpenEdit(false)}
        centered
        title="Session Setup"
        footer={() => (
          <div className="btn-group">
            <Button
              onClick={() => setOpenEdit(false)}
              variant="text"
              text="Cancel"
            />
            <Button text="Update" />
          </div>
        )}
      >
        <Formik initialValues={{}} onSubmit={() => {}}>
          <Form>
            <AddFaculty handleClose={() => setOpenEdit(false)}/>
          </Form>
        </Formik>
      </Modal>

    </main>
  );
};

export default Session;
