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
  deleteSchoolSummary,
  getStudentActivitiesByStudentActivityId,
} from "../../../../../requests";
import { ColumnsType } from "antd/es/table";
import { useParams } from "react-router-dom";
import StudentActivityItemForm from "./studentActivitiesForm";
import { sanitizeAndLimitString } from "../../../../../utils/sanitizeAndLimitString";

const StudentActivityItem = () => {
  const { notification } = App.useApp();
  const { id } = useParams();
  const [open, setOpen] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [schoolSummaryItems, setSchoolSummaryItems] = useState<StudentActivity>(
    {} as StudentActivity
  );

  const deleteSchoolSummaryMutation = useMutation({
    mutationFn: deleteSchoolSummary,
  });

  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: ["get-student-activities", id],
    queryFn: () => getStudentActivitiesByStudentActivityId(id!),
    enabled: !!id,
  });

  const columns: ColumnsType<StudentActivity> = [
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
      key: "pictureUrl",
      title: "Picture",
      dataIndex: "imageUrl",
      render: (_, { imageUrl }) => (
        <img className="table-img" src={imageUrl} alt="" />
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
              setSchoolSummaryItems(record);
              setOpenEdit(true);
            },
          },
          {
            key: "2",
            label: "Delete",
            onClick: async () => {
              try {
                await deleteSchoolSummaryMutation.mutateAsync(record.id, {
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

  const schoolSummaryData = data?.data as StudentActivity[];

  if (isLoading) {
    return <Spin />;
  }

  if (isError) {
    return <div>Error: {error?.message}</div>;
  }

  return (
    <div>
      <section className="space-between">
        <h3>Student Life: Student Activity Items Setup</h3>
        <Button
          onClick={() => setOpen(true)}
          iconBefore={<Plus />}
          text="Setup"
        />
      </section>

      <br />

      <Card bordered={false}>
        <Table
          dataSource={schoolSummaryData}
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
        title="Create School Activities"
        footer={null}
      >
        <StudentActivityItemForm
          item={schoolSummaryItems}
          handleClose={() => setOpen(false)}
        />
      </Modal>

      <Modal
        open={openEdit}
        onCancel={() => setOpenEdit(false)}
        centered
        title="Edit School Activities"
        footer={null}
      >
        <StudentActivityItemForm
          item={schoolSummaryItems}
          handleClose={() => setOpenEdit(false)}
        />
      </Modal>
    </div>
  );
};

export default StudentActivityItem;
