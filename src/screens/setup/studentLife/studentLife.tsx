import {
  Card,
  Dropdown,
  MenuProps,
  Modal,
  Table,
  Button as AntButton,
  Spin,
} from "antd";
import { ReactComponent as Plus } from "../../../assets/add.svg";
import { ReactComponent as Ellipsis } from "../../../assets/ellipsis.svg";
import Button from "../../../custom/button/button";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getStudentLife } from "../../../requests";
import { ColumnsType } from "antd/es/table";
import { sanitizeAndLimitString } from "../../../utils/sanitizeAndLimitString";
import {
  CampusExperience,
  CreateStudentLife,
  EditStudentLife,
  FitnessAthletics,
  Overview,
  SchoolSummary,
  StudentActivities,
  SupportGuidance,
} from "./setup";
import { useNavigate } from "react-router-dom";

const forms = [
  "Create",
  "Edit",
  "Overview",
  "School Summary",
  "Campus Experience",
  "Fitness & Athletics",
  "Support & Guidance",
  "Student Activities",
] as const;

const StudentLife = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [item, setItem] = useState<Setup>({} as Setup);
  const [currentForm, setCurrentForm] = useState<(typeof forms)[number] | "">(
    ""
  );

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["get-student-life"],
    queryFn: getStudentLife,
  });

  const onFormClick = (form: (typeof forms)[number]) => {
    setCurrentForm(form);
    setOpen(true);
  };

  const renderForms = () => {
    switch (currentForm) {
      case "Create":
        return <CreateStudentLife handleClose={() => setOpen(false)} />;
      case "Edit":
        return (
          <EditStudentLife item={item} handleClose={() => setOpen(false)} />
        );
      case "Overview":
        return <Overview handleClose={() => setOpen(false)} />;
      case "School Summary":
        return <SchoolSummary handleClose={() => setOpen(false)} />;
      case "Campus Experience":
        return <CampusExperience handleClose={() => setOpen(false)} />;
      case "Fitness & Athletics":
        return (
          <FitnessAthletics item={item} handleClose={() => setOpen(false)} />
        );
      case "Support & Guidance":
        return (
          <SupportGuidance item={item} handleClose={() => setOpen(false)} />
        );
      case "Student Activities":
        return <StudentActivities handleClose={() => setOpen(false)} />;
      default:
        return <CreateStudentLife handleClose={() => setOpen(false)} />;
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
        const limitedCleanHtml = sanitizeAndLimitString(description);
        return <div dangerouslySetInnerHTML={{ __html: limitedCleanHtml }} />;
      },
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
              setItem(record);
              onFormClick("Edit");
            },
          },
          {
            key: "2",
            label: "Overview",
            onClick: () => navigate(`/student-life/${record.id}/overview`),
          },
          {
            key: "3",
            label: "School Summary",
            onClick: () =>
              navigate(`/student-life/${record.id}/school-summary`),
          },
          {
            key: "4",
            label: "Campus Experience",
            onClick: () => onFormClick("Campus Experience"),
          },
          {
            key: "5",
            label: "Fitness & Athletics",
            onClick: () =>
              navigate(`/student-life/${record.id}/fitness-and-athletics`),
          },
          {
            key: "6",
            label: "Support & Guidance",
            onClick: () =>
              navigate(`/student-life/${record.id}/support-and-guidance`),
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
        return (
          <Dropdown menu={{ items }} trigger={["click"]}>
            <AntButton type="text" icon={<Ellipsis />} />
          </Dropdown>
        );
      },
    },
  ];

  const studentLife = data?.data as Setup[];

  if (isLoading) {
    return <Spin />;
  }
  if (isError) {
    return <div>Error: {error?.message}</div>;
  }

  return (
    <div>
      <section className="space-between">
        <h3>Student Life Setup</h3>
        <Button
          onClick={() => onFormClick("Create")}
          iconBefore={<Plus />}
          text="Setup"
        />
      </section>
      <br />
      <Card bordered={false} style={{ minWidth: "720px" }}>
        <Table
          dataSource={studentLife}
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
