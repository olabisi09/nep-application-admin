import { ReactComponent as Add } from "../../../assets/add.svg";
import { ReactComponent as Search } from "../../../assets/search.svg";
import {
  Dropdown,
  Modal,
  Table,
  Button as AntButton,
  MenuProps,
  App,
  Spin,
} from "antd";
import styles from "../styles.module.scss";
import Button from "../../../custom/button/button";
import { useState } from "react";
import SearchInput from "../../../custom/searchInput/searchInput";
import AddCurriculum from "./addCurriculum";
import { ReactComponent as Ellipsis } from "../../../assets/ellipsis.svg";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { deleteCurriculum, getAllCurriculum } from "../../../requests";
import DeleteModalContent from "../../deleteModal/deleteModal";
import { ColumnsType } from "antd/es/table";
import { sanitizeAndLimitString } from "../../../utils/sanitizeAndLimitString";
import { usePagination } from "../../../hooks/usePagination";

const CurriculumSetup = () => {
  const [showSearch, setShowSearch] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [showAddModal, setShowAddModal] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [indexData, setIndexData] = useState({} as Curriculum);
  const [openDelete, setOpenDelete] = useState(false);

  const { currentPage, onChange } = usePagination();

  const { notification } = App.useApp();
  const queryClient = useQueryClient();

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleEdit = (data: Curriculum) => {
    setIndexData(data);
    setOpenEdit(true);
  };

  const handleDelete = (data: Curriculum) => {
    setIndexData(data);
    setOpenDelete(true);
  };

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["get-curriculum"],
    queryFn: () => getAllCurriculum(currentPage, 10),
  });

  const curriculumData = data?.data as Curriculum[];

  const filteredData = curriculumData?.filter((item) =>
    item?.programName?.toLowerCase()?.includes(searchTerm.toLowerCase())
  );

  const items = (record: Curriculum): MenuProps["items"] => [
    {
      key: "1",
      label: "Edit",
      onClick: () => handleEdit(record),
    },
    {
      key: "2",
      label: "Delete",
      onClick: () => handleDelete(record),
    },
  ];

  const columns: ColumnsType<Curriculum> = [
    {
      key: "programName",
      title: "Program Name",
      dataIndex: "programName",
    },
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
      key: "levelName",
      title: "Level Name ",
      dataIndex: "levelName",
    },
    {
      key: "activeStatus",
      title: "Status",
      dataIndex: "activeStatus",
      render: (text: boolean) => (text ? "Active" : "Inactive"),
    },
    {
      key: "action",
      title: "",
      render: (record: Curriculum) => (
        <Dropdown menu={{ items: items(record) }} trigger={["click"]}>
          <AntButton type="text" icon={<Ellipsis />} />
        </Dropdown>
      ),
    },
  ];

  const deleteCurriculumMutation = useMutation({
    mutationFn: deleteCurriculum,
  });

  const deleteCurriculumHandler = async () => {
    try {
      await deleteCurriculumMutation.mutateAsync(indexData.id, {
        onSuccess: (data) => {
          notification.success({
            message: "Success",
            description: data?.message,
          });

          queryClient.refetchQueries({
            queryKey: ["get-curriculum"],
          });

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

  const handleModalOpen = () => {
    setIndexData({} as Curriculum);
    setShowAddModal((prevState) => !prevState);
  };

  if (isLoading) {
    return <Spin />;
  }

  if (isError) {
    return <div>Error: {error?.message}</div>;
  }

  return (
    <main>
      <section className="space-between">
        <h3>Curriculum Setup</h3>
        <Button onClick={handleModalOpen} iconBefore={<Add />} text="Setup" />
      </section>

      <section className={styles.card}>
        <div className={styles.inside}>
          <p>
            Showing 1-{filteredData?.length} of {curriculumData?.length}
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
        title="Curriculum Setup"
        footer={null}
      >
        <AddCurriculum handleClose={() => setShowAddModal(false)} />
      </Modal>

      <Modal
        open={openEdit}
        onCancel={() => setOpenEdit(false)}
        centered
        title="Curriculum Setup"
        footer={null}
      >
        <AddCurriculum
          handleClose={() => setOpenEdit(false)}
          details={indexData}
        />
      </Modal>

      <Modal
        open={openDelete}
        onCancel={() => setOpenDelete(false)}
        centered
        title="Delete Curriculum Setup"
        footer={null}
      >
        <DeleteModalContent
          isLoading={deleteCurriculumMutation?.isPending}
          handleCloseModal={() => setOpenDelete(false)}
          handleSubmit={deleteCurriculumHandler}
          title={indexData?.programName}
        />
      </Modal>
    </main>
  );
};

export default CurriculumSetup;
