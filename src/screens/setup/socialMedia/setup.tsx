import { Form, Formik, FormikValues } from "formik";
import Button from "../../../custom/button/button";
import Input from "../../../custom/input/input";
import { App, Spin } from "antd";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createUpdateSocialMediaLink,
  getGeneralTemplates,
  StatusOptions,
} from "../../../requests";
import { useState } from "react";
import * as Yup from "yup";
import Select from "../../../custom/select/select";
import Upload from "../../../custom/upload/upload";
import { ReactComponent as Image } from "../../../assets/image.svg";

const CreateSocialMediaSetup = ({
  handleClose,
}: {
  handleClose: () => void;
}) => {
  const { notification } = App.useApp();
  const queryClient = useQueryClient();
  const [upload, setUpload] = useState<File | null>(null);
  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: ["get-general-template"],
    queryFn: getGeneralTemplates,
  });
  const createUpdateSocialLinkMutation = useMutation({
    mutationFn: createUpdateSocialMediaLink,
  });

  const validate = Yup.object().shape({
    socialMediaName: Yup.string().required("The name is required"),
    socialMediaUrl: Yup.string().required("The url is required"),
    template: Yup.string().required("The template is required"),
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files;
    if (file) {
      setUpload(file[0]);
    }
  };
  const clearFile = () => {
    setUpload(null);
  };

  const handleCreateSocialMediaLink = async (values: FormikValues) => {
    const payload: Partial<SocialMediaLink> = {
      socialMediaName: values.socialMediaName,
      socialMediaUrl: values.socialMediaUrl,
      templateId: parseInt(values.template),
      socialMediaLogo: upload,
      activeStatus: values.status,
    };

    try {
      await createUpdateSocialLinkMutation.mutateAsync(payload, {
        onSuccess: (data) => {
          notification.success({
            message: "Success",
            description: data?.message,
          });
          queryClient.refetchQueries({ queryKey: ["get-social-media-link"] });
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
      initialValues={{
        socialMediaName: "",
        socialMediaUrl: "",
        template: "",
        status: "",
      }}
      onSubmit={(values) => {
        handleCreateSocialMediaLink(values);
      }}
      validationSchema={validate}
    >
      <Form className="fields">
        <Input
          name="socialMediaName"
          label="Social Media Name"
          placeholder="Input name e.g facebook, twitter"
        />
        <Input
          name="socialMediaUrl"
          label="Social Media URL"
          placeholder="Input URL"
        />
        <Select
          name="template"
          placeholder="Select Template"
          label="Template"
          options={
            <>
              {isLoading ? (
                <Spin />
              ) : isError ? (
                <p>{error?.message}</p>
              ) : (
                data &&
                data?.data?.length > 0 &&
                data?.data.map((option: GeneralTemplate) => (
                  <option key={option.id} value={option.id}>
                    {option.id} {option.schoolName}
                  </option>
                ))
              )}
            </>
          }
        />
        
        {upload ? (
          <div className="small-gap">
            <Image />
            <span>{upload.name}</span>
            <Button onClick={clearFile} variant="text" text="x" />
          </div>
        ) : (
          <Upload name="image" label="Image" onChange={handleFileChange} />
        )}

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
          <Button
            text="Create"
            isLoading={createUpdateSocialLinkMutation.isPending}
            disabled={createUpdateSocialLinkMutation?.isPending}
            type="submit"
          />
        </div>
      </Form>
    </Formik>
  );
};

const EditSocialMediaLink = ({
  handleClose,
  socialMediaLink,
}: {
  handleClose: () => void;
  socialMediaLink: SocialMediaLink;
}) => {
  const queryClient = useQueryClient();
  const { notification } = App.useApp();
  const [upload, setUpload] = useState<File | null>(null);

  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: ["get-general-template"],
    queryFn: getGeneralTemplates,
  });
  const createUpdateSocialLinkMutation = useMutation({
    mutationFn: createUpdateSocialMediaLink,
  });
  const validate = Yup.object().shape({
    socialMediaName: Yup.string().required("The name is required"),
    socialMediaUrl: Yup.string().required("The url is required"),
    template: Yup.string().required("The template is required"),
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files;
    if (file) {
      setUpload(file[0]);
    }
  };
  const clearFile = () => {
    setUpload(null);
  };

  const handleEditSocialMediaLink = async (values: FormikValues) => {
    const payload: Partial<SocialMediaLink> = {
      id: socialMediaLink?.id,
      socialMediaName: values.socialMediaName,
      socialMediaUrl: values.socialMediaUrl,
      templateId: parseInt(values.template),
      socialMediaLogo: upload,
      socialMediaLogoUrl: socialMediaLink?.socialMediaLogoUrl,
      activeStatus: values.status,
    };

    try {
      await createUpdateSocialLinkMutation.mutateAsync(payload, {
        onSuccess: (data) => {
          notification.success({
            message: "Success",
            description: data?.message,
          });
          queryClient.refetchQueries({ queryKey: ["get-social-media-link"] });
          handleClose();
          clearFile();
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
      initialValues={{
        socialMediaName: socialMediaLink?.socialMediaName,
        socialMediaUrl: socialMediaLink?.socialMediaUrl,
        template: socialMediaLink?.templateId,
        status: socialMediaLink?.activeStatus,
      }}
      onSubmit={(values) => {
        handleEditSocialMediaLink(values);
      }}
      validationSchema={validate}
      enableReinitialize
    >
      <Form className="fields">
        <Input
          name="socialMediaName"
          label="Social Media Name"
          placeholder="Input name e.g facebook, twitter"
        />
        <Input
          name="socialMediaUrl"
          label="Social Media URL"
          placeholder="Input URL"
        />
        <Select
          name="template"
          placeholder="Select Template"
          label="Template"
          options={
            <>
              {isLoading ? (
                <Spin />
              ) : isError ? (
                <p>{error?.message}</p>
              ) : (
                data &&
                data?.data?.length > 0 &&
                data?.data.map((option: GeneralTemplate) => (
                  <option key={option.id} value={option.id}>
                    {option.id} {option.schoolName}
                  </option>
                ))
              )}
            </>
          }
        />
        {upload ? (
          <div className="small-gap">
            <Image />
            <span>{upload.name}</span>
            <Button onClick={clearFile} variant="text" text="x" />
          </div>
        ) : (
          <Upload name="image" label="Image" onChange={handleFileChange} />
        )}

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
          <Button
            text="Update"
            isLoading={createUpdateSocialLinkMutation.isPending}
            disabled={createUpdateSocialLinkMutation?.isPending}
            type="submit"
          />
        </div>
      </Form>
    </Formik>
  );
};

export { CreateSocialMediaSetup, EditSocialMediaLink };
