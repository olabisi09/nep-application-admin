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
import styles from "../styles.module.scss";
import Button from "../../../custom/button/button";
import { useState } from "react";
import SearchInput from "../../../custom/searchInput/searchInput";
import { ReactComponent as Ellipsis } from "../../../assets/ellipsis.svg";
import AddApplicationFee from "./addApplicationFee";
import { deleteFeeSetup, getAllFeeSetup } from "../../../requests";
import { useMutation, useQuery } from "@tanstack/react-query";
import { ColumnsType } from "antd/es/table";
import DeleteModalContent from "../../deleteModal/deleteModal";

const ApplicationFee = () => {
  const [showSearch, setShowSearch] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [showAllFilter, setShowAllFilter] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [item, setItem] = useState<GetAllFeeSetup>({} as GetAllFeeSetup);
  const [openDelete, setOpenDelete] = useState(false);

  const { notification } = App.useApp();

  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: ["get-all-fee-setup"],
    queryFn: getAllFeeSetup,
  });

  const applicationFeeData = data?.data ?? [];

  const deleteApplicationFeeMutation = useMutation({
    mutationFn: deleteFeeSetup,
  });

  const deleteApplicationFeeHandler = async () => {
    try {
      await deleteApplicationFeeMutation.mutateAsync(item?.id, {
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

  const handleSearch = (e: any) => {
    setSearchTerm(e.target.value);
  };

  const columns: ColumnsType<GetAllFeeSetup> = [
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
      key: "programType",
      title: "Program Type",
      dataIndex: "programTypeName",
    },
    {
      key: "modeOfStudy",
      title: "Mode of Study",
      dataIndex: "modeOfStudy",
    },
    {
      key: "amount",
      title: "Amount",
      dataIndex: "amount",
    },
    {
      key: " programTypeName",
      title: "Program Type",
      dataIndex: "programTypeName",
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
              setShowAddModal(true);
              setItem(record);
            },
          },
          {
            key: "2",
            label: "Delete",
            onClick: () => {
              setOpenDelete(true);
              setItem(record);
            },
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
    return <Spin size="large" />;
  }

  if (isError) {
    return <div>Error: {error?.message}</div>;
  }

  return (
    <main>
      <section className="space-between">
        <h3>Application Fee Setup</h3>
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
          dataSource={applicationFeeData}
          columns={columns}
          pagination={{ position: ["bottomCenter"] }}
          scroll={{ x: 400 }}
          //rowKey={(record, index) => `${record.id}${index}`}
        />
      </section>

      <Modal
        open={showAddModal}
        onCancel={() => setShowAddModal(false)}
        centered
        title="Application Fee Setup"
        footer={null}>
        <AddApplicationFee
          record={item}
          handleClose={() => {
            setShowAddModal(false);
          }}
        />
      </Modal>

      <Modal
        open={openDelete}
        onCancel={() => setOpenDelete(false)}
        centered
        title="Delete Application Fee Setup"
        footer={null}>
        <DeleteModalContent
          isLoading={deleteApplicationFeeMutation?.isPending}
          handleCloseModal={() => setOpenDelete(false)}
          handleSubmit={deleteApplicationFeeHandler}
          title={"this item"}
          isActive={false}
        />
      </Modal>
    </main>
  );
};

export default ApplicationFee;
