import { Card, Table, Spin } from "antd";
import { useQuery } from "@tanstack/react-query";
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
    },
  ];

  if (contactUsQuery.isLoading) {
    return <Spin />;
  }

  if (contactUsQuery.isError) {
    return <div>Error: {contactUsQuery.error?.message}</div>;
  }

  const userData = contactUsQuery.data?.data;
  const newData = [{ ...userData }] as ContactUsData[];

  return (
    <div>
      <section className="space-between">
        <h3>Contact Us Entries</h3>
      </section>

      <br />

      <Card bordered={false}>
        <Table
          dataSource={newData}
          columns={columns}
          rowKey="id"
          pagination={{ position: ["bottomCenter"] }}
        />
      </Card>
    </div>
  );
};

export default ContactUs;
