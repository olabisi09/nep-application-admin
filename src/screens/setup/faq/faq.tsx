import {
  Card,
  Dropdown,
  MenuProps,
  Modal,
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
import { useMutation, useQuery } from "@tanstack/react-query";
import { deleteFAQ, getAllFAQ } from "../../../requests";
import DeleteModalContent from "../../deleteModal/deleteModal";
import { useNavigate } from "react-router-dom";
import { sanitizeAndLimitString } from "../../../utils/sanitizeAndLimitString";

const Faq = () => {
  const [open, setOpen] = useState(false);
  const [openQAndA, setOpenQAndA] = useState(false);
  const [openEditQAndA, setOpenEditQAndA] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const { notification } = App.useApp();

  const navigate = useNavigate();

  const handleEdit = () => setOpenEdit(true);

  const handleDelete = (id: number) => {
    setOpenDelete(true);
  };

  const deleteFAQMutation = useMutation({ mutationFn: deleteFAQ });
  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: ["get-AllFAQ"],
    queryFn: getAllFAQ,
  });

  const faqData = data?.data as FAQ;
  const limitedCleanHtml = sanitizeAndLimitString(faqData?.description);

  const items: MenuProps["items"] = [
    {
      key: "1",
      label: "Edit",
      onClick: () => handleEdit(),
    },
    {
      key: "2",
      label: "Questions & Answers",
      onClick: () => navigate(`/faq/${faqData?.id}/faq-items`),
    },
    {
      key: "3",
      label: "Delete",
      onClick: () => handleDelete(faqData?.id),
    },
  ];

  const DeleteFAQHandler = async () => {
    try {
      await deleteFAQMutation.mutateAsync(faqData?.id, {
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
      <Card bordered={false} style={{ maxWidth: "34.286rem" }}>
        <Dropdown menu={{ items }} trigger={["click"]}>
          <AntButton
            style={{ display: "block", marginLeft: "auto" }}
            icon={<Ellipsis />}
          />
        </Dropdown>
        <section className="fields">
          <div className="space-between-grid">
            <b>Title</b>
            <p>{faqData?.name}</p>
          </div>
          <div className="space-between-grid">
            <b>Description</b>
            <p dangerouslySetInnerHTML={{ __html: limitedCleanHtml }} />
          </div>
        </section>
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
        <SetupFaq handleClose={() => setOpenEdit(false)} data={faqData} />
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
        title="Delete FAQ"
        footer={null}
      >
        <DeleteModalContent
          isLoading={deleteFAQMutation?.isPending}
          handleCloseModal={() => setOpenDelete(false)}
          handleSubmit={DeleteFAQHandler}
          title={faqData?.name}
        />
      </Modal>
    </div>
  );
};

export default Faq;
