/* eslint-disable no-undef */
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { App } from "antd";
import { Form, Formik, FormikValues } from "formik";
import * as Yup from "yup";

import { Button, Select } from "../../../custom";
import Input from "../../../custom/input/input";
import { StatusOptions, createFaculty } from "../../../requests";

interface Props {
  handleClose: () => void;
}

const AddFaculty = ({ handleClose }: Props) => {
  const { notification } = App.useApp();
  const queryClient = useQueryClient();

  const validate = Yup.object().shape({
    name: Yup.string().required("Faculty name is required"),
    description: Yup.string().required("Description is required"),
    categoryCode: Yup.string().required(" Faculty Code is required"),
  });

  const addFacultyMutation = useMutation({
    mutationFn: createFaculty,
  });

  const facultyHandler = async (
    values: FormikValues,
    resetForm: () => void
  ) => {
    const payload: Partial<createOrUpdateFacultyPayload> = {
      id: 0,
      description: values.description,
      categoryCode: values.categoryCode,
      name: values.name,
      activeStatus: !!values.activeStatus,
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

  return (
    <Formik
      initialValues={{
        name: "",
        description: "",
        categoryCode: "",
        activeStatus: "",
      }}
      onSubmit={(values, { resetForm }) => {
        facultyHandler(values, resetForm);
      }}
      validationSchema={validate}
      enableReinitialize={true}
    >
      {() => {
        return (
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
                text={addFacultyMutation.isPending ? "Submitting..." : "Submit"}
                type="submit"
                isLoading={addFacultyMutation?.isPending}
                disabled={addFacultyMutation?.isPending}
              />
            </div>
          </Form>
        );
      }}
    </Formik>
  );
};

export default AddFaculty;
