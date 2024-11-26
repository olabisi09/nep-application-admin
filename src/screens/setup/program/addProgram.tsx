import { App } from "antd";
import { useMutation, useQueries, useQueryClient } from "@tanstack/react-query";
import * as Yup from "yup";
import { Form, Formik, FormikValues } from "formik";
import { Button, Select } from "../../../custom";
import { createUpdateProgram, getProgramTypes } from "./request";
import { validator } from "../../../utils/validator";
import { getAllPrograms, StatusOptions } from "../../../requests";

interface Props {
  handleClose: () => void;
}

const AddProgram = ({ handleClose }: Props) => {
  const { notification } = App.useApp();
  const queryClient = useQueryClient();

  const queries = useQueries({
    queries: [
      { queryKey: ["get-program-types"], queryFn: getProgramTypes },
      { queryKey: ["get-all-department"], queryFn: () => getAllPrograms() },
    ],
  });

  const programTypeQuery = queries[0];
  const departmentQuery = queries[1];

  const { data: programType } = programTypeQuery;
  const { data: department } = departmentQuery;

  const programTypeData = programType?.data ?? [];
  const departmentData = department?.data ?? [];

  const validate = Yup.object().shape({
    programType: validator.programType,
    department: validator.programName,
    status: validator.status,
  });

  const addProgramMutation = useMutation({
    mutationFn: createUpdateProgram,
  });

  const addProgramHandler = async (
    values: FormikValues,
    resetForm: () => void
  ) => {
    const payload: ProgramPayload = {
      programTypeId: Number(values.programType),
      programId: Number(values.department),
      activeStatus: !!values.status,
      isDeleted: false,
    };

    try {
      await addProgramMutation.mutateAsync(payload, {
        onSuccess: (data) => {
          notification.success({
            message: "Success",
            description: data?.message,
          });

          queryClient.refetchQueries({ queryKey: ["get-all-program"] });
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

  const programTypesOptions = programTypeData?.map((item) => (
    <option key={item?.id} value={item?.id}>
      {item?.name}
    </option>
  ));

  const departmentOptions = departmentData?.map((item) => (
    <option key={item?.id} value={item?.id}>
      {item?.name}
    </option>
  ));

  return (
    <Formik
      initialValues={{
        programType: "",
        department: "",
        status: "",
      }}
      onSubmit={(values, { resetForm }) => {
        addProgramHandler(values, resetForm);
      }}
      validationSchema={validate}
      enableReinitialize={true}
    >
      {() => {
        return (
          <Form className="fields">
            <Select
              name="programType"
              placeholder="Select Program"
              label="Program Name"
              options={programTypesOptions}
            />

            <Select
              name="department"
              placeholder="Select Department"
              label="Department Name"
              options={departmentOptions}
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
              <Button
                type="button"
                onClick={handleClose}
                variant="text"
                text="Cancel"
              />
              <Button
                text={addProgramMutation.isPending ? "Submitting..." : "Submit"}
                type="submit"
                isLoading={addProgramMutation?.isPending}
                disabled={addProgramMutation?.isPending}
              />
            </div>
          </Form>
        );
      }}
    </Formik>
  );
};

export default AddProgram;
