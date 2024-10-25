import { ReactComponent as Add } from "../../../../assets/add.svg";
import { ReactComponent as Search } from "../../../../assets/search.svg";
import { ReactComponent as Filter } from "../../../../assets/Frame 48095998 (1).svg";
import {
  Dropdown,
  Modal,
  Table,
  Button as AntButton,
  MenuProps,
  App,
  Spin,
} from "antd";
import styles from "../../styles.module.scss";

import { useState } from "react";

import { ReactComponent as Ellipsis } from "../../../../assets/ellipsis.svg";
import { useMutation, useQuery } from "@tanstack/react-query";
import { ColumnsType } from "antd/es/table";

import { Button, SearchInput } from "../../../../custom";
import { deleteReligion, getAllReligion } from "../../../../requests";
import { AddReligion, EditReligion } from "./addReligion";
import DeleteModalContent from "../../../deleteModal/deleteModal";

const ReligionSetup = () => {
  const [showSearch, setShowSearch] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [showAllFilter, setShowAllFilter] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [religion, setReligion] = useState<Religion>({} as Religion);
  const [openDelete, setOpenDelete] = useState(false);
  const { notification } = App.useApp();

  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: ["get-religion"],
    queryFn: getAllReligion,
  });

  const deleteReligionMutation = useMutation({
    mutationFn: deleteReligion,
  });

  const handleDelete = (data: Religion) => {
    setReligion(data);
    setOpenDelete(true);
  };

  const DeleteReligionHandler = async () => {
    try {
      await deleteReligionMutation.mutateAsync(religion?.id, {
        onSuccess: (data) => {
          notification.success({
            message: "Success",
            description: data?.message,
          });
          refetch();
          setOpenDelete(false);
        },
      });
    } catch (error: any) {
      notification.error({
        message: "Error",
        description: error?.response?.data?.message,
      });
    }
  };

  const handleSearch = (e: any) => {
    setSearchTerm(e.target.value);
  };

  const columns: ColumnsType<Religion> = [
    // {
    //   key: "id",
    //   title: "ID",
    //   dataIndex: "id",
    // },
    {
      key: "name",
      title: "Name",
      dataIndex: "name",
    },
    {
      key: "isActive",
      title: "Status",
      dataIndex: "isActive",
      render: (_, { isActive }) => (isActive ? "Active" : "Inactive"),
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
              setReligion(record);
              setOpenEdit(true);
            },
          },
          {
            key: "2",
            label: (
              <button
                style={{ border: "0rem", background: "none" }}
                onClick={() => handleDelete(record)}>
                Delete
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

  const religionData = data?.data;

  if (isLoading) {
    return <Spin />;
  }

  if (isError) {
    return <div>Error: {error?.message}</div>;
  }

  return (
    <main>
      <section className="space-between">
        <h3>Religion Setup</h3>
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
          dataSource={religionData}
          columns={columns}
          pagination={{ position: ["bottomCenter"] }}
          rowKey={(record, index) => `${record.id}${index}`}
        />
      </section>

      <Modal
        open={showAddModal}
        onCancel={() => setShowAddModal(false)}
        centered
        title="Create Religion Setup"
        footer={null}>
        <AddReligion handleClose={() => setShowAddModal(false)} />
      </Modal>

      {religion?.id && openEdit && (
        <Modal
          open={openEdit}
          onCancel={() => setOpenEdit(false)}
          centered
          title="Edit Religion Setup"
          footer={null}>
          <EditReligion
            religion={religion}
            handleClose={() => setOpenEdit(false)}
          />
        </Modal>
      )}

      {religion?.id && openDelete && (
        <Modal
          open={openDelete}
          onCancel={() => setOpenDelete(false)}
          centered
          title="Delete Religion Setup"
          footer={null}>
          <DeleteModalContent
            isLoading={deleteReligionMutation?.isPending}
            handleCloseModal={() => setOpenDelete(false)}
            handleSubmit={DeleteReligionHandler}
            title={religion?.name}
            isActive={false}
          />
        </Modal>
      )}
    </main>
  );
};

export default ReligionSetup;
