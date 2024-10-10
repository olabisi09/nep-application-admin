import { App } from "antd";
import Input from "../../../custom/input/input";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { FormikValues, Form, FormikProvider, useFormik } from "formik";
import * as Yup from "yup";
import Select from "../../../custom/select/select";
import Button from "../../../custom/button/button";
import { CreateUpdateGrade } from "./request";

interface Props {
  data?: Grade;
  handleClose: () => void;
}

const AddGrade = ({ handleClose, data }: Props) => {
  const { notification } = App.useApp();
  const queryClient = useQueryClient();

  const createUpdateGradeMutation = useMutation({
    mutationFn: CreateUpdateGrade,
    mutationKey: ["create-subject"],
  });

  const createGradeHandler = async (
    values: FormikValues,
    resetForm: () => void
  ) => {
    const payload: GradePayload = {
      id: data?.id || 0,
      grade: values.grade,
      activeStatus: values?.status === "true",
      isDeleted: false,
    };

    try {
      await createUpdateGradeMutation.mutateAsync(payload, {
        onSuccess: (data) => {
          notification.success({
            message: "Success",
            description: data?.message,
          });
          queryClient.invalidateQueries({
            queryKey: ["get-all-grade"],
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
    grade: Yup.string().required("Grade is required"),
    status: Yup.string().required("Status is required"),
  });

  const formik = useFormik<FormikValues>({
    initialValues: {
      grade: data?.grade || "",
      status: data?.activeStatus ? "true" : "false",
    },
    onSubmit: (values, { resetForm }) => {
        createGradeHandler(values, resetForm);
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
          name="grade"
          placeholder="Input Grade"
          label="Grade Name"
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
            disabled={createUpdateGradeMutation.isPending}
            isLoading={createUpdateGradeMutation.isPending}
            text={createUpdateGradeMutation.isPending ? "Submitting..." : "Submit"}
          />
        </div>
      </Form>
    </FormikProvider>
  );
};

export default AddGrade;
