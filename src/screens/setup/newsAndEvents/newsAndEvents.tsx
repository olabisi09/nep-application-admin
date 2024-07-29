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
import placeholder from "../../../assets/placeholder-img.png";
import Button from "../../../custom/button/button";
import { useState } from "react";
import NewsAndEventsSetup from "./setup";

const NewsAndEvents = () => {
  const [open, setOpen] = useState(false);

  const data = Array.from({ length: 3 }, (_, index) => ({
    id: `1234${index}`,
    title: "Facebook",
    description: "description",
    picture: placeholder,
    status: "Active",
  }));

  const items: MenuProps["items"] = [
    {
      key: "1",
      label: "Edit",
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
      key: "description",
      title: "Description",
      dataIndex: "description",
    },
    {
      key: "picture",
      title: "Picture",
      render: (_: any, record: any) => <img src={record?.picture} alt="" />,
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
        title="News and Events Setup"
        footer={null}
      >
        <NewsAndEventsSetup handleClose={() => setOpen(false)} />
      </Modal>
    </div>
  );
};

export default NewsAndEvents;
