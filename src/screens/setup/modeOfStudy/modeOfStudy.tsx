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
import Button from "../../../custom/button/button";
import { useCallback, useState } from "react";
import SearchInput from "../../../custom/searchInput/searchInput";
import { AddModeOfStudy, EditModeOfStudy } from "./addModeOfStudy";
import { ReactComponent as Ellipsis } from "../../../assets/ellipsis.svg";
import { useMutation, useQuery } from "@tanstack/react-query";
import { deleteModeOfStudy, getAllModeOfStudy } from "../../../requests";
import { ColumnsType } from "antd/es/table";
import DeleteModalContent from "../../deleteModal/deleteModal";

const ModeOfStudy = () => {
  const [showSearch, setShowSearch] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [showAllFilter, setShowAllFilter] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [modeOfStudy, setModeOfStudy] = useState<ModeOfStudy>(
    {} as ModeOfStudy
  );
  const [openDelete, setOpenDelete] = useState(false);
  const { notification } = App.useApp();
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: ["get-mode-of-study"],
    queryFn: getAllModeOfStudy,
  });

  const deleteModeOfStudyMutation = useMutation({
    mutationFn: deleteModeOfStudy,
  });

  const handleDelete = (data: ModeOfStudy) => {
    setModeOfStudy(data);
    setOpenDelete(true);
  };

  const deleteAdmissionReqHandler = async () => {
    try {
      await deleteModeOfStudyMutation.mutateAsync(modeOfStudy?.id, {
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

  const items: MenuProps["items"] = [
    {
      key: "1",
      label: (
        <button style={{ border: "0rem" }} onClick={() => setOpenEdit(true)}>
          Edit
        </button>
      ),
    },
  ];
  const columns: ColumnsType<ModeOfStudy> = [
    // {
    //   title: "S/N",
    //   dataIndex: "index",
    //   key: "index",
    //   render: (text: any, record: any, index: number) => (
    //     <span>{(currentPage - 1) * pageSize + index + 1}</span>
    //   ),
    // },
    {
      key: "name",
      title: "Name",
      dataIndex: "name",
    },

    {
      key: "status",
      title: "Status",
      dataIndex: "activeStatus",
      render: (_, { activeStatus }) => (activeStatus ? "Active" : "Inactive"),
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
              setModeOfStudy(record);
              setOpenEdit(true);
            },
          },
          {
            key: "2",
            label: "Delete",
            onClick: () => handleDelete(record),
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

  const modeOfStudyData = data?.data;

  if (isLoading) {
    return <Spin />;
  }

  if (isError) {
    return <div>Error: {error?.message}</div>;
  }

  return (
    <main>
      <section className="space-between">
        <h3>Mode of Study Setup</h3>
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
          dataSource={modeOfStudyData}
          columns={columns}
          pagination={{ position: ["bottomCenter"] }}
          rowKey={(record, index) => `${record.id}${index}`}
        />
      </section>

      <Modal
        open={showAddModal}
        onCancel={() => setShowAddModal(false)}
        centered
        title="Mode of Study Setup"
        footer={null}
      >
        <AddModeOfStudy handleClose={() => setShowAddModal(false)} />
      </Modal>

      <Modal
        open={openEdit}
        onCancel={() => setOpenEdit(false)}
        centered
        title="Mode of Study Setup"
        footer={null}
      >
        <EditModeOfStudy
          modeOfStudy={modeOfStudy}
          handleClose={() => setOpenEdit(false)}
        />
      </Modal>

      <Modal
        open={openDelete}
        onCancel={() => setOpenDelete(false)}
        centered
        title="Delete Mode of Study Setup"
        footer={null}
      >
        <DeleteModalContent
          isLoading={deleteModeOfStudyMutation?.isPending}
          handleCloseModal={() => setOpenDelete(false)}
          handleSubmit={deleteAdmissionReqHandler}
          title={"this item"}
          isActive={false}
        />
      </Modal>
    </main>
  );
};

export default ModeOfStudy;
