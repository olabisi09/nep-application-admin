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

import { ReactComponent as Add } from "../../../assets/add.svg";
import { ReactComponent as Ellipsis } from "../../../assets/ellipsis.svg";
import { ReactComponent as Search } from "../../../assets/search.svg";
// import { ReactComponent as Filter } from "../../../assets/Frame 48095998 (1).svg";
import Button from "../../../custom/button/button";
import SearchInput from "../../../custom/searchInput/searchInput";
import { usePagination } from "../../../hooks/usePagination";
import { useSearchTerms } from "../../../hooks/useSearchTerms";
import DeleteModalContent from "../../deleteModal/deleteModal";
import styles from "../styles.module.scss";

import AddSubject from "./addSubject";
import { deleteSubjects, getSubjects } from "./request";

const SubjectSetUp = () => {
  const [showSearch, setShowSearch] = useState(false);
  // const [showAllFilter, setShowAllFilter] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [indexData, setIndexData] = useState({} as Subject);
  const [openDelete, setOpenDelete] = useState(false);

  const { currentPage, onChange } = usePagination();
  const { searchTerm, handleSearch } = useSearchTerms();
  
  const { notification } = App.useApp();
  const queryClient = useQueryClient();

  const handleEdit = (data: Subject) => {
    setIndexData(data);
    setOpenEdit(true);
  };

  const handleDelete = (data: Subject) => {
    setIndexData(data);
    setOpenDelete(true);
  };

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["get-subject", currentPage],
    queryFn: () => getSubjects({ pageNumber: currentPage, pageSize: 10 }),
  });

  const subjectData = data?.data as Subject[];

  const filteredData = subjectData
    ?.filter((item) =>
      item?.subject?.toLowerCase()?.includes(searchTerm.toLowerCase())
    )
    ?.map((item) => ({ ...item, key: item.id }));

  const items = (record: Subject): MenuProps["items"] => [
    {
      key: "1",
      label: (
        <button style={{ border: "0rem" }} onClick={() => handleEdit(record)}>
          Edit
        </button>
      ),
    },
    {
      key: "2",
      label: (
        <button style={{ border: "0rem" }} onClick={() => handleDelete(record)}>
          Delete
        </button>
      ),
    },
  ];

  const columns = [
    {
      key: "subject",
      title: "Subject Name",
      dataIndex: "subject",
    },
    {
      key: "activeStatus",
      title: "Active Status",
      dataIndex: "activeStatus",
      render: (text: boolean) => (text ? "Active" : "Inactive"),
    },

    {
      key: "action",
      title: "",
      render: (record: Subject) => (
        <Dropdown menu={{ items: items(record) }} trigger={["click"]}>
          <AntButton type="text" icon={<Ellipsis />} />
        </Dropdown>
      ),
    },
  ];

  const deleteSubjectMutation = useMutation({ mutationFn: deleteSubjects });

  const deleteCountryHandler = async () => {
    try {
      await deleteSubjectMutation.mutateAsync(indexData.id, {
        onSuccess: (data) => {
          notification.success({
            message: "Success",
            description: data?.message,
          });
          queryClient.refetchQueries({
            queryKey: ["get-subject"],
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

  if (isLoading) {
    return <Spin />;
  }

  if (isError) {
    return <div>Error: {error?.message}</div>;
  }

  return (
    <main>
      <section className="space-between">
        <h3>Subject Setup</h3>
        <Button
          onClick={() => setShowAddModal(true)}
          iconBefore={<Add />}
          text="Setup"
        />
      </section>

      <section className={styles.card}>
        <div className={styles.inside}>
          <p>
            Showing 1-{filteredData?.length} of {subjectData?.length}
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
        title="Subject Setup"
        footer={null}
      >
        <AddSubject handleClose={() => setShowAddModal(false)} />
      </Modal>

      <Modal
        open={openEdit}
        onCancel={() => setOpenEdit(false)}
        centered
        title=" Edit Subject Setup"
        footer={null}
      >
        <AddSubject handleClose={() => setOpenEdit(false)} data={indexData} />
      </Modal>

      <Modal
        open={openDelete}
        onCancel={() => setOpenDelete(false)}
        centered
        title="Delete Subject Setup"
        footer={null}
      >
        <DeleteModalContent
          isLoading={deleteSubjectMutation?.isPending}
          handleCloseModal={() => setOpenDelete(false)}
          handleSubmit={deleteCountryHandler}
          title={indexData?.subject}
        />
      </Modal>
    </main>
  );
};

export default SubjectSetUp;
