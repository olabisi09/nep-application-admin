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
  deleteStudentActivity,
  getStudentActivityByStudentLifeId,
} from "../../../../requests";
import { ColumnsType } from "antd/es/table";
import { useNavigate, useParams } from "react-router-dom";
import { sanitizeAndLimitString } from "../../../../utils/sanitizeAndLimitString";
import StudentActivityForm from "./studentActivityForm";

const StudentActivity = () => {
  const { notification } = App.useApp();
  const { id } = useParams();
  const [open, setOpen] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [studentActivity, setStudentActivity] = useState<StudentActivities>(
    {} as StudentActivities
  );

  const navigate = useNavigate();

  const deleteStudentActivityMutation = useMutation({
    mutationFn: deleteStudentActivity,
  });

  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: ["get-support-guidance"],
    queryFn: () => getStudentActivityByStudentLifeId(id!),
    enabled: !!id,
  });

  const columns: ColumnsType<StudentActivities> = [
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
              navigate(`/student-life/${record.id}/student-activities-item`);
            },
          },
          {
            key: "2",
            label: "Edit",
            onClick: () => {
              setStudentActivity(record);
              setOpenEdit(true);
            },
          },
          {
            key: "3",
            label: "Delete",
            onClick: async () => {
              try {
                await deleteStudentActivityMutation.mutateAsync(record.id, {
                  onSuccess: (data) => {
                    notification.success({
                      message: "Success",
                      description: data?.message,
                    });
                    refetch();
                  },
                });
              } catch (error: any) {
                notification.error({
                  message: "Error",
                  description: error?.response?.data?.message,
                });
              }
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

  const studentActivityData = data?.data as StudentActivities[];

  if (isLoading) {
    return <Spin />;
  }

  if (isError) {
    return <div>Error: {error?.message}</div>;
  }

  return (
    <div>
      <section className="space-between">
        <h3>Student Life: Student Activities Setup</h3>

        {studentActivityData?.length === 0 && (
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
          dataSource={studentActivityData}
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
        title="Create Student Activity"
        footer={null}
      >
        <StudentActivityForm
          item={studentActivity}
          handleClose={() => setOpen(false)}
        />
      </Modal>

      <Modal
        open={openEdit}
        onCancel={() => setOpenEdit(false)}
        centered
        title="Edit Student Activity"
        footer={null}
      >
        <StudentActivityForm
          item={studentActivity}
          handleClose={() => setOpenEdit(false)}
        />
      </Modal>
    </div>
  );
};

export default StudentActivity;
