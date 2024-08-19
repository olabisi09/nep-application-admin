import { ReactComponent as Add } from "../../../../assets/add.svg";
import { ReactComponent as Search } from "../../../../assets/search.svg";
import { ReactComponent as Filter } from "../../../../assets/Frame 48095998 (1).svg";
import { Dropdown, Modal, Table, Button as AntButton, MenuProps } from "antd";
import { Form, Formik } from "formik";
import styles from "../../styles.module.scss";
import { useState } from "react";
import { ReactComponent as Ellipsis } from "../../../../assets/ellipsis.svg";
import { useQuery } from "@tanstack/react-query";
import { getCareerProspects } from "../../../../requests";
import { ColumnsType } from "antd/es/table";
import AddItem from "./addItem";
import { Button, SearchInput } from "../../../../custom";

const CareerProspectItems = () => {
  const [showSearch, setShowSearch] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [showAllFilter, setShowAllFilter] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [showAddItemModal, setShowAddItemModal] = useState(false);
  const [careerProspectItems, setCareerProspectItems] =
    useState<CareerProspect>({} as CareerProspect);

  const handleSearch = (e: any) => {
    setSearchTerm(e.target.value);
  };

  const { data, isLoading } = useQuery({
    queryKey: ["get-career-prospect"],
    queryFn: getCareerProspects,
  });

  const careerProspectData = data?.data as CareerProspect[];

  const columns: ColumnsType<CareerProspect> = [
    {
      key: "id",
      title: "ID",
      dataIndex: "id",
    },
    {
      key: "programName",
      title: "Program Name",
      dataIndex: "programName",
    },
    {
      key: "description",
      title: "Description",
      dataIndex: "description",
    },
    {
      key: "status",
      title: "Status",
      dataIndex: "activeStatus",
      render: (_, { activeStatus }) => (activeStatus ? "Active" : "Inactive"),
    },
    {
      key: "action",
      title: "",
      render: (_, record) => {
        const items: MenuProps["items"] = [
          {
            key: "1",
            label: "Add Items",
            onClick: () => {
              setCareerProspectItems(record);
            },
          },
          {
            key: "2",
            label: "Edit",
            onClick: () => {
              setCareerProspectItems(record);
              setOpenEdit(true);
            },
          },
          {
            key: "3",
            label: "Delete",
            onClick: () => {},
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

  return (
    <main>
      <section className="space-between">
        <h3>Career Prospect Items Setup</h3>
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
          dataSource={careerProspectData}
          columns={columns}
          pagination={{ position: ["bottomCenter"] }}
          //rowKey={(record, index) => `${record.id}${index}`}
        />
      </section>

      <Modal
        open={showAddModal}
        onCancel={() => setShowAddModal(false)}
        centered
        title="Career Prospects Setup"
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
            {/* <AddCareerProspects /> */}
          </Form>
        </Formik>
      </Modal>

      <Modal
        open={openEdit}
        onCancel={() => setOpenEdit(false)}
        centered
        title="Career Prospects Setup"
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
            {/* <AddCareerProspects /> */}
          </Form>
        </Formik>
      </Modal>

      <Modal
        open={showAddItemModal}
        onCancel={() => setShowAddItemModal(false)}
        centered
        title="Career Prospect Item"
        footer={() => (
          <div className="btn-group">
            <Button
              onClick={() => setShowAddItemModal(false)}
              variant="text"
              text="Cancel"
            />
            <Button text="Add Details" />
          </div>
        )}
      >
        <Formik initialValues={{}} onSubmit={() => {}}>
          <Form>
            <AddItem />
          </Form>
        </Formik>
      </Modal>
    </main>
  );
};

export default CareerProspectItems;
