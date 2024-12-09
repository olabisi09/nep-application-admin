import { useMutation, useQueryClient } from "@tanstack/react-query";
import Input from "../../../../custom/input/input";
import { createOrUpdateTitle, StatusOptions } from "../../../../requests";
import * as Yup from "yup";
import { App } from "antd";
import { Form, Formik, FormikValues } from "formik";
import Select from "../../../../custom/select/select";
import Button from "../../../../custom/button/button";

const AddTitle = ({ handleClose }: { handleClose: () => void }) => {
  const { notification } = App.useApp();
  const queryClient = useQueryClient();
  const addTitleMutation = useMutation({ mutationFn: createOrUpdateTitle });

  const validate = Yup.object().shape({
    name: Yup.string().required("Title Name is required"),
    activeStatus: Yup.string().required("Status is required"),
  });
  const handleAddTitle = async (
    values: FormikValues,
    resetForm: () => void
  ) => {
    const payload: Partial<Title> = {
      titleName: values?.name,
      activeStatus: values.activeStatus === "true",
    };

    try {
      await addTitleMutation.mutateAsync(payload, {
        onSuccess: (data) => {
          notification.success({
            message: "Success",
            description: data?.message,
          });
          queryClient.refetchQueries({ queryKey: ["get-titles"] });
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
      initialValues={{ name: "", activeStatus: "true" }} // Default to true
      onSubmit={(values, { resetForm }) => {
        handleAddTitle(values, resetForm);
      }}
      validationSchema={validate}>
      <Form className="fields">
        <Input name="name" label="Title" placeholder="Input Title" />
        <Select
          name="activeStatus"
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
            isLoading={addTitleMutation.isPending}
            disabled={addTitleMutation.isPending}
          />
        </div>
      </Form>
    </Formik>
  );
};

const EditTitle = ({
  title,
  handleClose,
}: {
  title: Title;
  handleClose: () => void;
}) => {
  const { notification } = App.useApp();
  const queryClient = useQueryClient();

  const validate = Yup.object().shape({
    name: Yup.string().required("Title is required"),
    activeStatus: Yup.string().required("Status is required"),
  });
  const editTitleMutation = useMutation({ mutationFn: createOrUpdateTitle });
  const handleEditTitle = async (
    values: FormikValues,
    resetForm: () => void
  ) => {
    const payload: Partial<Title> = {
      id: title?.id,
      titleName: values?.name,
      activeStatus: values.activeStatus === "true",
    };

    try {
      await editTitleMutation.mutateAsync(payload, {
        onSuccess: (data) => {
          notification.success({
            message: "Success",
            description: data?.message,
          });
          queryClient.refetchQueries({ queryKey: ["get-titles"] });
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
        name: title?.titleName,
        activeStatus:
          title?.activeStatus !== undefined
            ? String(title?.activeStatus)
            : "true", // Default to true if undefined
      }}
      onSubmit={(values, { resetForm }) => {
        handleEditTitle(values, resetForm);
      }}
      validationSchema={validate}>
      <Form className="fields">
        <Input name="name" label="Title" placeholder="Input Title" />
        <Select
          name="activeStatus"
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
            isLoading={editTitleMutation.isPending}
            disabled={editTitleMutation.isPending}
          />
        </div>
      </Form>
    </Formik>
  );
};
export { AddTitle, EditTitle };
