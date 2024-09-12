import Input from "../../../custom/input/input";
import Button from "../../../custom/button/button";
import Select from "../../../custom/select/select";
import { App } from "antd";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Form, Formik, FormikValues } from "formik";
import { object, string } from "yup";
import { createUpdateWhy } from "../../../requests";

interface Props {
  data?: Why;
  handleClose: () => void;
}

const SetupWhySchool = ({ data, handleClose }: Props) => {
  const { notification } = App.useApp();
  const queryClient = useQueryClient();

  const whySetupMutation = useMutation({
    mutationKey: ["why-setup"],
    mutationFn: createUpdateWhy,
  });

  const setupWhyHandler = async (
    values: FormikValues,
    resetForm: () => void
  ) => {
    const payload: Partial<Why> = {
      id: data?.id || 0,
      schoolName: values?.title,
      activeStatus: values?.status === "Active",
    };
    try {
      await whySetupMutation.mutateAsync(payload, {
        onSuccess: (data) => {
          notification.success({
            message: "Success",
            description: data?.message,
          });
          queryClient.refetchQueries({
            queryKey: ["get-all-why"],
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

  const validationSchema = object().shape({
    title: string().required("Title is required"),
    status: string().required("Status is required"),
  });

  const statusOptions = (
    <>
      <option>Active</option>
      <option>Inactive</option>
    </>
  );

  return (
    <Formik
      initialValues={{
        title: data?.schoolName || "",
        status: data?.activeStatus ? "Active" : "Inactive",
      }}
      onSubmit={(values, { resetForm }) => setupWhyHandler(values, resetForm)}
      validationSchema={validationSchema}
      enableReinitialize={true}
    >
      {() => (
        <Form className="fields">
          <Input name="title" label="Title" placeholder="Input title" />
          <Select
            name="status"
            label="Status"
            placeholder="Active"
            options={statusOptions}
          />
          <div className="btn-group">
            <Button onClick={handleClose} variant="text" text="Cancel" />
            <Button
              type="submit"
              disabled={whySetupMutation?.isPending}
              text={
                data
                  ? whySetupMutation?.isPending
                    ? "Updating..."
                    : "Update"
                  : whySetupMutation?.isPending
                  ? "Creating..."
                  : "Create"
              }
            />
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default SetupWhySchool;
