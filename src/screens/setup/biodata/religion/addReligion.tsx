import { useMutation, useQueryClient } from "@tanstack/react-query";

import * as Yup from "yup";
import { App } from "antd";
import { Form, Formik, FormikValues } from "formik";
import { Button, Input, Select } from "../../../../custom";
import { createOrUpdateReligion, StatusOptions } from "../../../../requests";

const AddReligion = ({ handleClose }: { handleClose: () => void }) => {
  const { notification } = App.useApp();
  const queryClient = useQueryClient();

  const addReligionMutation = useMutation({
    mutationFn: createOrUpdateReligion,
  });

  const validate = Yup.object().shape({
    name: Yup.string().required("Disability Name is required"),
    isActive: Yup.string().required("Status is required"),
  });
  const handleAddReligion = async (
    values: FormikValues,
    resetForm: () => void
  ) => {
    const payload: Partial<Religion> = {
      name: values?.name,
      isActive: values.isActive === "true",
    };

    try {
      await addReligionMutation.mutateAsync(payload, {
        onSuccess: (data) => {
          notification.success({
            message: "Success",
            description: data?.message,
          });
          queryClient.refetchQueries({ queryKey: ["get-religion"] });
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
        handleAddReligion(values, resetForm);
      }}
      validationSchema={validate}
    >
      <Form className="fields">
        <Input name="name" label="Religion" placeholder="Input Religion" />
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
            isLoading={addReligionMutation.isPending}
            disabled={addReligionMutation.isPending}
          />
        </div>
      </Form>
    </Formik>
  );
};

const EditReligion = ({
  religion,
  handleClose,
}: {
  religion: Religion;
  handleClose: () => void;
}) => {
  const { notification } = App.useApp();
  const queryClient = useQueryClient();

  const validate = Yup.object().shape({
    name: Yup.string().required("Religion is required"),
    isActive: Yup.string().required("Status is required"),
  });
  const editReligionMutation = useMutation({
    mutationFn: createOrUpdateReligion,
  });
  const handleEditTitle = async (
    values: FormikValues,
    resetForm: () => void
  ) => {
    const payload: Partial<Religion> = {
      id: religion?.id,
      name: values?.name,
      isActive: values.isActive === "true",
    };

    try {
      await editReligionMutation.mutateAsync(payload, {
        onSuccess: (data) => {
          notification.success({
            message: "Success",
            description: data?.message,
          });
          queryClient.refetchQueries({ queryKey: ["get-religion"] });
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
        name: religion?.name,
        isActive: religion?.isActive,
      }}
      onSubmit={(values, { resetForm }) => {
        handleEditTitle(values, resetForm);
      }}
      validationSchema={validate}
    >
      <Form className="fields">
        <Input name="name" label="Religion" placeholder="Input Religion" />
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
            isLoading={editReligionMutation.isPending}
            disabled={editReligionMutation.isPending}
          />
        </div>
      </Form>
    </Formik>
  );
};
export { AddReligion, EditReligion };
