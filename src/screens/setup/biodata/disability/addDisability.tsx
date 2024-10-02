import { useMutation, useQueryClient } from "@tanstack/react-query";

import * as Yup from "yup";
import { App } from "antd";
import { Form, Formik, FormikValues } from "formik";
import { createOrUpdateDisability, StatusOptions } from "../../../../requests";
import { Button, Input, Select } from "../../../../custom";

const AddDisability = ({ handleClose }: { handleClose: () => void }) => {
  const { notification } = App.useApp();
  const queryClient = useQueryClient();

  const addDisabilityMutation = useMutation({
    mutationFn: createOrUpdateDisability,
  });

  const validate = Yup.object().shape({
    name: Yup.string().required("Disability Name is required"),
    isActive: Yup.string().required("Status is required"),
  });
  const handleAddDisability = async (
    values: FormikValues,
    resetForm: () => void
  ) => {
    const payload: Partial<Disability> = {
      name: values?.name,
      isActive: values.isActive === "true",
    };

    try {
      await addDisabilityMutation.mutateAsync(payload, {
        onSuccess: (data) => {
          notification.success({
            message: "Success",
            description: data?.message,
          });
          queryClient.refetchQueries({ queryKey: ["get-disability"] });
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
      initialValues={{ name: "", isActive: "" }}
      onSubmit={(values, { resetForm }) => {
        handleAddDisability(values, resetForm);
      }}
      validationSchema={validate}
    >
      <Form className="fields">
        <Input name="name" label="Disability" placeholder="Input Disability" />
        <Select
          name="isActive"
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
            isLoading={addDisabilityMutation.isPending}
            disabled={addDisabilityMutation.isPending}
          />
        </div>
      </Form>
    </Formik>
  );
};

const EditDisability = ({
  title,
  handleClose,
}: {
  title: Disability;
  handleClose: () => void;
}) => {
  const { notification } = App.useApp();
  const queryClient = useQueryClient();

  const validate = Yup.object().shape({
    name: Yup.string().required("Title Name is required"),
    isActive: Yup.string().required("Status is required"),
  });
  const editDisabilityMutation = useMutation({
    mutationFn: createOrUpdateDisability,
  });
  const handleEditTitle = async (
    values: FormikValues,
    resetForm: () => void
  ) => {
    const payload: Partial<Disability> = {
      id: title?.id,
      name: values?.name,
      isActive: values.isActive === "true",
    };

    try {
      await editDisabilityMutation.mutateAsync(payload, {
        onSuccess: (data) => {
          notification.success({
            message: "Success",
            description: data?.message,
          });
          queryClient.refetchQueries({ queryKey: ["get-disability"] });
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
        name: title?.name,
        isActive: title?.isActive,
      }}
      onSubmit={(values, { resetForm }) => {
        handleEditTitle(values, resetForm);
      }}
      validationSchema={validate}
    >
      <Form className="fields">
        <Input name="name" label="Disability" placeholder="Input Disability" />
        <Select
          name="isActive"
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
            isLoading={editDisabilityMutation.isPending}
            disabled={editDisabilityMutation.isPending}
          />
        </div>
      </Form>
    </Formik>
  );
};
export { AddDisability, EditDisability };
