import {
  Card,
  Dropdown,
  MenuProps,
  Modal,
  Table,
  Button as AntButton,
} from "antd";
import { ReactComponent as Plus } from "../../../assets/add.svg";
import { ReactComponent as Ellipsis } from "../../../assets/ellipsis.svg";
import Button from "../../../custom/button/button";
import { useState } from "react";
import AddUserForm from "./addUserForm";
import { Form, Formik } from "formik";
import EditUserForm from "./editUserForm";

const AddUsers = () => {
  const [openAdd, setOpenAdd] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);

  const data = Array.from({ length: 5 }, (_, index) => ({
    id: `1234${index}`,
    firstName: "Timi",
    lastName: "John",
    email: "john@gmail.com",
    role: "Admin User",
    status: "Active",
  }));

  const items: MenuProps["items"] = [
    {
      key: "1",
      label: <button onClick={() => setOpenEdit(true)}>Edit</button>,
    },
  ];
  const columns = [
    // {
    //   key: "id",
    //   title: "ID",
    //   dataIndex: "id",
    // },
    {
      key: "firstName",
      title: "First Name",
      dataIndex: "firstName",
    },
    {
      key: "lastName",
      title: "Last Name",
      dataIndex: "lastName",
    },
    {
      key: "email",
      title: "Email Address",
      dataIndex: "email",
    },
    {
      key: "role",
      title: "Role",
      dataIndex: "role",
    },
    {
      key: "status",
      title: "Status",
      dataIndex: "status",
    },
    {
      key: "action",
      title: "",
      render: () => (
        <Dropdown menu={{ items }} trigger={["click"]}>
          <AntButton type="text" icon={<Ellipsis />} />
        </Dropdown>
      ),
    },
  ];
  return (
    <div>
      <section className="space-between">
        <h3>Admin Users</h3>
        <Button
          onClick={() => setOpenAdd(true)}
          iconBefore={<Plus />}
          text="Add User"
        />
      </section>
      <br />
      <Card bordered={false}>
        <div className="space-between">
          <p>Showing 1 - 5 of 5</p>
          <p>feffe</p>
        </div>
        <br />
        <Table
          dataSource={data}
          columns={columns}
          pagination={{ position: ["bottomCenter"] }}
          rowKey={(record) => record.id}
          scroll={{ x: true }}
        />
      </Card>
      <Modal
        open={openAdd}
        onCancel={() => setOpenAdd(false)}
        centered
        title="Add User"
        footer={() => (
          <div className="btn-group">
            <Button
              onClick={() => setOpenAdd(false)}
              variant="text"
              text="Cancel"
            />
            <Button text="Create" />
          </div>
        )}
      >
        <Formik initialValues={{}} onSubmit={() => {}}>
          <Form>
            <AddUserForm />
          </Form>
        </Formik>
      </Modal>
      <Modal
        open={openEdit}
        onCancel={() => setOpenEdit(false)}
        centered
        title="Edit User"
        footer={() => (
          <div className="btn-group">
            <Button
              onClick={() => setOpenEdit(false)}
              variant="text"
              text="Cancel"
            />
            <Button text="Update" />
          </div>
        )}
      >
        <Formik initialValues={{}} onSubmit={() => {}}>
          <Form>
            <EditUserForm />
          </Form>
        </Formik>
      </Modal>
    </div>
  );
};

export default AddUsers;
