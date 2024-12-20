import { useState } from "react";

import {
  Button as AntButton,
  Card,
  Dropdown,
  MenuProps,
  Modal,
  Table,
} from "antd";

import { ReactComponent as Plus } from "../../../assets/add.svg";
import { ReactComponent as Ellipsis } from "../../../assets/ellipsis.svg";
import Button from "../../../custom/button/button";

import SetupSchoolMgt from "./setup";

const SchoolForm = () => {
  const [open, setOpen] = useState(false);

  const data = Array.from({ length: 3 }, (_, index) => ({
    id: `1234${index}`,
    name: "Facebook",
  }));

  const items: MenuProps["items"] = [
    {
      key: "1",
      label: "Edit",
      onClick: () => setOpen(true),
    },
  ];
  const columns = [
    // {
    //   key: "id",
    //   title: "ID",
    //   dataIndex: "id",
    // },
    {
      key: "name",
      title: "Name",
      dataIndex: "name",
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
        <h3>Form Setup</h3>
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
        title="Form Setup"
        footer={null}
      >
        <SetupSchoolMgt handleClose={() => setOpen(false)} />
      </Modal>
    </div>
  );
};

export default SchoolForm;
