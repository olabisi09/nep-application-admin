import PageLayout from "../../../../layouts/pageLayout/pageLayout";
import { ReactComponent as GraterThan } from "../../../../assets/chevron_forward.svg";
import { ReactComponent as Add } from "../../../../assets/add.svg";
import { ReactComponent as Search } from "../../../../assets/search.svg";
import { ReactComponent as Filter } from "../../../../assets/Frame 48095998 (1).svg";
import { Dropdown, Modal, Table, Button as AntButton, MenuProps, Spin } from "antd";
import { Form, Formik } from "formik";
import styles from "../../styles.module.scss";
import Button from "../../../../custom/button/button";
import { useState } from "react";
import SearchInput from "../../../../custom/searchInput/searchInput";
import AddCountry from "./addCountry";
import { ReactComponent as Ellipsis } from "../../../../assets/ellipsis.svg";
import { getCountry } from "../../../../requests";
import { useQuery } from "@tanstack/react-query";

const CountrySetup = () => {
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

  const { data:data1, isLoading, isError, error } = useQuery({
    queryKey: ["get-country"],
    queryFn: getCountry,
  });

  const CountryData = data1?.data as Country[];

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
      key: "countryName",
      title: "country Name",
      dataIndex: "countryName",
    },
    {
      key: "activeStatus",
      title: "Active Status",
      dataIndex: "activeStatus",
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

  
  if (isLoading) {
    return <Spin />;
  }
  if (isError) {
    return <div>Error: {error?.message}</div>;
  }

  return (
    <main>
      <PageLayout
        paragraph="Country Setup"
        firstText="Setup Bio-data"
        secondText="Country Setup"
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
          dataSource={CountryData}
          columns={columns}
          pagination={{ position: ["bottomCenter"] }}
          //rowKey={(record, index) => `${record.id}${index}`}
        />
      </section>
     
      <Modal
        open={showAddModal}
        onCancel={() => setShowAddModal(false)}
        centered
        title="Country Setup"
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
            <AddCountry />
          </Form>
        </Formik>
      </Modal>

      <Modal
        open={openEdit}
        onCancel={() => setOpenEdit(false)}
        centered
        title="Country Setup"
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
            <AddCountry />
          </Form>
        </Formik>
      </Modal>

    </main>
  );
};

export default CountrySetup;
