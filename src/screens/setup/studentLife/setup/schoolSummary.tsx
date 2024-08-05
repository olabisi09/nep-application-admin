import { Form, Formik, FormikValues } from "formik";
import { Button, Input, Select } from "../../../../custom";
import { createOrUpdateSchoolSummary } from "../../../../requests";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { App } from "antd";

const SchoolSummary = ({
  handleClose,
  item,
}: {
  handleClose: () => void;
  item?: Setup;
}) => {
  const { notification } = App.useApp();
  const queryClient = useQueryClient();
  const addSchoolSummaryMutation = useMutation({
    mutationFn: createOrUpdateSchoolSummary,
  });

  const handleAddSchoolSummary = async (
    values: FormikValues,
    resetForm: () => void
  ) => {
    const payload: Partial<Setup> = {
      title: values.title,
      figure: values.figure,
      activeStatus: values.status === "Active",
      isDeleted: false,
    };

    try {
      await addSchoolSummaryMutation.mutateAsync(payload, {
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
        figure: "",
        status: "",
      }}
      onSubmit={(values, { resetForm }) =>
        handleAddSchoolSummary(values, resetForm)
      }
    >
      <Form className="fields">
        <Input name="title" label="Title" placeholder="Input title" />
        <Input name="figure" label="Figure" placeholder="Input figure" />
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
            isLoading={addSchoolSummaryMutation.isPending}
            disabled={addSchoolSummaryMutation.isPending}
            text="Create"
          />
        </div>
      </Form>
    </Formik>
  );
};

export default SchoolSummary;
