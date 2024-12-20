/* eslint-disable no-undef */
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { App } from "antd";
import { Form, Formik, FormikValues } from "formik";
import * as Yup from "yup";

import Button from "../../../../custom/button/button";
import Input from "../../../../custom/input/input";
import Select from "../../../../custom/select/select";
import { StatusOptions, createOrUpdateCountry } from "../../../../requests";

interface Props {
  data?: Country;
  handleClose: () => void;
}

const AddCountry = ({ handleClose, data }: Props) => {
  const { notification } = App.useApp();
  const queryClient = useQueryClient();

  const createCountryMutation = useMutation({
    mutationFn: createOrUpdateCountry,
    mutationKey: ["create-country"],
  });

  const createCountryHandler = async (
    values: FormikValues,
    resetForm: () => void
  ) => {
    const payload: Partial<Country> = {
      id: data?.id || 0,
      countryName: values.countryName,
      activeStatus: values?.status === "true", 
    };

    try {
      await createCountryMutation.mutateAsync(payload, {
        onSuccess: (data) => {
          notification.success({
            message: "Success",
            description: data?.message,
          });
          queryClient.refetchQueries({
            queryKey: ["get-country"],
          });
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

  const validationSchema = Yup.object().shape({
    countryName: Yup.string().required("Country is required"),
    status: Yup.string().required("Active Status is required"),
  });

  return (
    <Formik
      initialValues={{
        countryName: data?.countryName || "",
        status: String(data?.activeStatus ?? ""), 
      }}
      onSubmit={(values, { resetForm }) => {
        createCountryHandler(values, resetForm);
      }}
      enableReinitialize={true}
      validationSchema={validationSchema}
    >
      {({ handleSubmit }) => {
        return (
          <Form className="fields">
            <Input
              name="countryName"
              placeholder="Input Country Name"
              label="Country Name"
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
                onClick={handleSubmit as any}
                disabled={createCountryMutation?.isPending}
                text={
                  data
                    ? createCountryMutation?.isPending
                      ? "Updating..."
                      : "Update"
                    : createCountryMutation?.isPending
                    ? "Creating..."
                    : "Create"
                }
              />
            </div>
          </Form>
        );
      }}
    </Formik>
  );
};

export default AddCountry;
