import Input from "../../../custom/input/input";
import { Form, Formik, FormikValues } from "formik";
import Button from "../../../custom/button/button";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { StatusOptions, createOrUpdateQualificationType,  } from "../../../requests";
import * as Yup from "yup";
import { App } from "antd";
import Select from "../../../custom/select/select";

interface Props {
  data?: QualificationType;
  handleClose: () => void;
}

const AddQualificationType = ({ handleClose, data }: Props) => {
  const { notification } = App.useApp();
  const queryClient = useQueryClient();

  const CreateQualificationTypeMutation = useMutation({
    mutationFn: createOrUpdateQualificationType,
    mutationKey: ["create-qualification-type"],
  });

  const CreateQualificationTypeHandler = async (
    values: FormikValues,
    resetForm: () => void
  ) => {
    const payload: Partial<QualificationType> = {
      id: data?.id || 0,
      qualificationName: values.qualificationType,
      activeStatus: values?.status === "true", // Convert "true" to true, "false" to false
    };

    try {
      await CreateQualificationTypeMutation.mutateAsync(payload, {
        onSuccess: (data) => {
          notification.success({
            message: "Success",
            description: data?.message,
          });
          queryClient.refetchQueries({
            queryKey: ["get-QualificationType"],
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
    qualificationType: Yup.string().required("Qualification Type is required"),
    status: Yup.string().required("Active Status is required"),
  });

  return (
    <Formik
      initialValues={{
        qualificationType: data?.qualificationName || "",
        status:
          data?.activeStatus !== undefined ? String(data?.activeStatus) : "", // Initialize with string
      }}
      onSubmit={(values, { resetForm }) => {
        CreateQualificationTypeHandler(values, resetForm);
      }}
      enableReinitialize={true}
      validationSchema={validationSchema}
    >
      {({ handleSubmit }) => {
        return (
          <Form className="fields">
            <Input
              name="qualificationType"
              label="Qualification Type"
              placeholder="Input Qualification Type"
            />

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
                disabled={CreateQualificationTypeMutation?.isPending}
                text={
                  CreateQualificationTypeMutation?.isPending ? "Creating..." : "Create"
                }
              />
            </div>
          </Form>
        );
      }}
    </Formik>
  );
};

export default AddQualificationType;
