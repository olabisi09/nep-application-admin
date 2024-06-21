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
import SetupAboutUs from "./setup";

const AboutUs = () => {
  const [open, setOpen] = useState(false);

  const data = Array.from({ length: 5 }, (_, index) => ({
    id: `1234${index}`,
    title: "About Us",
    description: "Description",
    pictureUrl: "blah",
    status: "Active",
  }));

  // const items: MenuProps["items"] = [
  //   {
  //     key: "1",
  //     label: <button onClick={() => setOpenEdit(true)}>Edit</button>,
  //   },
  // ];
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
      key: "pictureUrl",
      title: "Picture",
      dataIndex: "pictureUrl",
    },
    {
      key: "status",
      title: "Status",
      dataIndex: "status",
    },
    // {
    //   key: "action",
    //   title: "",
    //   render: () => (
    //     <Dropdown menu={{ items }} trigger={["click"]}>
    //       <AntButton type="text" icon={<Ellipsis />} />
    //     </Dropdown>
    //   ),
    // },
  ];
  return (
    <div>
      <section className="space-between">
        <h3>About Us Setup</h3>
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
        title="About Us Setup"
        footer={null}
      >
        <SetupAboutUs handleClose={() => setOpen(false)} />
      </Modal>
    </div>
  );
};

export default AboutUs;
