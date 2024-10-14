import { ReactComponent as Add } from "../../../assets/add.svg";
import { ReactComponent as Search } from "../../../assets/search.svg";
import { ReactComponent as Filter } from "../../../assets/Frame 48095998 (1).svg";
import { Dropdown, Modal, Table, Button as AntButton, MenuProps, Spin, App } from "antd";
import styles from "../styles.module.scss";
import Button from "../../../custom/button/button";
import { useState } from "react";
import SearchInput from "../../../custom/searchInput/searchInput";
import { EditSession } from "./AddSession";
import { ReactComponent as Ellipsis } from "../../../assets/ellipsis.svg";
import { useMutation, useQuery } from "@tanstack/react-query";
import { ColumnsType } from "antd/es/table";
import AddSession from "./AddSession";
import { deleteSession, getAllAcademicSession } from "../../../requests";
import DeleteModalContent from "../../deleteModal/deleteModal";

const Session = () => {
  const { notification } = App.useApp();
  const [showSearch, setShowSearch] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [showAllFilter, setShowAllFilter] = useState(false);
  const [open, setOpen] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [session, setSession] = useState<Session>({} as Session);
  const [openDelete, setOpenDelete] = useState(false);

  const {data, isLoading, isError, error, refetch } = useQuery({
    queryKey: ["getAll-sessions"],
    queryFn: getAllAcademicSession
  })

  const handleSearch = (e: any) => {
    setSearchTerm(e.target.value);
  };

  const handleDelete = (data: Session) => {
    setSession(data);
    setOpenDelete(true);
  }

  const deleteSessionMutation = useMutation({ mutationFn: deleteSession});

  const  DeleteSessionHandler = async () => {
    try {
      await deleteSessionMutation.mutateAsync(session?.id, {
        onSuccess: (data) => {
          notification.success({
            message: "Success",
            description: data?.message,
          });
          refetch();
          setOpenDelete(false);
        },
      });
    } catch (error: any) {
      notification.error({
        message: "Error",
        description: error?.response?.data?.message,
      });
    }

  }

  const columns: ColumnsType<Session> = [
    // {
    //   key: "id",
    //   title: "ID",
    //   dataIndex: "id",
    // },
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
             handleDelete(record);
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
  
      <section className="space-between">
      <h3>Session Setup</h3>
      <Button
        onClick={() => setOpen(true)}
        iconBefore={<Add />}
        text="Setup"
      />
      </section>
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
        open={open}
        onCancel={() => setOpen(false)}
        centered
        title="Session Setup "
        footer={null}
      >
        <AddSession handleClose={() => setOpen(false)}/>
      </Modal>

      <Modal
        open={openEdit}
        onCancel={() => setOpenEdit(false)}
        centered
        title="Edit Session Setup"
        footer={null}
      >
        <EditSession item={session} handleClose={() => setOpenEdit(false)}/>
      </Modal>

      <Modal
        open={openDelete}
        onCancel={() => setOpenDelete(false)}
        centered
        title="Delete Session Setup"
        footer={null}
      >
        <DeleteModalContent
          isLoading={deleteSessionMutation?.isPending}
          handleCloseModal={() => setOpenDelete(false)}
          handleSubmit={DeleteSessionHandler}
          title={session?.name}
        />
      </Modal>

    </main>
  );
};

export default Session;
