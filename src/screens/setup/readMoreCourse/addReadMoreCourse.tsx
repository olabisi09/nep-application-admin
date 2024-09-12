import { Form, Formik, FormikValues } from "formik";
import Select from "../../../custom/select/select";
import Button from "../../../custom/button/button";
import { App, Spin } from "antd";
import {
  getAllPrograms,
  StatusOptions,
} from "../../../requests";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import * as Yup from "yup";
import Editor from "../../../custom/editor/editor";
import { createOrUpdateCourseOverview } from "./request";
import { validator } from "../../../utils/validator";

const validationSchema = Yup.object().shape({
  programName: validator.programName,
  description: validator.description,
  status: validator.status,
});

const AddReadMoreCourseOverview = ({
  handleClose,
}: {
  handleClose: () => void;
}) => {
  const { notification } = App.useApp();
  const queryClient = useQueryClient();

  const addCourseOverviewMutation = useMutation({
    mutationFn: createOrUpdateCourseOverview,
  });

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["get-all-programs"],
    queryFn: getAllPrograms,
  });

  const programsData = data?.data ?? [];

  const handleAddCourseOverview = async (
    values: FormikValues,
    resetForm: () => void
  ) => {
    const payload: Partial<CommonPayload> = {
      description: values.description,
      readMoreId: parseInt(values.programName),
      activeStatus: values?.status === "false" ? false : true,
    };

    try {
      await addCourseOverviewMutation.mutateAsync(payload, {
        onSuccess: (data) => {
          notification.success({
            message: "Success",
            description: data?.message,
          });
          queryClient.refetchQueries({ queryKey: ["get-all-course-overview"] });
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

  const programOptions = programsData?.map((option) => (
    <>
      {isLoading ? (
        <Spin />
      ) : isError ? (
        <p>{error?.message}</p>
      ) : (
        <option key={option.id} value={option.id}>
          {option.name}
        </option>
      )}
    </>
  ));

  return (
    <Formik
      initialValues={{
        programName: "",
        description: "",
        status: "",
      }}
      onSubmit={(values, { resetForm }) => {
        handleAddCourseOverview(values, resetForm);
      }}
      validationSchema={validationSchema}
    >
      {({ setFieldValue }) => (
        <Form className="fields">
          <Select
            name="programName"
            placeholder="Select Program Name "
            label="Program Name"
            options={programOptions}
          />

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
            placeholder="Select Status"
            label="Status"
            options={
              <>
                {StatusOptions.map((option: any) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </>
            }
          />
          <div className="btn-group">
            <Button onClick={handleClose} variant="text" text="Cancel" />
            <Button
              text="Create"
              isLoading={addCourseOverviewMutation.isPending}
              disabled={addCourseOverviewMutation.isPending}
            />
          </div>
        </Form>
      )}
    </Formik>
  );
};

const EditReadMoreCourseOverview = ({
  handleClose,
  record,
}: {
  handleClose: () => void;
  record: ReadMoreOverview;
}) => {
  const { notification } = App.useApp();
  const queryClient = useQueryClient();

  const editCourseOverviewMutation = useMutation({
    mutationFn: createOrUpdateCourseOverview,
  });

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["get-all-programs"],
    queryFn: getAllPrograms,
  });

  const programsData = data?.data ?? [];

  const handleEditCourseOverview = async (
    values: FormikValues,
    resetForm: () => void
  ) => {
    const payload: Partial<CommonPayload> = {
      id: record?.id,
      description: values.description,
      readMoreId: parseInt(values.programName),
      activeStatus: values?.status === "false" ? false : true,
    };

    try {
      await editCourseOverviewMutation.mutateAsync(payload, {
        onSuccess: (data) => {
          notification.success({
            message: "Success",
            description: data?.message,
          });
          queryClient.refetchQueries({ queryKey: ["get-all-course-overview"] });
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
  return (
    <Formik
      initialValues={{
        programName: record?.readMoreId,
        description: record?.description,
        status: record?.activeStatus ? "true" : "false",
      }}
      onSubmit={(values, { resetForm }) => {
        handleEditCourseOverview(values, resetForm);
      }}
      validationSchema={validationSchema}
    >
      {({ setFieldValue }) => (
        <Form className="fields">
          <Select
            name="programName"
            placeholder="Select Program Name "
            label="Program Name"
            options={
              <>
                {isLoading ? (
                  <Spin />
                ) : isError ? (
                  <p>{error?.message}</p>
                ) : (
                  programsData &&
                  programsData?.map((option: Program) => (
                    <option key={option.id} value={option.id}>
                      {option.name}
                    </option>
                  ))
                )}
              </>
            }
          />
          <Editor
            name="description"
            label="Description"
            onChange={(_, editor) => {
              const data = editor.getData();
              setFieldValue("description", data);
            }}
            initialData={record.description}
          />

          <Select
            name="status"
            placeholder="Select Status"
            label="Status"
            options={
              <>
                {StatusOptions.map((option: any) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </>
            }
          />

          <div className="btn-group">
            <Button onClick={handleClose} variant="text" text="Cancel" />
            <Button
              text="Update"
              isLoading={editCourseOverviewMutation?.isPending}
              disabled={editCourseOverviewMutation?.isPending}
            />
          </div>
        </Form>
      )}
    </Formik>
  );
};

export { AddReadMoreCourseOverview, EditReadMoreCourseOverview };
