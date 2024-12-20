/* eslint-disable no-undef */
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { App } from "antd";
import { Form, FormikProvider, FormikValues, useFormik } from "formik";
import * as Yup from "yup";

import Button from "../../../custom/button/button";
import Input from "../../../custom/input/input";
import Select from "../../../custom/select/select";
import { StatusOptions } from "../../../requests";

import { CreateUpdateSubject } from "./request";

interface Props {
  data?: SubjectPayload;
  handleClose: () => void;
}

const AddSubject = ({ handleClose, data }: Props) => {
  const { notification } = App.useApp();
  const queryClient = useQueryClient();

  const createSubjectMutation = useMutation({
    mutationFn: CreateUpdateSubject,
    mutationKey: ["create-subject"],
  });

  const createSubjectHandler = async (
    values: FormikValues,
    resetForm: () => void
  ) => {
    const payload: SubjectPayload = {
      id: data?.id || 0,
      subject: values.subject,
      activeStatus: values?.activeStatus === "true",
      isDeleted: false,
    };

    try {
      await createSubjectMutation.mutateAsync(payload, {
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
    activeStatus: Yup.string().required("Status is required"),
  });

  const formik = useFormik<FormikValues>({
    initialValues: {
      subject: data?.subject || "",
      activeStatus: String(data?.activeStatus ?? ''),
    },
    onSubmit: (values, { resetForm }) => {
      createSubjectHandler(values, resetForm);
    },
    validationSchema: validationSchema,
    enableReinitialize: true,
  });

  return (
    <FormikProvider value={formik}>
      <Form className="fields">
        <Input
          name="subject"
          placeholder="Input Subject Name"
          label="Subject Name"
        />

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
            type="submit"
            disabled={createSubjectMutation.isPending}
            isLoading={createSubjectMutation.isPending}
            text={createSubjectMutation.isPending ? "Submitting..." : "Submit"}
          />
        </div>
      </Form>
    </FormikProvider>
  );
};

export default AddSubject;
