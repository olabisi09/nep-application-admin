import { App } from "antd";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import * as Yup from "yup";
import { Form, Formik, FormikValues } from "formik";
import { Button, Input } from "../../../custom";
import { editProgramType } from "./request";

interface Props {
  handleClose: () => void;
  record: ProgramType;
}

const EditProgramType = ({ handleClose, record }: Props) => {
  const { notification } = App.useApp();
  const queryClient = useQueryClient();

  const validate = Yup.object().shape({
    name: Yup.string().required("Program Type name is required"),
  });

  const editProgramTypeMutation = useMutation({
    mutationFn: editProgramType,
  });

  const editProgramTypeHandler = async (
    values: FormikValues,
    resetForm: () => void
  ) => {
    const payload: EditProgramTypePayload = {
      id: record?.id,
      name: values.name,
    };

    try {
      await editProgramTypeMutation.mutateAsync(payload, {
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
      initialValues={{ name: record.name ?? "" }}
      onSubmit={(values, { resetForm }) => {
        editProgramTypeHandler(values, resetForm);
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

            <div className="btn-group">
              <Button onClick={handleClose} variant="text" text="Cancel" />
              <Button
                text={
                  editProgramTypeMutation.isPending ? "Submitting..." : "Submit"
                }
                type="submit"
                isLoading={editProgramTypeMutation?.isPending}
                disabled={editProgramTypeMutation?.isPending}
              />
            </div>
          </Form>
        );
      }}
    </Formik>
  );
};

export default EditProgramType;
