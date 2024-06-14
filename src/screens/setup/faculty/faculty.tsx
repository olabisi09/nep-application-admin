import PageLayout from "../../../layouts/pageLayout/pageLayout";
import { ReactComponent as GraterThan } from "../../../assets/chevron_forward.svg";
import { ReactComponent as Action } from "../../../assets/more_horiz.svg";
import { ReactComponent as Add } from "../../../assets/add.svg";
import { Table } from "antd";
import { data } from "./data";
import styles from "./styles.module.scss"
import Button from "../../../custom/button/button";

const FaultySetUp = () => {
  const column = [
    {
      title: "Email",
      dataIndex: "Email",
      key: "Email",
    },
    {
      title: "Phone No.",
      dataIndex: "Phone",
      key: "Phone",
      render: (text: string) => <span>{text || "N/A"}</span>,
    },
    {
      title: "Student Name",
      dataIndex: "StudenName",
      key: "StudenName",
      render: (text: string) => <span>{text || "N/A"}</span>,
    },
    {
      title: "Date",
      dataIndex: "TransDate",
      key: "TransDate",
    },
    {
      title: "Action",
      dataIndex: "TransDate",
      key: "TransDate",
      render: (text: string) => (
        <span>
          {
            <>
              {" "}
              <Action />{" "}
            </>
          }
        </span>
      ),
    },
  ];
  return (
    <main>
      <PageLayout
        paragraph="Faculty Setup"
        firstText="Setup Programs"
        secondText="Faculty Setup"
        iconBefore={<GraterThan />}
        headerActions={
            <Button iconBefore={<Add />} text="Setup" />

        }
      />

      <Table
        columns={column}
        dataSource={data}
        className={styles.row}
        rowKey={"DueYear"}
        scroll={{ x: 400 }}
        //   pagination={{ current: currentPage, pageSize: pageSize, onChange: handlePaginationChange, position: ["bottomCenter"] }}
        pagination={false}
      />
    </main>
  );
};

export default FaultySetUp;
