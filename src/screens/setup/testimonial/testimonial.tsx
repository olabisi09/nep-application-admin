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
import { AddTestimonial, EditTestimonial } from "./addTestimonial";
import { ReactComponent as Ellipsis } from "../../../assets/ellipsis.svg";
import { deleteTestimonial, getAllTestimonials } from "../../../requests";
import { useMutation, useQuery } from "@tanstack/react-query";
import { ColumnsType } from "antd/es/table";
import { sanitizeAndLimitString } from "../../../utils/sanitizeAndLimitString";
import DeleteModalContent from "../../deleteModal/deleteModal";
import { usePagination } from "../../../hooks/usePagination";

const TestimonySetup = () => {
  const { notification } = App.useApp();
  const [showSearch, setShowSearch] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [showAllFilter, setShowAllFilter] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [testimonial, setTestimonial] = useState<Testimonial>(
    {} as Testimonial
  );
  const [openDelete, setOpenDelete] = useState(false);

  const { currentPage, onChange } = usePagination();

  const deleteTestimonialMutation = useMutation({
    mutationFn: deleteTestimonial,
  });

  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: ["get-testimonials"],
    queryFn: () =>
      getAllTestimonials({ pageNumber: currentPage, pageSize: 10 }),
  });

  const handleSearch = (e: any) => {
    setSearchTerm(e.target.value);
  };

  const handleDelete = (data: Testimonial) => {
    setTestimonial(data);
    setOpenDelete(true);
  };

  const columns: ColumnsType<Testimonial> = [
    {
      key: "programName",
      title: "Program Name",
      dataIndex: "programName",
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
      key: "imageUrl",
      title: "Picture",
      dataIndex: "imageUrl",
      render: (_, { imageUrl }) => (
        <img className="table-img" src={imageUrl} alt="" />
      ),
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
              setTestimonial(record);
              setOpenEdit(true);
            },
          },
          {
            key: "2",
            label: "Delete",
            onClick: () => handleDelete(record),
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

  const deleteTestimonialHandler = async () => {
    try {
      await deleteTestimonialMutation.mutateAsync(testimonial?.id, {
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

  const testimonialsData = data?.data;

  if (isLoading) {
    return <Spin />;
  }

  if (isError) {
    return <div>Error: {error?.message}</div>;
  }
  
  return (
    <main>
      <section className="space-between">
        <h3>Testimonial Setup</h3>
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
          dataSource={testimonialsData}
          columns={columns}
          pagination={{
            position: ["bottomCenter"],
            current: currentPage,
            total: data?.totalSize,
            onChange: onChange,
            pageSize: 10,
          }}
          rowKey={(record, index) => `${record.id}${index}`}
        />
      </section>

      <Modal
        open={showAddModal}
        onCancel={() => setShowAddModal(false)}
        centered
        title="Testimonial Setup "
        footer={null}
      >
        <AddTestimonial
          handleClose={() => {
            setShowAddModal(false);
          }}
        />
      </Modal>

      <Modal
        open={openEdit}
        onCancel={() => setOpenEdit(false)}
        centered
        title="Testimonial Setup"
        footer={null}
      >
        <EditTestimonial
          handleClose={() => setOpenEdit(false)}
          testimonial={testimonial}
        />
      </Modal>

      <Modal
        open={openDelete}
        onCancel={() => setOpenDelete(false)}
        centered
        title="Delete Testimonial Setup"
        footer={null}
      >
        <DeleteModalContent
          isLoading={deleteTestimonialMutation?.isPending}
          handleCloseModal={() => setOpenDelete(false)}
          handleSubmit={deleteTestimonialHandler}
          title={"this item"}
          isActive={false}
        />
      </Modal>
    </main>
  );
};

export default TestimonySetup;
