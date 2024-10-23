import { Form, Formik, FormikValues } from "formik";
import { Button, Editor, Select } from "../../../../../custom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { App } from "antd";
import { useParams } from "react-router-dom";
import { validator } from "../../../../../utils/validator";
import * as Yup from "yup";
import { createOrUpdateCampusExperienceItem } from "../../../../../requests";

const CampusExperienceItemForm = ({
  handleClose,
  item,
}: {
  handleClose: () => void;
  item: CampusExperienceItem;
}) => {
  const { id } = useParams();
  const { notification } = App.useApp();
  const queryClient = useQueryClient();

  const addCampusExperienceItemMutation = useMutation({
    mutationFn: createOrUpdateCampusExperienceItem,
  });

  const campusExperienceId = parseInt(id ?? "") ?? 0;

  const handleCampusExperienceItem = async (
    values: FormikValues,
    resetForm: () => void
  ) => {
    const payload: Partial<CampusExperienceItem> = {
      id: item?.id ?? 0,
      campusExperienceId,
      description: values.description,
      activeStatus: values.status === "Active" ? true : false,
      isDeleted: false,
    };

    try {
      await addCampusExperienceItemMutation.mutateAsync(payload, {
        onSuccess: (data) => {
          notification.success({
            message: "Success",
            description: data?.message,
          });
          queryClient.refetchQueries({
            queryKey: ["get-campus-experience-by-id"],
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
    status: validator.status,
    description: validator.description,
  });

  const initialStatus = item?.activeStatus ? "Active" : "Inactive";
  const hasRecords = Object.keys(item).length > 0;

  return (
    <Formik
      initialValues={{
        description: item.description ?? "",
        status: initialStatus ?? '',
      }}
      onSubmit={(values, { resetForm }) =>
        handleCampusExperienceItem(values, resetForm)
      }
      validationSchema={validationSchema}
      enableReinitialize
    >
      {({ setFieldValue }) => {
        return (
          <Form className="fields">
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
                isLoading={addCampusExperienceItemMutation.isPending}
                disabled={addCampusExperienceItemMutation.isPending}
                text={hasRecords ? "Update" : "Create"}
              />
            </div>
          </Form>
        );
      }}
    </Formik>
  );
};

export default CampusExperienceItemForm;
