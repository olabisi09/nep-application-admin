import { App } from "antd";
import Input from "../../../custom/input/input";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createOrUpdateSubject } from "../../../requests";
import { FormikValues, Form, FormikProvider, useFormik } from "formik";
import * as Yup from "yup";
import Select from "../../../custom/select/select";
import Button from "../../../custom/button/button";

interface Props {
  data?: SubjectPayload;
  handleClose: () => void;
}

const AddSubject = ({ handleClose, data }: Props) => {
  const { notification } = App.useApp();
  const queryClient = useQueryClient();

  const CreateSubjectMutation = useMutation({
    mutationFn: createOrUpdateSubject,
    mutationKey: ["create-subject"],
  });

  const CreateSubjectHandler = async (
    values: FormikValues,
    resetForm: () => void
  ) => {
    const payload: Partial<SubjectPayload> = {
      id: data?.id || 0,
      subject: values.subject,
      activeStatus: values?.status === "true",
    };

    try {
      await CreateSubjectMutation.mutateAsync(payload, {
        onSuccess: (data) => {
          notification.success({
            message: "Success",
            description: data?.message,
          });
          queryClient.invalidateQueries({
            queryKey: ["get-subject"],
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
    subject: Yup.string().required("Subject is required"),
    status: Yup.string().required("Status is required"),
  });

  const formik = useFormik<FormikValues>({
    initialValues: {
      subject: data?.subject || "",
      status: data?.activeStatus ? "true" : "false",
    },
    onSubmit: (values, { resetForm }) => {
      CreateSubjectHandler(values, resetForm);
    },
    validationSchema: validationSchema,
    enableReinitialize: true,
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
        <Input
          name="subject"
          placeholder="Input Subject Name"
          label="Subject Name"
        />
        <Select
          name="status"
          placeholder="Select Status"
          label="Status"
          options={statusOptions}
        />
        <div className="btn-group">
          <Button onClick={handleClose} variant="text" text="Cancel" />
          <Button
            type="submit"
            disabled={CreateSubjectMutation.isPending}
            isLoading={CreateSubjectMutation.isPending}
            text={CreateSubjectMutation.isPending ? "Submiting..." : "Submit"}
          />
        </div>
      </Form>
    </FormikProvider>
  );
};

export default AddSubject;
