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
  App,
} from "antd";
import styles from "../styles.module.scss";
import Button from "../../../custom/button/button";
import { useCallback, useState } from "react";
import SearchInput from "../../../custom/searchInput/searchInput";
import AddModeOfStudy from "./addModeOfStudy";
import { ReactComponent as Ellipsis } from "../../../assets/ellipsis.svg";
import { useMutation, useQuery } from "@tanstack/react-query";
import { deleteModeOfStudy, getAllModeOfStudy } from "../../../requests";
import { ColumnsType } from "antd/es/table";

const ModeOfStudy = () => {
  const [showSearch, setShowSearch] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [showAllFilter, setShowAllFilter] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [item, setItem] = useState<ModeOfStudy>({} as ModeOfStudy);

  const { notification } = App.useApp();

  const handleSearch = (e: any) => {
    setSearchTerm(e.target.value);
  };

  const { data, isLoading, refetch } = useQuery({
    queryKey: ["get-mode-of-study"],
    queryFn: getAllModeOfStudy,
  });

  const modeOfStudyData = data?.data ?? [];

  const deleteModeOfStudyMutation = useMutation({
    mutationFn: deleteModeOfStudy,
  });

  const handleDeleteModeOfStudy = async (id: number) => {
    try {
      await deleteModeOfStudyMutation.mutateAsync(id, {
        onSuccess: (data) => {
          notification.success({
            message: "Success",
            description: data?.message,
          });
          refetch();
        },
      });
    } catch (error: any) {
      notification.error({
        message: "Error",
        description: error?.response?.data?.message,
      });
    }
  };

  const columns: ColumnsType<ModeOfStudy> = [
    {
      key: "id",
      title: "ID",
      dataIndex: "id",
    },
    {
      key: "name",
      title: "Mode of Study",
      dataIndex: "name",
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
              setItem(record);
              setOpenEdit(true);
            },
          },
          {
            key: "2",
            label: "Delete",
            onClick: () => handleDeleteModeOfStudy(record?.id),
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

  const handleCloseModal = useCallback(() => {
    setOpenEdit(false);
    setShowAddModal(false);
  }, []);

  const handleOpenModal = () => {
    setItem({ ...item });
    setShowAddModal(true);
  };

  if (isLoading) {
    return <Spin size="large" />;
  }

  return (
    <main>
      <section className="space-between">
        <h3>Mode of Study Setup</h3>
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
          dataSource={modeOfStudyData}
          columns={columns}
          pagination={{ position: ["bottomCenter"] }}
          //rowKey={(record, index) => `${record.id}${index}`}
        />
      </section>

      <Modal
        open={showAddModal}
        onCancel={() => setShowAddModal(false)}
        centered
        title="Mode of Study Setup"
        footer={null}
      >
        <AddModeOfStudy handleClose={handleCloseModal} />
      </Modal>

      <Modal
        open={openEdit}
        onCancel={() => setOpenEdit(false)}
        centered
        title="Mode of Study Setup"
        footer={null}
      >
        <AddModeOfStudy handleClose={handleCloseModal} record={item} />
      </Modal>
    </main>
  );
};

export default ModeOfStudy;
