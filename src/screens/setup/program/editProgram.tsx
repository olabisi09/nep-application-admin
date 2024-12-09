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
  record: ProgramData;
}

const EditProgram = ({ handleClose, record }: Props) => {
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
  });

  const editProgramMutation = useMutation({
    mutationFn: createUpdateProgram,
  });

  const editProgramHandler = async (
    values: FormikValues,
    resetForm: () => void
  ) => {
    const payload: ProgramPayload = {
      id: record?.id,
      programTypeId: Number(values.programType),
      programId: Number(values.department),
      activeStatus: !!values.status,
    };

    try {
      await editProgramMutation.mutateAsync(payload, {
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

  const initialStatus = record?.activeStatus;

  return (
    <Formik
      initialValues={{
        programType: record.programTypeId ?? "",
        department: record?.programId ?? "",
        status: initialStatus,
      }}
      onSubmit={(values, { resetForm }) => {
        editProgramHandler(values, resetForm);
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
              <Button onClick={handleClose} variant="text" text="Cancel" />
              <Button
                text={
                  editProgramMutation.isPending ? "Submitting..." : "Submit"
                }
                type="submit"
                isLoading={editProgramMutation?.isPending}
                disabled={editProgramMutation?.isPending}
              />
            </div>
          </Form>
        );
      }}
    </Formik>
  );
};

export default EditProgram;
