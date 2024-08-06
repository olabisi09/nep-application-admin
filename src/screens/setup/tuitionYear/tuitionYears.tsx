import PageLayout from "../../../layouts/pageLayout/pageLayout";
import { ReactComponent as GraterThan } from "../../../assets/chevron_forward.svg";
import { ReactComponent as Add } from "../../../assets/add.svg";
import { ReactComponent as Search } from "../../../assets/search.svg";
import { ReactComponent as Filter } from "../../../assets/Frame 48095998 (1).svg";
import { Dropdown, Modal, Table, Button as AntButton, MenuProps, Spin } from "antd";
import { Form, Formik } from "formik";
import styles from "../styles.module.scss";
import Button from "../../../custom/button/button";
import { useState } from "react";
import SearchInput from "../../../custom/searchInput/searchInput";
import AddTuitionYears from "./addTuitionYears";
import { ReactComponent as Ellipsis } from "../../../assets/ellipsis.svg";
import { useQuery } from "@tanstack/react-query";
import { getAllTuitionYear } from "../../../requests";

const TuitionYears = () => {
  const [showSearch, setShowSearch] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [showAllFilter, setShowAllFilter] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);

  const {data, isLoading, isError, error} = useQuery({
    queryKey: ["getAll-TuitionYear"],
    queryFn: getAllTuitionYear
  })

  const handleSearch = (e: any) => {
    setSearchTerm(e.target.value);
  };

  const items: MenuProps["items"] = [
    {
      key: "1",
      label: <button style={{border:'0rem'}} onClick={() => setOpenEdit(true)}>Edit</button>,
    },
  ];
  const columns = [
    {
      key: "id",
      title: "ID",
      dataIndex: "id",
    },
    {
      key: "tuitionId",
      title: "Tuition Id",
      dataIndex: "tuitionId",
    },
    {
      key: "readmoreId",
      title: "Read More Id",
      dataIndex: "readmoreId",
    },
    {
      key: "feeDescription",
      title: "Fee Description",
      dataIndex: "feeDescription",
    },
    {
      key: "activeStatus",
      title: "Status",
      dataIndex: "activeStatus",
      render: (activeStatus: boolean) => (activeStatus ? "Active" : "Not Active"),
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

  const tuitionYears = data?.data as TuitionYear[];

  if (isLoading) {
    return <Spin/>;
  }
  if (isError) {
    return <div>Error: {error?.message}</div>;
  }

  return (
    <main>
      <PageLayout
        paragraph="Tuition Years Setup"
        firstText="Setup Programs"
        secondText="Tuition Years Setup"
        iconBefore={<GraterThan />}
        headerActions={
          <Button
            onClick={() => setShowAddModal(true)}
            iconBefore={<Add />}
            text="Setup"
          />
        }
      />
      <section className={styles.card}>
        <div className={styles.inside}>
          <p>Showing 1-11 of 88</p>
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

            {!showAllFilter && (
              <Filter
                onClick={() =>
                  setShowAllFilter((showAllFilter) => !showAllFilter)
                }
              />
            )}
          </div>
        </div>
        <Table
          dataSource={tuitionYears}
          columns={columns}
          pagination={{ position: ["bottomCenter"] }}
          //rowKey={(record, index) => `${record.id}${index}`}
        />
      </section>
     
      <Modal
        open={showAddModal}
        onCancel={() => setShowAddModal(false)}
        centered
        title="Tuition Years Setup"
        footer={() => (
          <div className="btn-group">
            <Button
              onClick={() => setShowAddModal(false)}
              variant="text"
              text="Cancel"
            />
            <Button text="Create" />
          </div>
        )}
      >
        <Formik initialValues={{}} onSubmit={() => {}}>
          <Form>
            <AddTuitionYears />
          </Form>
        </Formik>
      </Modal>

      <Modal
        open={openEdit}
        onCancel={() => setOpenEdit(false)}
        centered
        title="Tuition Years Setup"
        footer={() => (
          <div className="btn-group">
            <Button
              onClick={() => setOpenEdit(false)}
              variant="text"
              text="Cancel"
            />
            <Button text="Update" />
          </div>
        )}
      >
        <Formik initialValues={{}} onSubmit={() => {}}>
          <Form>
            <AddTuitionYears />
          </Form>
        </Formik>
      </Modal>

    </main>
  );
};

export default TuitionYears;
