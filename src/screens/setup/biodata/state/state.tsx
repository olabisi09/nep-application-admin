/* eslint-disable no-undef */
import { useState } from "react";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  Button as AntButton,
  App,
  Dropdown,
  MenuProps,
  Modal,
  Spin,
  Table,
} from "antd";
import { Form, Formik } from "formik";

import { ReactComponent as Add } from "../../../../assets/add.svg";
import { ReactComponent as Ellipsis } from "../../../../assets/ellipsis.svg";
import { ReactComponent as Search } from "../../../../assets/search.svg";
import Button from "../../../../custom/button/button";
import SearchInput from "../../../../custom/searchInput/searchInput";
import { usePagination } from "../../../../hooks/usePagination";
import { useSearchTerms } from "../../../../hooks/useSearchTerms";
import { deleteState, getState } from "../../../../requests";
import DeleteModalContent from "../../../deleteModal/deleteModal";
import styles from "../../styles.module.scss";


import AddState from "./addState";


const StateSetup = () => {
  const [showSearch, setShowSearch] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [indexData, setIndexData] = useState({} as State);
  const [openDelete, setOpenDelete] = useState(false);

  const { currentPage, onChange } = usePagination();
  const { searchTerm, handleSearch } = useSearchTerms();

  const { notification } = App.useApp();
  const queryClient = useQueryClient();

  const handleEdit = (data: State) => {
    setIndexData(data);
    setOpenEdit(true);
  };

  const handleDelete = (data: State) => {
    setIndexData(data);
    setOpenDelete(true);
  };

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["get-state", currentPage],
    queryFn: () => getState({ pageNumber: currentPage, pageSize: 10 }),
  });

  const stateData = data?.data as State[];

  const filteredData = stateData
    ?.filter((state) =>
      state?.stateName?.toLowerCase()?.includes(searchTerm.toLowerCase())
    )
    ?.map((item) => ({ ...item, key: item.id }));

  const items = (record: State): MenuProps["items"] => [
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
      key: "countryId",
      title: "Country Name",
      dataIndex: "countryName",
    },
    {
      key: "stateName",
      title: "State Name",
      dataIndex: "stateName",
    },
    {
      key: "activeStatus",
      title: "Active Status",
      dataIndex: "activeStatus",
      render: (text: boolean) => (text ? "Active" : "Inactive"),
    },

    {
      key: "action",
      title: "",
      render: (record: State) => (
        <Dropdown menu={{ items: items(record) }} trigger={["click"]}>
          <AntButton type="text" icon={<Ellipsis />} />
        </Dropdown>
      ),
    },
  ];

  const deleteStateMutation = useMutation({ mutationFn: deleteState });

  const deleteStateHandler = async () => {
    try {
      await deleteStateMutation.mutateAsync(indexData.id, {
        onSuccess: (data) => {
          notification.success({
            message: "Success",
            description: data?.message,
          });
          queryClient.refetchQueries({
            queryKey: ["get-state"],
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

  if (isLoading) {
    return <Spin />;
  }

  if (isError) {
    return <div>Error: {error?.message}</div>;
  }

  return (
    <main>
      <section className="space-between">
        <h3>State/Province/District Setup</h3>
        <Button
          onClick={() => setShowAddModal(true)}
          iconBefore={<Add />}
          text="Setup"
        />
      </section>

      <section className={styles.card}>
        <div className={styles.inside}>
          <p>
            Showing 1-{filteredData?.length} of {stateData?.length}
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
        title="State/Province/District Setup"
        footer={null}
      >
        <Formik initialValues={{}} onSubmit={() => {}}>
          <Form>
            <AddState handleClose={() => setShowAddModal(false)} />
          </Form>
        </Formik>
      </Modal>

      <Modal
        open={openEdit}
        onCancel={() => setOpenEdit(false)}
        centered
        title="Edit State/Province/District Setup"
        footer={null}
      >
        <AddState handleClose={() => setOpenEdit(false)} data={indexData} />
      </Modal>
      <Modal
        open={openDelete}
        onCancel={() => setOpenDelete(false)}
        centered
        title="Delete State/Province/District Setup"
        footer={null}
      >
        <DeleteModalContent
          isLoading={deleteStateMutation?.isPending}
          handleCloseModal={() => setOpenDelete(false)}
          handleSubmit={deleteStateHandler}
          title={indexData?.stateName}
        />
      </Modal>
    </main>
  );
};

export default StateSetup;
