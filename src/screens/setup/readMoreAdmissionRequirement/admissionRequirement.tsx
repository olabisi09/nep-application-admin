import PageLayout from "../../../layouts/pageLayout/pageLayout";
import { ReactComponent as GraterThan } from "../../../assets/chevron_forward.svg";
import { ReactComponent as Add } from "../../../assets/add.svg";
import { ReactComponent as Search } from "../../../assets/search.svg";
import { ReactComponent as Filter } from "../../../assets/Frame 48095998 (1).svg";
import { Dropdown, Modal, Table, Button as AntButton, MenuProps, Spin, App } from "antd";
import { Form, Formik } from "formik";
import styles from "../styles.module.scss";
import Button from "../../../custom/button/button";
import { useState } from "react";
import SearchInput from "../../../custom/searchInput/searchInput";
import { AddAdmissionRequirement, EditAdmissionRequirement } from "./addAdmissionRequirement";
import { ReactComponent as Ellipsis } from "../../../assets/ellipsis.svg";
import AddDetails from "./addDetails";
import { deleteAdmissionRequirement, getAdmissionRequirements } from "../../../requests";
import { useMutation, useQuery } from "@tanstack/react-query";
import { ColumnsType } from "antd/es/table";
import { sanitizeAndLimitString } from "../../../utils/sanitizeAndLimitString";
import DeleteModalContent from "../../deleteModal/deleteModal";

const AdmissionRequirement = () => {
  const [showSearch, setShowSearch] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [showAllFilter, setShowAllFilter] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [showAddDetailsModal, setShowAddDetailsModal] = useState(false);
  const { notification } = App.useApp();
  const [admissionReq, setAdmissionReq] = useState<AdmissionRequirement>({} as AdmissionRequirement);
  const [openDelete, setOpenDelete] = useState(false);

  const deleteAdmissionReqMutation = useMutation({ mutationFn: deleteAdmissionRequirement });

  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: ["get-admission-requirement"],
    queryFn: getAdmissionRequirements,
  });
  const handleDelete = (data: AdmissionRequirement) => {
    setAdmissionReq(data);
    setOpenDelete(true);
  };
  const handleSearch = (e: any) => {
    setSearchTerm(e.target.value);
  };
  // const items: MenuProps["items"] = [
  //   {
  //     key: "1",
  //     label: <button style={{border:'0rem'}} onClick={() => setOpenEdit(true)}>Edit</button>,
  //   },
  // ];

  const columns: ColumnsType<AdmissionRequirement> = [
    {
      key: "id",
      title: "ID",
      dataIndex: "id",
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
      key: "readMoreId",
      title: "Program Name",
      dataIndex: "readMoreId",
    },
    {
      key: "status",
      title: "Status",
      dataIndex: "activeStatus",
      render: (_, { activeStatus }) => (activeStatus ? "Active" : "Inactive"),
    },
    // {
    //   key: "action",
    //   title: "",
    //   render: () => (
    //     <Dropdown menu={{ items }} trigger={["click"]}>
    //       <AntButton type="text" icon={<Ellipsis />} />
    //     </Dropdown>
    //   ),
    // },
    {
      key: "action",
      title: "",
      render: (_, record) => {
        const items: MenuProps["items"] = [
          {
            key: "1",
            label: "Edit",
            onClick: () => {
              setAdmissionReq(record);
              setOpenEdit(true);
            },
          },
          {
            key: "2",
            label: (
              <button style={{ border: "0rem", background: "none" }} onClick={() => handleDelete(record)}>
                Delete
              </button>
            ),
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

  const DeleteAdmissionReqHandler = async () => {
    try {
      await deleteAdmissionReqMutation.mutateAsync(admissionReq?.id, {
        onSuccess: (data) => {
          notification.success({
            message: "Success",
            description: data?.message,
          });
          refetch();
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

  const admissionRequirements = data?.data;

  if (isLoading) {
    return <Spin />;
  }
  if (isError) {
    return <div>Error: {error?.message}</div>;
  }
  return (
    <main>
      <PageLayout
        paragraph="Read More - Admission Requirements Setup"
        firstText="Setup Programs"
        secondText="Read More - Admission Requirements Setup"
        iconBefore={<GraterThan />}
        headerActions={<Button onClick={() => setShowAddModal(true)} iconBefore={<Add />} text="Setup" />}
      />
      <section className={styles.card}>
        <div className={styles.inside}>
          <p>Showing 1-11 of 88</p>
          <div>
            {!showSearch && (
              <span>
                <Search onClick={() => setShowSearch((showSearch) => !showSearch)} />
              </span>
            )}
            {showSearch && <SearchInput value={searchTerm} onChange={handleSearch} />}

            {!showAllFilter && <Filter onClick={() => setShowAllFilter((showAllFilter) => !showAllFilter)} />}
          </div>
        </div>
        <Table
          dataSource={admissionRequirements}
          columns={columns}
          pagination={{ position: ["bottomCenter"] }}
          //rowKey={(record, index) => `${record.id}${index}`}
        />
      </section>

      <Modal open={showAddModal} onCancel={() => setShowAddModal(false)} centered title="Read More - Admission Req." footer={null}>
        <AddAdmissionRequirement handleClose={() => setShowAddModal(false)} />
      </Modal>
      {admissionReq?.id && openEdit && (
        <Modal open={openEdit} onCancel={() => setOpenEdit(false)} centered title="Read More - Admission Req." footer={null}>
          <EditAdmissionRequirement handleClose={() => setOpenEdit(false)} admissionRequirement={admissionReq} />
        </Modal>
      )}

      <Modal
        open={showAddDetailsModal}
        onCancel={() => setShowAddDetailsModal(false)}
        centered
        title="Admission Req. Details"
        footer={null}
      >
        <Formik initialValues={{}} onSubmit={() => {}}>
          <Form>
            <AddDetails />
          </Form>
        </Formik>
      </Modal>

{
  admissionReq?.id && openDelete && (
    <Modal open={openDelete} onCancel={() => setOpenDelete(false)} centered title="Delete Admission Requirement Setup" footer={null}>
    <DeleteModalContent
      isLoading={deleteAdmissionReqMutation?.isPending}
      // data={Data}
      handleCloseModal={() => setOpenDelete(false)}
      handleSubmit={DeleteAdmissionReqHandler}
      title={"this item"}
      isActive={false}
      // btnText={"Disable"}
    />
  </Modal>
  )
}
 
    </main>
  );
};

export default AdmissionRequirement;
