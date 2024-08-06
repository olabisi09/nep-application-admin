import { useState } from "react";
import Input from "../../../custom/input/input";
import Upload from "../../../custom/upload/upload";
import { ReactComponent as Image } from "../../../assets/image.svg";
import Button from "../../../custom/button/button";
import { Form, Formik } from "formik";

interface Init {
  schoolName: string;
  logoUrl: string;
  homePage: any;
  aboutUs: any;
  loginBackground: any;
  contactUs: any;
  email: string;
  address: string;
}

const SetupSchoolInfoTemplate = ({
  handleClose,
}: {
  handleClose: () => void;
}) => {
  const fileValues: { label: string; name: keyof Init }[] = [
    {
      label: "Home Page Image",
      name: "homePage",
    },
    {
      label: "About Us Image",
      name: "aboutUs",
    },
    {
      label: "Login Background Image",
      name: "loginBackground",
    },
    {
      label: "Contact Us Page Image",
      name: "contactUs",
    },
  ];

  return (
    <Formik
      initialValues={
        {
          schoolName: "",
          logoUrl: "",
          homePage: "",
          aboutUs: "",
          loginBackground: "",
          contactUs: "",
          email: "",
          address: "",
        } as Init
      }
      onSubmit={(values) => {
        console.log(values);
      }}
    >
      {({ values, setFieldValue }) => (
        <Form className="fields">
          <Input
            name="schoolName"
            label="School Name"
            placeholder="Input title"
          />
          <Input name="logoUrl" label="Logo Url" placeholder="Input url" />
          {fileValues.map((value) => (
            <>
              {!!values[value.name] ? (
                <div className="small-gap">
                  <Image />
                  <span>{`${values[value.name]?.name}`}</span>
                  <Button
                    onClick={() => setFieldValue(value.name, "")}
                    variant="text"
                    text="x"
                  />
                </div>
              ) : (
                <Upload
                  name={value.name}
                  label={value.label}
                  onChange={(e) => {
                    const file = e.target.files;
                    if (file) {
                      setFieldValue(value.name, file[0]);
                    }
                  }}
                />
              )}
            </>
          ))}
          {/* {upload ? (
          <div className="small-gap">
            <Image />
            <span>{upload.name}</span>
            <Button onClick={() => clearFile()} variant="text" text="x" />
          </div>
        ) : (
          <Upload name="image" label="Image" onChange={handleFileChange} />
        )} */}
          <Input name="email" label="Email" placeholder="Input Email" />
          <Input
            name="phoneNumber"
            label="Phone Number"
            placeholder="Input Phone Number"
          />
          <Input
            name="address"
            label="Contact Address"
            placeholder="Input Address"
          />
          <div className="btn-group">
            <Button onClick={handleClose} variant="text" text="Cancel" />
            <Button text="Create" />
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default SetupSchoolInfoTemplate;
