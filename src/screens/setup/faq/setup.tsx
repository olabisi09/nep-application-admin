import Input from "../../../custom/input/input";
import Button from "../../../custom/button/button";
import Select from "../../../custom/select/select";
import { Form, Formik, FormikProvider, FormikValues, useFormik } from "formik";
import * as Yup from "yup";
import { createFaq } from "../../../requests";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { notify } from "../../../utils/notify";
import { App } from "antd";

interface Props {
  data?: FAQ;
  handleClose: () => void;
}

const SetupFaq = ({handleClose, data}:Props) => {
  const { notification } = App.useApp();
  const queryClient = useQueryClient();

  const FaqsetupMutation = useMutation({
    mutationKey: ["faq-setup"],
    mutationFn: createFaq,
  });

  const setupFaqHandler = async (
    values: FormikValues,
    resetForm: () => void
  ) => {
    const payload: FAQ = {
      id:0,
      name: values?.name,
      description: values?.description,
      activeStatus: values?.activeStatus === "true",
    };
    try {
      await FaqsetupMutation.mutateAsync(payload, {
        onSuccess: (data) => {
          notification.success({
            message: "Success",
            description: data?.message,
          });
          queryClient.refetchQueries({
            queryKey: ["get-Faq"],
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
    activeStatus: Yup.string().required("Active status is required"),
  });

  const formik = useFormik<FormikValues>({
    initialValues: {
      name: data?.name,
      
      description: "null description",
    },
    onSubmit: (values, { resetForm }) => {
      setupFaqHandler(values, resetForm);
    },
    validationSchema: validationSchema,
  });

  const statusOptions = (
    <>
      <option value="true">Active</option>
      <option value="false">Inactive</option>
    </>
  );
  return (
    <FormikProvider value={formik}>
      <Form className="fields">
        <Input name="name" label="Title" placeholder="Input title" />
        <Select
          name="activeStatus"
          label="Status"
          placeholder="Select Status"
          options={statusOptions}
        />
        <div className="btn-group">
          <Button onClick={handleClose} variant="text" text="Cancel" />
          <Button
            text="Create"
            type="submit"
            isLoading={FaqsetupMutation?.isPending}
            disabled={FaqsetupMutation?.isPending}
          />
        </div>
      </Form>
    </FormikProvider>
  );
};

export default SetupFaq;
