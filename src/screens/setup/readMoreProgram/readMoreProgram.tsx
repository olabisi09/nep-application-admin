import { ReactComponent as Add } from "../../../assets/add.svg";
import { ReactComponent as Search } from "../../../assets/search.svg";
// import { ReactComponent as Filter } from "../../../assets/Frame 48095998 (1).svg";
import {
  Dropdown,
  Modal,
  Table,
  Button as AntButton,
  MenuProps,
  Spin,
  notification,
} from "antd";
import styles from "../styles.module.scss";
import Button from "../../../custom/button/button";
import { useCallback, useState } from "react";
import SearchInput from "../../../custom/searchInput/searchInput";
import { ReactComponent as Ellipsis } from "../../../assets/ellipsis.svg";
import { useMutation, useQuery } from "@tanstack/react-query";
import { getReadMoreProgrammes } from "./request";
import { ColumnsType } from "antd/es/table";
import { sanitizeAndLimitString } from "../../../utils/sanitizeAndLimitString";
import {
  AddReadMoreProgramme,
  EditReadMoreProgramme,
} from "./addReadMoreProgram";
import { deleteReadMoreProgram } from "../../../requests";
import DeleteModalContent from "../../deleteModal/deleteModal";
import { usePagination } from "../../../hooks/usePagination";

const ReadMoreProgram = () => {
  const [showSearch, setShowSearch] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  // const [showAllFilter, setShowAllFilter] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [programme, setProgramme] = useState<ReadMoreProgramme>(
    {} as ReadMoreProgramme
  );
  const [openDelete, setOpenDelete] = useState(false);

  const { currentPage, onChange } = usePagination();

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: ["get-read-more-programmes"],
    queryFn: () => getReadMoreProgrammes(currentPage, 10),
  });

  const programData = data?.data ?? [];

  const filteredData = programData?.filter((item) =>
    item?.programName?.toLowerCase()?.includes(searchTerm.toLowerCase())
  );

  const deleteReadProgramViewMutation = useMutation({
    mutationFn: deleteReadMoreProgram,
  });

  const deleteReadMoreProgramHandler = async () => {
    try {
      await deleteReadProgramViewMutation.mutateAsync(programme?.id, {
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

  const columns: ColumnsType<ReadMoreProgramme> = [
    {
      key: "programName",
      title: "Program Name",
      dataIndex: "programName",
    },
    {
      key: "description",
      title: "Description",
      dataIndex: "description",
      render: (_: any, { description }: any) => {
        const limitedCleanHtml = sanitizeAndLimitString(description);
        return <div dangerouslySetInnerHTML={{ __html: limitedCleanHtml }} />;
      },
    },
    {
      key: "duration",
      title: "Duration",
      dataIndex: "duration",
    },
    {
      key: "sessionIntake",
      title: "Session Intake",
      dataIndex: "sessionIntake",
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
              setProgramme(record);
              setOpenEdit(true);
            },
          },
          {
            key: "2",
            label: "Delete",
            onClick: () => {
              setProgramme(record);
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

  const handleCloseModal = useCallback(() => {
    setShowAddModal(false);
    setOpenEdit(false);
  }, []);

  const handleOpenModal = () => {
    setShowAddModal((prevState) => !prevState);
  };

  if (isLoading) {
    return <Spin size="large" />;
  }

  if (isError) {
    return <div>Error: {error?.message}</div>;
  }

  return (
    <main>
      <section className="space-between">
        <h3>Read More - Program Setup</h3>
        <Button onClick={handleOpenModal} iconBefore={<Add />} text="Setup" />
      </section>

      <section className={styles.card}>
        <div className={styles.inside}>
          <p>
            Showing 1-{filteredData?.length} of {programData?.length}
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
            total: data?.totalSize,
            onChange: onChange,
            pageSize: 10,
          }}
        />
      </section>

      <Modal
        open={showAddModal}
        onCancel={() => setShowAddModal(false)}
        centered
        title="Read More - Program Setup"
        footer={null}
      >
        <AddReadMoreProgramme handleClose={handleCloseModal} />
      </Modal>

      <Modal
        open={openEdit}
        onCancel={() => setOpenEdit(false)}
        centered
        title="Read More - Program Setup"
        footer={null}
      >
        <EditReadMoreProgramme
          handleClose={handleCloseModal}
          record={programme}
        />
      </Modal>

      <Modal
        open={openDelete}
        onCancel={() => setOpenDelete(false)}
        centered
        title="Delete Read More Program Setup"
        footer={null}
      >
        <DeleteModalContent
          isLoading={deleteReadProgramViewMutation?.isPending}
          handleCloseModal={() => setOpenDelete(false)}
          handleSubmit={deleteReadMoreProgramHandler}
          title="this read more program"
        />
      </Modal>
    </main>
  );
};

export default ReadMoreProgram;
