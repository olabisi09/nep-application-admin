import { ReactComponent as Add } from "../../../assets/add.svg";
import { ReactComponent as Search } from "../../../assets/search.svg";
import { ReactComponent as Filter } from "../../../assets/Frame 48095998 (1).svg";
import {
  Dropdown,
  Modal,
  Table,
  Button as AntButton,
  MenuProps,
  App,
  Spin,
} from "antd";
import { Form, Formik } from "formik";
import styles from "../styles.module.scss";
import Button from "../../../custom/button/button";
import { useState } from "react";
import SearchInput from "../../../custom/searchInput/searchInput";
import { ReactComponent as Ellipsis } from "../../../assets/ellipsis.svg";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import DeleteModalContent from "../../deleteModal/deleteModal";
import { ColumnsType } from "antd/es/table";
import { sanitizeAndLimitString } from "../../../utils/sanitizeAndLimitString";
import { deleteFaculty, getFaculty } from "../../../requests";
import { number } from "yup";
import AddFaculty from "./addFaculty";
import EditFaculty from "./editFaculty";

const FacultySetup = () => {
  const [showSearch, setShowSearch] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [showAllFilter, setShowAllFilter] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [indexData, setIndexData] = useState(
    {} as createOrUpdateFacultyPayload
  );

  const [openDelete, setOpenDelete] = useState(false);
  const { notification } = App.useApp();
  const queryClient = useQueryClient();

  const handleSearch = (e: any) => {
    setSearchTerm(e.target.value);
  };

  const handleEdit = (data: createOrUpdateFacultyPayload) => {
    setIndexData(data);
    setOpenEdit(true);
  };

  // Ensure that the correct record is passed to delete
  const handleDelete = (data: createOrUpdateFacultyPayload) => {
    if (data && data?.id) {
      setIndexData(data); // Set the entire record, including Id
      setOpenDelete(true);
    } else {
      notification.error({
        message: "Error",
        description: "Invalid Faculty ID",
      });
    }
  };

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["get-faculty"],
    queryFn: getFaculty,
  });

  const facultyData = data?.data as createOrUpdateFacultyPayload[];

  const items = (record: createOrUpdateFacultyPayload): MenuProps["items"] => [
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

  const columns: ColumnsType<createOrUpdateFacultyPayload> = [
    {
      key: "id",
      title: "ID",
      dataIndex: "id",
    },

    {
      key: "name",
      title: "Faculty Name",
      dataIndex: "name",
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
      key: "categoryCode",
      title: "Faculty Code ",
      dataIndex: "categoryCode",
    },
    {
      key: "action",
      title: "",
      render: (record: createOrUpdateFacultyPayload) => (
        <Dropdown menu={{ items: items(record) }} trigger={["click"]}>
          <AntButton type="text" icon={<Ellipsis />} />
        </Dropdown>
      ),
    },
  ];

  const deleteFacultyMutation = useMutation({ mutationFn: deleteFaculty });

  const DeleteFacultyHandler = async () => {
    // Ensure Id exists before proceeding with deletion
    if (indexData.id) {
      try {
        await deleteFacultyMutation.mutateAsync(indexData.id, {
          onSuccess: (data) => {
            notification.success({
              message: "Success",
              description: data?.message,
            });
            queryClient.refetchQueries({
              queryKey: ["get-faculty"],
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
          dataSource={facultyData}
          columns={columns}
          pagination={{ position: ["bottomCenter"] }}
          //rowKey={(record, index) => ${record.id}${index}}
        />
      </section>

      <Modal
        open={showAddModal}
        onCancel={() => setShowAddModal(false)}
        centered
        title="Faculty Setup"
        footer={null}>
        <AddFaculty handleClose={() => setShowAddModal(false)} />
      </Modal>

      <Modal
        open={openEdit}
        onCancel={() => setOpenEdit(false)}
        centered
        title="Faculty Setup"
        footer={null}>
        <EditFaculty
          handleClose={() => setOpenEdit(false)}
          details={indexData}
        />
      </Modal>

      <Modal
        open={openDelete}
        onCancel={() => setOpenDelete(false)}
        centered
        title="Delete Faculty Setup"
        footer={null}>
        <DeleteModalContent
          isLoading={deleteFacultyMutation?.isPending}
          handleCloseModal={() => setOpenDelete(false)}
          handleSubmit={DeleteFacultyHandler}
          title={indexData?.name}
        />
      </Modal>
    </main>
  );
};

export default FacultySetup;
