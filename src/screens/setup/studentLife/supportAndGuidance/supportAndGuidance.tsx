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
import { useMutation, useQuery } from "@tanstack/react-query";
import {
  deleteSupportGuidance,
  getSupportAndGuidanceByStudentLifeId,
} from "../../../../requests";
import { ColumnsType } from "antd/es/table";
import { useNavigate, useParams } from "react-router-dom";
import SupportAndGuidanceForm from "./supportAndGuidanceForm";
import { sanitizeAndLimitString } from "../../../../utils/sanitizeAndLimitString";
import DeleteModalContent from "../../../deleteModal/deleteModal";

const SupportAndGuidance = () => {
  const { notification } = App.useApp();
  const { id } = useParams();
  const [open, setOpen] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [supportAndGuidanceItems, setSupportAndGuidanceItems] =
    useState<SupportAndGuidance>({} as SupportAndGuidance);
  const [openDelete, setOpenDelete] = useState(false);

  const navigate = useNavigate();

  const deleteSupportAndStudentMutation = useMutation({
    mutationFn: deleteSupportGuidance,
  });

  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: ["get-support-guidance"],
    queryFn: () => getSupportAndGuidanceByStudentLifeId(id!),
    enabled: !!id,
  });

  const deleteSupportGuidanceHandler = async () => {
    try {
      await deleteSupportAndStudentMutation.mutateAsync(
        supportAndGuidanceItems?.id,
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

  const columns: ColumnsType<SupportAndGuidance> = [
    {
      key: "id",
      title: "ID",
      dataIndex: "id",
    },
    {
      key: "title",
      title: "Title",
      dataIndex: "title",
    },
    {
      key: "description",
      title: "Description",
      dataIndex: "description",
      render: (_: any, { description }: any) => {
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
            label: "Add Items",
            onClick: () => {
              navigate(`/student-life/${record.id}/support-and-guidance-item`);
            },
          },
          {
            key: "2",
            label: "Edit",
            onClick: () => {
              setSupportAndGuidanceItems(record);
              setOpenEdit(true);
            },
          },
          {
            key: "2",
            label: "Delete",
            onClick: () => {
              setSupportAndGuidanceItems(record);
              setOpenDelete(true);
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

  const supportAndGuidanceData = data?.data as SupportAndGuidance[];

  if (isLoading) {
    return <Spin />;
  }

  if (isError) {
    return <div>Error: {error?.message}</div>;
  }

  return (
    <div>
      <section className="space-between">
        <h3>Student Life: Support And Guidance Setup</h3>

        {supportAndGuidanceData?.length === 0 && (
          <Button
            onClick={() => setOpen(true)}
            iconBefore={<Plus />}
            text="Setup"
          />
        )}
      </section>
      <br />
      <Card bordered={false}>
        <Table
          dataSource={supportAndGuidanceData}
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
        title="Create Support and Guidance"
        footer={null}>
        <SupportAndGuidanceForm
          item={supportAndGuidanceItems}
          handleClose={() => setOpen(false)}
        />
      </Modal>

      <Modal
        open={openEdit}
        onCancel={() => setOpenEdit(false)}
        centered
        title="Edit Support and Guidance"
        footer={null}>
        <SupportAndGuidanceForm
          item={supportAndGuidanceItems}
          handleClose={() => setOpenEdit(false)}
        />
      </Modal>
      <Modal
        open={openDelete}
        onCancel={() => setOpenDelete(false)}
        centered
        title="Delete Support And Guidance Setup"
        footer={null}>
        <DeleteModalContent
          isLoading={deleteSupportAndStudentMutation?.isPending}
          handleCloseModal={() => setOpenDelete(false)}
          handleSubmit={deleteSupportGuidanceHandler}
          title={supportAndGuidanceItems?.title}
        />
      </Modal>
    </div>
  );
};

export default SupportAndGuidance;
