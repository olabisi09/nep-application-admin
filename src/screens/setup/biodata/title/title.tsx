import { ReactComponent as Add } from "../../../../assets/add.svg";
import { ReactComponent as Search } from "../../../../assets/search.svg";
import { ReactComponent as Filter } from "../../../../assets/Frame 48095998 (1).svg";
import {
  Dropdown,
  Modal,
  Table,
  Button as AntButton,
  MenuProps,
  App,
  Spin,
} from "antd";
import { Form, Formik } from "formik";
import styles from "../../styles.module.scss";
import Button from "../../../../custom/button/button";
import { useState } from "react";
import SearchInput from "../../../../custom/searchInput/searchInput";
import { AddTitle, EditTitle } from "./addTitle";
import { ReactComponent as Ellipsis } from "../../../../assets/ellipsis.svg";
import { useMutation, useQuery } from "@tanstack/react-query";
import { deleteTitle, getAllTitles } from "../../../../requests";
import { ColumnsType } from "antd/es/table";
import DeleteModalContent from "../../../deleteModal/deleteModal";

const TitleSetup = () => {
  const [showSearch, setShowSearch] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [showAllFilter, setShowAllFilter] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [title, setTitle] = useState<Title>({} as Title);
  const [openDelete, setOpenDelete] = useState(false);
  const { notification } = App.useApp();

  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: ["get-titles"],
    queryFn: getAllTitles,
  });

  const deleteTitleMutation = useMutation({
    mutationFn: deleteTitle,
  });

  const handleDelete = (data: Title) => {
    setTitle(data);
    setOpenDelete(true);
  };

  const DeleteTitleHandler = async () => {
    try {
      await deleteTitleMutation.mutateAsync(title?.id, {
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
  };
  const handleSearch = (e: any) => {
    setSearchTerm(e.target.value);
  };

  const columns: ColumnsType<Title> = [
    // {
    //   key: "id",
    //   title: "ID",
    //   dataIndex: "id",
    // },
    {
      key: "titleName",
      title: "Name",
      dataIndex: "titleName",
    },
    {
      key: "status",
      title: "Status",
      dataIndex: "activeStatus",
      render: (_, { activeStatus }) => (activeStatus ? "Active" : "Inactive"),
    },
    {
      key: "action",
      title: "Action",
      render: (_, record) => {
        const items: MenuProps["items"] = [
          {
            key: "1",
            label: "Edit",
            onClick: () => {
              setTitle(record);
              setOpenEdit(true);
            },
          },
          {
            key: "2",
            label: (
              <button
                style={{ border: "0rem", background: "none" }}
                onClick={() => handleDelete(record)}
              >
                Delete
              </button>
            ),
          },
        ];
        return (
          <Dropdown menu={{ items }} trigger={["click"]}>
            <AntButton type="text" icon={<Ellipsis />} />
          </Dropdown>
        );
      },
    },
  ];

  const titleData = data?.data;

  if (isLoading) {
    return <Spin />;
  }
  if (isError) {
    return <div>Error: {error?.message}</div>;
  }
  return (
    <main>
      <section className="space-between">
        <h3>Title Setup</h3>
        <Button
          onClick={() => setShowAddModal(true)}
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
          dataSource={titleData}
          columns={columns}
          pagination={{ position: ["bottomCenter"] }}
          rowKey={(record, index) => `${record.id}${index}`}
        />
      </section>

      <Modal
        open={showAddModal}
        onCancel={() => setShowAddModal(false)}
        centered
        title="Title Setup"
        footer={null}
      >
        <AddTitle handleClose={() => setShowAddModal(false)} />
      </Modal>

      {title?.id && openEdit && (
        <Modal
          open={openEdit}
          onCancel={() => setOpenEdit(false)}
          centered
          title="Title Setup"
          footer={null}
        >
          <EditTitle title={title} handleClose={() => setOpenEdit(false)} />
        </Modal>
      )}

      {title?.id && openDelete && (
        <Modal
          open={openDelete}
          onCancel={() => setOpenDelete(false)}
          centered
          title="Delete Title Setup"
          footer={null}
        >
          <DeleteModalContent
            isLoading={deleteTitleMutation?.isPending}
            handleCloseModal={() => setOpenDelete(false)}
            handleSubmit={DeleteTitleHandler}
            title={title?.titleName}
            isActive={false}
          />
        </Modal>
      )}
    </main>
  );
};

export default TitleSetup;
