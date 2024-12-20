/* eslint-disable no-undef */
import { useQuery } from "@tanstack/react-query";
import { Card, Spin, Table } from "antd";
import { ColumnsType } from "antd/es/table";

import { getAllContactForm } from "../../../requests";

const ContactUs = () => {
  const contactUsQuery = useQuery({
    queryKey: ["get-contact-us"],
    queryFn: getAllContactForm,
  });

  const columns: ColumnsType<ContactUsData> = [
    {
      key: "title",
      title: "Title",
      dataIndex: "title",
    },
    {
      key: "fName",
      title: "First Name",
      dataIndex: "fName",
    },
    {
      key: "lName",
      title: "Last Name",
      dataIndex: "lName",
    },
    {
      key: "email",
      title: "Email",
      dataIndex: "email",
    },
    {
      key: "phone",
      title: "Phone Number",
      dataIndex: "phone",
    },

    {
      key: "message",
      title: "Message",
      dataIndex: "message",
      render: (text: string) => (
        <div style={{ wordBreak: "break-word" }}>{text}</div>
      ),
    },
  ];

  if (contactUsQuery.isLoading) {
    return <Spin />;
  }

  if (contactUsQuery.isError) {
    return <div>Error: {contactUsQuery.error?.message}</div>;
  }

  const userData = contactUsQuery.data?.data as ContactUsData[];
  //const newData = [{ ...userData }] as ContactUsData[];
  //console.log(newData);

  return (
    <div>
      <section className="space-between">
        <h3>Contact Us Entries</h3>
      </section>

      <br />

      <Card bordered={false}>
        <Table
          dataSource={userData}
          columns={columns}
          rowKey="id"
          pagination={{ position: ["bottomCenter"] }}
        />
      </Card>
    </div>
  );
};

export default ContactUs;
