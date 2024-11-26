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
  App,
} from "antd";
import styles from "../styles.module.scss";
import Button from "../../../custom/button/button";
import { useState } from "react";
import SearchInput from "../../../custom/searchInput/searchInput";
import AddCareerProspects from "./addCareerProspects";
import { ReactComponent as Ellipsis } from "../../../assets/ellipsis.svg";
import { useMutation, useQuery } from "@tanstack/react-query";
import { deleteCareerProspect, getCareerProspects } from "../../../requests";
import { ColumnsType } from "antd/es/table";
import { useNavigate } from "react-router-dom";
import { sanitizeAndLimitString } from "../../../utils/sanitizeAndLimitString";
import DeleteModalContent from "../../deleteModal/deleteModal";
import { usePagination } from "../../../hooks/usePagination";

const CareerProspects = () => {
  const [showSearch, setShowSearch] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [showAllFilter, setShowAllFilter] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [careerProspectItems, setCareerProspectItems] =
    useState<CareerProspect>({} as CareerProspect);
  const [openDelete, setOpenDelete] = useState(false);

  const { currentPage, onChange } = usePagination();

  const { notification } = App.useApp();

  const navigate = useNavigate();

  const handleSearch = (e: any) => {
    setSearchTerm(e.target.value);
  };

  const deleteCareerProspectMutation = useMutation({
    mutationFn: deleteCareerProspect,
  });

  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: ["get-career-prospect"],
    queryFn: () => getCareerProspects(currentPage, 10),
  });

  const careerProspectData = data?.data as CareerProspect[];

  const deleteCareerProspectHandler = async () => {
    try {
      await deleteCareerProspectMutation.mutateAsync(careerProspectItems?.id, {
        onSuccess: (data) => {
          notification.success({
            message: "Success",
            description: data?.message,
          });
          refetch();
          setOpenDelete((prevState) => !prevState);
        },
      });
    } catch (error: any) {
      notification.error({
        message: "Error",
        description: error?.response?.data?.message,
      });
    }
  };

  const columns: ColumnsType<CareerProspect> = [
    {
      key: "programName",
      title: "Program Name",
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
      title: "Action",
      render: (_, record) => {
        const items: MenuProps["items"] = [
          {
            key: "1",
            label: "Add Items",
            onClick: () => navigate(`/career-prospect-items/${record.id}`),
          },
          {
            key: "2",
            label: "Edit",
            onClick: () => {
              setCareerProspectItems(record);
              setOpenEdit(true);
            },
          },
          {
            key: "3",
            label: "Delete",
            onClick: () => {
              setCareerProspectItems(record);
              setOpenDelete(true);
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

  const handleOpenModal = () => {
    setCareerProspectItems({} as CareerProspect);
    setShowAddModal((prevState) => !prevState);
  };

  const handleModal = (status: boolean) => setShowAddModal(status);

  if (isLoading) {
    return <Spin />;
  }

  if (isError) {
    return <div>Error: {error?.message}</div>;
  }

  return (
    <main>
      <section className="space-between">
        <h3>Career Prospects Setup</h3>
        <Button onClick={handleOpenModal} iconBefore={<Add />} text="Setup" />
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
          dataSource={careerProspectData}
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
        title="Career Prospects Setup"
        footer={null}
      >
        <AddCareerProspects
          item={careerProspectItems}
          handleClose={() => handleModal(false)}
        />
      </Modal>

      <Modal
        open={openEdit}
        onCancel={() => setOpenEdit(false)}
        centered
        title="Career Prospects Setup"
        footer={null}
      >
        <AddCareerProspects
          item={careerProspectItems}
          handleClose={() => setOpenEdit(false)}
        />
      </Modal>

      <Modal
        open={openDelete}
        onCancel={() => setOpenDelete(false)}
        centered
        title="Delete Career Prospect Setup"
        footer={null}
      >
        <DeleteModalContent
          isLoading={deleteCareerProspectMutation?.isPending}
          handleCloseModal={() => setOpenDelete(false)}
          handleSubmit={deleteCareerProspectHandler}
          title="this item"
        />
      </Modal>
    </main>
  );
};

export default CareerProspects;
