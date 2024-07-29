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
import SetupFaq from "./setup";
import QAndA from "./qAndA";

const Faq = () => {
  const [open, setOpen] = useState(false);
  const [openQAndA, setOpenQAndA] = useState(false);


  

  const data = Array.from({ length: 5 }, (_, index) => ({
    id: `1234${index}`,
    title: "Why Kwararafa University",
    status: "Active",
  }));

  const items: MenuProps["items"] = [
    {
      key: "1",
      label: "Edit FAQ Setup",
      onClick: () => setOpen(true),
    },
    {
      key: "2",
      label: "Add Questions & Answers",
      onClick: () => setOpenQAndA(true),
    },
    {
      key: "3",
      label: "Edit Questions & Answers",
      onClick: () => setOpen(true),
    },
    {
      key: "4",
      label: "Delete",
      onClick: () => setOpen(true),
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
        <h3>FAQ Setup</h3>
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
        title="FAQ Setup"
        footer={null}
      >
        <SetupFaq handleClose={() => setOpen(false)} />
      </Modal>
      <Modal
        open={openQAndA}
        onCancel={() => setOpenQAndA(false)}
        centered
        title="FAQ Items Setup"
        footer={null}
      >
        <QAndA handleClose={() => setOpenQAndA(false)} />
      </Modal>
    </div>
  );
};

export default Faq;
