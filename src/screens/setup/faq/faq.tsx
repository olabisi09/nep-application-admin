import {
  Card,
  Dropdown,
  MenuProps,
  Modal,
  Table,
  Button as AntButton,
  Spin,
  App,
} from "antd";
import { ReactComponent as Plus } from "../../../assets/add.svg";
import { ReactComponent as Ellipsis } from "../../../assets/ellipsis.svg";
import Button from "../../../custom/button/button";
import { useState } from "react";
import SetupFaq from "./setup";
import QAndA from "./qAndA";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { deleteFAQ, getAllFAQ } from "../../../requests";
import DeleteModalContent from "../../deleteModal/deleteModal";
import { useNavigate } from "react-router-dom";

const Faq = () => {
  const [open, setOpen] = useState(false);
  const [openQAndA, setOpenQAndA] = useState(false);
  const [openEditQAndA, setOpenEditQAndA] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [showAllFilter, setShowAllFilter] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [indexData, setIndexData] = useState({} as FAQ);
  const [openDelete, setOpenDelete] = useState(false);
  const { notification } = App.useApp();
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const handleSearch = (e: any) => {
    setSearchTerm(e.target.value);
  };

  const handleEdit = (data: FAQ) => {
    setIndexData(data);
    setOpenEdit(true);
  };

  const handleDelete = (data: FAQ) => {
    setIndexData(data);
    setOpenDelete(true);
  };

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["get-AllFAQ"],
    queryFn: getAllFAQ,
  });

  const FAQData = data?.data as FAQ[];

  const items = (record: FAQ): MenuProps["items"] => [
    {
      key: "1",
      label: "Edit",
      onClick: () => handleEdit(record),
    },
    {
      key: "2",
      label: "Questions & Answers",
      onClick: () => navigate(`/faq/${record.id}/faq-items`),
    },
    // {
    //   key: "3",
    //   label: "Edit Questions & Answers",
    //   onClick: () => setOpenEditQAndA(true),
    // },
    {
      key: "3",
      label: "Delete",
      onClick: () => handleDelete(record),
    },
  ];

  const columns = [
    {
      key: "id",
      title: "ID",
      dataIndex: "id",
    },
    {
      key: "name",
      title: "Name",
      dataIndex: "name",
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
      render: (record: FAQ) => (
        <Dropdown menu={{ items: items(record) }} trigger={["click"]}>
          <AntButton type="text" icon={<Ellipsis />} />
        </Dropdown>
      ),
    },
  ];

  const deleteFAQMutation = useMutation({ mutationFn: deleteFAQ });

  const DeleteFAQHandler = async () => {
    try {
      await deleteFAQMutation.mutateAsync(indexData.id, {
        onSuccess: (data) => {
          notification.success({
            message: "Success",
            description: data?.message,
          });
          queryClient.refetchQueries({
            queryKey: ["get-AllFAQ"],
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
    <div>
      <section className="space-between">
        <h3>FAQ Setup</h3>
        <Button
          onClick={() => setOpen(true)}
          iconBefore={<Plus />}
          text="Setup"
        />
      </section>
      <br />
      <Card bordered={false}>
        <Table
          dataSource={FAQData}
          columns={columns}
          pagination={{ position: ["bottomCenter"] }}
          rowKey={(record) => record.id}
          scroll={{ x: true }}
        />
      </Card>
      <Modal
        open={open}
        onCancel={() => setOpen(false)}
        centered
        title="FAQ Setup"
        footer={null}
      >
        <SetupFaq handleClose={() => setOpen(false)} />
      </Modal>
      <Modal
        open={openEdit}
        onCancel={() => setOpenEdit(false)}
        centered
        title="Edit FAQ Setup"
        footer={null}
      >
        <SetupFaq handleClose={() => setOpenEdit(false)} data={indexData} />
      </Modal>
      <Modal
        open={openQAndA}
        onCancel={() => setOpenQAndA(false)}
        centered
        title="FAQ Items Setup"
        footer={null}
      >
        <QAndA handleClose={() => setOpenQAndA(false)} />
      </Modal>
      <Modal
        open={openEditQAndA}
        onCancel={() => setOpenEditQAndA(false)}
        centered
        title="Edit FAQ Items Setup"
        footer={null}
      >
        <QAndA handleClose={() => setOpenEditQAndA(false)} />
      </Modal>
      <Modal
        open={openDelete}
        onCancel={() => setOpenDelete(false)}
        centered
        title="Delete FAQ Setup"
        footer={null}
      >
        <DeleteModalContent
          isLoading={deleteFAQMutation?.isPending}
          handleCloseModal={() => setOpenDelete(false)}
          handleSubmit={DeleteFAQHandler}
          title={indexData.name}
        />
      </Modal>
    </div>
  );
};

export default Faq;
