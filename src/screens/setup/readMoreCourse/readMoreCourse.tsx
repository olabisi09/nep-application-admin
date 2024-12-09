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
import {
  AddReadMoreCourseOverview,
  EditReadMoreCourseOverview,
} from "./addReadMoreCourse";
import { ReactComponent as Ellipsis } from "../../../assets/ellipsis.svg";
import { useMutation, useQuery } from "@tanstack/react-query";
import { getAllCourseOverview } from "./request";
import { ColumnsType } from "antd/es/table";
import { sanitizeAndLimitString } from "../../../utils/sanitizeAndLimitString";
import DeleteModalContent from "../../deleteModal/deleteModal";
import { deleteReadMoreOverView } from "../../../requests";
import { usePagination } from "../../../hooks/usePagination";

const ReadMoreCourse = () => {
  const [showSearch, setShowSearch] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  // const [showAllFilter, setShowAllFilter] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [courseOverview, setCourseOverview] = useState<ReadMoreOverview>(
    {} as ReadMoreOverview
  );
  const [openDelete, setOpenDelete] = useState(false);

  const { currentPage, onChange } = usePagination();

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: ["get-all-course-overview"],
    queryFn: () => getAllCourseOverview(currentPage, 10),
  });

  const courseOverviewData = data?.data ?? [];

  const filteredData = courseOverviewData?.filter((item) =>
    item?.programName?.toLowerCase()?.includes(searchTerm.toLowerCase())
  );

  const deleteReadMoreOverViewMutation = useMutation({
    mutationFn: deleteReadMoreOverView,
  });

  const deleteReadMoreOverViewHandler = async () => {
    try {
      await deleteReadMoreOverViewMutation.mutateAsync(courseOverview?.id, {
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

  const columns: ColumnsType<ReadMoreOverview> = [
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
              setCourseOverview({ ...courseOverview, ...record });
              setOpenEdit((prevState) => !prevState);
            },
          },
          {
            key: "2",
            label: "Delete",
            onClick: () => {
              setCourseOverview(record);
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
        <h3>Read More - Course Overview Setup</h3>
        <Button
          onClick={handleOpenModal}
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
        title="Create Read More - Course Overview Setup"
        footer={null}
      >
        <AddReadMoreCourseOverview handleClose={handleCloseModal} />
      </Modal>

      <Modal
        open={openEdit}
        onCancel={() => setOpenEdit((prevState) => !prevState)}
        centered
        title="Edit Read More - Course Overview Setup"
        footer={null}
      >
        <EditReadMoreCourseOverview
          handleClose={handleCloseModal}
          record={courseOverview}
        />
      </Modal>

      <Modal
        open={openDelete}
        onCancel={() => setOpenDelete(false)}
        centered
        title="Delete Application Fee Setup"
        footer={null}
      >
        <DeleteModalContent
          isLoading={deleteReadMoreOverViewMutation?.isPending}
          handleCloseModal={() => setOpenDelete(false)}
          handleSubmit={deleteReadMoreOverViewHandler}
          title={courseOverview?.programName + " Overview"}
          isActive={false}
        />
      </Modal>
    </main>
  );
};

export default ReadMoreCourse;
