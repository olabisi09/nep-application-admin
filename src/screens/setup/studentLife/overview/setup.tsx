import { Form, Formik, FormikValues } from "formik";
import { Button, Editor, Input, Select, Upload } from "../../../../custom";
import { ReactComponent as Image } from "../../../../assets/image.svg";
import { App } from "antd";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createOrUpdateOverview } from "../../../../requests";
import * as Yup from "yup";
import { validator } from "../../../../utils/validator";

interface SetupInit {
  title: string;
  name: string;
  description: string;
  image: File | null;
  status?: string;
}

export const CreateOverview = ({
  studentLifeId,
  handleClose,
}: {
  studentLifeId: string | number;
  handleClose: () => void;
}) => {
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
      StudentLifeId: studentLifeId,
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
          queryClient.refetchQueries({ queryKey: ["get-overview"] });
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
      <option>Inactive</option>
    </>
  );

  const validationSchema = Yup.object().shape({
    title: validator.title,
    description: validator.description,
    status: validator.status,
    image: validator.file,
  });

  return (
    <Formik
      initialValues={
        {
          title: "",
          name: "",
          description: "",
          image: null,
          status: "",
        } as SetupInit
      }
      onSubmit={(values, { resetForm }) => handleAddOverview(values, resetForm)}
      validationSchema={validationSchema}>
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

export const EditOverview = ({
  item,
  handleClose,
}: {
  item: ItemByStudentLife;
  handleClose: () => void;
}) => {
  const { notification } = App.useApp();
  const queryClient = useQueryClient();
  const editOverviewMutation = useMutation({
    mutationFn: createOrUpdateOverview,
  });

  const handleEditOverview = async (
    values: FormikValues,
    resetForm: () => void
  ) => {
    const payload = {
      Id: item?.id,
      Title: values.title,
      Description: values.description,
      StudentLifeId: item?.studentLifeId,
      Image: values.image,
      ActiveStatus: values.status === "Active",
      IsDeleted: false,
    };

    try {
      await editOverviewMutation.mutateAsync(payload, {
        onSuccess: (data) => {
          notification.success({
            message: "Success",
            description: data?.message,
          });
          queryClient.refetchQueries({ queryKey: ["get-overview"] });
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
      <option>Inative</option>
    </>
  );

  const validationSchema = Yup.object().shape({
    title: validator.title,
    description: validator.description,
    status: validator.status,
    image: validator.file,
  });

  return (
    <Formik
      initialValues={
        {
          title: item?.title,
          description: item?.description,
          image: null,
          status: item?.activeStatus ? "Active" : "Inactive",
        } as SetupInit
      }
      enableReinitialize
      onSubmit={(values, { resetForm }) =>
        handleEditOverview(values, resetForm)
      }
    >
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
            initialData={item?.description}
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
              isLoading={editOverviewMutation.isPending}
              disabled={editOverviewMutation.isPending}
              text="Create"
            />
          </div>
        </Form>
      )}
    </Formik>
  );
};
