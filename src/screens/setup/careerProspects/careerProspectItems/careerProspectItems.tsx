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
import { useCallback, useState } from "react";
import { ReactComponent as Ellipsis } from "../../../../assets/ellipsis.svg";
import { useQuery } from "@tanstack/react-query";
import { ColumnsType } from "antd/es/table";
import { CreateCareerProspectItem, EditCareerProspectItem } from "./addItem";
import { Button, SearchInput } from "../../../../custom";
import { useParams } from "react-router-dom";
import { getCareerProspectItemByCareerProspectId } from "../request";
import { sanitizeAndLimitString } from "../../../../utils/sanitizeAndLimitString";

const CareerProspectItems = () => {
  const [showSearch, setShowSearch] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [showAllFilter, setShowAllFilter] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [careerProspectItems, setCareerProspectItems] =
    useState<CareerProspectItem>({} as CareerProspectItem);

  const { id } = useParams();
  const careerProspectId = id ?? "";

  const handleSearch = (e: any) => {
    setSearchTerm(e.target.value);
  };

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["get-career-prospect-id"],
    queryFn: () => getCareerProspectItemByCareerProspectId(careerProspectId),
    enabled: !!careerProspectId,
  });

  const careerProspectItemData = data?.data as CareerProspectItem[];

  const columns: ColumnsType<CareerProspectItem> = [
    // {
    //   key: "id",
    //   title: "ID",
    //   dataIndex: "id",
    // },
    {
      key: "title",
      title: "Title",
      dataIndex: "title",
    },
    {
      key: "description",
      title: "Description",
      dataIndex: "description",
      render: (_, { description }) => {
        const limitedCleanHtml = sanitizeAndLimitString(description);
        return <div dangerouslySetInnerHTML={{ __html: limitedCleanHtml }} />;
      },
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
            label: "Edit",
            onClick: () => {
              setCareerProspectItems(record);
              setOpenEdit(true);
            },
          },
          {
            key: "2",
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

  const handleCloseEditModal = useCallback(() => {
    setOpenEdit(false);
  }, []);

  const handleCloseCreateModal = useCallback(() => {
    setShowAddModal(false);
  }, []);

  if (isLoading) {
    return <Spin size="large" />;
  }

  if (isError) {
    return <div>Error: {error?.message}</div>;
  }

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
          dataSource={careerProspectItemData}
          columns={columns}
          pagination={{ position: ["bottomCenter"] }}
          //rowKey={(record, index) => `${record.id}${index}`}
        />
      </section>

      <Modal
        open={openEdit}
        onCancel={() => setOpenEdit(false)}
        centered
        title="Career Prospects Item Setup"
        footer={null}
      >
        <EditCareerProspectItem
          handleClose={handleCloseEditModal}
          item={careerProspectItems}
        />
      </Modal>

      <Modal
        open={showAddModal}
        onCancel={() => setShowAddModal(false)}
        centered
        title="Career Prospect Item"
        footer={null}
      >
        <CreateCareerProspectItem handleClose={handleCloseCreateModal} />
      </Modal>
    </main>
  );
};

export default CareerProspectItems;
