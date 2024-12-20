/* eslint-disable no-undef */
import { useState } from "react";

import { useMutation, useQuery } from "@tanstack/react-query";
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
import { deleteGender, getGender } from "../../../../requests";
import DeleteModalContent from "../../../deleteModal/deleteModal";
import styles from "../../styles.module.scss";

import AddGender from "./addGender";

const GenderSetup = () => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const { notification } = App.useApp();
  const [indexData, setIndexData] = useState({} as Gender);

  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: ["get-gender"],
    queryFn: getGender,
  });

  const handleEdit = (data: Gender) => {
    setIndexData(data);
    setOpenEdit(true);
  };

  const handleDelete = (data: Gender) => {
    setIndexData(data);
    setOpenDelete(true);
  };

  const deleteGenderMutation = useMutation({
    mutationFn: deleteGender,
    mutationKey: ["delete-gender"],
  });

  const deleteGenderHandler = async () => {
    try {
      await deleteGenderMutation.mutateAsync(indexData.id, {
        onSuccess: (data) => {
          notification.success({
            message: "Success",
            description: data?.message || "Deleted Successfully",
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

  const items = (record: Gender): MenuProps["items"] => [
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
      key: "genderName",
      title: "Gender",
      dataIndex: "genderName",
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
      render: (record: Gender) => (
        <Dropdown menu={{ items: items(record) }} trigger={["click"]}>
          <AntButton type="text" icon={<Ellipsis />} />
        </Dropdown>
      ),
    },
  ];

  const genderData =
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
        <h3>Gender Setup</h3>
        <Button
          onClick={() => setShowAddModal(true)}
          iconBefore={<Add />}
          text="Setup"
        />
      </section>
      <section className={styles.card}>
        <Table
          dataSource={genderData}
          columns={columns}
          pagination={{ position: ["bottomCenter"] }}
        />
      </section>

      <Modal
        open={showAddModal}
        onCancel={() => setShowAddModal(false)}
        centered
        title="Gender Setup"
        footer={null}
      >
        <AddGender handleClose={() => setShowAddModal(false)} />
      </Modal>

      <Modal
        open={openEdit}
        onCancel={() => setOpenEdit(false)}
        centered
        title="Edit Gender Setup"
        footer={null}
      >
        <AddGender handleClose={() => setOpenEdit(false)} data={indexData} />
      </Modal>

      <Modal
        open={openDelete}
        onCancel={() => setOpenDelete(false)}
        centered
        title=" Delete Gender Setup"
        footer={null}
      >
        <DeleteModalContent
          isLoading={deleteGenderMutation?.isPending}
          handleCloseModal={() => setOpenDelete(false)}
          handleSubmit={deleteGenderHandler}
          title={indexData?.genderName}
        />
      </Modal>
    </main>
  );
};

export default GenderSetup;
