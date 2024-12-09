import { Card, Table, Spin } from "antd";
import { useQuery } from "@tanstack/react-query";
import { ColumnsType } from "antd/es/table";
import { getAllStudentUser } from "./request";
import { usePagination } from "../../../hooks/usePagination";
import { useState } from "react";
import styles from "../styles.module.scss";
import { ReactComponent as Search } from "../../../assets/search.svg";
import { SearchInput } from "../../../custom";

const StudentUser = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [showSearch, setShowSearch] = useState(false);

  const { currentPage, onChange } = usePagination();

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

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

  const filteredData = userData?.filter(
    (user) =>
      user?.firstName?.toLowerCase()?.includes(searchTerm.toLowerCase()) ||
      user?.lastName?.toLowerCase()?.includes(searchTerm.toLowerCase()) ||
      user?.email?.toLowerCase()?.includes(searchTerm.toLowerCase())
  );

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
        <div className={styles.inside}>
          <p>
            Showing 1-{filteredData?.length} of {userData?.length}
          </p>

          <div>
            {!showSearch && (
              <span>
                <Search
                  onClick={() => setShowSearch((showSearch) => !showSearch)}
                />
              </span>
            )}
            {showSearch && (
              <SearchInput value={searchTerm} onChange={handleSearch} />
            )}

            {/* {!showAllFilter && (
              <Filter
                onClick={() =>
                  setShowAllFilter((showAllFilter) => !showAllFilter)
                }
              />
            )} */}
          </div>
        </div>

        <Table
          dataSource={filteredData}
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
