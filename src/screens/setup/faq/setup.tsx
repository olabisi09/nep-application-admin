import Input from "../../../custom/input/input";
import Button from "../../../custom/button/button";
import Select from "../../../custom/select/select";
import { Form, Formik, FormikProvider, FormikValues, useFormik } from "formik";
import * as Yup from "yup";
import { StatusOptions, createFaq } from "../../../requests";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { App } from "antd";

interface Props {
  data?: FAQ;
  handleClose: () => void;
}

const SetupFaq = ({ handleClose, data }: Props) => {
  const { notification } = App.useApp();
  const queryClient = useQueryClient();

  const FaqSetupMutation = useMutation({
    mutationKey: ["faq-setup"],
    mutationFn: createFaq,
  });

  const setupFaqHandler = async (
    values: FormikValues,
    resetForm: () => void
  ) => {
    const payload: FAQ = {
      id: data?.id || 0,
      name: values?.name,
      description: values?.description,
      activeStatus: values?.activeStatus === "true",
    };
    try {
      await FaqSetupMutation.mutateAsync(payload, {
        onSuccess: (data) => {
          notification.success({
            message: "Success",
            description: data?.message,
          });
          queryClient.refetchQueries({
            queryKey: ["get-AllFAQ"],
          });
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
    name: Yup.string().required("Title is required"),
    status: Yup.string().required("Active status is required"),
  });
  return (
    <Formik
      initialValues={{
        name: data?.name || "",
        status:
          data?.activeStatus !== undefined ? String(data?.activeStatus) : "", // Initialize with string
      }}
      onSubmit={(values, { resetForm }) => {
        setupFaqHandler(values, resetForm);
      }}
      enableReinitialize={true}
      validationSchema={validationSchema}
    >
      {({ handleSubmit }) => {
        return (
          <Form className="fields">
            <Input name="name" placeholder="Title  Name" label="Title Name" />
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
                disabled={FaqSetupMutation?.isPending}
                text={
                  data
                    ? FaqSetupMutation?.isPending
                      ? "Updating..."
                      : "Update"
                    : FaqSetupMutation?.isPending
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

export default SetupFaq;
