import PageLayout from "../../../../layouts/pageLayout/pageLayout";
import { ReactComponent as GraterThan } from "../../../../assets/chevron_forward.svg";
import { ReactComponent as Add } from "../../../../assets/add.svg";
import { ReactComponent as Search } from "../../../../assets/search.svg";
import { ReactComponent as Filter } from "../../../../assets/Frame 48095998 (1).svg";
import {
  Dropdown,
  Modal,
  Table,
  Button as AntButton,
  MenuProps,
  Spin,
} from "antd";
import styles from "../../styles.module.scss";
import Button from "../../../../custom/button/button";
import { useState } from "react";
import SearchInput from "../../../../custom/searchInput/searchInput";
import  { AddMarital } from "./addMaritalStatus";
import { ReactComponent as Ellipsis } from "../../../../assets/ellipsis.svg";
import { getMaritalStatus } from "../../../../requests";
import { useQuery } from "@tanstack/react-query";

const MaritalSetup = () => {
  const [showSearch, setShowSearch] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [showAllFilter, setShowAllFilter] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);

  const handleSearch = (e: any) => {
    setSearchTerm(e.target.value);
  };

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["get-marital-status"],
    queryFn: getMaritalStatus,
  });

  const items: MenuProps["items"] = [
    {
      key: "1",
      label: (
        <button style={{ border: "0rem" }} onClick={() => setOpenEdit(true)}>
          Edit
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
      key: "statusName",
      title: "status",
      dataIndex: "statusName",
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
  const maritalStatus = data?.data as MaritalStatus[];

  if (isLoading) {
    return <Spin />;
  }
  if (isError) {
    return <div>Error: {error?.message}</div>;
  }
  return (
    <main>
      <PageLayout
        paragraph="Marital Setup"
        firstText="Setup Bio-data"
        secondText="Marital Setup"
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
          dataSource={maritalStatus}
          columns={columns}
          pagination={{ position: ["bottomCenter"] }}
          //rowKey={(record, index) => `${record.id}${index}`}
        />
      </section>

      <Modal
        open={showAddModal}
        onCancel={() => setShowAddModal(false)}
        centered
        title="Marital Setup"
        footer={null}
      >
        
            <AddMarital handleClose={() => setShowAddModal(false)}  />
   
      </Modal>

      {/* <Modal
        open={openEdit}
        onCancel={() => setOpenEdit(false)}
        centered
        title="Edit Marital Setup"
        footer={null}
      >
        <AddMarital handleClose={() => setOpenEdit(false)}  />
      </Modal> */}
    </main>
  );
};

export default MaritalSetup;
