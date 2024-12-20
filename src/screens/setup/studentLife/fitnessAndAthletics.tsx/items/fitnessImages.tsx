/* eslint-disable no-undef */
import { useState } from "react";

import { useMutation, useQuery } from "@tanstack/react-query";
import {
  Button as AntButton,
  App,
  Card,
  Dropdown,
  MenuProps,
  Modal,
  Spin,
  Table,
} from "antd";
import { ColumnsType } from "antd/es/table";
import { useParams } from "react-router-dom";

import { ReactComponent as Plus } from "../../../../../assets/add.svg";
import { ReactComponent as Ellipsis } from "../../../../../assets/ellipsis.svg";
import { Button } from "../../../../../custom";
import {
  deleteFitnessAthleticsImage,
  getFitnessAndAthleticsImagesByFitnessId,
} from "../../../../../requests";
import DeleteModalContent from "../../../../deleteModal/deleteModal";

import FitnessImageForm from "./fitnessImageForm";

const FitnessAthleticsImages = () => {
  const { notification } = App.useApp();
  const { id } = useParams();
  const [open, setOpen] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [fitness, setFitness] = useState<FitnessImage>(
    {} as FitnessImage
  );

  const deleteFitnessImageMutation = useMutation({
    mutationFn: deleteFitnessAthleticsImage,
  });

  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: ["get-fitness-image", id],
    queryFn: () => getFitnessAndAthleticsImagesByFitnessId(id!),
    enabled: !!id,
  });

  const deleteFitnessAthleticsImageHandler = async () => {
    try {
      await deleteFitnessImageMutation.mutateAsync(
        fitness.id,
        {
          onSuccess: (data) => {
            notification.success({
              message: "Success",
              description: data?.message,
            });
            refetch();
            setOpenDelete((prevState) => !prevState);
          },
        }
      );
    } catch (error: any) {
      notification.error({
        message: "Error",
        description: error?.response?.data?.message,
      });
    }
  };

  const columns: ColumnsType<FitnessImage> = [
    // {
    //   key: "id",
    //   title: "ID",
    //   dataIndex: "id",
    // },
    {
      key: "pictureUrl",
      title: "Picture",
      dataIndex: "imageUrl",
      render: (_, { imagePath }) => (
        <img className="table-img" src={imagePath} alt="" />
      ),
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
              setFitness(record);
              setOpenEdit(true);
            },
          },
          {
            key: "2",
            label: "Delete",
            onClick: async () => {
              setFitness(record);
              setOpenDelete((prevState) => !prevState);
            },
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

  const fitnessImageData = data?.data as FitnessImage[];

  const handleOpenModal = () => {
    setFitness({} as FitnessImage);
    setOpen((prevState) => !prevState);
  };

  if (isLoading) {
    return <Spin />;
  }

  if (isError) {
    return <div>Error: {error?.message}</div>;
  }

  return (
    <div>
      <section className="space-between">
        <h3>Student Life: Fitness Images Setup</h3>
        <Button
          onClick={handleOpenModal}
          iconBefore={<Plus />}
          text="Setup"
        />
      </section>

      <br />

      <Card bordered={false}>
        <Table
          dataSource={fitnessImageData}
          columns={columns}
          pagination={{ position: ["bottomCenter"] }}
          rowKey={(record) => record.id}
          scroll={{ x: true }}
        />
      </Card>

      <Modal
        open={open}
        onCancel={() => setOpen(false)}
        centered
        title="Create Fitness and Athletics Image"
        footer={null}
      >
        <FitnessImageForm
          item={fitness}
          handleClose={() => setOpen(false)}
        />
      </Modal>

      <Modal
        open={openEdit}
        onCancel={() => setOpenEdit(false)}
        centered
        title="Edit Fitness and Athletics Image"
        footer={null}
      >
        <FitnessImageForm
          item={fitness}
          handleClose={() => setOpenEdit(false)}
        />
      </Modal>

      <Modal
        open={openDelete}
        onCancel={() => setOpenDelete(false)}
        centered
        title="Delete Fitness and Athletics Image"
        footer={null}
      >
        <DeleteModalContent
          isLoading={deleteFitnessImageMutation?.isPending}
          handleCloseModal={() => setOpenDelete(false)}
          handleSubmit={deleteFitnessAthleticsImageHandler}
          title='this item'
        />
      </Modal>
    </div>
  );
};

export default FitnessAthleticsImages;
