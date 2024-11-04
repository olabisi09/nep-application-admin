import { ReactComponent as Add } from "../../../assets/add.svg";
import { ReactComponent as Search } from "../../../assets/search.svg";
import { ReactComponent as Filter } from "../../../assets/Frame 48095998 (1).svg";
import {
  Dropdown,
  Modal,
  Table,
  Button as AntButton,
  MenuProps,
  App,
  Spin,
} from "antd";
import styles from "../styles.module.scss";
import { useState } from "react";
import { ReactComponent as Ellipsis } from "../../../assets/ellipsis.svg";
import { useMutation, useQuery } from "@tanstack/react-query";
import { ColumnsType } from "antd/es/table";
import { deleteDisplayTab, getAllDisplayTab } from "../../../requests";
import { Button, SearchInput } from "../../../custom";
import DeleteModalContent from "../../deleteModal/deleteModal";
import { AddDisplayTab } from "./addDisplayTab";

const DisplayTabSetup = () => {
  const [showSearch, setShowSearch] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [showAllFilter, setShowAllFilter] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [displayTab, setDisplayTab] = useState<DisplayTab>({} as DisplayTab);
  const [openDelete, setOpenDelete] = useState(false);
  const { notification } = App.useApp();

  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: ["get-displayTab"],
    queryFn: getAllDisplayTab,
  });

  const deleteDisplayTabMutation = useMutation({
    mutationFn: deleteDisplayTab,
  });

  const handleDelete = (data: DisplayTab) => {
    setDisplayTab(data);
    setOpenDelete((prevState) => !prevState);
  };

  const deleteTabHandler = async () => {
    try {
      await deleteDisplayTabMutation.mutateAsync(displayTab?.id, {
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

  const columns: ColumnsType<DisplayTab> = [
    {
      key: "tabNumber",
      title: "Tab Number",
      dataIndex: "tabNumber",
    },
    {
      key: "tabName",
      title: "Tab Name",
      dataIndex: "tabName",
    },
    {
      key: "batchName",
      title: "Batch Name",
      dataIndex: "batchName",
    },
    {
      key: "session",
      title: "Session ",
      dataIndex: "sessionName",
    },
    {
      key: "status",
      title: "Status",
      dataIndex: "activeStatus",
      render: (_, { isActive }) => (isActive ? "Active" : "Inactive"),
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
              setDisplayTab(record);
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

  const displayTabData = data?.data;

  const handleOpenModal = () => {
    setDisplayTab({} as DisplayTab);
    setShowAddModal((prevState) => !prevState);
  };

  if (isLoading) {
    return <Spin />;
  }

  if (isError) {
    return <div>Error: {error?.message}</div>;
  }

  return (
    <main>
      <section className="space-between">
        <h3>Display Tab Setup</h3>
        <Button onClick={handleOpenModal} iconBefore={<Add />} text="Setup" />
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
          dataSource={displayTabData}
          columns={columns}
          pagination={{ position: ["bottomCenter"] }}
          rowKey={(record, index) => `${record.id}${index}`}
        />
      </section>

      <Modal
        open={showAddModal}
        onCancel={() => setShowAddModal(false)}
        centered
        title="Display Tab Setup"
        footer={null}
      >
        <AddDisplayTab
          displayTab={displayTab}
          handleClose={() => setShowAddModal(false)}
        />
      </Modal>

      {displayTab?.id && openEdit && (
        <Modal
          open={openEdit}
          onCancel={() => setOpenEdit(false)}
          centered
          title="Edit Display Setup"
          footer={null}
        >
          <AddDisplayTab
            displayTab={displayTab}
            handleClose={() => setOpenEdit(false)}
          />
        </Modal>
      )}

      <Modal
        open={openDelete}
        onCancel={() => setOpenDelete(false)}
        centered
        title="Delete Display Tab Setup"
        footer={null}
      >
        <DeleteModalContent
          isLoading={deleteDisplayTabMutation?.isPending}
          handleCloseModal={() => setOpenDelete(false)}
          handleSubmit={deleteTabHandler}
          title="this tab display"
          isActive={false}
        />
      </Modal>
    </main>
  );
};

export default DisplayTabSetup;
