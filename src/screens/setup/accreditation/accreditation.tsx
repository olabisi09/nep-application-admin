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
import styles from "../styles.module.scss";
import Button from "../../../custom/button/button";
import { useState } from "react";
import SearchInput from "../../../custom/searchInput/searchInput";
import AddAccreditation from "./addAccreditation";
import { ReactComponent as Ellipsis } from "../../../assets/ellipsis.svg";
import { useMutation, useQuery } from "@tanstack/react-query";
import {
  deleteAccreditationById,
  getAllAccreditation,
} from "../../../requests";
import { sanitizeAndLimitString } from "../../../utils/sanitizeAndLimitString";
import { ColumnsType } from "antd/es/table";

const AccreditationSetup = () => {
  const [showSearch, setShowSearch] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [showAllFilter, setShowAllFilter] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [item, setItem] = useState<AccreditationData>({} as AccreditationData);

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

  const columns: ColumnsType<AccreditationData> = [
    {
      key: "id",
      title: "ID",
      dataIndex: "id",
    },
    {
      key: "program",
      title: "Program",
      dataIndex: "programName",
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
            label: (
              <button
                style={{ border: "0rem" }}
                onClick={() => {
                  setOpenEdit(true);
                  setItem(record);
                }}
              >
                Edit
              </button>
            ),
          },
          {
            key: "2",
            label: (
              <button
                style={{ border: "0rem" }}
                onClick={() => {
                  handleDelete(record.id);
                }}
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

  if (isLoading) {
    return <Spin />;
  }

  if (isError) {
    return <div>Error: {error?.message}</div>;
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
          dataSource={accreditationData}
          columns={columns}
          pagination={{ position: ["bottomCenter"] }}
        />
      </section>

      <Modal
        open={showAddModal}
        onCancel={() => setShowAddModal(false)}
        centered
        title="Accreditation Setup"
        footer={null}
      >
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
