import { Card, Image, Modal, Spin } from "antd";
import { ReactComponent as Plus } from "../../../assets/add.svg";
import pic from "../../../assets/placeholder-img.png";
import Button from "../../../custom/button/button";
import { useState } from "react";
import { EditTemplate, SetupSchoolInfoTemplate } from "./setup";
import { useQuery } from "@tanstack/react-query";
import { getGeneralTemplates } from "../../../requests";

const SchoolInfoTemplate = () => {
  const [open, setOpen] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [id, setId] = useState(0);

  const handleOpenEditModal = (template: GeneralTemplate) => {
    setId(template?.id);
    setOpenEdit(true);
    console.log(id);
  };

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["get-general-template"],
    queryFn: getGeneralTemplates,
  });

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
        <Button onClick={() => setOpen(true)} iconBefore={<Plus />} text="Setup" />
      </section>
      <br />

      <div className="cards">
        {data &&
          generalTemplateData &&
          generalTemplateData.map((template) => (
            <Card bordered={false} style={{ maxWidth: "34.286rem" }} key={template?.id}>
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
                  <img src={template?.homePageImageUrl} alt="" />
                </div>
                <div className="space-between-grid">
                  <b>About Us</b>
                  <Image src={template?.aboutUsImageUrl} alt="" />
                </div>
                <div className="space-between-grid">
                  <b>Login</b>
                  <Image src={template?.loginBackgroundImageUrl} alt="" />
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
                  <Button onClick={() => handleOpenEditModal(template)} iconBefore={<Plus />} text="Edit" />
                </div>
              </div>

              {id === template?.id && openEdit && (
                <Modal open={openEdit} onCancel={() => setOpenEdit(false)} centered title="Edit Template Setup" footer={null}>
                <EditTemplate handleClose={() => setOpenEdit(false)} data={template} />
              </Modal>
              )}
              
            </Card>
          ))}
      </div>

      <Modal open={open} onCancel={() => setOpen(false)} centered title="Template Setup" footer={null}>
        <SetupSchoolInfoTemplate handleClose={() => setOpen(false)} />
      </Modal>
    </div>
  );
};

export default SchoolInfoTemplate;
