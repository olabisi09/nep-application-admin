import { Form, Formik, FormikValues } from "formik";
import Editor from "../../../custom/editor/editor";
import Select from "../../../custom/select/select";
import { createOrUpdateAdmissionRequirement, getAllPrograms, StatusOptions } from "../../../requests";
import { App, Spin } from "antd";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import * as Yup from "yup";
import Button from "../../../custom/button/button";

const AddAdmissionRequirement = ({ handleClose }: { handleClose: () => void }) => {
  const { notification } = App.useApp();
  const queryClient = useQueryClient();

  const addAdmissionRequirementMutation = useMutation({ mutationFn: createOrUpdateAdmissionRequirement });

  const { data: programsData, isLoading, isError, error } = useQuery({
    queryKey: ["get-all-programs"],
    queryFn: getAllPrograms,
  });

  const validate = Yup.object().shape({
    programName: Yup.string().required("Program is required"),
    description: Yup.string().required("Description is required"),
  });

  const handleAddAdmissionRequirement = async (values: FormikValues, resetForm: () => void) => {
    const payload: Partial<AdmissionRequirement> = {
      description: values.description,
      readMoreId: parseInt(values.programName),
      activeStatus: values?.status === "true" ? true : false,
    };

    try {
      await addAdmissionRequirementMutation.mutateAsync(payload, {
        onSuccess: (data) => {
          notification.success({
            message: "Success",
            description: data?.message,
          });
          queryClient.refetchQueries({ queryKey: ["get-admission-requirement"] });
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
        status:'',
      }}
      onSubmit={(values, { resetForm }) => {
        handleAddAdmissionRequirement(values, resetForm);
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
            <Button  variant="text" text="Cancel" />
            <Button text="Create" isLoading={addAdmissionRequirementMutation.isPending} disabled={addAdmissionRequirementMutation?.isPending}/>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default AddAdmissionRequirement;
