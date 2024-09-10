import { useState } from "react";
import Input from "../../../custom/input/input";
import Upload from "../../../custom/upload/upload";
import { ReactComponent as Image } from "../../../assets/image.svg";
import Button from "../../../custom/button/button";
import { Form, Formik, FormikValues } from "formik";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createOrUpdateAboutUs } from "../../../requests";
import { App } from "antd";
import * as Yup from "yup";
import Editor from "../../../custom/editor/editor";

const CreateAboutUs = ({ handleClose }: { handleClose: () => void }) => {
  const { notification } = App.useApp();
  const queryClient = useQueryClient();
  const [upload, setUpload] = useState<File | null>(null);
  const addAboutUsMutation = useMutation({ mutationFn: createOrUpdateAboutUs });

  const validate = Yup.object().shape({
    title: Yup.string().required("Title is required"),
    description: Yup.string().required("Description is required"),
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

  const handleAddAboutUs = async (
    values: FormikValues,
    resetForm: () => void,
    handleClose: () => void
  ) => {
    const payload: Partial<SetupPayload> = {
      Title: values.title,
      Description: values.description,
      Image: upload,
      ActiveStatus: values.activeStatus === "Active",
      IsDeleted: false,
    };

    try {
      await addAboutUsMutation.mutateAsync(payload, {
        onSuccess: (data) => {
          notification.success({
            message: "Success",
            description: data?.message,
          });
          queryClient.refetchQueries({ queryKey: ["get-about-us"] });
          handleClose();
          resetForm();
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
        title: "",
        description: "",
      }}
      onSubmit={(values, { resetForm }) => {
        handleAddAboutUs(values, resetForm, handleClose);
      }}
      validationSchema={validate}>
      {({ setFieldValue }) => (
        <Form className="fields">
          <Input name="title" label="Title" placeholder="Input title" />
          <Editor
            name="description"
            label="Description"
            onChange={(_, editor) => {
              const data = editor.getData();
              setFieldValue("description", data);
            }}
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
          <div className="btn-group">
            <Button
              onClick={handleClose}
              type="button"
              variant="text"
              text="Cancel"
            />
            <Button
              text="Create"
              type="submit"
              disabled={addAboutUsMutation.isPending}
              isLoading={addAboutUsMutation.isPending}
            />
          </div>
        </Form>
      )}
    </Formik>
  );
};

const EditAboutUs = ({
  item,
  handleClose,
}: {
  item: Setup;
  handleClose: () => void;
}) => {
  const queryClient = useQueryClient();
  const { notification } = App.useApp();
  const [upload, setUpload] = useState<File | null>(null);
  const editAboutUsMutation = useMutation({
    mutationFn: createOrUpdateAboutUs,
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

  const handleEditAboutUs = async (
    values: FormikValues,
    resetForm: () => void
  ) => {
    let payload: Partial<SetupPayload> = {
      Id: item.id,
      Title: values.title,
      Description: values.description,
      ActiveStatus: values.activeStatus === "Active",
      IsDeleted: false,
    };

    if (upload) {
      payload.Image = upload;
    }

    try {
      await editAboutUsMutation.mutateAsync(payload, {
        onSuccess: (data) => {
          notification.success({
            message: "Success",
            description: data?.message,
          });
          queryClient.refetchQueries({ queryKey: ["get-about-us"] });
          handleClose();
          resetForm();
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
        title: item?.title,
        description: item?.description,
        //image: upload || item?.image,
      }}
      onSubmit={(values, { resetForm }) => {
        handleEditAboutUs(values, resetForm);
      }}
      enableReinitialize={true}>
      {({ setFieldValue }) => (
        <Form className="fields">
          <Input name="title" label="Title" placeholder="Input title" />
          <Editor
            name="description"
            label="Description"
            onChange={(_, editor) => {
              const data = editor.getData();
              setFieldValue("description", data);
            }}
            initialData={item.description}
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
          <div className="btn-group">
            <Button
              onClick={handleClose}
              type="button"
              variant="text"
              text="Cancel"
            />
            <Button
              type="submit"
              text="Update"
              isLoading={editAboutUsMutation.isPending}
              disabled={editAboutUsMutation.isPending}
            />
          </div>
        </Form>
      )}
    </Formik>
  );
};

export { CreateAboutUs, EditAboutUs };
