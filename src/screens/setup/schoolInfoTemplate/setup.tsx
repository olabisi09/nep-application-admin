import Input from "../../../custom/input/input";
import Upload from "../../../custom/upload/upload";
import { ReactComponent as Image } from "../../../assets/image.svg";
import Button from "../../../custom/button/button";
import { Form, Formik, FormikValues } from "formik";
import { useMutation } from "@tanstack/react-query";
import { createOrUpdateTemplate } from "../../../requests";
import { App } from "antd";
import { validateTemplate } from "../../../utils/validations";

interface Init {
  schoolName: string;
  logoUrl: string;
  homePage: any;
  aboutUs: any;
  loginBackground: any;
  phoneNumber: any;
  email: string;
  address: string;
}

export const CreateTemplate = ({
  handleClose,
}: {
  handleClose: () => void;
}) => {
  const { notification } = App.useApp();
  const createTemplateMutation = useMutation({
    mutationFn: createOrUpdateTemplate,
  });
  const fileValues: { label: string; name: keyof Init }[] = [
    {
      label: "Logo",
      name: "logoUrl",
    },
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
  ];

  const handleAddTemplate = async (
    values: FormikValues,
    resetForm: () => void
  ) => {
    const payload = {
      SchoolName: values.schoolName,
      Logo: values.logoUrl,
      HomePageImage: values.homePage,
      AboutUsImage: values.aboutUs,
      LoginBackgroundImage: values.loginBackground,
      SchoolEmailAddress: values.email,
      SchoolPhoneNumber: values.phoneNumber,
      SchoolAddress: values.address,
    };
    try {
      await createTemplateMutation.mutateAsync(payload, {
        onSuccess: (data) => {
          notification.success({
            message: "Success",
            description: data?.message,
          });
          resetForm();
          handleClose();
        },
      });
    } catch (error: any) {
      notification.error({
        message: "Error",
        description: error?.response?.data?.message,
      });
    }
  };

  return (
    <Formik
      initialValues={
        {
          schoolName: "",
          logoUrl: "",
          homePage: "",
          aboutUs: "",
          loginBackground: "",
          phoneNumber: "",
          email: "",
          address: "",
        } as Init
      }
      onSubmit={(values, { resetForm }) => {
        handleAddTemplate(values, resetForm);
      }}
      validationSchema={validateTemplate}
    >
      {({ values, setFieldValue }) => (
        <Form className="fields">
          <Input
            name="schoolName"
            label="School Name"
            placeholder="Input title"
          />
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
export const EditTemplate = ({ handleClose }: { handleClose: () => void }) => {
  const { notification } = App.useApp();
  const editTemplateMutation = useMutation({
    mutationFn: createOrUpdateTemplate,
  });
  const fileValues: { label: string; name: keyof Init }[] = [
    {
      label: "Logo",
      name: "logoUrl",
    },
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
  ];

  const handleEditTemplate = async (
    values: FormikValues,
    resetForm: () => void
  ) => {
    const payload = {
      Id: 3,
      SchoolName: values.schoolName,
      Logo: values.logoUrl,
      HomePageImage: values.homePage,
      AboutUsImage: values.aboutUs,
      LoginBackgroundImage: values.loginBackground,
      SchoolEmailAddress: values.email,
      SchoolPhoneNumber: values.phoneNumber,
      SchoolAddress: values.address,
    };
    try {
      await editTemplateMutation.mutateAsync(payload, {
        onSuccess: (data) => {
          notification.success({
            message: "Success",
            description: data?.message,
          });
          resetForm();
          handleClose();
        },
      });
    } catch (error: any) {
      notification.error({
        message: "Error",
        description: error?.response?.data?.message,
      });
    }
  };

  return (
    <Formik
      initialValues={
        {
          schoolName: "",
          logoUrl: "",
          homePage: "",
          aboutUs: "",
          loginBackground: "",
          phoneNumber: "",
          email: "",
          address: "",
        } as Init
      }
      onSubmit={(values, { resetForm }) => {
        handleEditTemplate(values, resetForm);
      }}
    >
      {({ values, setFieldValue }) => (
        <Form className="fields">
          <Input
            name="schoolName"
            label="School Name"
            placeholder="Input title"
          />
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
