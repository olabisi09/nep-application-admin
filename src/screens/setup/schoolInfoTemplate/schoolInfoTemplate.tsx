/* eslint-disable no-undef */
import { useState } from "react";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { App, Card, Image, Modal, Spin } from "antd";

import { ReactComponent as Plus } from "../../../assets/add.svg";
import Button from "../../../custom/button/button";
import { deleteGeneralTemplate, getGeneralTemplates } from "../../../requests";
import DeleteModalContent from "../../deleteModal/deleteModal";

import { EditTemplate, SetupSchoolInfoTemplate } from "./setup";

const SchoolInfoTemplate = () => {
  const [open, setOpen] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [id, setId] = useState(0);
  const [openDelete, setOpenDelete] = useState(false);
  const { notification } = App.useApp();
  const queryClient = useQueryClient();

  const handleOpenEditModal = (template: GeneralTemplate) => {
    setId(template?.id);
    setOpenEdit(true);
  };

  const handleDelete = (data: GeneralTemplate) => {
    setId(data?.id);
    setOpenDelete(true);
  };

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["get-general-template"],
    queryFn: getGeneralTemplates,
  });

  const DeleteTemplateMutation = useMutation({
    mutationFn: () => deleteGeneralTemplate(id),
    mutationKey: ["delete-template"],
  });

  const DeleteTemplateHandler = async () => {
    try {
      await DeleteTemplateMutation.mutateAsync(undefined, {
        onSuccess: (data) => {
          notification.success({
            message: "Success",
            description: data?.message,
          });
          queryClient.refetchQueries({
            queryKey: ["get-general-template"],
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

  const generalTemplateData = data?.data;
  if (isLoading) {
    return <Spin />;
  }
  if (isError) {
    return <div>Error: {error?.message}</div>;
  }
  return (
    <div>
      <section className="space-between">
        <h3>Template</h3>
        <Button
          onClick={() => setOpen(true)}
          iconBefore={<Plus />}
          text="Setup"
        />
      </section>
      <br />

      <div className="cards">
        {data &&
          generalTemplateData &&
          generalTemplateData.map((template) => (
            <Card
              bordered={false}
              style={{ maxWidth: "34.286rem" }}
              key={template?.id}
            >
              <div className="fields">
                <div className="space-between-grid">
                  <b>School Name</b>
                  <p>{template?.schoolName}</p>
                </div>
                {/* <div className="space-between-grid">
              <b>Logo Url</b>
              <p>www.kuw.edu.ng</p>
            </div> */}
                <div className="space-between-grid">
                  <b>Home Page</b>
                  <Image
                    src={template?.homePageImageUrl}
                    alt=""
                    className="table-img"
                  />
                </div>
                <div className="space-between-grid">
                  <b>About Us</b>
                  <Image
                    src={template?.aboutUsImageUrl}
                    alt=""
                    className="table-img"
                  />
                </div>
                <div className="space-between-grid">
                  <b>Login</b>
                  <Image
                    src={template?.loginBackgroundImageUrl}
                    alt=""
                    className="table-img"
                  />
                </div>
                {/* <div className="space-between-grid">
              <b>Contact Us</b>
              <Image src={pic} alt="" />
            </div> */}
                <div className="space-between-grid">
                  <b>Email Address</b>
                  <p>{template?.schoolEmailAddress}</p>
                </div>
                <div className="space-between-grid">
                  <b>Phone Number</b>
                  <p>{template?.schoolPhoneNumber}</p>
                </div>
                <div className="space-between-grid">
                  <b>Address</b>
                  <p>{template?.schoolAddress}</p>
                </div>
                <div className="edit-button">
                  <Button
                    onClick={() => handleOpenEditModal(template)}
                    text="Edit"
                  />
                  <Button
                    onClick={() => handleDelete(template)}
                    text="Delete"
                    bgColor="red"
                  />
                </div>
              </div>

              {id === template?.id && openEdit && (
                <Modal
                  open={openEdit}
                  onCancel={() => setOpenEdit(false)}
                  centered
                  title="Edit Template Setup"
                  footer={null}
                >
                  <EditTemplate
                    handleClose={() => setOpenEdit(false)}
                    data={template}
                  />
                </Modal>
              )}

              {id === template?.id && openDelete && (
                <Modal
                  open={openDelete}
                  onCancel={() => setOpenDelete(false)}
                  centered
                  title=" Delete Template Setup"
                  footer={null}
                >
                  <DeleteModalContent
                    isLoading={DeleteTemplateMutation?.isPending}
                    handleCloseModal={() => setOpenDelete(false)}
                    handleSubmit={DeleteTemplateHandler}
                    title={"this template"}
                  />
                </Modal>
              )}
            </Card>
          ))}
      </div>

      <Modal
        open={open}
        onCancel={() => setOpen(false)}
        centered
        title="Template Setup"
        footer={null}
      >
        <SetupSchoolInfoTemplate handleClose={() => setOpen(false)} />
      </Modal>
    </div>
  );
};

export default SchoolInfoTemplate;
