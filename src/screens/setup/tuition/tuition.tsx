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
import { useState } from "react";
import SearchInput from "../../../custom/searchInput/searchInput";
import AddTuition, { EditTuition } from "./addTuition";
import { ReactComponent as Ellipsis } from "../../../assets/ellipsis.svg";
import { useMutation, useQueries } from "@tanstack/react-query";
import {
  deleteTuition,
  getAllPrograms,
  getAllTuitionFee,
} from "../../../requests";
import { ColumnsType } from "antd/es/table";
import DeleteModalContent from "../../deleteModal/deleteModal";
import { sanitizeAndLimitString } from "../../../utils/sanitizeAndLimitString";
import { usePagination } from "../../../hooks/usePagination";

const Tuition = () => {
  const { notification } = App.useApp();
  const [showSearch, setShowSearch] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [showAllFilter, setShowAllFilter] = useState(false);
  const [open, setOpen] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [tuition, setTuition] = useState<Tuition>({} as Tuition);
  const [openDelete, setOpenDelete] = useState(false);

  const { currentPage, onChange } = usePagination();

  const queryResults = useQueries({
    queries: [
      {
        queryKey: ["getAll-tuition"],
        queryFn: () => getAllTuitionFee(),
      },
      {
        queryKey: ["getAll-programs"],
        queryFn: () => getAllPrograms(currentPage, 10),
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

  const handleSearch = (e: any) => {
    setSearchTerm(e.target.value);
  };

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

  if (isTuitionLoading || isProgramsLoading) {
    return <Spin />;
  }

  if (isTuitionError || isProgramsError) {
    return <div>Error: {tuitionError?.message || programsError?.message}</div>;
  }

  const tuitions = tuitionData?.data as Tuition[];

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
          dataSource={tuitions}
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
