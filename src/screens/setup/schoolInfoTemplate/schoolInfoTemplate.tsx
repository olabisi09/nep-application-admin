import { Card, Dropdown, Empty, MenuProps, Modal, Spin } from "antd";
import { ReactComponent as Plus } from "../../../assets/add.svg";
import { ReactComponent as Ellipsis } from "../../../assets/ellipsis.svg";
import Button from "../../../custom/button/button";
import { useState } from "react";
import { CreateTemplate, EditTemplate } from "./setup";
import { useQuery } from "@tanstack/react-query";
import { getTemplate } from "../../../requests";

const SchoolInfoTemplate = () => {
  const [open, setOpen] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["get-school-info-template"],
    queryFn: getTemplate,
  });

  const items: MenuProps["items"] = [
    {
      key: "1",
      label: "Edit",
      onClick: () => setOpenEdit(true),
    },
  ];

  const template = data?.data?.[0] as Template;

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
      {data?.data && data.data?.length > 0 ? (
        <>
          <Card bordered={false} style={{ maxWidth: "34.286rem" }}>
            <Dropdown menu={{ items }} trigger={["click"]}>
              <Button
                removePadding
                bgColor="transparent"
                variant="text"
                iconBefore={<Ellipsis />}
                className="align-end"
              />
            </Dropdown>
            <div className="fields">
              <div className="space-between-grid">
                <b>ID</b>
                <p>{template.id}</p>
              </div>
              <div className="space-between-grid">
                <b>School Name</b>
                <p>{template.schoolName}</p>
              </div>
              <div className="space-between-grid">
                <b>Logo Url</b>
                <p>{template.logoUrl || "N/A"}</p>
              </div>
              <div className="space-between-grid">
                <b>Home Page</b>
                <img
                  className="table-img"
                  src={template.homePageImageUrl}
                  alt=""
                />
              </div>
              <div className="space-between-grid">
                <b>About Us</b>
                <img
                  className="table-img"
                  src={template.aboutUsImageUrl}
                  alt=""
                />
              </div>
              <div className="space-between-grid">
                <b>Login</b>
                <img
                  className="table-img"
                  src={template.loginBackgroundImageUrl}
                  alt=""
                />
              </div>
              {/* <div className="space-between-grid">
                <b>Contact Us</b>
                <img className="table-img" src={pic} alt="" />
              </div> */}
              <div className="space-between-grid">
                <b>Email Address</b>
                <p>{template.schoolEmailAddress}</p>
              </div>
              <div className="space-between-grid">
                <b>Phone Number</b>
                <p>{template.schoolPhoneNumber}</p>
              </div>
              <div className="space-between-grid">
                <b>Address</b>
                <p>{template.schoolAddress}</p>
              </div>
            </div>
          </Card>
          <Modal
            open={open}
            onCancel={() => setOpen(false)}
            centered
            title="Template Setup"
            footer={null}
          >
            <CreateTemplate handleClose={() => setOpen(false)} />
          </Modal>
          <Modal
            open={openEdit}
            onCancel={() => setOpenEdit(false)}
            centered
            title="Edit Template"
            footer={null}
          >
            <EditTemplate handleClose={() => setOpenEdit(false)} />
          </Modal>
        </>
      ) : (
        <Empty />
      )}
    </div>
  );
};

export default SchoolInfoTemplate;
