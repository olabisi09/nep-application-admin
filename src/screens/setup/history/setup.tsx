import { useState } from "react";
import Input from "../../../custom/input/input";
import Upload from "../../../custom/upload/upload";
import { ReactComponent as Image } from "../../../assets/image.svg";
import Button from "../../../custom/button/button";
import { Form, Formik, FormikValues } from "formik";
import Select from "../../../custom/select/select";
import { App } from "antd";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createOrUpdateHistory } from "../../../requests";
import * as Yup from "yup";

export const CreateHistory = ({ handleClose }: { handleClose: () => void }) => {
  const { notification } = App.useApp();
  const queryClient = useQueryClient();
  const [upload, setUpload] = useState<File | null>(null);
  const addHistoryMutation = useMutation({ mutationFn: createOrUpdateHistory });

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

  const handleAddHistory = async (values: FormikValues) => {
    const payload: Partial<SetupPayload> = {
      Title: values.title,
      Description: values.description,
      Image: upload,
      ActiveStatus: values.activeStatus === "Active",
      IsDeleted: false,
    };

    try {
      await addHistoryMutation.mutateAsync(payload, {
        onSuccess: (data) => {
          notification.success({
            message: "Success",
            description: data?.message,
          });
          queryClient.refetchQueries({ queryKey: ["get-history"] });
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

  const statusOptions = (
    <>
      <option>Active</option>
      <option>Inactive</option>
    </>
  );

  return (
    <Formik
      initialValues={{
        title: "",
        description: "",
        status: "",
      }}
      onSubmit={(values) => handleAddHistory(values)}
      validationSchema={validate}
    >
      <Form className="fields">
        <Input name="title" label="Title" placeholder="Input title" />
        <Input
          type="textarea"
          name="description"
          label="Description"
          placeholder="Input description"
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
          label="Status"
          placeholder="Select status"
          options={statusOptions}
        />
        <div className="btn-group">
          <Button
            type="button"
            onClick={handleClose}
            variant="text"
            text="Cancel"
          />
          <Button
            type="submit"
            text="Create"
            isLoading={addHistoryMutation.isPending}
            disabled={addHistoryMutation.isPending}
          />
        </div>
      </Form>
    </Formik>
  );
};

export const EditHistory = ({
  item,
  handleClose,
}: {
  item: Setup;
  handleClose: () => void;
}) => {
  const queryClient = useQueryClient();
  const { notification } = App.useApp();
  const [upload, setUpload] = useState<File | null>(null);
  const editHistoryMutation = useMutation({
    mutationFn: createOrUpdateHistory,
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

  const handleEditHistory = async (values: FormikValues) => {
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
      await editHistoryMutation.mutateAsync(payload, {
        onSuccess: (data) => {
          notification.success({
            message: "Success",
            description: data?.message,
          });
          queryClient.refetchQueries({ queryKey: ["get-history"] });
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
        title: item?.title,
        description: item?.description,
      }}
      onSubmit={(values) => handleEditHistory(values)}
      enableReinitialize
    >
      <Form className="fields">
        <Input name="title" label="Title" placeholder="Input title" />
        <Input
          type="textarea"
          name="description"
          label="Description"
          placeholder="Input description"
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
        <Select name="status" label="Status" placeholder="Active" />
        <div className="btn-group">
          <Button
            type="button"
            onClick={handleClose}
            variant="text"
            text="Cancel"
          />
          <Button
            type="submit"
            text="Update"
            isLoading={editHistoryMutation.isPending}
            disabled={editHistoryMutation.isPending}
          />
        </div>
      </Form>
    </Formik>
  );
};
