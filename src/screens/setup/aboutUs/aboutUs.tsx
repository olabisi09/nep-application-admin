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
import { CreateAboutUs, EditAboutUs } from "./setup";
import { useQuery } from "@tanstack/react-query";
import { getAboutUs } from "../../../requests";
import { ColumnsType } from "antd/es/table";

const AboutUs = () => {
  const [open, setOpen] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [about, setAbout] = useState<AboutUs>({} as AboutUs);

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["get-about-us"],
    queryFn: getAboutUs,
  });

  // const data = Array.from({ length: 5 }, (_, index) => ({
  //   id: `1234${index}`,
  //   title: "About Us",
  //   description: "Description",
  //   pictureUrl: "blah",
  //   status: "Active",
  // }));
  const columns: ColumnsType<AboutUs> = [
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
      render: (_, { imageUrl }) => <img src={imageUrl} alt="" />,
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
              setAbout(record);
              setOpenEdit(true);
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

  const aboutUs = data?.data as AboutUs[];

  if (isLoading) {
    return <Spin />;
  }
  if (isError) {
    return <div>Error: {error?.message}</div>;
  }
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
          dataSource={aboutUs}
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
        <CreateAboutUs handleClose={() => setOpen(false)} />
      </Modal>
      <Modal
        open={openEdit}
        onCancel={() => setOpenEdit(false)}
        centered
        title="Edit About Us Setup"
        footer={null}
      >
        <EditAboutUs item={about} handleClose={() => setOpen(false)} />
      </Modal>
    </div>
  );
};

export default AboutUs;
