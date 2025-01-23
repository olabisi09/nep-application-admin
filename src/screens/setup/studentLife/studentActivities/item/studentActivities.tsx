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
  deleteStudentActivityItem,
  getStudentActivitiesByStudentActivityId,
} from "../../../../../requests";
import { sanitizeAndLimitString } from "../../../../../utils/sanitizeAndLimitString";
import DeleteModalContent from "../../../../deleteModal/deleteModal";

import StudentActivityItemForm from "./studentActivitiesForm";

const StudentActivityItem = () => {
  const { notification } = App.useApp();
  const { id } = useParams();
  const [open, setOpen] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [schoolSummaryItems, setSchoolSummaryItems] = useState<StudentActivity>(
    {} as StudentActivity
  );

  const deleteStudentActivityMutation = useMutation({
    mutationFn: deleteStudentActivityItem,
  });

  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: ["get-student-activities", id],
    queryFn: () => getStudentActivitiesByStudentActivityId(id!),
    enabled: !!id,
  });

  const deleteStudentActivityItemHandler = async () => {
    try {
      await deleteStudentActivityMutation.mutateAsync(schoolSummaryItems?.id, {
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

  const columns: ColumnsType<StudentActivity> = [
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
              setSchoolSummaryItems(record);
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

  const studentActivityItemData = data?.data as StudentActivity[];

  const handleOpenModal = () => {
    setSchoolSummaryItems({} as StudentActivity);
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
        <h3>Student Life: Student Activity Items Setup</h3>

        {studentActivityItemData?.length === 0 && (
          <Button
            onClick={handleOpenModal}
            iconBefore={<Plus />}
            text="Setup"
          />
        )}
      </section>

      <br />

      <Card bordered={false}>
        <Table
          dataSource={studentActivityItemData}
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
        title="Create School Activity Item"
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
        title="Edit School Activity Item"
        footer={null}
      >
        <StudentActivityItemForm
          item={schoolSummaryItems}
          handleClose={() => setOpenEdit(false)}
        />
      </Modal>

      <Modal
        open={openDelete}
        onCancel={() => setOpenDelete(false)}
        centered
        title="Delete School Activity Item"
        footer={null}
      >
        <DeleteModalContent
          isLoading={deleteStudentActivityMutation?.isPending}
          handleCloseModal={() => setOpenDelete(false)}
          handleSubmit={deleteStudentActivityItemHandler}
          title="this item"
        />
      </Modal>
    </div>
  );
};

export default StudentActivityItem;