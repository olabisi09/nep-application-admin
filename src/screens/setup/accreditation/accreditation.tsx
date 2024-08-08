import { ReactComponent as Add } from "../../../assets/add.svg";
import { ReactComponent as Search } from "../../../assets/search.svg";
import { ReactComponent as Filter } from "../../../assets/Frame 48095998 (1).svg";
import {
  Dropdown,
  Modal,
  Table,
  Button as AntButton,
  MenuProps,
  Spin,
} from "antd";
import { Form, Formik } from "formik";
import styles from "../styles.module.scss";
import Button from "../../../custom/button/button";
import { useState } from "react";
import SearchInput from "../../../custom/searchInput/searchInput";
import AddAccreditation from "./addAccreditation";
import { ReactComponent as Ellipsis } from "../../../assets/ellipsis.svg";
import { useQueries, useQuery } from "@tanstack/react-query";
import { getAccreditationById, getAllAccreditation } from "../../../requests";
import { ColumnsType } from "antd/es/table";

const AccreditationSetup = () => {
  const [showSearch, setShowSearch] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [showAllFilter, setShowAllFilter] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [item, setItem] = useState<AccreditationType>({} as AccreditationType);

  const handleSearch = (e: any) => {
    setSearchTerm(e.target.value);
  };

  const { data, error, isError, isLoading } = useQuery({
    queryKey: ["get-all-accreditation"],
    queryFn: getAllAccreditation,
    retry: 1,
  });

  const queries = useQueries({
    queries: [
      {
        queryKey: ["get-all-accreditation"],
        queryFn: getAllAccreditation,
        retry: 1,
      },
      {
        queryKey: ["get-accreditation-id"],
        queryFn: () => getAccreditationById(item?.id),
        retry: 1,
      },
    ],
  });

  const allAccreditationQuery = queries[0];
  const accreditationQuery = queries[1];

  const accreditationData = allAccreditationQuery?.data?.data ?? [];

  const dataSource = accreditationData?.map((item) => {
    return {
      id: item?.id,
      program: item?.readMoreId,
      description: item?.description,
      status: item?.activeStatus ? "Active" : "Inactive",
    };
  });

  const columns = [
    {
      key: "id",
      title: "ID",
      dataIndex: "id",
    },
    {
      key: "program",
      title: "Program",
      dataIndex: "program",
    },
    {
      key: "description",
      title: "Description",
      dataIndex: "description",
    },
    {
      key: "status",
      title: "Status",
      dataIndex: "status",
    },
    {
      key: "action",
      title: "",
      render: (record: AccreditationType) => {
        const items: MenuProps["items"] = [
          {
            key: "1",
            label: (
              <button
                style={{ border: "0rem" }}
                onClick={() => {
                  setOpenEdit(true);
                  setItem(record);
                }}>
                Edit
              </button>
            ),
          },
        ];

        return (
          <Dropdown menu={{ items }} trigger={["click"]}>
            <AntButton type="text" icon={<Ellipsis />} />
          </Dropdown>
        );
      },
    },
  ];

  if (isLoading) {
    return <Spin />;
  }

  return (
    <main>
      <section className="space-between">
        <h3>Accreditation Setup</h3>
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
          dataSource={dataSource}
          columns={columns}
          pagination={{ position: ["bottomCenter"] }}
          //rowKey={(record, index) => `${record.id}${index}`}
        />
      </section>

      <Modal
        open={showAddModal}
        onCancel={() => setShowAddModal(false)}
        centered
        title="Accreditation Setup"
        footer={null}
        // footer={() => (
        //   <div className="btn-group">
        //     <Button
        //       onClick={() => setShowAddModal(false)}
        //       variant="text"
        //       text="Cancel"
        //     />
        //     <Button text="Create" />
        //   </div>
        // )}
      >
        <AddAccreditation
          record={item}
          handleClose={() => setShowAddModal(false)}
        />
      </Modal>

      <Modal
        open={openEdit}
        onCancel={() => setOpenEdit(false)}
        centered
        title="Accreditation Setup"
        footer={null}
        // footer={() => (
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
        <AddAccreditation
          record={item}
          handleClose={() => setOpenEdit(false)}
        />
      </Modal>
    </main>
  );
};

export default AccreditationSetup;
