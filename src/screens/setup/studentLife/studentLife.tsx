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
import {
  OverviewSetup,
  StudentActivitiesSetup,
  StudentLifeSetup,
} from "./setup";

const forms = [
  "Edit",
  "Overview",
  "School Summary",
  "Campus Experience",
  "Fitness & Athletics",
  "Support & Guidance",
  "Student Activities",
] as const;

const StudentLife = () => {
  const [open, setOpen] = useState(false);
  const [currentForm, setCurrentForm] = useState<(typeof forms)[number] | "">(
    ""
  );

  const onFormClick = (form: (typeof forms)[number]) => {
    setCurrentForm(form);
    setOpen(true);
  };

  const renderForms = () => {
    switch (currentForm) {
      case "Edit":
        return <StudentLifeSetup handleClose={() => setOpen(false)} />;
      case "Overview":
        return <OverviewSetup handleClose={() => setOpen(false)} />;
      case "School Summary":
        return <StudentLifeSetup handleClose={() => setOpen(false)} />;
      case "Campus Experience":
        return <StudentLifeSetup handleClose={() => setOpen(false)} />;
      case "Fitness & Athletics":
        return <StudentLifeSetup handleClose={() => setOpen(false)} />;
      case "Support & Guidance":
        return <StudentLifeSetup handleClose={() => setOpen(false)} />;
      case "Student Activities":
        return <StudentActivitiesSetup handleClose={() => setOpen(false)} />;
      default:
        return <StudentLifeSetup handleClose={() => setOpen(false)} />;
    }
  };

  const data = Array.from({ length: 3 }, (_, index) => ({
    id: `1234${index}`,
    title: "Student Life",
    description: "Description",
  }));

  const items: MenuProps["items"] = [
    {
      key: "1",
      label: "Edit",
      onClick: () => onFormClick("Edit"),
    },
    {
      key: "2",
      label: "Overview",
      onClick: () => onFormClick("Overview"),
    },
    {
      key: "3",
      label: "School Summary",
      onClick: () => onFormClick("School Summary"),
    },
    {
      key: "4",
      label: "Campus Experience",
      onClick: () => onFormClick("Campus Experience"),
    },
    {
      key: "5",
      label: "Fitness & Athletics",
      onClick: () => onFormClick("Fitness & Athletics"),
    },
    {
      key: "6",
      label: "Support & Guidance",
      onClick: () => onFormClick("Support & Guidance"),
    },
    {
      key: "7",
      label: "Student Activities",
      onClick: () => onFormClick("Student Activities"),
    },
    {
      key: "8",
      label: "Delete",
      onClick: () => {},
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
        <h3>Student Life Setup</h3>
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
        title={currentForm || "Student Life Setup"}
        footer={null}
        width={500}
      >
        {renderForms()}
      </Modal>
    </div>
  );
};

export default StudentLife;
