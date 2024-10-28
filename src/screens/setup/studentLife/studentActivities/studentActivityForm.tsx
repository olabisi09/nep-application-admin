import { Form, Formik, FormikValues } from "formik";
import { Button, Editor, Input, Select } from "../../../../custom";
import { createOrUpdateStudentActivity } from "../../../../requests";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { App } from "antd";
import { useParams } from "react-router-dom";
import * as Yup from "yup";

const StudentActivityForm = ({
  handleClose,
  item,
}: {
  handleClose: () => void;
  item: StudentActivities;
}) => {
  const { id } = useParams();
  const { notification } = App.useApp();
  const queryClient = useQueryClient();

  const addStudentActivityMutation = useMutation({
    mutationFn: createOrUpdateStudentActivity,
  });

  const studentLifeId = id ?? "" ?? 0;

  const handleAddStudentActivity = async (
    values: FormikValues,
    resetForm: () => void
  ) => {
    const payload: Partial<Setup> = {
      id: item?.id ?? 0,
      studentLifeId: studentLifeId,
      title: values.title,
      description: values.description,
      activeStatus: values.status === "Active" ? true : false,
      isDeleted: false,
    };

    try {
      await addStudentActivityMutation.mutateAsync(payload, {
        onSuccess: (data) => {
          notification.success({
            message: "Success",
            description: data?.message,
          });
          queryClient.refetchQueries({ queryKey: ["get-support-guidance"] });
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
      <option value={""}>-- select an option --</option>
      <option value="Active"> Active</option>
      <option value="Inactive">Inactive</option>
    </>
  );

  const validateSetup = Yup.object().shape({
    title: Yup.string().required("Title is required"),
    description: Yup.string().required("Description is required"),
    status: Yup.string().required("Status is required"),
  });

  const initialStatus = item?.activeStatus
    ? "Active"
    : item?.activeStatus === false
    ? "Inactive"
    : "";
  const hasRecords = Object.keys(item).length > 0;

  return (
    <Formik
      initialValues={{
        title: item.title ?? "",
        description: item.description ?? "",
        status: initialStatus,
      }}
      onSubmit={(values, { resetForm }) =>
        handleAddStudentActivity(values, resetForm)
      }
      validationSchema={validateSetup}
      enableReinitialize
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
            initialData={item?.description ?? ""}
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
              isLoading={addStudentActivityMutation.isPending}
              disabled={addStudentActivityMutation.isPending}
              text={hasRecords ? "Update" : "Create"}
            />
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default StudentActivityForm;
