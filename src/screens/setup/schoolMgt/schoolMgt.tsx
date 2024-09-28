import {
  Card,
  Dropdown,
  MenuProps,
  Modal,
  Table,
  Button as AntButton,
  App,
  Spin,
} from "antd";
import { ReactComponent as Plus } from "../../../assets/add.svg";
import { ReactComponent as Ellipsis } from "../../../assets/ellipsis.svg";
import Button from "../../../custom/button/button";
import { useState } from "react";
import { CreateSchoolMgt, EditSchoolMgt } from "./setup";
import { useMutation, useQuery } from "@tanstack/react-query";
import { deleteSchoolMgt, getSchoolMgt } from "../../../requests";
import { ColumnsType } from "antd/es/table";
import DeleteModalContent from "../../deleteModal/deleteModal";

const SchoolMgt = () => {
  const { notification } = App.useApp();
  const [open, setOpen] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [mgt, setMgt] = useState<Setup>({} as Setup);
  const [openDelete, setOpenDelete] = useState(false); // const [record, setRecord] = useState<AboutUs>({} as AboutUs);

  const deleteMgtMutation = useMutation({ mutationFn: deleteSchoolMgt });
  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: ["get-school-mgt"],
    queryFn: getSchoolMgt,
  });

  const deleteMgtHandler = async () => {
    try {
      await deleteMgtMutation.mutateAsync(mgt?.id, {
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
              setMgt(record);
              setOpenEdit(true);
            },
          },
          {
            key: "2",
            label: "Delete",
            onClick: () => {
              setMgt(record);
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

  const schoolMgt = data?.data as Setup[];

  if (isLoading) {
    return <Spin />;
  }
  if (isError) {
    return <div>Error: {error?.message}</div>;
  }

  return (
    <div>
      <section className="space-between">
        <h3>School Management Setup</h3>
        <Button
          onClick={() => setOpen(true)}
          iconBefore={<Plus />}
          text="Setup"
        />
      </section>
      <br />
      <Card bordered={false}>
        <Table
          dataSource={schoolMgt}
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
        title="School Management Setup"
        footer={null}>
        <CreateSchoolMgt handleClose={() => setOpen(false)} />
      </Modal>
      <Modal
        open={openEdit}
        onCancel={() => setOpenEdit(false)}
        centered
        title="Edit School Management Setup"
        footer={null}>
        <EditSchoolMgt item={mgt} handleClose={() => setOpen(false)} />
      </Modal>
      <Modal
        open={openDelete}
        onCancel={() => setOpenDelete(false)}
        centered
        title="Delete School Management Setup"
        footer={null}>
        <DeleteModalContent
          isLoading={deleteMgtMutation?.isPending}
          handleCloseModal={() => setOpenDelete(false)}
          handleSubmit={deleteMgtHandler}
          title={mgt?.title}
        />
      </Modal>
    </div>
  );
};

export default SchoolMgt;
