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

import { ReactComponent as Add } from "../../../assets/add.svg";
import { ReactComponent as Ellipsis } from "../../../assets/ellipsis.svg";
import { ReactComponent as Search } from "../../../assets/search.svg";
import { Button, SearchInput } from "../../../custom";
import { useSearchTerms } from "../../../hooks/useSearchTerms";
import { deleteTab, getAllTab } from "../../../requests";
import DeleteModalContent from "../../deleteModal/deleteModal";
import styles from "../styles.module.scss";

import { AddTab, EditTab } from "./addTab";

const TabSetup = () => {
  const [showSearch, setShowSearch] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [tab, setTab] = useState<Tab>({} as Tab);
  const [openDelete, setOpenDelete] = useState(false);

  const { searchTerm, handleSearch } = useSearchTerms();
  const { notification } = App.useApp();

  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: ["get-tab"],
    queryFn: getAllTab,
  });

  const deleteTabMutation = useMutation({
    mutationFn: deleteTab,
  });

  const handleDelete = (data: Tab) => {
    setTab(data);
    setOpenDelete(true);
  };

  const deleteTabHandler = async () => {
    try {
      await deleteTabMutation.mutateAsync(tab?.id, {
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

  const columns: ColumnsType<Tab> = [
    {
      key: "tabName",
      title: "Name",
      dataIndex: "tabName",
    },
    {
      key: "status",
      title: "Status",
      dataIndex: "activeStatus",
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
              setTab(record);
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

  const tabData = data?.data;

  const filteredData = tabData
    ?.filter((item) =>
      item?.tabName?.toLowerCase()?.includes(searchTerm.toLowerCase())
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
        <h3>Tab Setup</h3>
        <Button
          onClick={() => setShowAddModal(true)}
          iconBefore={<Add />}
          text="Setup"
        />
      </section>

      <section className={styles.card}>
        <div className={styles.inside}>
          <p>
            Showing 1-{filteredData?.length} of {tabData?.length}
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
          pagination={{ position: ["bottomCenter"] }}
        />
      </section>

      <Modal
        open={showAddModal}
        onCancel={() => setShowAddModal(false)}
        centered
        title="Tab Setup"
        footer={null}
      >
        <AddTab handleClose={() => setShowAddModal(false)} />
      </Modal>

      {tab?.id && openEdit && (
        <Modal
          open={openEdit}
          onCancel={() => setOpenEdit(false)}
          centered
          title="Edit Setup"
          footer={null}
        >
          <EditTab tab={tab} handleClose={() => setOpenEdit(false)} />
        </Modal>
      )}

      {tab?.id && openDelete && (
        <Modal
          open={openDelete}
          onCancel={() => setOpenDelete(false)}
          centered
          title="Delete Tab Setup"
          footer={null}
        >
          <DeleteModalContent
            isLoading={deleteTabMutation?.isPending}
            handleCloseModal={() => setOpenDelete(false)}
            handleSubmit={deleteTabHandler}
            title={tab?.tabName}
            isActive={false}
          />
        </Modal>
      )}
    </main>
  );
};

export default TabSetup;
