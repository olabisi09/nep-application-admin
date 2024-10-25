import { Form, Formik, FormikValues } from "formik";
import { Button, Editor, Input, Select, Upload } from "../../../../custom";
import { App } from "antd";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createOrUpdateCampusExperience } from "../../../../requests";

interface SetupInit {
  title: string;
  name: string;
  description: string;
  image: File | null;
  status?: string;
}

export const CreateCampusExperience = ({
  studentLifeId,
  handleClose,
}: {
  studentLifeId: number;
  handleClose: () => void;
}) => {
  const { notification } = App.useApp();
  const queryClient = useQueryClient();
  
  const addCampusExperienceMutation = useMutation({
    mutationFn: createOrUpdateCampusExperience,
  });

  const handleAddCampusExperience = async (
    values: FormikValues,
    resetForm: () => void
  ) => {
    const payload = {
      title: values.title,
      description: values.description,
      studentLifeId: studentLifeId,
      activeStatus: values.status === "Active",
      isDeleted: false,
    };

    try {
      await addCampusExperienceMutation.mutateAsync(payload, {
        onSuccess: (data) => {
          notification.success({
            message: "Success",
            description: data?.message,
          });
          queryClient.refetchQueries({ queryKey: ["get-campus-experience"] });
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
      initialValues={
        {
          title: "",
          name: "",
          description: "",
          image: null,
          status: "",
        } as SetupInit
      }
      onSubmit={(values, { resetForm }) =>
        handleAddCampusExperience(values, resetForm)
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
              isLoading={addCampusExperienceMutation.isPending}
              disabled={addCampusExperienceMutation.isPending}
              text="Create"
            />
          </div>
        </Form>
      )}
    </Formik>
  );
};

export const EditCampusExperience = ({
  item,
  handleClose,
}: {
  item: ItemByStudentLife;
  handleClose: () => void;
}) => {
  const { notification } = App.useApp();
  const queryClient = useQueryClient();
  const editCampusExperienceMutation = useMutation({
    mutationFn: createOrUpdateCampusExperience,
  });

  const handleEditCampusExperience = async (
    values: FormikValues,
    resetForm: () => void
  ) => {
    const payload = {
      id: item?.id,
      title: values.title,
      description: values.description,
      studentLifeId: item?.studentLifeId,
      activeStatus: values.status === "Active",
      isDeleted: false,
    };

    try {
      await editCampusExperienceMutation.mutateAsync(payload, {
        onSuccess: (data) => {
          notification.success({
            message: "Success",
            description: data?.message,
          });
          queryClient.refetchQueries({ queryKey: ["get-campus-experience"] });
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
        handleEditCampusExperience(values, resetForm)
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
          {/* {values.image ? (
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
          )} */}
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
              isLoading={editCampusExperienceMutation.isPending}
              disabled={editCampusExperienceMutation.isPending}
              text="Edit"
            />
          </div>
        </Form>
      )}
    </Formik>
  );
};
