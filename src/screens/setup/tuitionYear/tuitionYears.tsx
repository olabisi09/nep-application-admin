/* eslint-disable no-undef */
import { useState } from "react";

import { useMutation, useQueries } from "@tanstack/react-query";
import {
  Button as AntButton,
  App,
  Dropdown,
  MenuProps,
  Modal,
  Spin,
  Table,
} from "antd";
import { ColumnsType } from "antd/es/table";

import { ReactComponent as Add } from "../../../assets/add.svg";
import { ReactComponent as Ellipsis } from "../../../assets/ellipsis.svg";
import Button from "../../../custom/button/button";
import { usePagination } from "../../../hooks/usePagination";
import {
  deleteTuitionYear,
  getAllLevel,
  getAllPrograms,
  getAllTuitionFee,
  getAllTuitionYear,
} from "../../../requests";
import { sanitizeAndLimitString } from "../../../utils/sanitizeAndLimitString";
import DeleteModalContent from "../../deleteModal/deleteModal";
import styles from "../styles.module.scss";

import AddTuitionYears, { EditTuitionYears } from "./addTuitionYears";

const TuitionYears = () => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [tuitionYear, setTuitionYear] = useState<TuitionYear>(
    {} as TuitionYear
  );
  const [openDelete, setOpenDelete] = useState(false);

  const { currentPage, onChange } = usePagination();
  const { notification } = App.useApp();

  const queryResults = useQueries({
    queries: [
      {
        queryKey: ["getAll-TuitionYear", currentPage],
        queryFn: () => getAllTuitionYear(currentPage, 10),
      },
      {
        queryKey: ["getAll-Level"],
        queryFn: getAllLevel,
      },
      {
        queryKey: ["getAll-Tuition"],
        queryFn: () => getAllTuitionFee(1, 10),
      },
      {
        queryKey: ["getAll-programs"],
        queryFn: () => getAllPrograms(),
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
  } = queryResults[1];

  const {
    data: tuitionFeeData,
    isLoading: isTuitionFeeLoading,
    isError: isTuitionFeeError,
    error: tuitionFeeError,
  } = queryResults[2];

  const {
    data: programsData,
    isLoading: isProgramsLoading,
    isError: isProgramsError,
    error: programsError,
  } = queryResults[3];

  const handleDelete = (data: TuitionYear) => {
    setTuitionYear(data);
    setOpenDelete(true);
  };

  const deleteTuitionHandler = async () => {
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

  const deleteTuitionYearMutation = useMutation({
    mutationFn: deleteTuitionYear,
  });

  const columns: ColumnsType<TuitionYear> = [
    {
      key: "programName",
      title: "Program Name",
      dataIndex: "programName",
    },
    {
      key: "level",
      title: "Level",
      dataIndex: "levelName",
    },
    {
      key: "feeDescription",
      title: "Fee Description",
      dataIndex: "feeDescription",
      render: (_: any, { feeDescription }: any) => {
        const limitedCleanHtml = sanitizeAndLimitString(feeDescription);
        return <div dangerouslySetInnerHTML={{ __html: limitedCleanHtml }} />;
      },
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

  if (
    isTuitionYearLoading ||
    isLevelLoading ||
    isTuitionFeeLoading ||
    isProgramsLoading
  ) {
    return <Spin />;
  }

  if (
    isTuitionYearError ||
    isLevelError ||
    isTuitionFeeError ||
    isProgramsError
  ) {
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
          dataSource={tuitionYears}
          columns={columns}
          pagination={{
            position: ["bottomCenter"],
            current: currentPage,
            total: tuitionYearData?.totalSize,
            onChange: onChange,
            pageSize: 10,
          }}
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
          handleClose={() => setShowAddModal(false)}
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
          handleClose={() => setOpenEdit(false)}
        />
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
          handleSubmit={deleteTuitionHandler}
          title="this item"
        />
      </Modal>
    </main>
  );
};

export default TuitionYears;
