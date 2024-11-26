import { Card, Table, Spin } from "antd";
import { useQuery } from "@tanstack/react-query";
import { ColumnsType } from "antd/es/table";
import { getAllStudentUser } from "./request";
import { usePagination } from "../../../hooks/usePagination";

const StudentUser = () => {
  const { currentPage, onChange } = usePagination();

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["get-student-users"],
    queryFn: () => getAllStudentUser(currentPage, 10),
  });

  const columns: ColumnsType<User> = [
    {
      key: "appNo",
      title: "Application Number",
      dataIndex: "applicationNumber",
    },
    {
      key: "firstName",
      title: "First Name",
      dataIndex: "firstName",
    },
    {
      key: "lastName",
      title: "Last Name",
      dataIndex: "lastName",
    },
    {
      key: "middleName",
      title: "Middle Name",
      dataIndex: "middleName",
    },
    {
      key: "email",
      title: "Email",
      dataIndex: "email",
    },
    {
      key: "phoneNo",
      title: "Phone Number",
      dataIndex: "phoneNumber",
    },
  ];
  
  const userData = data?.data as User[];

  if (isLoading) {
    return <Spin />;
  }
  
  if (isError) {
    return <div>Error: {error?.message}</div>;
  }

  return (
    <div>
      <section className="space-between">
        <h3>System User Setup</h3>
      </section>

      <br />

      <Card bordered={false}>
        <Table
          dataSource={userData}
          columns={columns}
          rowKey={(record) => record.applicantId}
          scroll={{ x: true }}
          pagination={{
            position: ["bottomCenter"],
            current: currentPage,
            total: data?.totalSize,
            onChange: onChange,
            pageSize: 10,
          }}
        />
      </Card>
    </div>
  );
};

export default StudentUser;
