import Input from "../../../../custom/input/input";
import { Form, Formik, FormikValues } from "formik";
import Button from "../../../../custom/button/button";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { StatusOptions, createOrUpdateCountry } from "../../../../requests";
import * as Yup from "yup";
import { App } from "antd";
import Select from "../../../../custom/select/select";

interface Props {
  data?: Country;
  handleClose: () => void;
}

const AddCountry = ({ handleClose, data }: Props) => {
  const { notification } = App.useApp();
  const queryClient = useQueryClient();

  const CreateCountryMutation = useMutation({
    mutationFn: createOrUpdateCountry,
    mutationKey: ["create-country"],
  });

  const CreateCountryHandler = async (values: FormikValues, resetForm: () => void) => {
    const payload: Partial<Country> = {
      id: data?.id || 0,
      countryName: values.countryName,
      activeStatus: values?.status === "true",
    };

    try {
      await CreateCountryMutation.mutateAsync(payload, {
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
        status: data?.activeStatus ? "true" : "false",
      }}
      onSubmit={(values, { resetForm }) => {
        CreateCountryHandler(values, resetForm);
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
                  <option value="true">Active</option>
                  <option value="false">Disabled</option>
                </>
              }
            />
            <div className="btn-group">
              <Button onClick={handleClose} variant="text" text="Cancel" />
              <Button
                onClick={handleSubmit as any}
                disabled={CreateCountryMutation?.isPending}
                text={CreateCountryMutation?.isPending ? "Creating..." : "Create"}
              />
            </div>
          </Form>
        );
      }}
    </Formik>
  );
};

export default AddCountry;
