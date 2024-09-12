import {
  Card,
  Dropdown,
  MenuProps,
  Modal,
  Button as AntButton,
  App,
  Spin,
  Empty,
} from "antd";
import { ReactComponent as Plus } from "../../../assets/add.svg";
import { ReactComponent as Ellipsis } from "../../../assets/ellipsis.svg";
import Button from "../../../custom/button/button";
import { useState } from "react";
import SetupWhySchool from "./setup";
import { useNavigate } from "react-router-dom";
import { useMutation, useQuery } from "@tanstack/react-query";
import { deleteWhy, getAllWhy } from "../../../requests";
import DeleteModalContent from "../../deleteModal/deleteModal";

const WhySchool = () => {
  const { notification } = App.useApp();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);

  const deleteWhyMutation = useMutation({ mutationFn: deleteWhy });
  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: ["get-all-why"],
    queryFn: getAllWhy,
  });

  const whyData = data?.data as Why;

  const items: MenuProps["items"] = [
    {
      key: "1",
      label: "Edit",
      onClick: () => setOpenEdit(true),
    },
    {
      key: "2",
      label: "Why us items",
      onClick: () => navigate(`/why-us/${whyData?.id}/why-items`),
    },
    {
      key: "3",
      label: "Delete",
      onClick: () => setOpenDelete(true),
    },
  ];

  const deleteWhyHandler = async () => {
    try {
      await deleteWhyMutation.mutateAsync(whyData?.id, {
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
        <h3>Why School Setup</h3>
        {!whyData && (
          <Button
            onClick={() => setOpen(true)}
            iconBefore={<Plus />}
            text="Setup"
          />
        )}
      </section>
      <br />
      <Card bordered={false} style={{ maxWidth: "34.286rem" }}>
        {whyData ? (
          <>
            <Dropdown menu={{ items }} trigger={["click"]}>
              <AntButton
                style={{ display: "block", marginLeft: "auto" }}
                icon={<Ellipsis />}
              />
            </Dropdown>
            <section className="fields">
              <div className="space-between-grid">
                <b>Title</b>
                <p>{whyData?.schoolName}</p>
              </div>
            </section>
          </>
        ) : (
          <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
        )}
      </Card>
      <Modal
        open={openEdit}
        onCancel={() => setOpenEdit(false)}
        centered
        title="Edit Why School Setup"
        footer={null}
      >
        <SetupWhySchool data={whyData} handleClose={() => setOpenEdit(false)} />
      </Modal>
      <Modal
        open={openDelete}
        onCancel={() => setOpenDelete(false)}
        centered
        title="Delete FAQ"
        footer={null}
      >
        <DeleteModalContent
          isLoading={deleteWhyMutation.isPending}
          handleCloseModal={() => setOpenDelete(false)}
          handleSubmit={deleteWhyHandler}
          title={whyData?.schoolName}
        />
      </Modal>
    </div>
  );
};

export default WhySchool;
