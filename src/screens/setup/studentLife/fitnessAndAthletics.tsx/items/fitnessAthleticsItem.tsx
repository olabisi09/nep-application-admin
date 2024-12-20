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
  deleteFitnessAthleticsItem,
  getFitnessAndAthleticsItemByFitnessId,
} from "../../../../../requests";
import { sanitizeAndLimitString } from "../../../../../utils/sanitizeAndLimitString";
import DeleteModalContent from "../../../../deleteModal/deleteModal";

import FitnessAthleticsItemForm from "./form";

const FitnessAthleticsItem = () => {
  const { notification } = App.useApp();
  const { id } = useParams();

  const [open, setOpen] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [fitness, setFitness] = useState<FitnessAthleticsItem>(
    {} as FitnessAthleticsItem
  );

  const deleteFitnessAthleticsItemMutation = useMutation({
    mutationFn: deleteFitnessAthleticsItem,
  });

  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: ["get-fitness-athletics-item-by-id"],
    queryFn: () => getFitnessAndAthleticsItemByFitnessId(id!),
    enabled: !!id,
  });

  const deleteFitnessAthleticsItemHandler = async () => {
    try {
      await deleteFitnessAthleticsItemMutation.mutateAsync(
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

  const columns: ColumnsType<FitnessAthleticsItem> = [
    // {
    //   key: "id",
    //   title: "ID",
    //   dataIndex: "id",
    // },
    {
      key: "title",
      title: "Title",
      dataIndex: "title",
    },
    {
      key: "description",
      title: "Description",
      dataIndex: "description",
      render: (_, { description }) => {
        const limitedCleanHtml = sanitizeAndLimitString(description);
        return <div dangerouslySetInnerHTML={{ __html: limitedCleanHtml }} />;
      },
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
            onClick: () => {
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

  const fitnessAthleticsData = data?.data as FitnessAthleticsItem[];

  const handleOpenModal = () => {
    setFitness({} as FitnessAthleticsItem);
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
        <h3>Student Life: Fitness and Athletics Item Setup</h3>
        <Button
          onClick={handleOpenModal}
          iconBefore={<Plus />}
          text="Setup"
        />
      </section>

      <br />

      <Card bordered={false}>
        <Table
          dataSource={fitnessAthleticsData}
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
        title="Create Fitness and Athletics Item"
        footer={null}
      >
        <FitnessAthleticsItemForm
          item={fitness}
          handleClose={() => setOpen(false)}
        />
      </Modal>

      <Modal
        open={openEdit}
        onCancel={() => setOpenEdit(false)}
        centered
        title="Edit Fitness and Athletics Item"
        footer={null}
      >
        <FitnessAthleticsItemForm
          item={fitness}
          handleClose={() => setOpenEdit(false)}
        />
      </Modal>

      <Modal
        open={openDelete}
        onCancel={() => setOpenDelete(false)}
        centered
        title="Delete Fitness and Athletics Item"
        footer={null}
      >
        <DeleteModalContent
          isLoading={deleteFitnessAthleticsItemMutation?.isPending}
          handleCloseModal={() => setOpenDelete(false)}
          handleSubmit={deleteFitnessAthleticsItemHandler}
          title='this item'
        />
      </Modal>
    
    </div>
  );
};

export default FitnessAthleticsItem;
