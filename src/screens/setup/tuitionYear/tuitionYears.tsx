import { ReactComponent as Add } from "../../../assets/add.svg";
import { ReactComponent as Search } from "../../../assets/search.svg";
import { ReactComponent as Filter } from "../../../assets/Frame 48095998 (1).svg";
import { Dropdown, Modal, Table, Button as AntButton, MenuProps, Spin, App } from "antd";
import { Form, Formik } from "formik";
import styles from "../styles.module.scss";
import Button from "../../../custom/button/button";
import { useState } from "react";
import SearchInput from "../../../custom/searchInput/searchInput";
import AddTuitionYears, { EditTuitionYears } from "./addTuitionYears";
import { ReactComponent as Ellipsis } from "../../../assets/ellipsis.svg";
import { useMutation, useQueries } from "@tanstack/react-query";
import { deleteTuitionYear, getAllLevel, getAllPrograms, getAllTuitionFee, getAllTuitionYear } from "../../../requests";
import DeleteModalContent from "../../deleteModal/deleteModal";
import { ColumnsType } from "antd/es/table";

const TuitionYears = () => {
  const { notification } = App.useApp();
  const [showSearch, setShowSearch] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [showAllFilter, setShowAllFilter] = useState(false);
  const [open, setOpen] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [tuitionYear, setTuitionYear] = useState<TuitionYear>({} as TuitionYear)
  const [openDelete, setOpenDelete] = useState(false);

  // Merged useQueries
  const queryResults = useQueries({
    queries: [
      {
        queryKey: ["getAll-TuitionYear"],
        queryFn: getAllTuitionYear,
      },
      {
        queryKey: ["getAll-Level"],
        queryFn: getAllLevel,
      },
      {
        queryKey: ["getAll-Tuition"],
        queryFn: getAllTuitionFee,
      },
      {
        queryKey: ["getAll-programs"],
        queryFn: getAllPrograms,
      },
    ],
  });

  const {
    data: tuitionYearData,
    isLoading: isTuitionYearLoading,
    isError: isTuitionYearError,
    error: tuitionYearError,
    refetch: refetchTuitionYear,
  } = queryResults[0];

  const {
    data: levelData,
    isLoading: isLevelLoading,
    isError: isLevelError,
    error: levelError,
    refetch: refetchLevel,
  } = queryResults[1];

  const {
    data: tuitionFeeData,
    isLoading: isTuitionFeeLoading,
    isError: isTuitionFeeError,
    error: tuitionFeeError,
    refetch: refetchTuitionFee,
  } = queryResults[2];

  const {
    data: programsData,
    isLoading: isProgramsLoading,
    isError: isProgramsError,
    error: programsError,
    refetch: refetchPrograms,
  } = queryResults[3];

  const handleSearch = (e: any) => {
    setSearchTerm(e.target.value);
  };

  const handleDelete = (data: TuitionYear) => {
    setTuitionYear(data);
    setOpenDelete(true);
  };

  const DeleteTuitionHandler = async () => {
    try {
      await deleteTuitionYearMutation.mutateAsync(tuitionYear?.id, {
        onSuccess: (data) => {
          notification.success({
            message: "Success",
            description: data?.message,
          });
          refetchTuitionYear();
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

  const deleteTuitionYearMutation = useMutation({ mutationFn: deleteTuitionYear });


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

  const columns: ColumnsType<TuitionYear> = [
    {
      key: "id",
      title: "ID",
      dataIndex: "id",
    },
    {
      key: "tuitionId",
      title: "Tuition Id",
      dataIndex: "tuitionId",
    },
    {
      key: "readmoreId",
      title: "Read More Id",
      dataIndex: "readmoreId",
    },
    {
      key: "feeDescription",
      title: "Fee Description",
      dataIndex: "feeDescription",
    },
    {
      key: "programName",
      title: "Program Name",
      dataIndex: "programName",
    },
    {
      key: "isActive",
      title: "Status",
      dataIndex: "isActive",
      render: (isActive: boolean) => (isActive ? "Active" : "Inactive"),
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
              setTuitionYear(record);
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

  const tuitionYears = tuitionYearData?.data as TuitionYear[];

  if (isTuitionYearLoading || isLevelLoading || isTuitionFeeLoading || isProgramsLoading) {
    return <Spin />;
  }

  if (isTuitionYearError || isLevelError || isTuitionFeeError || isProgramsError) {
    const errorMessage = 
      tuitionYearError?.message ||
      levelError?.message ||
      tuitionFeeError?.message ||
      programsError?.message;

    return <div>Error: {errorMessage}</div>;
  }

  return (
    <main>
      <section className="space-between">
        <h3>Tuition Years Setup</h3>
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
          dataSource={tuitionYears}
          columns={columns}
          pagination={{ position: ["bottomCenter"] }}
        />
      </section>

      <Modal
        open={showAddModal}
        onCancel={() => setShowAddModal(false)}
        centered
        title="Tuition Years Setup"
        footer={null}
      >
       <AddTuitionYears
        programItem={programsData?.data || []} 
        levelItem={levelData?.data || []}
        tuitionFeeItem={tuitionFeeData?.data || []}  
        handleClose={() => setOpen(false)}
      />
      </Modal>

      <Modal
        open={openEdit}
        onCancel={() => setOpenEdit(false)}
        centered
        title="Edit Tuition Years Setup"
        footer={null}
      >
        <EditTuitionYears 
          item={tuitionYear} 
          programItem={programsData?.data || []} 
          levelItem={levelData?.data || []}
          tuitionFeeItem={tuitionFeeData?.data || []} 
          handleClose={() => setOpenEdit(false)}/>
      </Modal>

      <Modal
        open={openDelete}
        onCancel={() => setOpenDelete(false)}
        centered
        title="Delete Tuition Setup"
        footer={null}
      >
        <DeleteModalContent
          isLoading={deleteTuitionYearMutation?.isPending}
          handleCloseModal={() => setOpenDelete(false)}
          handleSubmit={DeleteTuitionHandler}
          title={tuitionYear?.feeDescription}
        />
      </Modal>
    </main>
  );
};

export default TuitionYears;
