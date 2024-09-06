import { Form, Formik, FormikValues } from "formik";
import { Button, Editor, Input, Select } from "../../../../../custom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { App } from "antd";
import { useParams } from "react-router-dom";
import { validator } from "../../../../../utils/validator";
import * as Yup from "yup";
import { createOrUpdateSupportGuidanceItem } from "../../../../../requests";

const SupportGuidanceItemForm = ({
  handleClose,
  item,
}: {
  handleClose: () => void;
  item: SupportGuidanceItem;
}) => {
  const { id } = useParams();
  const { notification } = App.useApp();
  const queryClient = useQueryClient();

  const addSupportGuidanceItemMutation = useMutation({
    mutationFn: createOrUpdateSupportGuidanceItem,
  });

  const supportGuidanceId = parseInt(id ?? "") ?? 0;

  const handleSupportGuidanceItem = async (
    values: FormikValues,
    resetForm: () => void
  ) => {
    const payload: Partial<SupportGuidanceItem> = {
      id: item?.id ?? 0,
      supportGuidanceId,
      title: values.title,
      description: values.description,
      activeStatus: values.status === "Active" ? true : false,
      isDeleted: false,
    };

    try {
      await addSupportGuidanceItemMutation.mutateAsync(payload, {
        onSuccess: (data) => {
          notification.success({
            message: "Success",
            description: data?.message,
          });
          queryClient.refetchQueries({
            queryKey: ["get-support-guidance-by-id"],
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

  const statusOptions = (
    <>
      <option value="">-- select an option --</option>
      <option value="Active">Active</option>
      <option value="Inactive">Inactive</option>
    </>
  );

  const validationSchema = Yup.object().shape({
    title: validator.title,
    status: validator.status,
    description: validator.description,
  });

  const initialStatus = item?.activeStatus === true ? "Active" : "Inactive";
  const hasRecords = Object.keys(item).length > 0;

  return (
    <Formik
      initialValues={{
        title: item?.title ?? "",
        description: item.description ?? "",
        status: initialStatus,
      }}
      onSubmit={(values, { resetForm }) =>
        handleSupportGuidanceItem(values, resetForm)
      }
      validationSchema={validationSchema}
    >
      {({ setFieldValue }) => {
        return (
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
                isLoading={addSupportGuidanceItemMutation.isPending}
                disabled={addSupportGuidanceItemMutation.isPending}
                text={hasRecords ? "Update" : "Create"}
              />
            </div>
          </Form>
        );
      }}
    </Formik>
  );
};

export default SupportGuidanceItemForm;
