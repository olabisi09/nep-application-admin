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

import { useState } from "react";

import { ReactComponent as Ellipsis } from "../../../../assets/ellipsis.svg";
import { useMutation, useQuery } from "@tanstack/react-query";
import { ColumnsType } from "antd/es/table";
import { AddDisability, EditDisability } from "./addDisability";
import { Button, SearchInput } from "../../../../custom";
import { deleteDisability, getAllDisability } from "../../../../requests";
import DeleteModalContent from "../../../deleteModal/deleteModal";

const DisabilitySetup = () => {
  const [showSearch, setShowSearch] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [showAllFilter, setShowAllFilter] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [disability, setDisability] = useState<Disability>({} as Disability);
  const [openDelete, setOpenDelete] = useState(false);
  const { notification } = App.useApp();

  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: ["get-disability"],
    queryFn: getAllDisability,
  });

  const deleteDisabilityMutation = useMutation({
    mutationFn: deleteDisability,
  });

  const handleDelete = (data: Disability) => {
    setDisability(data);
    setOpenDelete(true);
  };

  const DeleteDisabilityHandler = async () => {
    try {
      await deleteDisabilityMutation.mutateAsync(disability?.id, {
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

  const columns: ColumnsType<Disability> = [
    // {
    //   key: "id",
    //   title: "ID",
    //   dataIndex: "id",
    // },
    {
      key: "name",
      title: "Name",
      dataIndex: "name",
    },
    {
      key: "isActive",
      title: "Status",
      dataIndex: "isActive",
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
              setDisability(record);
              setOpenEdit(true);
            },
          },
          {
            key: "2",
            label: (
              <button
                style={{ border: "0rem", background: "none" }}
                onClick={() => handleDelete(record)}>
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

  const disabilityData = data?.data;

  if (isLoading) {
    return <Spin />;
  }
  if (isError) {
    return <div>Error: {error?.message}</div>;
  }
  return (
    <main>
      <section className="space-between">
        <h3>Disability Setup</h3>
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
          dataSource={disabilityData}
          columns={columns}
          pagination={{ position: ["bottomCenter"] }}
          rowKey={(record, index) => `${record.id}${index}`}
        />
      </section>

      <Modal
        open={showAddModal}
        onCancel={() => setShowAddModal(false)}
        centered
        title="Disability Setup"
        footer={null}>
        <AddDisability handleClose={() => setShowAddModal(false)} />
      </Modal>

      {disability?.id && openEdit && (
        <Modal
          open={openEdit}
          onCancel={() => setOpenEdit(false)}
          centered
          title="Disability Setup"
          footer={null}>
          <EditDisability
            title={disability}
            handleClose={() => setOpenEdit(false)}
          />
        </Modal>
      )}

      {disability?.id && openDelete && (
        <Modal
          open={openDelete}
          onCancel={() => setOpenDelete(false)}
          centered
          title="Delete Disability Setup"
          footer={null}>
          <DeleteModalContent
            isLoading={deleteDisabilityMutation?.isPending}
            handleCloseModal={() => setOpenDelete(false)}
            handleSubmit={DeleteDisabilityHandler}
            title={disability?.name}
            isActive={false}
          />
        </Modal>
      )}
    </main>
  );
};

export default DisabilitySetup;
