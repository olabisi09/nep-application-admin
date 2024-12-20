/* eslint-disable no-undef */
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { App } from "antd";
import { Form, Formik, FormikValues } from "formik";
import * as Yup from "yup";

import Button from "../../../../custom/button/button";
import Input from "../../../../custom/input/input";
import Select from "../../../../custom/select/select";
import {
  StatusOptions,
  createOrUpdateMaritalStatus,
} from "../../../../requests";

interface Props {
  data?: MaritalStatus;
  handleClose: () => void;
}

const AddMarital = ({ handleClose, data }: Props) => {
  const { notification } = App.useApp();
  const queryClient = useQueryClient();

  const createMaritalStatusMutation = useMutation({
    mutationFn: createOrUpdateMaritalStatus,
    mutationKey: ["create-marital-status"],
  });

  const createMaritalStatusHandler = async (
    values: FormikValues,
    resetForm: () => void
  ) => {
    const payload: Partial<MaritalStatus> = {
      id: data?.id || 0,
      statusName: values.maritalName,
      activeStatus: values?.status === "true",
    };

    try {
      await createMaritalStatusMutation.mutateAsync(payload, {
        onSuccess: (data) => {
          notification.success({
            message: "Success",
            description: data?.message,
          });

          queryClient.refetchQueries({
            queryKey: ["get-marital-status"],
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

  const validationSchema = Yup.object().shape({
    maritalName: Yup.string().required("Marital Name is required"),
    status: Yup.string().required("Active Status is required"),
  });

  return (
    <Formik
      initialValues={{
        maritalName: data?.statusName ?? "",
        status: String(data?.activeStatus ?? ""),
      }}
      onSubmit={(values, { resetForm }) => {
        createMaritalStatusHandler(values, resetForm);
      }}
      enableReinitialize
      validationSchema={validationSchema}
    >
      {({ handleSubmit }) => (
        <Form className="fields">
          <Input
            name="maritalName"
            placeholder="Input Marital Status Name"
            label="Marital Status Name"
          />

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
              onClick={handleSubmit as any} // type casting as any to avoid TypeScript errors
              disabled={createMaritalStatusMutation?.isPending}
              text={
                data
                  ? createMaritalStatusMutation?.isPending
                    ? "Updating"
                    : "Update"
                  : createMaritalStatusMutation?.isPending
                  ? "Creating"
                  : "Create"
              }
            />
          </div>
        </Form>
      )}
    </Formik>
  );
};

export { AddMarital };
