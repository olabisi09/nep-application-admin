/* eslint-disable no-undef */
import { useState } from "react";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
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
// import { ReactComponent as Filter } from "../../../assets/Frame 48095998 (1).svg";
import Button from "../../../custom/button/button";
import SearchInput from "../../../custom/searchInput/searchInput";
import { usePagination } from "../../../hooks/usePagination";
import { useSearchTerms } from "../../../hooks/useSearchTerms";
import { deleteFaculty, getFaculty } from "../../../requests";
import DeleteModalContent from "../../deleteModal/deleteModal";
import styles from "../styles.module.scss";

import AddFaculty from "./addFaculty";
import EditFaculty from "./editFaculty";

const FacultySetup = () => {
  const [showSearch, setShowSearch] = useState(false);
  // const [showAllFilter, setShowAllFilter] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [indexData, setIndexData] = useState({} as FacultyResponse);
  const [openDelete, setOpenDelete] = useState(false);

  const { currentPage, onChange } = usePagination();
  const { searchTerm, handleSearch } = useSearchTerms();

  const { notification } = App.useApp();

  const queryClient = useQueryClient();

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["get-faculty", currentPage],
    queryFn: () => getFaculty(currentPage, 10),
  });

  const facultyData = data?.data ?? [];

  const filteredData = facultyData
    ?.filter((faculty) =>
      faculty?.name?.toLowerCase()?.includes(searchTerm.toLowerCase())
    )
    ?.map((item) => ({ ...item, key: item.id }));

  const handleEdit = (data: FacultyResponse) => {
    setIndexData(data);
    setOpenEdit(true);
  };

  const handleDelete = (data: FacultyResponse) => {
    if (data && data?.id) {
      setIndexData(data);
      setOpenDelete(true);
    } else {
      notification.error({
        message: "Error",
        description: "Invalid Faculty ID",
      });
    }
  };

  const items = (record: FacultyResponse): MenuProps["items"] => [
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

  const columns: ColumnsType<FacultyResponse> = [
    {
      key: "name",
      title: "Faculty Name",
      dataIndex: "name",
    },
    {
      key: "categoryCode",
      title: "Faculty Code ",
      dataIndex: "categoryCode",
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
      render: (record: FacultyResponse) => (
        <Dropdown menu={{ items: items(record) }} trigger={["click"]}>
          <AntButton type="text" icon={<Ellipsis />} />
        </Dropdown>
      ),
    },
  ];

  const deleteFacultyMutation = useMutation({ mutationFn: deleteFaculty });

  const deleteFacultyHandler = async () => {
    if (indexData.id) {
      try {
        await deleteFacultyMutation.mutateAsync(indexData.id, {
          onSuccess: (data) => {
            notification.success({
              message: "Success",
              description: data?.message,
            });
            queryClient.refetchQueries({ queryKey: ["get-faculty"] });
            setOpenDelete(false);
          },
        });
      } catch (error: any) {
        notification.error({
          message: "Error",
          description: error?.response?.data?.message,
        });
      }
    } else {
      notification.error({
        message: "Error",
        description: "Invalid Faculty ID",
      });
    }
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
        <h3>Faculty Setup</h3>
        <Button
          onClick={() => setShowAddModal(true)}
          iconBefore={<Add />}
          text="Setup"
        />
      </section>

      <section className={styles.card}>
        <div className={styles.inside}>
          <p>
            Showing 1-{filteredData?.length} of {facultyData?.length}
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
        title="Faculty Setup"
        footer={null}
      >
        <AddFaculty handleClose={() => setShowAddModal(false)} />
      </Modal>

      <Modal
        open={openEdit}
        onCancel={() => setOpenEdit(false)}
        centered
        title="Edit Faculty"
        footer={null}
      >
        <EditFaculty
          handleClose={() => setOpenEdit(false)}
          record={indexData}
        />
      </Modal>

      <Modal
        open={openDelete}
        onCancel={() => setOpenDelete(false)}
        centered
        title="Delete Faculty Setup"
        footer={null}
      >
        <DeleteModalContent
          isLoading={deleteFacultyMutation?.isPending}
          handleCloseModal={() => setOpenDelete(false)}
          handleSubmit={deleteFacultyHandler}
          title={indexData?.name}
        />
      </Modal>
    </main>
  );
};

export default FacultySetup;
