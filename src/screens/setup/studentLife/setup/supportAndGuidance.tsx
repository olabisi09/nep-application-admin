import { Form, Formik, FormikValues } from "formik";
import { Button, Input, Select } from "../../../../custom";
import { createOrUpdateSupportGuidance } from "../../../../requests";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { App } from "antd";

const SupportAndGuidance = ({
  handleClose,
  item,
}: {
  handleClose: () => void;
  item: Setup;
}) => {
  const { notification } = App.useApp();
  const queryClient = useQueryClient();
  const addSupportGuidanceMutation = useMutation({
    mutationFn: createOrUpdateSupportGuidance,
  });

  const handleAddSupportGuidance = async (
    values: FormikValues,
    resetForm: () => void
  ) => {
    const payload: Partial<Setup> = {
      title: values.title,
      description: values.description,
      activeStatus: values.status === "Active",
      isDeleted: false,
    };

    try {
      await addSupportGuidanceMutation.mutateAsync(payload, {
        onSuccess: (data) => {
          notification.success({
            message: "Success",
            description: data?.message,
          });
          queryClient.refetchQueries({ queryKey: ["get-student-life"] });
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

  const handleEditSupportGuidance = async (
    values: FormikValues,
    resetForm: () => void
  ) => {
    const payload: Partial<Setup> = {
      id: item.id,
      title: values.title,
      description: values.description,
      activeStatus: values.status === "Active",
    };

    try {
      await addSupportGuidanceMutation.mutateAsync(payload, {
        onSuccess: (data) => {
          notification.success({
            message: "Success",
            description: data?.message,
          });
          queryClient.refetchQueries({ queryKey: ["get-student-life"] });
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

  const statusOptions = (
    <>
      <option>Active</option>
      <option>Inative</option>
    </>
  );

  return (
    <Formik
      initialValues={{
        title: "",
        description: "",
        status: "",
      }}
      onSubmit={(values, { resetForm }) =>
        handleAddSupportGuidance(values, resetForm)
      }
    >
      <Form className="fields">
        <Input name="title" label="Title" placeholder="Input title" />
        <Input
          name="description"
          type="textarea"
          label="Description"
          placeholder="Input description"
        />{" "}
        <Select
          name="status"
          label="Status"
          placeholder="Select status"
          options={statusOptions}
        />
        <div className="btn-group">
          <Button
            type="button"
            onClick={handleClose}
            variant="text"
            text="Cancel"
          />
          <Button
            type="submit"
            isLoading={addSupportGuidanceMutation.isPending}
            disabled={addSupportGuidanceMutation.isPending}
            text="Create"
          />
        </div>
      </Form>
    </Formik>
  );
};

export default SupportAndGuidance;
