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
  const [indexData, setIndexData] = useState({} as Country);
  const [openDelete, setOpenDelete] = useState(false);

  const handleSearch = (e: any) => {
    setSearchTerm(e.target.value);
  };

  const handleEdit = (data: Country) => {
    setIndexData(data);
    setOpenEdit(true);
  };

  const handleDelete = (data: Country) => {
    setIndexData(data);
    setOpenDelete(true);
  };

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["get-country"],
    queryFn: getCountry,
  });

  const CountryData = data?.data as Country[];

  const items = (record: Country): MenuProps["items"] => [
    {
      key: "1",
      label: (
        <button style={{ border: "0rem" }} onClick={() => handleEdit(record)}>
          Edit
        </button>
      ),
    },
    {
      key: "2",
      label: (
        <button style={{ border: "0rem" }} onClick={() => handleDelete(record)}>
          Delete
        </button>
      ),
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
      render: (text:boolean) => (text ? "Active" : "Inactive"),

    },

    {
      key: "action",
      title: "",
      render: ( record: Country) => (
        <Dropdown menu={{ items: items(record) }} trigger={["click"]}>
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
        footer={null}
      >
    
            <AddCountry handleClose={() => setShowAddModal(false)} />
   
      </Modal>

      <Modal
        open={openEdit}
        onCancel={() => setOpenEdit(false)}
        centered
        title="Country Setup"
        footer={null}
      >
    
            <AddCountry handleClose={() => setOpenEdit(false)} data={indexData}/>
      </Modal>

    </main>
  );
};

export default CountrySetup;
