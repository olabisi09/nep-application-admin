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

import { ReactComponent as Add } from "../../../../assets/add.svg";
import { ReactComponent as Ellipsis } from "../../../../assets/ellipsis.svg";
import { ReactComponent as Search } from "../../../../assets/search.svg";
// import { ReactComponent as Filter } from "../../../../assets/Frame 48095998 (1).svg";
import Button from "../../../../custom/button/button";
import SearchInput from "../../../../custom/searchInput/searchInput";
import { usePagination } from "../../../../hooks/usePagination";
import { useSearchTerms } from "../../../../hooks/useSearchTerms";
import { deleteCountry, getCountry } from "../../../../requests";
import DeleteModalContent from "../../../deleteModal/deleteModal";
import styles from "../../styles.module.scss";

import AddCountry from "./addCountry";

const CountrySetup = () => {
  const [showSearch, setShowSearch] = useState(false);
  // const [showAllFilter, setShowAllFilter] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [indexData, setIndexData] = useState({} as Country);
  const [openDelete, setOpenDelete] = useState(false);

  const { currentPage, onChange } = usePagination();
  const { searchTerm, handleSearch } = useSearchTerms();

  const { notification } = App.useApp();
  const queryClient = useQueryClient();

  const handleEdit = (data: Country) => {
    setIndexData(data);
    setOpenEdit(true);
  };

  const handleDelete = (data: Country) => {
    setIndexData(data);
    setOpenDelete(true);
  };

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["get-country", currentPage],
    queryFn: () => getCountry({ pageNumber: currentPage, pageSize: 10 }),
  });

  const countryData = data?.data as Country[];

  const filteredData = countryData
    ?.filter((country) =>
      country?.countryName?.toLowerCase()?.includes(searchTerm.toLowerCase())
    )
    ?.map((item) => ({ ...item, key: item.id }));

  const items = (record: Country): MenuProps["items"] => [
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
      key: "countryName",
      title: "country Name",
      dataIndex: "countryName",
    },
    {
      key: "activeStatus",
      title: "Active Status",
      dataIndex: "activeStatus",
      render: (text: boolean) => (text ? "Active" : "Inactive"),
    },

    {
      key: "action",
      title: "Action",
      render: (record: Country) => (
        <Dropdown menu={{ items: items(record) }} trigger={["click"]}>
          <AntButton type="text" icon={<Ellipsis />} />
        </Dropdown>
      ),
    },
  ];

  const deleteCountryMutation = useMutation({ mutationFn: deleteCountry });

  const deleteCountryHandler = async () => {
    try {
      await deleteCountryMutation.mutateAsync(indexData.id, {
        onSuccess: (data) => {
          notification.success({
            message: "Success",
            description: data?.message,
          });

          queryClient.refetchQueries({
            queryKey: ["get-country"],
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
        <h3>Country Setup</h3>
        <Button
          onClick={() => setShowAddModal(true)}
          iconBefore={<Add />}
          text="Setup"
        />
      </section>

      <section className={styles.card}>
        <div className={styles.inside}>
          <p>
            Showing 1-{filteredData?.length} of {countryData?.length}
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
        title="Country Setup"
        footer={null}
      >
        <AddCountry handleClose={() => setShowAddModal(false)} />
      </Modal>

      <Modal
        open={openEdit}
        onCancel={() => setOpenEdit(false)}
        centered
        title="Edit Country Setup"
        footer={null}
      >
        <AddCountry handleClose={() => setOpenEdit(false)} data={indexData} />
      </Modal>

      <Modal
        open={openDelete}
        onCancel={() => setOpenDelete(false)}
        centered
        title="Delete Country Setup"
        footer={null}
      >
        <DeleteModalContent
          isLoading={deleteCountryMutation?.isPending}
          handleCloseModal={() => setOpenDelete(false)}
          handleSubmit={deleteCountryHandler}
          title={indexData?.countryName}
        />
      </Modal>
    </main>
  );
};

export default CountrySetup;
