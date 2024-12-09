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
  App,
} from "antd";
import styles from "../styles.module.scss";
import Button from "../../../custom/button/button";
import { useState } from "react";
import SearchInput from "../../../custom/searchInput/searchInput";
import {
  AddAdmissionRequirement,
  EditAdmissionRequirement,
} from "./addAdmissionRequirement";
import { ReactComponent as Ellipsis } from "../../../assets/ellipsis.svg";
import {
  deleteAdmissionRequirement,
  getAdmissionRequirements,
} from "../../../requests";
import { useMutation, useQuery } from "@tanstack/react-query";
import { ColumnsType } from "antd/es/table";
import { sanitizeAndLimitString } from "../../../utils/sanitizeAndLimitString";
import DeleteModalContent from "../../deleteModal/deleteModal";
import { useNavigate } from "react-router-dom";
import { usePagination } from "../../../hooks/usePagination";

const AdmissionRequirement = () => {
  const [showSearch, setShowSearch] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  // const [showAllFilter, setShowAllFilter] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [admissionReq, setAdmissionReq] = useState<AdmissionRequirement>(
    {} as AdmissionRequirement
  );
  const [openDelete, setOpenDelete] = useState(false);

  const { notification } = App.useApp();

  const { currentPage, onChange } = usePagination();

  const navigate = useNavigate();

  const deleteAdmissionReqMutation = useMutation({
    mutationFn: deleteAdmissionRequirement,
  });

  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: ["get-admission-requirement"],
    queryFn: () => getAdmissionRequirements(currentPage, 10),
  });

  const handleDelete = (data: AdmissionRequirement) => {
    setAdmissionReq(data);
    setOpenDelete(true);
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const columns: ColumnsType<AdmissionRequirement> = [
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
      key: "programName",
      title: "Program Name",
      dataIndex: "programName",
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
              setAdmissionReq(record);
              setOpenEdit(true);
            },
          },
          {
            key: "2",
            label: "Admission Requirement Details",
            onClick: () =>
              navigate(`/admission-requirement/${record.id}/details`),
          },
          {
            key: "3",
            label: (
              <button
                style={{ border: "0rem", background: "none" }}
                onClick={() => handleDelete(record)}
              >
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

  const deleteAdmissionReqHandler = async () => {
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

  const filteredData = admissionRequirements?.filter((item) =>
    item?.programName?.toLowerCase()?.includes(searchTerm.toLowerCase())
  );

  const handleShowModal = () => {
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
        <h3>Read More - Admission Requirements Setup</h3>
        <Button onClick={handleShowModal} iconBefore={<Add />} text="Setup" />
      </section>

      <section className={styles.card}>
        <div className={styles.inside}>
          <p>
            Showing 1-{filteredData?.length} of {admissionRequirements?.length}
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
        title="Read More - Admission Req."
        footer={null}
      >
        <AddAdmissionRequirement handleClose={() => setShowAddModal(false)} />
      </Modal>

      {admissionReq?.id && openEdit && (
        <Modal
          open={openEdit}
          onCancel={() => setOpenEdit(false)}
          centered
          title="Read More - Admission Req."
          footer={null}
        >
          <EditAdmissionRequirement
            handleClose={() => setOpenEdit(false)}
            admissionRequirement={admissionReq}
          />
        </Modal>
      )}

      {admissionReq?.id && openDelete && (
        <Modal
          open={openDelete}
          onCancel={() => setOpenDelete(false)}
          centered
          title="Delete Admission Requirement"
          footer={null}
        >
          <DeleteModalContent
            isLoading={deleteAdmissionReqMutation?.isPending}
            // data={Data}
            handleCloseModal={() => setOpenDelete(false)}
            handleSubmit={deleteAdmissionReqHandler}
            title={"this item"}
            isActive={false}
            // btnText={"Disable"}
          />
        </Modal>
      )}
    </main>
  );
};

export default AdmissionRequirement;
