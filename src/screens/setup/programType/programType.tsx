import { ReactComponent as Add } from "../../../assets/add.svg";
import { ReactComponent as Search } from "../../../assets/search.svg";
import { ReactComponent as Filter } from "../../../assets/Frame 48095998 (1).svg";
import { Dropdown, Modal, Table, Button as AntButton, MenuProps, Spin, App } from "antd";
import styles from "../styles.module.scss";
import Button from "../../../custom/button/button";
import { useCallback, useState } from "react";
import SearchInput from "../../../custom/searchInput/searchInput";
import AddProgram from "./addProgramType";
import { ReactComponent as Ellipsis } from "../../../assets/ellipsis.svg";
import { deleteProgramType, getProgramTypes } from "./request";
import { useMutation, useQuery } from "@tanstack/react-query";
import { ColumnsType } from "antd/es/table";
import EditProgramType from "./editProgramType";
import DeleteModalContent from "../../deleteModal/deleteModal";

const ProgramSetUp = () => {
  const [showSearch, setShowSearch] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [showAllFilter, setShowAllFilter] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [record, setRecord] = useState<ProgramType>({} as ProgramType);
  const [openDelete, setOpenDelete] = useState(false);

  const { notification } = App.useApp();

  const handleSearch = (e: any) => {
    setSearchTerm(e.target.value);
  };

  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: ["get-program-types"],
    queryFn: getProgramTypes,
  });

  const programTypesData = data?.data ?? [];

  const deleteProgramTypeMutation = useMutation({
    mutationFn: deleteProgramType,
  });

  const deleteProgramTypeHandler = async () => {
    try {
      await deleteProgramTypeMutation.mutateAsync(
        record?.id,
        {
          onSuccess: (data) => {
            notification.success({
              message: "Success",
              description: data?.message,
            });
            refetch();
            setOpenDelete((prevState) => !prevState);
          },
        }
      );
    } catch (error: any) {
      notification.error({
        message: "Error",
        description: error?.response?.data?.message,
      });
    }
  };

  const columns: ColumnsType<ProgramType> = [
    {
      key: "id",
      title: "ID",
      dataIndex: "id",
    },
    {
      key: "name",
      title: "Name",
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
              setOpenEdit(true);
              setRecord(record);
            },
          },
          {
            key: "2",
            label: "Delete",
            onClick: () => {
              setRecord(record);
              setOpenDelete(true);
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

  const handleClose = useCallback(() => {
    setShowAddModal((prevState) => !prevState);
  }, []);

  const handleEditClose = useCallback(() => {
    setOpenEdit((prevState) => !prevState);
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
        <h3>Program Type Setup</h3>
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
          dataSource={programTypesData}
          columns={columns}
          pagination={{ position: ["bottomCenter"] }}
          //rowKey={(record, index) => `${record.id}${index}`}
        />
      </section>

      <Modal
        open={showAddModal}
        onCancel={() => setShowAddModal(false)}
        centered
        title="Program Setup"
        footer={null}
      >
        <AddProgram handleClose={handleClose} />
      </Modal>

      <Modal
        open={openEdit}
        onCancel={() => setOpenEdit(false)}
        centered
        title="Program Type Setup"
        footer={null}
      >
        <EditProgramType handleClose={handleEditClose} record={record} />
      </Modal>

      <Modal
        open={openDelete}
        onCancel={() => setOpenDelete(false)}
        centered
        title="Delete Program Setup"
        footer={null}
      >
        <DeleteModalContent
          isLoading={deleteProgramTypeMutation?.isPending}
          handleCloseModal={() => setOpenDelete(false)}
          handleSubmit={deleteProgramTypeHandler}
          title={record?.name}
        />
      </Modal>
    </main>
  );
};

export default ProgramSetUp;
