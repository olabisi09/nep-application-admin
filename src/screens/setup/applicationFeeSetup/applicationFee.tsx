import { ReactComponent as Add } from "../../../assets/add.svg";
import { ReactComponent as Search } from "../../../assets/search.svg";
import { ReactComponent as Filter } from "../../../assets/Frame 48095998 (1).svg";
import { Dropdown, Modal, Table, Button as AntButton, MenuProps } from "antd";
import { Form, Formik } from "formik";
import styles from "../styles.module.scss";
import Button from "../../../custom/button/button";
import { useState } from "react";
import SearchInput from "../../../custom/searchInput/searchInput";
import { ReactComponent as Ellipsis } from "../../../assets/ellipsis.svg";
import AddApplicationFee from "./addApplicationFee";
import ModeOfStudy from "../modeOfStudy/modeOfStudy";
import { getAllFeeSetup } from "../../../requests";

const ApplicationFee = () => {
  const [showSearch, setShowSearch] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [showAllFilter, setShowAllFilter] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [item, setItem] = useState<ApplicationFee>({} as ApplicationFee);

  const [showAddItemModal, setShowAddItemModal] = useState(false);

  const handleSearch = (e: any) => {
    setSearchTerm(e.target.value);
  };
  const data = Array.from({ length: 2 }, () => ({
    id: 1234,
    programId: "Timi",
    modeOfStudyId: "hhee",
    amount: 33000,
  }));

   
  const items: MenuProps["items"] = [
    {
      key: "1",
      label: (
        <button style={{ border: "0rem" }} onClick={() => setOpenEdit(true)}>
          Edit
        </button>
      ),
    },

    {
      key: "1",
      label: (
        <button
          style={{ border: "0rem" }}
          onClick={() => {
            // handleDelete(record.id);
          }}>
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
      key: "programId",
      title: "Program",
      dataIndex: "programId",
    },
    {
      key: "modeOfStudyId",
      title: "Mode Of Study",
      dataIndex: "modeOfStudyId",
    },
    {
      key: "amount",
      title: "Amount",
      dataIndex: "amount",
    },
    // {
    //   key: "role",
    //   title: "Role",
    //   dataIndex: "role",
    // },
    // {
    //   key: "status",
    //   title: "Status",
    //   dataIndex: "status",
    // },
    {
      key: "action",
      title: "",
      render: (record: ApplicationFee) => (
        <Dropdown menu={{ items }} trigger={["click"]}>
          <AntButton type="text" icon={<Ellipsis />} />
        </Dropdown>
      ),
    },
  ];

  return (
    <main>
      <section className="space-between">
        <h3>Application Fee Setup</h3>
        <Button
          onClick={() => setShowAddModal(true)}
          iconBefore={<Add />}
          text="Setup"
        />
      </section>
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
          scroll={{ x: 400 }}
          //rowKey={(record, index) => `${record.id}${index}`}
        />
      </section>

      <Modal
        open={showAddModal}
        onCancel={() => setShowAddModal(false)}
        centered
        title="Application Fee Setup"
        footer={null}>
        <AddApplicationFee
          record={item}
          handleClose={() => setShowAddModal(false)}
        />
      </Modal>

      <Modal
        open={openEdit}
        onCancel={() => setOpenEdit(false)}
        centered
        title="Application Fee Setup"
        footer={null}
        //   <div className="btn-group">
        //     <Button
        //       onClick={() => setOpenEdit(false)}
        //       variant="text"
        //       text="Cancel"
        //     />
        //     <Button text="Update" />
        //   </div>
        // )}
      >
        <AddApplicationFee
          record={item}
          handleClose={() => setShowAddModal(false)}
        />
      </Modal>
    </main>
  );
};

export default ApplicationFee;
