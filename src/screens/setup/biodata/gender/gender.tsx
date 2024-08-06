import PageLayout from "../../../../layouts/pageLayout/pageLayout";
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
  Spin,App
} from "antd";
import styles from "../../styles.module.scss";
import Button from "../../../../custom/button/button";
import { useState } from "react";
import SearchInput from "../../../../custom/searchInput/searchInput";
import AddGender from "./addGender";
import { ReactComponent as Ellipsis } from "../../../../assets/ellipsis.svg";
import {   useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createOrUpdateGender, getGender } from "../../../../requests";
import DeleteModalContent from "../../../deleteModal/deleteModal";

const GenderSetup = () => {
  const [showSearch, setShowSearch] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [showAllFilter, setShowAllFilter] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const { notification } = App.useApp();
  const [indexData, setIndexData] = useState({} as Gender);
  const queryClient = useQueryClient();

  const handleSearch = (e: any) => {
    setSearchTerm(e.target.value);
  };

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["get-gender"],
    queryFn: getGender,
  });

  const handleEdit = (data: Gender) => {
    setIndexData(data);
    setOpenEdit(true);
  };

  const handleDelete = (data: Gender) => {
    setIndexData(data);
    setOpenDelete(true);
  };
      const DeleteGenderMutation = useMutation({
    mutationFn: createOrUpdateGender,
    mutationKey: ["delete-gender"],
  });


  const DeleteGenderHandler = async () => {
    const payload: Partial<Gender> = {
      id:indexData?.id,
      genderName: indexData.genderName,
      activeStatus:false,
   
    };

    try {
      await DeleteGenderMutation.mutateAsync(payload, {
        onSuccess: (data) => {
          notification.success({
            message: "Success",
            description: 'Deleted Successfully'||data?.message,
          });
          queryClient.refetchQueries({
            queryKey: ["get-gender"],
          });
          setOpenDelete(false)
        },
      });
    } catch (error: any) {
      notification.error({
        message: "Error",
        description: error?.response?.data?.message,
      });
    }
  };


  const items = (record: Gender): MenuProps["items"] => [
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
      key: "genderName",
      title: "Gender",
      dataIndex: "genderName",
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
      render: ( record: Gender) => (
        <Dropdown menu={{ items: items(record) }} trigger={["click"]}>
          <AntButton type="text" icon={<Ellipsis />} />
        </Dropdown>
      ),
    },
  ];

  const GenderData = data?.data as Gender[];

  if (isLoading) {
    return <Spin />;
  }
  if (isError) {
    return <div>Error: {error?.message}</div>;
  }


  return (
    <main>
      <PageLayout
        paragraph="Gender Setup"
        firstText="Setup Bio-data"
        secondText="Gender Setup"
        iconBefore={<GraterThan />}
        headerActions={
          <Button
            onClick={() => setShowAddModal(true)}
            iconBefore={<Add />}
            text="Setup"
          />
        }
      />
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
          dataSource={GenderData}
          columns={columns}
          pagination={{ position: ["bottomCenter"] }}
        />
      </section>

      <Modal
        open={showAddModal}
        onCancel={() => setShowAddModal(false)}
        centered
        title="Gender Setup"
        footer={null}
      >
        <AddGender handleClose={() => setShowAddModal(false)} />
      </Modal>

      <Modal
        open={openEdit}
        onCancel={() => setOpenEdit(false)}
        centered
        title="Edit Gender Setup"
        footer={null}
      >
        <AddGender handleClose={() => setOpenEdit(false)} data={indexData} />
      </Modal>
      <Modal
        open={openDelete}
        onCancel={() => setOpenDelete(false)}
        centered
        title=" Delete Gender Setup"
        footer={null}
      >
        <DeleteModalContent
          isLoading={false}
          // data={Data}
          handleCloseModal={() => setOpenDelete(false)}
          handleSubmit={DeleteGenderHandler}
          title={indexData?.genderName}
          isActive={ false }
          // btnText={"Disable"}
        />
      </Modal>
    </main>
  );
};

export default GenderSetup;
