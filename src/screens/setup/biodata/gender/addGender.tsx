/* eslint-disable no-undef */
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { App } from "antd";
import { Form, Formik, FormikValues } from "formik";
import * as Yup from "yup";

import Button from "../../../../custom/button/button";
import Input from "../../../../custom/input/input";
import Select from "../../../../custom/select/select";
import { StatusOptions, createOrUpdateGender } from "../../../../requests";

interface Props {
  data?: Gender;
  handleClose: () => void;
}

const AddGender = ({ handleClose, data }: Props) => {
  const { notification } = App.useApp();
  const queryClient = useQueryClient();

  const createGenderMutation = useMutation({
    mutationFn: createOrUpdateGender,
    mutationKey: ["create-gender"],
  });

  const createGenderHandler = async (
    values: FormikValues,
    resetForm: () => void
  ) => {
    const payload: Partial<Gender> = {
      id: data?.id || 0,
      genderName: values.genderName,
      activeStatus: values?.status === "true",
    };

    try {
      await createGenderMutation.mutateAsync(payload, {
        onSuccess: (data) => {
          notification.success({
            message: "Success",
            description: data?.message,
          });

          queryClient.refetchQueries({
            queryKey: ["get-gender"],
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
    genderName: Yup.string().required("Gender is required"),
    status: Yup.string().required("Active Status is required"),
  });

  return (
    <Formik
      initialValues={{
        genderName: data?.genderName || "",
        status: String(data?.activeStatus ?? ""),
      }}
      onSubmit={(values, { resetForm }) => {
        createGenderHandler(values, resetForm);
      }}
      enableReinitialize
      validationSchema={validationSchema}
    >
      {({ handleSubmit }) => (
        <Form className="fields">
          <Input name="genderName" placeholder="Input Gender" label="Gender" />

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
              onClick={handleSubmit as any}
              disabled={createGenderMutation?.isPending}
              text={
                data
                  ? createGenderMutation?.isPending
                    ? "Updating"
                    : "Update"
                  : createGenderMutation?.isPending
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

export default AddGender;
