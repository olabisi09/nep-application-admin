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
import { ReactComponent as Plus } from "../../../../assets/add.svg";
import { ReactComponent as Ellipsis } from "../../../../assets/ellipsis.svg";
import { Button } from "../../../../custom";
import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { deleteFAQItem, getFAQItemsByFaqId } from "../../../../requests";
import DeleteModalContent from "../../../deleteModal/deleteModal";
import { useParams } from "react-router-dom";
import { ColumnsType } from "antd/es/table";
import { CreateFaqItem, EditFaqItem } from "./setup";

const FaqItem = () => {
  const { id } = useParams();
  const [open, setOpen] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [indexData, setIndexData] = useState({} as FaqItem);
  const { notification } = App.useApp();
  const queryClient = useQueryClient();
  const deleteFaqItemMutation = useMutation({ mutationFn: deleteFAQItem });

  const handleEdit = (data: FaqItem) => {
    setIndexData(data);
    setOpenEdit(true);
  };

  const handleDelete = (data: FaqItem) => {
    setIndexData(data);
    setOpenDelete(true);
  };

  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: ["get-faq-items-by-faq-id"],
    queryFn: () => getFAQItemsByFaqId(id!),
    enabled: !!id,
  });

  const faqItems = data?.data as FaqItem[];

  const columns: ColumnsType<FaqItem> = [
    {
      key: "id",
      title: "ID",
      dataIndex: "id",
    },
    {
      key: "question",
      title: "Question",
      dataIndex: "question",
    },
    {
      key: "answer",
      title: "Answer",
      dataIndex: "answer",
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
            onClick: () => handleEdit(record),
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

  const DeleteFAQHandler = async () => {
    try {
      await deleteFaqItemMutation.mutateAsync(indexData.id, {
        onSuccess: (data) => {
          notification.success({
            message: "Success",
            description: data?.message,
          });
          queryClient.refetchQueries({
            queryKey: ["get-AllFAQ"],
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
  if (isLoading) {
    return <Spin />;
  }
  if (isError) {
    return <div>Error: {error?.message}</div>;
  }

  return (
    <div>
      <section className="space-between">
        <h3>FAQ Item Setup</h3>
        <Button
          onClick={() => setOpen(true)}
          iconBefore={<Plus />}
          text="Setup"
        />
      </section>
      <br />
      <Card bordered={false}>
        <Table
          dataSource={faqItems}
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
        title="Create FAQ Item"
        footer={null}
      >
        <CreateFaqItem
          handleClose={() => setOpen(false)}
          refetch={refetch}
          faqId={id!}
        />
      </Modal>
      <Modal
        open={openEdit}
        onCancel={() => setOpenEdit(false)}
        centered
        title="Edit FAQ Items Setup"
        footer={null}
      >
        <EditFaqItem
          handleClose={() => setOpenEdit(false)}
          item={indexData}
          refetch={refetch}
        />
      </Modal>
      <Modal
        open={openDelete}
        onCancel={() => setOpenDelete(false)}
        centered
        title="Delete FAQ Setup"
        footer={null}
      >
        <DeleteModalContent
          isLoading={deleteFaqItemMutation.isPending}
          handleCloseModal={() => setOpenDelete(false)}
          handleSubmit={DeleteFAQHandler}
          title={indexData.question}
        />
      </Modal>
    </div>
  );
};

export default FaqItem;
