import { useState } from "react";
import Input from "../../../custom/input/input";
import Upload from "../../../custom/upload/upload";
import { ReactComponent as Image } from "../../../assets/image.svg";
import Button from "../../../custom/button/button";
import { Form, Formik, FormikValues } from "formik";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createUpdateGeneralTemplate, getGeneralTemplateById, StatusOptions } from "../../../requests";
import Select from "../../../custom/select/select";

interface Init {
  schoolName: string;
  logoUrl: string;
  homePage: any;
  aboutUs: any;
  loginBackground: any;
  contactUs: any;
  email: string;
  address: string;
  logoImage: any
  phoneNumber: string
}

const fileValues: { label: string; name: keyof Init }[] = [
  {
    label: 'Logo Image',
    name: "logoImage",
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
  {
    label: "Contact Us Page Image",
    name: "contactUs",
  },
];

const SetupSchoolInfoTemplate = ({ handleClose }: { handleClose: () => void }) => {
  const queryClient = useQueryClient();


  const CreateUpdateGeneralTemplateMutation = useMutation({
    mutationFn: createUpdateGeneralTemplate,
    mutationKey: ["create-update-general-template"],
  });

  const CreateUpdateGeneralTemplateHandler = async (values: FormikValues, resetForm:() => void) => {
    try {
      const formData = new FormData();
      formData.append("SchoolName", values?.schoolName?.trim() );
      formData.append("SchoolAddress", values?.address?.trim());
      formData.append("SchoolPhoneNumber", values?.phoneNumber?.trim());
      formData.append("SchoolEmailAddress", values?.email?.trim());
      formData.append("AboutUsImage", values?.aboutUs);
      formData.append("LoginBackgroundImage", values?.loginBackground);
      formData.append("Logo", values?.logoImage);
      formData.append("HomePageImage", values?.homePage);
      formData.append("ActiveStatus", values?.status);

      await CreateUpdateGeneralTemplateMutation.mutateAsync(formData, {
        onSuccess: () => {
          // notify("Update election Period Successful", "success");
          queryClient.refetchQueries({ queryKey: ["get-general-template"] });
          resetForm();
          handleClose();
         
        },
      });
    } catch (error: any) {
      // notify(error?.response?.data?.title || error?.message, "error");
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
          contactUs: "",
          email: "",
          address: "",
          phoneNumber: "",
        } as Init
      }
      onSubmit={(values, {resetForm}) => {
        CreateUpdateGeneralTemplateHandler(values, resetForm);
        console.log(values);
      }}
    >
      {({ values, setFieldValue }) => (
        <Form className="fields">
          <Input name="schoolName" label="School Name" placeholder="Input title" />
          <Input name="logoUrl" label="Logo Url" placeholder="Input url" />
          {fileValues.map((value) => (
            <>
              {!!values[value.name] ? (
                <div className="small-gap">
                  <Image />
                  <span>{`${values[value.name]?.name}`}</span>
                  <Button onClick={() => setFieldValue(value.name, "")} variant="text" text="x" />
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
          <Input name="phoneNumber" label="Phone Number" placeholder="Input Phone Number" />
          <Input name="address" label="Contact Address" placeholder="Input Address" />
          <Select
        name="status"
        placeholder="Select Status"
        label="Status"
        options={
          <>
          {StatusOptions.map((option: any) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
          </>
        }
      />
          <div className="btn-group">
            <Button onClick={handleClose} variant="text" text="Cancel" />
            <Button text="Create" disabled={CreateUpdateGeneralTemplateMutation?.isPending} isLoading={CreateUpdateGeneralTemplateMutation.isPending}/>
          </div>
        </Form>
      )}
    </Formik>
  );
};

interface EditTemplateProps {
  handleClose: () => void;
  data: GeneralTemplate;
}

const EditTemplate: React.FC<EditTemplateProps> = ({ handleClose, data })  => {
  const queryClient = useQueryClient();


  const CreateUpdateGeneralTemplateMutation = useMutation({
    mutationFn: createUpdateGeneralTemplate,
    mutationKey: ["create-update-general-template"],
  });

  const CreateUpdateGeneralTemplateHandler = async (values: FormikValues, resetForm:() => void) => {
    try {
      const formData = new FormData();
      // formData.append("SchoolName", values?.schoolName.trim() || data?.SchoolName);
      // formData.append("SchoolAddress", values?.address || data?.SchoolAddress);
      // formData.append("SchoolPhoneNumber", values?.phoneNumber || data?.SchoolPhoneNumber);
      // formData.append("SchoolEmailAddress", values?.email || data?.SchoolEmailAddress);
      // formData.append("AboutUsImageUrl", values?.aboutUs || data?.AboutUsImageUrl);
      // formData.append("LoginBackgroundImageUrl", values?.loginBackground || data?.LoginBackgroundImageUrl);
      // formData.append("LogoUrl", values?.logoImage || data?.LogoUrl);
      // formData.append("HomePageUrl", values?.homePage || data?.HomePageImageUrl);
      // formData.append("ActiveStatus", values?.status || data?.ActiveStatus);

      formData.append("SchoolName", values?.schoolName?.trim() );
      formData.append("SchoolAddress", values?.address?.trim());
      formData.append("SchoolPhoneNumber", values?.phoneNumber?.trim());
      formData.append("SchoolEmailAddress", values?.email?.trim());
      formData.append("AboutUsImage", values?.aboutUs);
      formData.append("LoginBackgroundImage", values?.loginBackground);
      formData.append("Logo", values?.logoImage);
      formData.append("HomePageImage", values?.homePage);
      formData.append("ActiveStatus", values?.status);

      await CreateUpdateGeneralTemplateMutation.mutateAsync(formData, {
        onSuccess: () => {
          // notify("Update election Period Successful", "success");
          queryClient.refetchQueries({ queryKey: ["get-general-template"] });
          resetForm();
          handleClose();
         
        },
      });
    } catch (error: any) {
      // notify(error?.response?.data?.title || error?.message, "error");
    }
  };

  return (
    <Formik
    initialValues={
      {
        schoolName: data?.schoolName,
        logoUrl: "",
        homePage: "",
        aboutUs: "",
        loginBackground: "",
        contactUs: "",
        email: data?.schoolEmailAddress,
        address: data?.schoolAddress,
      } as Init
    }
    onSubmit={(values, {resetForm}) => {
      CreateUpdateGeneralTemplateHandler(values, resetForm);
      console.log(values);
    }}
  >
    {({ values, setFieldValue }) => (
      <Form className="fields">
        <Input name="schoolName" label="School Name" placeholder="Input title" />
        <Input name="logoUrl" label="Logo Url" placeholder="Input url" />
        {fileValues.map((value) => (
          <>
            {!!values[value.name] ? (
              <div className="small-gap">
                <Image />
                <span>{`${values[value.name]?.name}`}</span>
                <Button onClick={() => setFieldValue(value.name, "")} variant="text" text="x" />
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
        <Input name="phoneNumber" label="Phone Number" placeholder="Input Phone Number" />
        <Input name="address" label="Contact Address" placeholder="Input Address" />
        <Select
      name="status"
      placeholder="Select Status"
      label="Status"
      options={
        <>
        {StatusOptions.map((option: any) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
        </>
      }
    />
        <div className="btn-group">
          <Button onClick={handleClose} variant="text" text="Cancel" />
          <Button text="Update" disabled={CreateUpdateGeneralTemplateMutation?.isPending} isLoading={CreateUpdateGeneralTemplateMutation.isPending}/>
        </div>
      </Form>
    )}
  </Formik>
  )

}

export  {SetupSchoolInfoTemplate, EditTemplate};
