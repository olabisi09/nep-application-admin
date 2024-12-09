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
import { ReactComponent as Ellipsis } from "../../../assets/ellipsis.svg";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import DeleteModalContent from "../../deleteModal/deleteModal";
import { ColumnsType } from "antd/es/table";
import { deleteFaculty } from "../../../requests";
import { getApplicationBatch } from "./request";
import AddApplicationBatch from "./addApplicationBatch";
import EditApplicationBatch from "./editApplicationBatch";
import { formatDate } from "../../../utils/formatDate";
import { usePagination } from "../../../hooks/usePagination";

const ApplicationBatchSetup = () => {
  const [showSearch, setShowSearch] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [showAddModal, setShowAddModal] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [indexData, setIndexData] = useState({} as ApplicationBatch);
  const [openDelete, setOpenDelete] = useState(false);

  const { currentPage, onChange } = usePagination();

  const { notification } = App.useApp();
  const queryClient = useQueryClient();

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleEdit = (data: ApplicationBatch) => {
    setIndexData(data);
    setOpenEdit(true);
  };

  const handleDelete = (data: ApplicationBatch) => {
    if (data && data?.id) {
      setIndexData(data);
      setOpenDelete(true);
    } else {
      notification.error({
        message: "Error",
        description: "Invalid Application Batch ID",
      });
    }
  };

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["get-all-application-batch"],
    queryFn: () => getApplicationBatch(currentPage, 10),
  });

  const applicationBatchData = data?.data ?? [];

  const filteredData = applicationBatchData?.filter((item) =>
    item?.batchName?.toLowerCase()?.includes(searchTerm.toLowerCase())
  );

  const items = (record: ApplicationBatch): MenuProps["items"] => [
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

  const columns: ColumnsType<ApplicationBatch> = [
    {
      key: "batchName",
      title: "Batch",
      dataIndex: "batchName",
    },
    {
      key: "session",
      title: "Session",
      dataIndex: "sessionName",
    },
    // {
    //   key: "programName",
    //   title: "Program",
    //   dataIndex: "programName",
    // },
    {
      key: "startDate",
      title: "Start Date",
      dataIndex: "startDate",
      render: (_, { startDate }) => formatDate(startDate),
    },
    {
      key: "endDate",
      title: "End Date",
      dataIndex: "endDate",
      render: (_, { endDate }) => formatDate(endDate),
    },
    {
      key: "lateStartDate",
      title: "Late Application Start Date",
      dataIndex: "lateStartDate",
      render: (_, { lateStartDate }) => formatDate(lateStartDate),
    },
    {
      key: "lateEndDate",
      title: "Late Application End Date",
      dataIndex: "lateEndDate",
      render: (_, { lateEndDate }) => formatDate(lateEndDate),
    },
    {
      key: "isActive",
      title: "Status",
      dataIndex: "isActive",
      render: (_, { isActive }) => (isActive ? "Active" : "Inactive"),
    },
    {
      key: "action",
      title: "",
      render: (record: ApplicationBatch) => (
        <Dropdown menu={{ items: items(record) }} trigger={["click"]}>
          <AntButton type="text" icon={<Ellipsis />} />
        </Dropdown>
      ),
    },
  ];

  const deleteApplicationBatchMutation = useMutation({
    mutationFn: deleteFaculty,
  });

  const deleteApplicationBatchHandler = async () => {
    if (indexData.id) {
      try {
        await deleteApplicationBatchMutation.mutateAsync(indexData.id, {
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
        <h3>Application Batch Setup</h3>
        <Button
          onClick={() => setShowAddModal(true)}
          iconBefore={<Add />}
          text="Setup"
        />
      </section>

      <section className={styles.card}>
        <div className={styles.inside}>
          <p>
            Showing 1-{filteredData?.length} of {applicationBatchData?.length}
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
        title="Create Application Batch"
        footer={null}
      >
        <AddApplicationBatch handleClose={() => setShowAddModal(false)} />
      </Modal>

      <Modal
        open={openEdit}
        onCancel={() => setOpenEdit(false)}
        centered
        title="Edit Application Batch"
        footer={null}
      >
        <EditApplicationBatch
          handleClose={() => setOpenEdit(false)}
          record={indexData}
        />
      </Modal>

      <Modal
        open={openDelete}
        onCancel={() => setOpenDelete(false)}
        centered
        title="Delete Application Batch"
        footer={null}
      >
        <DeleteModalContent
          isLoading={deleteApplicationBatchMutation?.isPending}
          handleCloseModal={() => setOpenDelete(false)}
          handleSubmit={deleteApplicationBatchHandler}
          title={indexData?.batchName}
        />
      </Modal>
    </main>
  );
};

export default ApplicationBatchSetup;
