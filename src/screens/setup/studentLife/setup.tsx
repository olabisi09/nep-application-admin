import { FieldArray, Form, Formik, FormikValues } from "formik";
import Button from "../../../custom/button/button";
import Input from "../../../custom/input/input";
import Upload from "../../../custom/upload/upload";
import { ReactComponent as Image } from "../../../assets/image.svg";
import { Fragment } from "react/jsx-runtime";
import { App } from "antd";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  createOrUpdateCampusExperience,
  createOrUpdateSchoolSummary,
  createOrUpdateStudentLife,
} from "../../../requests";
import Select from "../../../custom/select/select";
import Editor from "../../../custom/editor/editor";

interface SetupInit {
  title: string;
  name: string;
  description: string;
  image: File | null;
}

type SetupWithActivity = {
  activities: { activity: string; image: File | null }[];
} & SetupInit;

export const CreateStudentLife = ({
  handleClose,
}: {
  handleClose: () => void;
}) => {
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
      <Form className="fields">
        <Input name="title" label="Title" placeholder="Input title" />
        <Input
          name="description"
          type="textarea"
          label="Description"
          placeholder="Input description"
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
    </Formik>
  );
};

export const EditStudentLife = ({
  item,
  handleClose,
}: {
  item: Setup;
  handleClose: () => void;
}) => {
  const { notification } = App.useApp();
  const queryClient = useQueryClient();
  const editStudentLifeMutation = useMutation({
    mutationFn: createOrUpdateStudentLife,
  });

  const handleEditStudentLife = async (
    values: FormikValues,
    resetForm: () => void
  ) => {
    const payload: Partial<Setup> = {
      id: item.id,
      title: values.title,
      description: values.description,
      activeStatus: values.status === "Active",
    };

    try {
      await editStudentLifeMutation.mutateAsync(payload, {
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
        title: item.title,
        description: item.description,
        status: item.activeStatus ? "Active" : "Inactive",
      }}
      onSubmit={(values, { resetForm }) =>
        handleEditStudentLife(values, resetForm)
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
              isLoading={editStudentLifeMutation.isPending}
              disabled={editStudentLifeMutation.isPending}
              text="Update"
            />
          </div>
        </Form>
      )}
    </Formik>
  );
};

export const SchoolSummarySetup = ({
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
export const OverviewSetup = ({ handleClose }: { handleClose: () => void }) => {
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
      onSubmit={() => {}}
    >
      {({ values, setFieldValue }) => (
        <Form className="fields">
          <Input name="title" label="Title" placeholder="Input title" />
          <Input name="name" label="Name" placeholder="Input name" />
          <Input
            name="description"
            type="textarea"
            label="Description"
            placeholder="Input description"
          />
          {values.image?.name ? (
            <div className="small-gap">
              <Image />
              <span>{values.image?.name}</span>
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
          <div className="btn-group">
            <Button onClick={handleClose} variant="text" text="Cancel" />
            <Button text="Create" />
          </div>
        </Form>
      )}
    </Formik>
  );
};

export const StudentActivitiesSetup = ({
  handleClose,
}: {
  handleClose: () => void;
}) => {
  return (
    <Formik
      initialValues={
        {
          title: "",
          name: "",
          description: "",
          activities: [
            {
              activity: "",
              image: null,
            },
          ],
        } as SetupWithActivity
      }
      onSubmit={() => {}}
    >
      {({ values, setFieldValue }) => (
        <Form className="fields">
          <Input name="title" label="Title" placeholder="Input title" />
          <Input name="name" label="Name" placeholder="Input name" />
          <Input
            name="description"
            type="textarea"
            label="Description"
            placeholder="Input description"
          />
          <FieldArray name="activities">
            {({ push }) => (
              <>
                {values.activities.map((_, index) => (
                  <Fragment key={index}>
                    <Input
                      name={`activities.${index}.activity`}
                      label={`Activity ${index + 1}`}
                      placeholder="Activity description"
                    />
                    {values.activities[index].image ? (
                      <div className="small-gap">
                        <Image />
                        <span>{values.activities[index].image?.name}</span>
                        <Button
                          onClick={() =>
                            setFieldValue(`activities.${index}.image`, null)
                          }
                          variant="text"
                          text="x"
                        />
                      </div>
                    ) : (
                      <Upload
                        name={`activities.${index}.image`}
                        label="Image"
                        onChange={(e) => {
                          const file = e.target.files;
                          if (file) {
                            setFieldValue(`activities.${index}.image`, file[0]);
                          }
                        }}
                      />
                    )}
                  </Fragment>
                ))}
                <Button
                  variant="text"
                  iconBefore="+"
                  onClick={() => push({ activity: "", image: null })}
                  text="Add Activitiy & Image"
                />
              </>
            )}
          </FieldArray>
          <div className="btn-group">
            <Button onClick={handleClose} variant="text" text="Cancel" />
            <Button text="Create" />
          </div>
        </Form>
      )}
    </Formik>
  );
};

export const CampusExperienceSetup = ({
  handleClose,
  item,
}: {
  handleClose: () => void;
  item?: Setup;
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
    const payload: Partial<Setup> = {
      title: values.title,
      description: values.description,
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
        handleAddCampusExperience(values, resetForm)
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
