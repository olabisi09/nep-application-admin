import { ReactComponent as Add } from "../../../assets/add.svg";
import { ReactComponent as Search } from "../../../assets/search.svg";
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
import AddProgram from "./addProgram";
import { ReactComponent as Ellipsis } from "../../../assets/ellipsis.svg";
import { useMutation, useQuery } from "@tanstack/react-query";
import { ColumnsType } from "antd/es/table";
import EditProgramType from "./editProgram";
import DeleteModalContent from "../../deleteModal/deleteModal";
import { getAllProgram } from "./request";
import { deleteProgram } from "./request";

const ProgramSetUp = () => {
  const [showSearch, setShowSearch] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [showAddModal, setShowAddModal] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [record, setRecord] = useState<ProgramData>({} as ProgramData);
  const [openDelete, setOpenDelete] = useState(false);

  const { notification } = App.useApp();

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: ["get-all-program"],
    queryFn: getAllProgram,
  });

  const programTypesData = data?.data ?? [];

  const filteredData = programTypesData?.filter(
    (item) =>
      item?.programTypeName
        ?.toLowerCase()
        ?.includes(searchTerm.toLowerCase()) ||
      item?.program?.toLowerCase()?.includes(searchTerm.toLowerCase())
  );

  const deleteProgramMutation = useMutation({
    mutationFn: deleteProgram,
  });

  const deleteProgramTypeHandler = async () => {
    try {
      await deleteProgramMutation.mutateAsync(record?.id, {
        onSuccess: (data) => {
          notification.success({
            message: "Success",
            description: data?.message,
          });
          refetch();
          setOpenDelete((prevState) => !prevState);
        },
      });
    } catch (error: any) {
      notification.error({
        message: "Error",
        description: error?.response?.data?.message,
      });
    }
  };

  const columns: ColumnsType<ProgramData> = [
    {
      key: "programType",
      title: "Program Type",
      dataIndex: "programTypeName",
    },
    {
      key: "department",
      title: "Department",
      dataIndex: "program",
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
        <h3>Program Setup</h3>
        <Button
          onClick={() => setShowAddModal(true)}
          iconBefore={<Add />}
          text="Setup"
        />
      </section>

      <section className={styles.card}>
        <div className={styles.inside}>
          <p>
            Showing 1-{filteredData?.length} of {programTypesData?.length}
          </p>

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

            {/* {!showAllFilter && (
              <Filter
                onClick={() =>
                  setShowAllFilter((showAllFilter) => !showAllFilter)
                }
              />
            )} */}
          </div>
        </div>

        <Table
          dataSource={filteredData}
          columns={columns}
          pagination={{ position: ["bottomCenter"] }}
          //rowKey={(record, index) => `${record.id}${index}`}
        />
      </section>

      <Modal
        open={showAddModal}
        onCancel={() => setShowAddModal(false)}
        centered
        title="Create Program"
        footer={null}
      >
        <AddProgram handleClose={handleClose} />
      </Modal>

      <Modal
        open={openEdit}
        onCancel={() => setOpenEdit(false)}
        centered
        title="Edit Program"
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
          isLoading={deleteProgramMutation?.isPending}
          handleCloseModal={() => setOpenDelete(false)}
          handleSubmit={deleteProgramTypeHandler}
          title="Program"
        />
      </Modal>
    </main>
  );
};

export default ProgramSetUp;
