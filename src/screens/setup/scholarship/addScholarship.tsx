import { Form, Formik, FormikValues } from "formik";
import Select from "../../../custom/select/select";
import Button from "../../../custom/button/button";
import { App, Spin } from "antd";
import { createOrUpdateScholarship, getAllPrograms, StatusOptions } from "../../../requests";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import * as Yup from "yup";
import Editor from "../../../custom/editor/editor";

const AddScholarship = ({ handleClose }: { handleClose: () => void }) => {
  const { notification } = App.useApp();
  const queryClient = useQueryClient();
  const addScholarshipMutation = useMutation({ mutationFn: createOrUpdateScholarship });
  const {
    data: programsData,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["get-all-programs"],
    queryFn: () => getAllPrograms(),
  });

  const validate = Yup.object().shape({
    programName: Yup.string().required("Program is required"),
    description: Yup.string().required("Description is required"),
    status: Yup.string().required("Status is required"),
  });

  const handleAddScholarship = async (values: FormikValues, resetForm: () => void) => {
    const payload: Partial<CommonPayload> = {
      description: values.description,
      readmoreId: parseInt(values.programName),
      activeStatus: values?.status === "false" ? false : true,
    };

    try {
      await addScholarshipMutation.mutateAsync(payload, {
        onSuccess: (data) => {
          notification.success({
            message: "Success",
            description: data?.message,
          });
          queryClient.refetchQueries({ queryKey: ["get-scholarship"] });
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
        programName: "",
        description: "",
        status: "",
      }}
      onSubmit={(values, { resetForm }) => {
        handleAddScholarship(values, resetForm);
      }}
      validationSchema={validate}
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
                  programsData?.data?.length > 0 &&
                  programsData?.data.map((option: Program) => (
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
            <Button text="Create" isLoading={addScholarshipMutation.isPending} disabled={addScholarshipMutation.isPending} />
          </div>
        </Form>
      )}
    </Formik>
  );
};

const EditScholarship = ({ handleClose, scholarship }: { handleClose: () => void; scholarship: CommonPayload }) => {
  const { notification } = App.useApp();
  const queryClient = useQueryClient();
  const editScholarshipMutation = useMutation({ mutationFn: createOrUpdateScholarship });
  const {
    data: programsData,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["get-all-programs"],
    queryFn: () => getAllPrograms(),
  });

  const validate = Yup.object().shape({
    programName: Yup.string().required("Program is required"),
    description: Yup.string().required("Description is required"),
    status: Yup.string().required("Status is required"),
  });

  const handleEditScholarship = async (values: FormikValues, resetForm: () => void) => {
    const payload: Partial<CommonPayload> = {
      id: scholarship.id,
      description: values.description,
      readmoreId: parseInt(values.programName),
      activeStatus: values?.status === "false" ? false : true,
    };

    try {
      await editScholarshipMutation.mutateAsync(payload, {
        onSuccess: (data) => {
          notification.success({
            message: "Success",
            description: data?.message,
          });
          queryClient.refetchQueries({ queryKey: ["get-scholarship"] });
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
        programName: scholarship.readmoreId,
        description: scholarship.description,
        status: scholarship.activeStatus ? "true" : "false",
      }}
      onSubmit={(values,{resetForm}) => {handleEditScholarship(values,resetForm)}}
      validationSchema={validate}
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
                  programsData?.data?.length > 0 &&
                  programsData?.data.map((option: Program) => (
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
            initialData={scholarship.description}
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
            <Button text="Update" isLoading={editScholarshipMutation?.isPending} disabled={editScholarshipMutation?.isPending}/>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export { AddScholarship, EditScholarship };
