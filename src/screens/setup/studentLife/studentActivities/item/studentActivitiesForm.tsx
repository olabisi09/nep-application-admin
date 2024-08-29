import { Form, Formik, FormikValues } from "formik";
import { Button, Editor, Input, Select, Upload } from "../../../../../custom";
import { ReactComponent as Image } from "../../../../../assets/image.svg";
import { App } from "antd";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createOrUpdateStudentActivityItem } from "../../../../../requests";
import { object } from "yup";
import { useParams } from "react-router-dom";
import { validator } from "../../../../../utils/validator";

interface SetupInit {
  title: string;
  name: string;
  description: string;
  image: File | null;
}

const StudentActivityItemForm = ({
  handleClose,
  item,
}: {
  handleClose: () => void;
  item: Partial<StudentActivity>;
}) => {
  const { id } = useParams();
  const { notification } = App.useApp();
  const queryClient = useQueryClient();

  const studentActivitiesMutation = useMutation({
    mutationFn: createOrUpdateStudentActivityItem,
  });

  const studentActivityId = id?.toString() ?? "";
  const itemId = item?.id?.toString() ?? "0";

  const handleAddUpdateStudentActivities = async (
    values: FormikValues,
    resetForm: () => void
  ) => {
    const formData = new FormData();
    formData.append("Id", itemId);
    formData.append("StudentActivityId", studentActivityId);
    formData.append("Title", values.title);
    formData.append("Description", values.description);
    formData.append("Image", values.image);
    formData.append(
      "ActiveStatus",
      values.status === "Active" ? String(true) : String(false)
    );

    try {
      await studentActivitiesMutation.mutateAsync(formData, {
        onSuccess: (data) => {
          notification.success({
            message: "Success",
            description: data?.message,
          });
          queryClient.refetchQueries({ queryKey: ["get-student-activities"] });
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

  const validateSetup = object().shape({
    title: validator.title,
    description: validator.description,
    status: validator.status,
    // image: validator.file,
  });

  const statusOptions = (
    <>
      <option value={""}>-- select an option --</option>
      <option value="Active"> Active</option>
      <option value="Inactive">Inactive</option>
    </>
  );

  const initialStatus = item?.activeStatus === true ? "Active" : "Inactive";
  const hasRecords = Object.keys(item).length > 0;

  return (
    <Formik
      enableReinitialize
      initialValues={
        {
          title: item.title ?? "",
          name: "",
          description: item.description ?? "",
          image: null,
          status: initialStatus,
        } as SetupInit
      }
      onSubmit={(values, { resetForm }) =>
        handleAddUpdateStudentActivities(values, resetForm)
      }
      validationSchema={validateSetup}
    >
      {({ setFieldValue, values }) => (
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

          {values.image ? (
            <div className="small-gap">
              <Image />
              <span>{values.image.name}</span>
              <Button
                onClick={() => setFieldValue("image", null)}
                variant="text"
                text="x"
              />
            </div>
          ) : item?.imageUrl ? (
            <div className="small-gap">
              <Image />
              <span>{item?.imageUrl}</span>
              <Button
                onClick={() => setFieldValue("image", null)}
                variant="text"
                text="x"
              />
            </div>
          ) : (
            <Upload
              name="image"
              label="Image"
              onChange={(e) => {
                const file = e.target.files;
                if (file) {
                  setFieldValue("image", file[0]);
                }
              }}
            />
          )}

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
              isLoading={studentActivitiesMutation.isPending}
              disabled={studentActivitiesMutation.isPending}
              text={hasRecords ? "Update" : "Create"}
            />
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default StudentActivityItemForm;
