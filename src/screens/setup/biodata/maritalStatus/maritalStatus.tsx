import { ReactComponent as GraterThan } from "../../../../assets/chevron_forward.svg";
import { ReactComponent as Add } from "../../../../assets/add.svg";
import { ReactComponent as Search } from "../../../../assets/search.svg";
import { ReactComponent as Filter } from "../../../../assets/Frame 48095998 (1).svg";
import {
  Dropdown,
  Modal,
  Table,
  Button as AntButton,
  MenuProps,
  Spin,
  App,
} from "antd";
import styles from "../../styles.module.scss";
import Button from "../../../../custom/button/button";
import { useState } from "react";
import SearchInput from "../../../../custom/searchInput/searchInput";
import { AddMarital } from "./addMaritalStatus";
import { ReactComponent as Ellipsis } from "../../../../assets/ellipsis.svg";
import {
  createOrUpdateMaritalStatus,
  deleteMaritalStatus,
  getMaritalStatus,
} from "../../../../requests";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import DeleteModalContent from "../../../deleteModal/deleteModal";



const MaritalSetup = ()=> {
  const { notification } = App.useApp();
  const [showSearch, setShowSearch] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [showAllFilter, setShowAllFilter] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [indexData, setIndexData] = useState({} as MaritalStatus);
  const queryClient = useQueryClient();

  const handleSearch = (e: any) => {
    setSearchTerm(e.target.value);
  };

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["get-marital-status"],
    queryFn: getMaritalStatus,
  });
  const handleEdit = (data: MaritalStatus) => {
    setIndexData(data);
    setOpenEdit(true);
  };

  const handleDelete = (data: MaritalStatus) => {
    setIndexData(data);
    setOpenDelete(true);
  };

  const DeleteMaritalStatusMutation = useMutation({
    mutationFn: deleteMaritalStatus,
    mutationKey: ["delete-marital-status"],
  });

  const DeleteMaritalStatusHandler = async () => {
    try {
      await DeleteMaritalStatusMutation.mutateAsync(indexData.id, {
        onSuccess: (data) => {
          notification.success({
            message: "Success",
            description: data?.message,
          });
          queryClient.refetchQueries({
            queryKey: ["get-marital-status"],
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

  const items = (record: MaritalStatus): MenuProps["items"] => [
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
      key: "id",
      title: "ID",
      dataIndex: "id",
    },
    {
      key: "statusName",
      title: "status",
      dataIndex: "statusName",
    },
    {
      key: "activeStatus",
      title: "Active Status",
      dataIndex: "activeStatus",
      render: (text:boolean) => (text ? "Active" : "Inactive"),

    },

    {
      key: "action",
      title: "",
      render: ( record: MaritalStatus) => (
        <Dropdown menu={{ items: items(record) }} trigger={["click"]}>
          <AntButton type="text" icon={<Ellipsis />} />
        </Dropdown>
      ),
    },
  ];
  const maritalStatus = data?.data as MaritalStatus[];

  if (isLoading) {
    return <Spin />;
  }
  if (isError) {
    return <div>Error: {error?.message}</div>;
  }
  return (
    <main>
        <section className="space-between">
        <h3>Marital Setup</h3>
        <Button
          onClick={() => setShowAddModal(true)}
          iconBefore={<Add />}
          text="Setup"
        />
      </section>
      <section className={styles.card}>
        <div className={styles.inside}>
          <p>Showing 1-11 of 88</p>
          {/* <div>
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
          </div> */}
        </div>
        <Table
          dataSource={maritalStatus}
          columns={columns}
          pagination={{ position: ["bottomCenter"] }}
          //rowKey={(record, index) => `${record.id}${index}`}
        />
      </section>

      <Modal
        open={showAddModal}
        onCancel={() => setShowAddModal(false)}
        centered
        title="Marital Setup"
        footer={null}
      >
        <AddMarital handleClose={() => setShowAddModal(false)} />
      </Modal>

      <Modal
        open={openEdit}
        onCancel={() => setOpenEdit(false)}
        centered
        title="Edit Marital Setup"
        footer={null}
      >
        <AddMarital handleClose={() => setOpenEdit(false)} data={indexData}/>
      </Modal>

      <Modal
        open={openDelete}
        onCancel={() => setOpenDelete(false)}
        centered
        title="Delete Marital Setup"
        footer={null}
      >
        <DeleteModalContent
          isLoading={DeleteMaritalStatusMutation?.isPending}
          handleCloseModal={() => setOpenDelete(false)}
          handleSubmit={DeleteMaritalStatusHandler}
          title={indexData?.statusName}
        />
      </Modal>
    </main>
  );
};

export default MaritalSetup;
