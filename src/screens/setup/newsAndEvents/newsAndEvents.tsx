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
import { ReactComponent as Plus } from "../../../assets/add.svg";
import { ReactComponent as Ellipsis } from "../../../assets/ellipsis.svg";
import Button from "../../../custom/button/button";
import { useState } from "react";
import { CreateEvent, EditEvent } from "./setup";
import { useMutation, useQuery } from "@tanstack/react-query";
import { deleteEvents, getEvents } from "../../../requests";
import { ColumnsType } from "antd/es/table";
import DOMPurify from "dompurify";
import DeleteModalContent from "../../deleteModal/deleteModal";

const NewsAndEvents = () => {
  const [open, setOpen] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [event, setEvent] = useState<Setup>({} as Setup);
  const [openDelete, setOpenDelete] = useState(false);

  const { notification } = App.useApp();

  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: ["get-events"],
    queryFn: getEvents,
  });

  const deleteNewsAndEventMutation = useMutation({
    mutationFn: deleteEvents,
  });

  const deleteNewsAndEventHandler = async () => {
    try {
      await deleteNewsAndEventMutation.mutateAsync(event?.id, {
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

  const columns: ColumnsType<Setup> = [
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
      render: (_, { description }) => {
        const cleanhtml = DOMPurify.sanitize(description);
        return <div dangerouslySetInnerHTML={{ __html: cleanhtml }} />;
      },
    },
    {
      key: "picture",
      title: "Picture",
      dataIndex: "imageUrl",
      render: (_, { imageUrl }) => (
        <img src={imageUrl} alt="" width="50" height="50" />
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
              setEvent(record);
              setOpenEdit(true);
            },
          },
          {
            key: "2",
            label: "Delete",
            onClick: () => {
              setEvent(record);
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

  const events = data?.data as Setup[];

  if (isLoading) {
    return <Spin />;
  }
  if (isError) {
    return <div>Error: {error?.message}</div>;
  }

  return (
    <div>
      <section className="space-between">
        <h3>News and Events Setup</h3>
        <Button
          onClick={() => setOpen(true)}
          iconBefore={<Plus />}
          text="Setup"
        />
      </section>
      <br />
      <Card bordered={false}>
        <Table
          dataSource={events}
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
        title="News and Events Setup"
        footer={null}
      >
        <CreateEvent handleClose={() => setOpen(false)} />
      </Modal>

      <Modal
        open={openEdit}
        onCancel={() => setOpenEdit(false)}
        centered
        title="Edit News and Events Setup"
        footer={null}
      >
        <EditEvent item={event} handleClose={() => setOpenEdit(false)} />
      </Modal>

      <Modal
        open={openDelete}
        onCancel={() => setOpenDelete(false)}
        centered
        title="Delete Program Setup"
        footer={null}
      >
        <DeleteModalContent
          isLoading={deleteNewsAndEventMutation?.isPending}
          handleCloseModal={() => setOpenDelete(false)}
          handleSubmit={deleteNewsAndEventHandler}
          title={event?.title}
        />
      </Modal>
    </div>
  );
};

export default NewsAndEvents;
