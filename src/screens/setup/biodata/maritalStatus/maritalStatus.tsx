/* eslint-disable no-undef */
import { useState } from "react";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  Button as AntButton,
  App,
  Dropdown,
  MenuProps,
  Modal,
  Spin,
  Table,
} from "antd";

import { ReactComponent as Add } from "../../../../assets/add.svg";
import { ReactComponent as Ellipsis } from "../../../../assets/ellipsis.svg";
import Button from "../../../../custom/button/button";
import { deleteMaritalStatus, getMaritalStatus } from "../../../../requests";
import DeleteModalContent from "../../../deleteModal/deleteModal";
import styles from "../../styles.module.scss";

import { AddMarital } from "./addMaritalStatus";

const MaritalSetup = () => {
  const { notification } = App.useApp();
  const [showAddModal, setShowAddModal] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [indexData, setIndexData] = useState({} as MaritalStatus);
  const queryClient = useQueryClient();

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["get-marital-status"],
    queryFn: getMaritalStatus,
  });

  const handleEdit = (data: MaritalStatus) => {
    setIndexData(data);
    setOpenEdit(true);
  };

  const handleDelete = (data: MaritalStatus) => {
    setIndexData(data);
    setOpenDelete(true);
  };

  const handleOpenCreateModal = () => {
    setShowAddModal((prevState) => !prevState);
    setIndexData({} as MaritalStatus);
  };

  const deleteMaritalStatusMutation = useMutation({
    mutationFn: deleteMaritalStatus,
    mutationKey: ["delete-marital-status"],
  });

  const deleteMaritalStatusHandler = async () => {
    try {
      await deleteMaritalStatusMutation.mutateAsync(indexData.id, {
        onSuccess: (data) => {
          notification.success({
            message: "Success",
            description: data?.message,
          });

          queryClient.refetchQueries({
            queryKey: ["get-marital-status"],
          });

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

  const items = (record: MaritalStatus): MenuProps["items"] => [
    {
      key: "1",
      label: (
        <button style={{ border: "0rem" }} onClick={() => handleEdit(record)}>
          Edit
        </button>
      ),
    },
    {
      key: "2",
      label: (
        <button style={{ border: "0rem" }} onClick={() => handleDelete(record)}>
          Delete
        </button>
      ),
    },
  ];

  const columns = [
    {
      key: "statusName",
      title: "Status",
      dataIndex: "statusName",
    },
    {
      key: "activeStatus",
      title: "Active Status",
      dataIndex: "activeStatus",
      render: (text: boolean) => (text ? "Active" : "Inactive"),
    },

    {
      key: "action",
      title: "",
      render: (record: MaritalStatus) => (
        <Dropdown menu={{ items: items(record) }} trigger={["click"]}>
          <AntButton type="text" icon={<Ellipsis />} />
        </Dropdown>
      ),
    },
  ];

  const maritalStatus =
    data?.data?.map((item) => ({ ...item, key: item?.id })) ?? [];

  if (isLoading) {
    return <Spin />;
  }

  if (isError) {
    return <div>Error: {error?.message}</div>;
  }

  return (
    <main>
      <section className="space-between">
        <h3>Marital Status Setup</h3>
        <Button
          onClick={handleOpenCreateModal}
          iconBefore={<Add />}
          text="Setup"
        />
      </section>

      <section className={styles.card}>
        <Table
          dataSource={maritalStatus}
          columns={columns}
          pagination={{ position: ["bottomCenter"] }}
        />
      </section>

      <Modal
        open={showAddModal}
        onCancel={() => setShowAddModal(false)}
        centered
        title="Add Marital Status Setup"
        footer={null}
      >
        <AddMarital handleClose={() => setShowAddModal(false)} />
      </Modal>

      <Modal
        open={openEdit}
        onCancel={() => setOpenEdit(false)}
        centered
        title="Edit Marital Status Setup"
        footer={null}
      >
        <AddMarital handleClose={() => setOpenEdit(false)} data={indexData} />
      </Modal>

      <Modal
        open={openDelete}
        onCancel={() => setOpenDelete(false)}
        centered
        title="Delete Marital Setup"
        footer={null}
      >
        <DeleteModalContent
          isLoading={deleteMaritalStatusMutation?.isPending}
          handleCloseModal={() => setOpenDelete(false)}
          handleSubmit={deleteMaritalStatusHandler}
          title={indexData?.statusName}
        />
      </Modal>
    </main>
  );
};

export default MaritalSetup;
