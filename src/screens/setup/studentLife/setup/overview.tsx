import { Form, Formik, FormikValues } from "formik";
import { Button, Editor, Input, Select, Upload } from "../../../../custom";
import { ReactComponent as Image } from "../../../../assets/image.svg";
import { App } from "antd";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createOrUpdateOverview } from "../../../../requests";

interface SetupInit {
  title: string;
  name: string;
  description: string;
  image: File | null;
}

const Overview = ({ handleClose }: { handleClose: () => void }) => {
  const { notification } = App.useApp();
  const queryClient = useQueryClient();
  const addOverviewMutation = useMutation({
    mutationFn: createOrUpdateOverview,
  });

  const handleAddOverview = async (
    values: FormikValues,
    resetForm: () => void
  ) => {
    const payload = {
      Title: values.title,
      Description: values.description,
      StudentLifeId: 3,
      Image: values.image,
      ActiveStatus: values.status === "Active",
      IsDeleted: false,
    };

    try {
      await addOverviewMutation.mutateAsync(payload, {
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
      <option>-- select an option --</option>
      <option>Active</option>
      <option>Inactive</option>
    </>
  );

  return (
    <Formik
      initialValues={
        {
          title: "",
          name: "",
          description: "",
          image: null,
        } as SetupInit
      }
      onSubmit={(values, { resetForm }) =>
        handleAddOverview(values, resetForm)
      }>
      {({ values, setFieldValue }) => (
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
              isLoading={addOverviewMutation.isPending}
              disabled={addOverviewMutation.isPending}
              text="Create"
            />
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default Overview;
