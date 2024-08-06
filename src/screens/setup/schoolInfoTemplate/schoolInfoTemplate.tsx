import { Card, Modal } from "antd";
import { ReactComponent as Plus } from "../../../assets/add.svg";
import pic from "../../../assets/placeholder-img.png";
import Button from "../../../custom/button/button";
import { useState } from "react";
import SetupSchoolInfoTemplate from "./setup";

const SchoolInfoTemplate = () => {
  const [open, setOpen] = useState(false);

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
      <Card bordered={false} style={{ maxWidth: "34.286rem" }}>
        <div className="fields">
          <div className="space-between-grid">
            <b>ID</b>
            <p>12345</p>
          </div>
          <div className="space-between-grid">
            <b>School Name</b>
            <p>Kwararafa University</p>
          </div>
          <div className="space-between-grid">
            <b>Logo Url</b>
            <p>www.kuw.edu.ng</p>
          </div>
          <div className="space-between-grid">
            <b>Home Page</b>
            <img className="table-img" src={pic} alt="" />
          </div>
          <div className="space-between-grid">
            <b>About Us</b>
            <img className="table-img" src={pic} alt="" />
          </div>
          <div className="space-between-grid">
            <b>Login</b>
            <img className="table-img" src={pic} alt="" />
          </div>
          <div className="space-between-grid">
            <b>Contact Us</b>
            <img className="table-img" src={pic} alt="" />
          </div>
          <div className="space-between-grid">
            <b>Email Address</b>
            <p>info@kuw.edu.ng</p>
          </div>
          <div className="space-between-grid">
            <b>Phone Number</b>
            <p>08132424255</p>
          </div>
          <div className="space-between-grid">
            <b>Address</b>
            <p>Taraba State</p>
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
        <SetupSchoolInfoTemplate handleClose={() => setOpen(false)} />
      </Modal>
    </div>
  );
};

export default SchoolInfoTemplate;
