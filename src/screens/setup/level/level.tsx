import { ReactComponent as Add } from "../../../assets/add.svg";
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
import { useState } from "react";
import AddLevel, { EditLevel } from "./addLevel";
import { ReactComponent as Ellipsis } from "../../../assets/ellipsis.svg";
import { useMutation, useQuery } from "@tanstack/react-query";
import { deleteLevel, getAllLevel } from "../../../requests";
import { ColumnsType } from "antd/es/table";
import DeleteModalContent from "../../deleteModal/deleteModal";

const Level = () => {
  const [open, setOpen] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [level, setLevel] = useState<Level>({} as Level);
  const [openDelete, setOpenDelete] = useState(false);

  const { notification } = App.useApp();

  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: ["getAll-level"],
    queryFn: getAllLevel,
  });

  const handleDelete = (data: Level) => {
    setLevel(data);
    setOpenDelete(true);
  };

  const deleteLevelMutation = useMutation({ mutationFn: deleteLevel });

  const DeleteLevelHandler = async () => {
    try {
      await deleteLevelMutation.mutateAsync(level?.id, {
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

  const columns: ColumnsType<Level> = [
    {
      key: "levelName",
      title: "Level Name",
      dataIndex: "levelName",
    },
    {
      key: "activeStatus",
      title: "Status",
      dataIndex: "isActive",
      render: (isActive: boolean) => (isActive ? "Active" : "Not Active"),
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
              setLevel(record);
              setOpenEdit(true);
            },
          },
          {
            key: "2",
            label: "Delete",
            onClick: async () => {
              handleDelete(record);
            },
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

  const levelData = data?.data as Level[];

  if (isLoading) {
    return <Spin />;
  }
  
  if (isError) {
    return <div>{error?.message}</div>;
  }

  return (
    <main>
      <section className="space-between">
        <h3>Level Setup</h3>
        <Button
          onClick={() => setOpen(true)}
          iconBefore={<Add />}
          text="Setup"
        />
      </section>

      <section className={styles.card}>
        {/* <div className={styles.inside}>
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
        </div> */}

        <Table
          dataSource={levelData}
          columns={columns}
          pagination={{ position: ["bottomCenter"] }}
          rowKey={(record) => record?.id}
          scroll={{ x: true }}
        />
      </section>

      <Modal
        open={open}
        onCancel={() => setOpen(false)}
        centered
        title="Level Setup"
        footer={null}
      >
        <AddLevel handleClose={() => setOpen(false)} />
      </Modal>

      <Modal
        open={openEdit}
        onCancel={() => setOpenEdit(false)}
        centered
        title="Edit Level Setup"
        footer={null}
      >
        <EditLevel item={level} handleClose={() => setOpenEdit(false)} />
      </Modal>

      <Modal
        open={openDelete}
        onCancel={() => setOpenDelete(false)}
        centered
        title="Delete Level Setup"
        footer={null}
      >
        <DeleteModalContent
          isLoading={deleteLevelMutation?.isPending}
          handleCloseModal={() => setOpenDelete(false)}
          handleSubmit={DeleteLevelHandler}
          title={level?.levelName}
        />
      </Modal>
    </main>
  );
};

export default Level;
