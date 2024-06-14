import PageLayout from "../../../layouts/pageLayout/pageLayout";
import { ReactComponent as GraterThan } from "../../../assets/chevron_forward.svg";
import { ReactComponent as Action } from "../../../assets/more_horiz.svg";
import { ReactComponent as Add } from "../../../assets/add.svg";
import { ReactComponent as Search } from "../../../assets/search.svg";
import { ReactComponent as Filter } from "../../../assets/Frame 48095998 (1).svg";
import { ReactComponent as Cancel } from "../../../assets/close_small.svg";
import { Modal, Table } from "antd";
import { data } from "./data";
import styles from "./styles.module.scss"
import Button from "../../../custom/button/button";
import { useState } from "react";
import SearchInput from "../../../custom/searchInput/searchInput";
import { FormikProvider } from "formik";
import CreateFaculty from "./createFaculty";

const FaultySetUp = () => {
    const [showSearch, setShowSearch] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [showAllFilter, setShowAllFilter] = useState(false);
    const [showModal, setShowModal] = useState(false);

    const handleSearch = (e: any) => {
        setSearchTerm(e.target.value);
      };
  const column = [
    {
      title: "ID",
      dataIndex: "ID",
      key: "ID",
    },
    {
      title: "Name",
      dataIndex: "Name",
      key: "Name",
      render: (text: string) => <span>{text || "N/A"}</span>,
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
            <Button  onClick={() => setShowModal(true)} iconBefore={<Add />} text="Setup" />

        }
      />
      <section className={styles.card}>

      <div className={styles.inside}>
          <p>Showing 1-11 of 88</p>
          <div>
            {!showSearch && (
              <span>
                <Search onClick={() => setShowSearch((showSearch) => !showSearch)} />
              </span>
            )}
            {showSearch && <SearchInput value={searchTerm} onChange={handleSearch} />}
            
            {!showAllFilter && <Filter onClick={() => setShowAllFilter((showAllFilter) => !showAllFilter)} />}
          </div>
        </div>
      <Table
        columns={column}
        dataSource={data}
        className={styles.row}
        rowKey={"DueYear"}
        scroll={{ x: 400 }}
        //   pagination={{ current: currentPage, pageSize: pageSize, onChange: handlePaginationChange, position: ["bottomCenter"] }}
        pagination={false}
      />

      </section>
      <Modal
        open={showModal}
        footer=""
        onCancel={() => setShowModal(false)}
        centered
        closeIcon={<Cancel/>}
        // width={900}
      >
        <CreateFaculty/>
      </Modal>

   
    </main>
  );
};

export default FaultySetUp;
