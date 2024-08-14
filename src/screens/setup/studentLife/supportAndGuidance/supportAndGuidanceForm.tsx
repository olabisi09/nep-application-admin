import { Form, Formik, FormikValues } from "formik";
import { Button, Editor, Input, Select } from "../../../../custom";
import { createOrUpdateSupportGuidance } from "../../../../requests";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { App } from "antd";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import StudentLife from "../studentLife";
import { useParams } from "react-router-dom";
import * as Yup from "yup";

const SupportAndGuidanceForm = ({
  handleClose,
  item,
}: {
  handleClose: () => void;
  item: SupportAndGuidance;
}) => {
  const { id } = useParams();
  const { notification } = App.useApp();
  const queryClient = useQueryClient();
  const addSupportGuidanceMutation = useMutation({
    mutationFn: createOrUpdateSupportGuidance,
  });

  const studentLifeId = id ?? "" ?? 0;

  const handleAddSupportGuidance = async (
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
      await addSupportGuidanceMutation.mutateAsync(payload, {
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

  const initialStatus = item?.activeStatus === true ? "Active" : "Inactive";
  const hasRecords = Object.keys(item).length > 0;

  return (
    <Formik
      initialValues={{
        title: item.title ?? "",
        description: item.description ?? "",
        status: initialStatus,
      }}
      onSubmit={(values, { resetForm }) =>
        handleAddSupportGuidance(values, resetForm)
      }
      validationSchema={validateSetup}>
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
              isLoading={addSupportGuidanceMutation.isPending}
              disabled={addSupportGuidanceMutation.isPending}
              text={hasRecords ? "update" : "Create"}
            />
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default SupportAndGuidanceForm;
