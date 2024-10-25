import {
  Card,
  Dropdown,
  MenuProps,
  Modal,
  Table,
  Button as AntButton,
  Spin,
  App,
} from "antd";
import { ReactComponent as Plus } from "../../../../../assets/add.svg";
import { ReactComponent as Ellipsis } from "../../../../../assets/ellipsis.svg";
import { Button } from "../../../../../custom";
import { useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import {
  deleteSupportGuidanceItem,
  getSupportGuidanceItemBySupportGuidanceId,
} from "../../../../../requests";
import { ColumnsType } from "antd/es/table";
import { sanitizeAndLimitString } from "../../../../../utils/sanitizeAndLimitString";
import { useParams } from "react-router-dom";
import CampusExperienceItemForm from "./form";
import DeleteModalContent from "../../../../deleteModal/deleteModal";

const SupportGuidanceItem = () => {
  const { notification } = App.useApp();
  const { id } = useParams();
  const [open, setOpen] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [support, setSupport] = useState<SupportGuidanceItem>(
    {} as SupportGuidanceItem
  );

  const deleteSupportGuidanceItemMutation = useMutation({
    mutationFn: deleteSupportGuidanceItem,
  });

  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: ["get-support-guidance-by-id"],
    queryFn: () => getSupportGuidanceItemBySupportGuidanceId(id!),
    enabled: !!id,
  });

  const deleteSupportGuidanceItemHandler = async () => {
    try {
      await deleteSupportGuidanceItemMutation.mutateAsync(support?.id, {
        onSuccess: (data) => {
          notification.success({
            message: "Success",
            description: data?.message,
          });
          refetch();
          setOpenDelete((prevState) => !prevState);
        },
      });
    } catch (error: any) {
      notification.error({
        message: "Error",
        description: error?.response?.data?.message,
      });
    }
  };

  const columns: ColumnsType<SupportGuidanceItem> = [
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
              setSupport(record);
              setOpenEdit(true);
            },
          },
          {
            key: "2",
            label: "Delete",
            onClick: () => {
              setSupport(record);
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

  const supportData = data?.data as SupportGuidanceItem[];

  const handleOpenModal = () => {
    setSupport({} as SupportGuidanceItem);
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
        <h3>Student Life: Support and Guidance Item Setup</h3>
        <Button onClick={handleOpenModal} iconBefore={<Plus />} text="Setup" />
      </section>

      <br />

      <Card bordered={false}>
        <Table
          dataSource={supportData}
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
        title="Create Support and Guidance Item"
        footer={null}
      >
        <CampusExperienceItemForm
          item={support}
          handleClose={() => setOpen(false)}
        />
      </Modal>

      <Modal
        open={openEdit}
        onCancel={() => setOpenEdit(false)}
        centered
        title="Edit Support and Guidance Item"
        footer={null}
      >
        <CampusExperienceItemForm
          item={support}
          handleClose={() => setOpenEdit(false)}
        />
      </Modal>

      <Modal
        open={openDelete}
        onCancel={() => setOpenDelete(false)}
        centered
        title="Delete Support and Guidance Item"
        footer={null}
      >
        <DeleteModalContent
          isLoading={deleteSupportGuidanceItemMutation?.isPending}
          handleCloseModal={() => setOpenDelete(false)}
          handleSubmit={deleteSupportGuidanceItemHandler}
          title="this item"
        />
      </Modal>
    </div>
  );
};

export default SupportGuidanceItem;
