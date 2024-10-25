import { App } from "antd";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import * as Yup from "yup";
import { Form, Formik, FormikValues } from "formik";
import { Button, Input, Select } from "../../../custom";
import { createProgramType } from "./request";
import { StatusOptions } from "../../../requests";

interface Props {
  handleClose: () => void;
}

const AddProgramType = ({ handleClose }: Props) => {
  const { notification } = App.useApp();
  const queryClient = useQueryClient();

  const validate = Yup.object().shape({
    name: Yup.string().required("Program Type name is required"),
  });

  const addProgramTypeMutation = useMutation({
    mutationFn: createProgramType,
  });

  const createProgramTypeHandler = async (
    values: FormikValues,
    resetForm: () => void
  ) => {
    const payload: CreateProgramTypePayload = {
      name: values.name,
      activeStatus: values.activeStatus === "Active"
    };

    try {
      await addProgramTypeMutation.mutateAsync(payload, {
        onSuccess: (data) => {
          notification.success({
            message: "Success",
            description: data?.message,
          });

          queryClient.refetchQueries({ queryKey: ["get-program-types"] });
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
      initialValues={{ name: "", activeStatus: "" }}
      onSubmit={(values, { resetForm }) => {
        createProgramTypeHandler(values, resetForm);
      }}
      validationSchema={validate}
      enableReinitialize={true}
    >
      {() => {
        return (
          <Form className="fields">
            <Input
              name="name"
              placeholder="Select Program Type"
              label="Program Type"
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
                text={
                  addProgramTypeMutation.isPending ? "Submitting..." : "Submit"
                }
                type="submit"
                isLoading={addProgramTypeMutation?.isPending}
                disabled={addProgramTypeMutation?.isPending}
              />
            </div>
          </Form>
        );
      }}
    </Formik>
  );
};

export default AddProgramType;
