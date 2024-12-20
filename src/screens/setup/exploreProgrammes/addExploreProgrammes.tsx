/* eslint-disable no-undef */
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { App } from "antd";
import { Form, Formik, FormikValues } from "formik";
import * as Yup from "yup";

import { Select } from "../../../custom";
import Button from "../../../custom/button/button";
import Editor from "../../../custom/editor/editor";
import Input from "../../../custom/input/input";

import { createUpdateExplore } from "./request";

const CreateExplore = ({ handleClose }: { handleClose: () => void }) => {
  const { notification } = App.useApp();
  const queryClient = useQueryClient();

  const addExploreMutation = useMutation({ mutationFn: createUpdateExplore });

  const validate = Yup.object().shape({
    title: Yup.string().required("Title is required"),
    description: Yup.string().required("Description is required"),
  });

  const handleAddExplore = async (
    values: FormikValues,
    resetForm: () => void,
    handleClose: () => void
  ) => {
    const payload: ExplorePayload = {
      title: values.title,
      description: values.description,
      isActive: values.status === "Active" ? true : false,
    };

    try {
      await addExploreMutation.mutateAsync(payload, {
        onSuccess: (data) => {
          notification.success({
            message: "Success",
            description: data?.message,
          });
          queryClient.refetchQueries({ queryKey: ["get-explore"] });
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

  const statusOptions = (
    <>
      <option value="Active">Active</option>
      <option value="inactive">Inactive</option>
    </>
  );

  return (
    <Formik
      initialValues={{
        title: "",
        description: "",
        status: "",
      }}
      onSubmit={(values, { resetForm }) => {
        handleAddExplore(values, resetForm, handleClose);
      }}
      validationSchema={validate}
    >
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

          <Select
            name="status"
            label="Status"
            placeholder="Select status"
            options={statusOptions}
          />

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
              disabled={addExploreMutation.isPending}
              isLoading={addExploreMutation.isPending}
            />
          </div>
        </Form>
      )}
    </Formik>
  );
};

const EditExplore = ({
  item,
  handleClose,
}: {
  item: Explore;
  handleClose: () => void;
}) => {
  const queryClient = useQueryClient();
  const { notification } = App.useApp();

  const editExploreMutation = useMutation({
    mutationFn: createUpdateExplore,
  });

  const handleEditExplore = async (
    values: FormikValues,
    resetForm: () => void
  ) => {
    let payload: ExplorePayload = {
      id: item.id,
      title: values.title,
      description: values.description,
      isActive: values.status === "Active" ? true : false,
    };

    try {
      await editExploreMutation.mutateAsync(payload, {
        onSuccess: (data) => {
          notification.success({
            message: "Success",
            description: data?.message,
          });
          queryClient.refetchQueries({ queryKey: ["get-explore"] });
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

  const statusOptions = (
    <>
      <option value="Active">Active</option>
      <option value="Inactive">Inactive</option>
    </>
  );

  const initialStatus = item?.isActive === true ? "Active" : "Inactive";

  return (
    <Formik
      initialValues={{
        title: item?.title,
        description: item?.description,
        status: initialStatus,
      }}
      onSubmit={(values, { resetForm }) => {
        handleEditExplore(values, resetForm);
      }}
      enableReinitialize={true}
    >
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

          <Select
            name="status"
            label="Status"
            placeholder="Select status"
            options={statusOptions}
          />

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
              isLoading={editExploreMutation.isPending}
              disabled={editExploreMutation.isPending}
            />
          </div>
        </Form>
      )}
    </Formik>
  );
};

export { CreateExplore, EditExplore };
