/* eslint-disable no-undef */

import { useState } from "react";

import { useMutation, useQuery } from "@tanstack/react-query";
import {
  Button as AntButton,
  App,
  Dropdown,
  MenuProps,
  Modal,
  Spin,
  Table,
} from "antd";
import { ColumnsType } from "antd/es/table";

import { ReactComponent as Add } from "../../../../assets/add.svg";
import { ReactComponent as Ellipsis } from "../../../../assets/ellipsis.svg";
import { ReactComponent as Search } from "../../../../assets/search.svg";
import { Button, SearchInput } from "../../../../custom";
import { useSearchTerms } from "../../../../hooks/useSearchTerms";
import { deleteDisability, getAllDisability } from "../../../../requests";
import DeleteModalContent from "../../../deleteModal/deleteModal";
import styles from "../../styles.module.scss";

import { AddDisability, EditDisability } from "./addDisability";

const DisabilitySetup = () => {
  const [showSearch, setShowSearch] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [disability, setDisability] = useState<Disability>({} as Disability);
  const [openDelete, setOpenDelete] = useState(false);

  const { notification } = App.useApp();
  const { searchTerm, handleSearch } = useSearchTerms();

  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: ["get-disability"],
    queryFn: getAllDisability,
  });

  const deleteDisabilityMutation = useMutation({
    mutationFn: deleteDisability,
  });

  const handleDelete = (data: Disability) => {
    setDisability(data);
    setOpenDelete(true);
  };

  const deleteDisabilityHandler = async () => {
    try {
      await deleteDisabilityMutation.mutateAsync(disability?.id, {
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

  const columns: ColumnsType<Disability> = [
    {
      key: "name",
      title: "Name",
      dataIndex: "name",
    },
    {
      key: "isActive",
      title: "Status",
      dataIndex: "isActive",
      render: (_, { isActive }) => (isActive ? "Active" : "Inactive"),
    },
    {
      key: "action",
      title: "Action",
      render: (_, record) => {
        const items: MenuProps["items"] = [
          {
            key: "1",
            label: "Edit",
            onClick: () => {
              setDisability(record);
              setOpenEdit(true);
            },
          },
          {
            key: "2",
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

  const disabilityData = data?.data ?? [];

  const filteredData = disabilityData
    ?.filter((item) =>
      item?.name?.toLowerCase()?.includes(searchTerm.toLowerCase())
    )
    ?.map((item) => ({ ...item, key: item.id }));

  if (isLoading) {
    return <Spin />;
  }

  if (isError) {
    return <div>Error: {error?.message}</div>;
  }

  return (
    <main>
      <section className="space-between">
        <h3>Disability Setup</h3>
        <Button
          onClick={() => setShowAddModal(true)}
          iconBefore={<Add />}
          text="Setup"
        />
      </section>

      <section className={styles.card}>
        <div className={styles.inside}>
          <p>
            Showing 1-{filteredData?.length} of {disabilityData?.length}
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
          pagination={{ position: ["bottomCenter"] }}
        />
      </section>

      <Modal
        open={showAddModal}
        onCancel={() => setShowAddModal(false)}
        centered
        title="Disability Setup"
        footer={null}
      >
        <AddDisability handleClose={() => setShowAddModal(false)} />
      </Modal>

      {disability?.id && openEdit && (
        <Modal
          open={openEdit}
          onCancel={() => setOpenEdit(false)}
          centered
          title="Disability Setup"
          footer={null}
        >
          <EditDisability
            title={disability}
            handleClose={() => setOpenEdit(false)}
          />
        </Modal>
      )}

      {disability?.id && openDelete && (
        <Modal
          open={openDelete}
          onCancel={() => setOpenDelete(false)}
          centered
          title="Delete Disability Setup"
          footer={null}
        >
          <DeleteModalContent
            isLoading={deleteDisabilityMutation?.isPending}
            handleCloseModal={() => setOpenDelete(false)}
            handleSubmit={deleteDisabilityHandler}
            title={disability?.name}
            isActive={false}
          />
        </Modal>
      )}
    </main>
  );
};

export default DisabilitySetup;
