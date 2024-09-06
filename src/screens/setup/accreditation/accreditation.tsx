import { ReactComponent as Add } from "../../../assets/add.svg";
import { ReactComponent as Search } from "../../../assets/search.svg";
import { ReactComponent as Filter } from "../../../assets/Frame 48095998 (1).svg";
import {
  Dropdown,
  Modal,
  Table,
  Button as AntButton,
  MenuProps,
  Spin,
  notification,
} from "antd";
import { Form, Formik } from "formik";
import styles from "../styles.module.scss";
import Button from "../../../custom/button/button";
import { useState } from "react";
import SearchInput from "../../../custom/searchInput/searchInput";
import AddAccreditation from "./addAccreditation";
import { ReactComponent as Ellipsis } from "../../../assets/ellipsis.svg";
import { useMutation, useQueries, useQuery } from "@tanstack/react-query";
import {
  deleteAccreditationById,
  getAccreditationById,
  getAllAccreditation,
} from "../../../requests";
import { sanitizeAndLimitString } from "../../../utils/sanitizeAndLimitString";
import { ColumnGroupType, ColumnsType } from "antd/es/table";

const AccreditationSetup = () => {
  const [showSearch, setShowSearch] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [showAllFilter, setShowAllFilter] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [item, setItem] = useState<AccreditationType>({} as AccreditationType);

  const handleSearch = (e: any) => {
    setSearchTerm(e.target.value);
  };

  const deleteAccreditationMutation = useMutation({
    mutationFn: deleteAccreditationById,
  });

  const { data, error, isError, isLoading, refetch } = useQuery({
    queryKey: ["get-all-accreditation"],
    queryFn: getAllAccreditation,
    retry: 1,
  });

  const handleDelete = async (id: number) => {
    try {
      await deleteAccreditationMutation.mutateAsync(id, {
        onSuccess: (data) => {
          notification.success({
            message: "Success",
            description: data?.message,
          });
          refetch();
        },
      });
    } catch (error: any) {
      notification.error({
        message: "Error",
        description: error?.response?.data?.message,
      });
    }
  };

  const accreditationData = data?.data ?? [];

  const dataSource = accreditationData?.map((item) => {
    return {
      id: item?.id,
      program: item?.readMoreId,
      description: item?.description,
      status: item?.activeStatus ? "Active" : "Inactive",
    };
  });

  //const dataSource = data
  const columns = [
    {
      key: "id",
      title: "ID",
      dataIndex: "id",
    },
    {
      key: "program",
      title: "Program",
      dataIndex: "program",
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
      dataIndex: "status",
    },
    {
      key: "action",
      title: "",
      render: (record: AccreditationType) => {
        const items: MenuProps["items"] = [
          {
            key: "1",
            label: (
              <button
                style={{ border: "0rem" }}
                onClick={() => {
                  setOpenEdit(true);
                  setItem(record);
                }}>
                Edit
              </button>
            ),
          },
          {
            key: "1",
            label: (
              <button
                style={{ border: "0rem" }}
                onClick={() => {
                  handleDelete(record.id);
                }}>
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

  if (isLoading) {
    return <Spin />;
  }

  return (
    <main>
      <section className="space-between">
        <h3>Accreditation Setup</h3>
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
          dataSource={dataSource}
          columns={columns}
          pagination={{ position: ["bottomCenter"] }}
          //rowKey={(record, index) => `${record.id}${index}`}
        />
      </section>

      <Modal
        open={showAddModal}
        onCancel={() => setShowAddModal(false)}
        centered
        title="Accreditation Setup"
        footer={null}>
        <AddAccreditation
          record={item}
          handleClose={() => setShowAddModal(false)}
        />
      </Modal>

      <Modal
        open={openEdit}
        onCancel={() => setOpenEdit(false)}
        centered
        title="Accreditation Setup"
        footer={null}
        // footer={() => (
        //   <div className="btn-group">
        //     <Button
        //       onClick={() => setOpenEdit(false)}
        //       variant="text"
        //       text="Cancel"
        //     />
        //     <Button text="Update" />
        //   </div>
        // )}
      >
        <AddAccreditation
          record={item}
          handleClose={() => setOpenEdit(false)}
        />
      </Modal>
    </main>
  );
};

export default AccreditationSetup;
