import { App, Spin } from "antd";
import Input from "../../../custom/input/input";
import Select from "../../../custom/select/select";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import * as Yup from "yup";
import { Form, FormikProvider, FormikValues, useFormik } from "formik";
import { Button } from "../../../custom";
import { useEffect, useState } from "react";
import { createFaculty, updateFaculty } from "../../../requests";

interface Props {
  details?: createOrUpdateFacultyPayload;
  handleClose: () => void;
}

const AddFaculty = ({ handleClose, details }: Props) => {
  const { notification } = App.useApp();
  const queryClient = useQueryClient();
  const [Id, setId] = useState<number | null>(null);

  const validate = Yup.object().shape({
    name: Yup.string().required("Faculty name is required"),
    description: Yup.string().required("Description is required"),
    categoryCode: Yup.string().required(" Faculty Code is required"),
  });

  const formik = useFormik<FormikValues>({
    initialValues: {
      name: "",
      description: "",
      categoryCode: "",
    },
    onSubmit: (values, { resetForm }) => {
      FacultyHandler(values, resetForm);
    },
    validationSchema: validate,
    enableReinitialize: true,
  });

  const updateFacultyMutation = useMutation({
    mutationFn: updateFaculty,
    mutationKey: ["updateFaculty"],
  });

  const FacultyHandler = async (
    values: FormikValues,
    resetForm: () => void
  ) => {
    const payload: Partial<createOrUpdateFacultyPayload> = {
      categoryCode: values?.categoryCode,
      name: values.name,
      description: values.description,
    };

    try {
      await addFacultyMutation.mutateAsync(payload, {
        onSuccess: (data) => {
          notification.success({
            message: "Success",
            description: data?.message,
          });
          queryClient.refetchQueries({ queryKey: ["get-faculty"] });
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

  const { setFieldValue } = formik;

  return (
    <FormikProvider value={formik}>
      <Form className="fields">
        <Input
          label="Faculty Name"
          placeholder="Input Faculty Name"
          name="name"
        />

        <Input
          label="Faculty Code"
          placeholder="Input Faculty Code"
          name="categoryCode"
        />

        <Input
          label="Description"
          placeholder="Description"
          name="description"
        />

        <div className="btn-group">
          <Button onClick={handleClose} variant="text" text="Cancel" />
          <Button
            text={addFacultyMutation.isPending ? "Submitting..." : "Submit"}
            type="submit"
            isLoading={addFacultyMutation?.isPending}
            disabled={addFacultyMutation?.isPending}
          />
        </div>
      </Form>
    </FormikProvider>
  );
};

export default AddFaculty;
