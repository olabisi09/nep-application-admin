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
import { Form, Formik } from "formik";
import SetupWhySchool from "./setup";

const WhySchool = () => {
  const [open, setOpen] = useState(false);

  const data = Array.from({ length: 5 }, (_, index) => ({
    id: `1234${index}`,
    title: "Why Kwararafa University",
    status: "Active",
  }));

  const items: MenuProps["items"] = [
    {
      key: "1",
      label: <button onClick={() => setOpen(true)}>Edit</button>,
    },
  ];
  const columns = [
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
        <h3>Why School Setup</h3>
        <Button
          onClick={() => setOpen(true)}
          iconBefore={<Plus />}
          text="Setup"
        />
      </section>
      <br />
      <Card bordered={false}>
        <Table
          dataSource={data}
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
        title="Why School Setup"
        footer={() => (
          <div className="btn-group">
            <Button
              onClick={() => setOpen(false)}
              variant="text"
              text="Cancel"
            />
            <Button text="Create" />
          </div>
        )}
      >
        <Formik initialValues={{}} onSubmit={() => {}}>
          <Form>
            <SetupWhySchool />
          </Form>
        </Formik>
      </Modal>
    </div>
  );
};

export default WhySchool;
