import { Form, Formik, FormikValues } from "formik";
import Select from "../../../custom/select/select";
import Button from "../../../custom/button/button";
import { App, Spin } from "antd";
import { getAllPrograms, StatusOptions } from "../../../requests";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import * as Yup from "yup";
import Editor from "../../../custom/editor/editor";
import { createOrUpdateReadMoreProgrammes } from "./request";
import { validator } from "../../../utils/validator";
import { Input } from "../../../custom";

const validationSchema = Yup.object().shape({
  programName: validator.programName,
  description: validator.description,
  status: validator.status,
});

const AddReadMoreProgramme = ({ handleClose }: { handleClose: () => void }) => {
  const { notification } = App.useApp();
  const queryClient = useQueryClient();

  const addReadMoreProgrammeMutation = useMutation({
    mutationFn: createOrUpdateReadMoreProgrammes,
  });

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["get-all-programs"],
    queryFn: getAllPrograms,
  });

  const programsData = data?.data ?? [];

  const handleAddReadMoreProgramme = async (
    values: FormikValues,
    resetForm: () => void
  ) => {
    const payload: Partial<ReadMoreProgrammePayload> = {
      description: values.description,
      readmoreId: parseInt(values.programName),
      sessionIntake: values.session,
      duration: values.duration,
      activeStatus: values?.status === "false" ? false : true,
    };

    try {
      await addReadMoreProgrammeMutation.mutateAsync(payload, {
        onSuccess: (data) => {
          notification.success({
            message: "Success",
            description: data?.message,
          });
          queryClient.refetchQueries({
            queryKey: ["get-read-more-programmes"],
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
        duration: "",
        session: "",
        status: "",
      }}
      onSubmit={(values, { resetForm }) => {
        handleAddReadMoreProgramme(values, resetForm);
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

          <Input
            name="duration"
            label="Duration (Months)"
            placeholder="Input Duration in months"
          />

          <Select name="session" placeholder="Select Session" label="Session" />

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
              isLoading={addReadMoreProgrammeMutation.isPending}
              disabled={addReadMoreProgrammeMutation.isPending}
            />
          </div>
        </Form>
      )}
    </Formik>
  );
};

const EditReadMoreProgramme = ({
  handleClose,
  record,
}: {
  handleClose: () => void;
  record: ReadMoreProgramme;
}) => {
  const { notification } = App.useApp();
  const queryClient = useQueryClient();

  const addReadMoreProgrammeMutation = useMutation({
    mutationFn: createOrUpdateReadMoreProgrammes,
  });

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["get-all-programs"],
    queryFn: getAllPrograms,
  });

  const programsData = data?.data ?? [];

  const handleAddReadMoreProgramme = async (
    values: FormikValues,
    resetForm: () => void
  ) => {
    const payload: Partial<ReadMoreProgrammePayload> = {
      id: record?.id,
      description: values.description,
      readmoreId: parseInt(values.programName),
      sessionIntake: values.session,
      duration: values.duration,
      activeStatus: values?.status === "false" ? false : true,
    };

    try {
      await addReadMoreProgrammeMutation.mutateAsync(payload, {
        onSuccess: (data) => {
          notification.success({
            message: "Success",
            description: data?.message,
          });
          queryClient.refetchQueries({
            queryKey: ["get-read-more-programmes"],
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

  const initialStatus = record?.activeStatus === true ? "Active" : "Inactive";

  return (
    <Formik
      initialValues={{
        programName: record?.readmoreId ?? "",
        description: record?.description ?? "",
        duration: record?.duration ?? "",
        session: record?.sessionIntake ?? "",
        status: initialStatus,
      }}
      onSubmit={(values, { resetForm }) => {
        handleAddReadMoreProgramme(values, resetForm);
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
            initialData={record?.description}
          />

          <Input
            name="duration"
            label="Duration (Months)"
            placeholder="Input Duration in months"
          />
          <Input name="session" placeholder="Select Session" label="Session" />

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
              isLoading={addReadMoreProgrammeMutation.isPending}
              disabled={addReadMoreProgrammeMutation.isPending}
            />
          </div>
        </Form>
      )}
    </Formik>
  );
};

export { AddReadMoreProgramme, EditReadMoreProgramme };
