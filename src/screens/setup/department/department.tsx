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
import { useMutation, useQuery } from "@tanstack/react-query";
import {
  deleteDepartment,
  getAllCategory,
  getDepartments,
} from "../../../requests";
import { ColumnsType } from "antd/es/table";
import { CreateDepartment, EditDepartment } from "./setup";
import DeleteModalContent from "../../deleteModal/deleteModal";

const Department = () => {
  const { notification } = App.useApp();
  const [open, setOpen] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [department, setDepartment] = useState<Department>({} as Department);

  const deleteDepartmentMutation = useMutation({
    mutationFn: deleteDepartment,
  });
  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: ["get-department"],
    queryFn: getDepartments,
  });
  const facultyQuery = useQuery({
    queryKey: ["get-faculty"],
    queryFn: getAllCategory,
  });

  const columns: ColumnsType<Department> = [
    {
      key: "id",
      title: "ID",
      dataIndex: "id",
    },
    {
      key: "name",
      title: "Department name",
      dataIndex: "name",
    },
    {
      key: "categoryName",
      title: "Faculty",
      dataIndex: "categoryName",
    },
    {
      key: "description",
      title: "Description",
      dataIndex: "description",
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
              setDepartment(record);
              setOpenEdit(true);
            },
          },
          {
            key: "2",
            label: "Delete",
            onClick: () => {
              setDepartment(record);
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

  const handleDeleteDepartment = async (department: Department) => {
    try {
      await deleteDepartmentMutation.mutateAsync(department.id, {
        onSuccess: (data) => {
          notification.success({
            message: "Success",
            description: data?.message,
          });
          refetch();
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

  const departments = data?.data as Department[];
  const faculties = facultyQuery.data?.data as Category[];

  if (isLoading) {
    return <Spin />;
  }
  if (isError) {
    return <div>Error: {error?.message}</div>;
  }
  return (
    <div>
      <section className="space-between">
        <h3>Department Setup</h3>
        <Button
          onClick={() => setOpen(true)}
          iconBefore={<Plus />}
          text="Setup"
        />
      </section>
      <br />
      <Card bordered={false}>
        <Table
          dataSource={departments}
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
        title="Create Department"
        footer={null}
      >
        <CreateDepartment
          handleClose={() => setOpen(false)}
          faculties={faculties}
        />
      </Modal>
      <Modal
        open={openEdit}
        onCancel={() => setOpenEdit(false)}
        centered
        title="Edit Department"
        footer={null}
      >
        <EditDepartment
          item={department}
          handleClose={() => setOpenEdit(false)}
          faculties={faculties}
        />
      </Modal>
      <Modal
        open={openDelete}
        onCancel={() => setOpenDelete(false)}
        centered
        title="Delete Department"
        footer={null}
      >
        <DeleteModalContent
          handleCloseModal={() => setOpenDelete(false)}
          handleSubmit={() => handleDeleteDepartment(department)}
          isLoading={deleteDepartmentMutation.isPending}
          title={department.name}
        />
      </Modal>
    </div>
  );
};

export default Department;
