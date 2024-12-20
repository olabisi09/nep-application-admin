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
import { ReactComponent as Search } from "../../../assets/search.svg";
import Button from "../../../custom/button/button";
import SearchInput from "../../../custom/searchInput/searchInput";
import { usePagination } from "../../../hooks/usePagination";
import { useSearchTerms } from "../../../hooks/useSearchTerms";
import {
  deleteTuition,
  getAllPrograms,
  getAllTuitionFee,
} from "../../../requests";
import { sanitizeAndLimitString } from "../../../utils/sanitizeAndLimitString";
import DeleteModalContent from "../../deleteModal/deleteModal";
import styles from "../styles.module.scss";

import AddTuition, { EditTuition } from "./addTuition";

const Tuition = () => {
  const { notification } = App.useApp();
  const [showSearch, setShowSearch] = useState(false);

  const [open, setOpen] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [tuition, setTuition] = useState<Tuition>({} as Tuition);
  const [openDelete, setOpenDelete] = useState(false);

  const { currentPage, onChange } = usePagination();
  const { searchTerm, handleSearch } = useSearchTerms();

  const queryResults = useQueries({
    queries: [
      {
        queryKey: ["getAll-tuition", currentPage],
        queryFn: () => getAllTuitionFee(currentPage, 10),
      },
      {
        queryKey: ["getAll-programs"],
        queryFn: () => getAllPrograms(1, 10),
      },
    ],
  });

  const {
    data: tuitionData,
    isLoading: isTuitionLoading,
    isError: isTuitionError,
    error: tuitionError,
    refetch: refetchTuition,
  } = queryResults[0];

  const {
    data: programsData,
    isLoading: isProgramsLoading,
    isError: isProgramsError,
    error: programsError,
  } = queryResults[1];

  const deleteTuitionMutation = useMutation({ mutationFn: deleteTuition });

  const deleteTuitionHandler = async () => {
    try {
      await deleteTuitionMutation.mutateAsync(tuition?.id, {
        onSuccess: (data) => {
          notification.success({
            message: "Success",
            description: data?.message,
          });
          refetchTuition();
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

  const columns: ColumnsType<Tuition> = [
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
      key: "programName",
      title: "Program Name",
      dataIndex: "programName",
    },
    {
      key: "activeStatus",
      title: "Status",
      dataIndex: "activeStatus",
      render: (activeStatus: boolean) => (activeStatus ? "Active" : "Inactive"),
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
              setTuition(record);
              setOpenEdit(true);
            },
          },
          {
            key: "2",
            label: "Delete",
            onClick: () => {
              setTuition(record);
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

  const tuitions = tuitionData?.data as Tuition[];

  const filteredData = tuitions
    ?.filter((item) =>
      item?.programName?.toLowerCase()?.includes(searchTerm.toLowerCase())
    )
    ?.map((item) => ({ ...item, key: item.id }));

  if (isTuitionLoading || isProgramsLoading) {
    return <Spin />;
  }

  if (isTuitionError || isProgramsError) {
    return <div>Error: {tuitionError?.message || programsError?.message}</div>;
  }

  return (
    <main>
      <section className="space-between">
        <h3>Tuition Setup</h3>
        <Button
          onClick={() => setOpen(true)}
          iconBefore={<Add />}
          text="Setup"
        />
      </section>

      <section className={styles.card}>
        <div className={styles.inside}>
          <p>
            Showing 1-{filteredData?.length} of {tuitions?.length}
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
          pagination={{
            position: ["bottomCenter"],
            current: currentPage,
            total: tuitionData?.totalSize,
            onChange: onChange,
            pageSize: 10,
          }}
          rowKey={(record) => record?.id}
          scroll={{ x: true }}
        />
      </section>

      <Modal
        open={open}
        onCancel={() => setOpen(false)}
        centered
        title="Tuition Setup"
        footer={null}
      >
        <AddTuition
          programItem={programsData?.data || []}
          handleClose={() => setOpen(false)}
        />
      </Modal>

      <Modal
        open={openEdit}
        onCancel={() => setOpenEdit(false)}
        centered
        title="Edit Tuition Setup"
        footer={null}
      >
        <EditTuition
          programItem={programsData?.data || []}
          item={tuition}
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
          isLoading={deleteTuitionMutation?.isPending}
          handleCloseModal={() => setOpenDelete(false)}
          handleSubmit={deleteTuitionHandler}
          title={"this item"}
        />
      </Modal>
    </main>
  );
};

export default Tuition;
