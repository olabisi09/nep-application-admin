import { Form, Formik, FormikValues } from "formik";
import { Button, Editor, Input, Select } from "../../../../custom";
import { createOrUpdateStudentLife } from "../../../../requests";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { App } from "antd";

const CreateStudentLife = ({ handleClose }: { handleClose: () => void }) => {
  const { notification } = App.useApp();
  const queryClient = useQueryClient();

  const addStudentLifeMutation = useMutation({
    mutationFn: createOrUpdateStudentLife,
  });

  const handleAddStudentLife = async (
    values: FormikValues,
    resetForm: () => void
  ) => {
    const payload: Partial<Setup> = {
      title: values.title,
      description: values.description,
      activeStatus: values.status === "Active",
    };

    try {
      await addStudentLifeMutation.mutateAsync(payload, {
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
        handleAddStudentLife(values, resetForm)
      }
    >
      {({ setFieldValue }) => (
        <Form className="fields">
          <Input name="title" label="Title" placeholder="Input title" />
          <Editor
            name="description"
            label="Description"
            onChange={(_, editor) => {
              const data = editor.getData();
              setFieldValue("description", data);
            }}
          />
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
              isLoading={addStudentLifeMutation.isPending}
              disabled={addStudentLifeMutation.isPending}
              text="Create"
            />
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default CreateStudentLife;
