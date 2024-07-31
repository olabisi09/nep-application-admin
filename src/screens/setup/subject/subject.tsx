import PageLayout from "../../../layouts/pageLayout/pageLayout";
import { ReactComponent as GraterThan } from "../../../assets/chevron_forward.svg";
import { ReactComponent as Add } from "../../../assets/add.svg";
import { ReactComponent as Search } from "../../../assets/search.svg";
import { ReactComponent as Filter } from "../../../assets/Frame 48095998 (1).svg";
import { Dropdown, Modal, Table, Button as AntButton, MenuProps } from "antd";
import { Form, Formik } from "formik";
import styles from "../styles.module.scss";
import Button from "../../../custom/button/button";
import { useState } from "react";
import SearchInput from "../../../custom/searchInput/searchInput";
import AddSubject from "./addSubject";
import { ReactComponent as Ellipsis } from "../../../assets/ellipsis.svg";

const SubjectSetUp = () => {
  const [showSearch, setShowSearch] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [showAllFilter, setShowAllFilter] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);

  const handleSearch = (e: any) => {
    setSearchTerm(e.target.value);
  };
  const data = Array.from({ length: 5 }, () => ({
    id: 1234,
    firstName: "Timi",
    lastName: "John",
    email: "john@gmail.com",
    role: "Admin User",
    status: "Active",
  }));
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
      key: "email",
      title: "Email Address",
      dataIndex: "email",
    },
    {
      key: "role",
      title: "Role",
      dataIndex: "role",
    },
    {
      key: "status",
      title: "Status",
      dataIndex: "status",
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
    <main>
      <PageLayout
        paragraph="Subject Setup"
        firstText="Setup Programs"
        secondText="Subject Setup"
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
          dataSource={data}
          columns={columns}
          pagination={{ position: ["bottomCenter"] }}
          //rowKey={(record, index) => `${record.id}${index}`}
        />
      </section>
     
      <Modal
        open={showAddModal}
        onCancel={() => setShowAddModal(false)}
        centered
        title="Subject Setup"
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
            <AddSubject />
          </Form>
        </Formik>
      </Modal>

      <Modal
        open={openEdit}
        onCancel={() => setOpenEdit(false)}
        centered
        title="Subject Setup"
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
            <AddSubject />
          </Form>
        </Formik>
      </Modal>

    </main>
  );
};

export default SubjectSetUp;
