/* eslint-disable no-undef */
import { useMutation, useQueries, useQueryClient } from "@tanstack/react-query";
import { App } from "antd";
import { Form, Formik, FormikValues } from "formik";
import * as Yup from "yup";

import { Button, Select } from "../../../custom";
import Input from "../../../custom/input/input";
import { StatusOptions, getAllAcademicSession } from "../../../requests";
import { formatDate } from "../../../utils/formatDate";
import { validator } from "../../../utils/validator";
import { getAllProgram } from "../program/request";

import { createUpdateApplicationBatch } from "./request";

interface Props {
  handleClose: () => void;
  record: ApplicationBatch;
}

const EditApplicationBatch = ({ handleClose, record }: Props) => {
  const { notification } = App.useApp();
  const queryClient = useQueryClient();

  const queries = useQueries({
    queries: [
      {
        queryKey: ["get-all-session"],
        queryFn: () => getAllAcademicSession(1, 10),
      },
      { queryKey: ["get-all-program"], queryFn: () => getAllProgram() },
    ],
  });

  const {
    data: session,
    // isLoading: isSessionLoading,
    // isError: isSessionError,
    // error: sessionError,
  } = queries[0];

  // const {
  //   data: program,
  //   isLoading: isProgramLoading,
  //   isError: isProgramError,
  //   error: programError,
  // } = queries[1];

  const sessionData = session?.data ?? [];
  // const programData = program?.data ?? [];

  const editApplicationBatchMutation = useMutation({
    mutationFn: createUpdateApplicationBatch,
  });

  const handleEditApplicationBatch = async (
    values: FormikValues,
    resetForm: () => void
  ) => {
    const payload: ApplicationBatchPayload = {
      id: record?.id,
      batchName: values.batchName,
      sessionId: values.session,
      programId: values.program,
      lateStartDate: values.lateRegistrationStartDate,
      lateEndDate: values.lateRegistrationEndDate,
      startDate: values.startDate,
      endDate: values.endDate,
      isActive: values.status === "true",
    };

    try {
      await editApplicationBatchMutation.mutateAsync(payload, {
        onSuccess: (data) => {
          notification.success({
            message: "Success",
            description: data?.message,
          });

          queryClient.refetchQueries({
            queryKey: ["get-all-application-batch"],
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

  const validate = Yup.object().shape({
    batchName: validator.applicationBatch,
    session: validator.session,
    program: validator.program,
    startDate: validator.startDate,
    endDate: validator.endDate,
    lateRegistrationStartDate: validator.lateApplicationStartDate,
    lateRegistrationEndDate: validator.lateApplicationEndDate,
    status: validator.status,
  });

  const sessionOptions = () => {
    return sessionData?.map((item) => (
      <option key={item?.id} value={item?.id}>
        {item?.name}
      </option>
    ));
  };

  // const programOptions = () => {
  //   if (isProgramLoading) {
  //     return [<option value="">{<Spin size="small" />}</option>];
  //   } else if (isProgramError) {
  //     return [<option value="">{programError?.message}</option>];
  //   } else {
  //     return programData?.map((item) => (
  //       <option key={item?.id} value={item?.id}>
  //         {item?.programName}
  //       </option>
  //     ));
  //   }
  // };

  const initialStatus = record?.isActive;

  return (
    <Formik
      initialValues={{
        batchName: record?.batchName ?? "",
        session: record?.sessionId ?? "",
        program: record?.programId ?? "",
        startDate: formatDate(record?.startDate) ?? "",
        endDate: formatDate(record?.endDate) ?? "",
        lateRegistrationStartDate: formatDate(record?.lateStartDate) ?? "",
        lateRegistrationEndDate: formatDate(record?.lateEndDate) ?? "",
        status: String(initialStatus),
      }}
      onSubmit={(values, { resetForm }) => {
        handleEditApplicationBatch(values, resetForm);
      }}
      validationSchema={validate}
      enableReinitialize
    >
      {() => {
        return (
          <Form className="fields">
            <Input
              label="Batch Name"
              placeholder="Input Faculty Name"
              name="batchName"
            />

            <Select
              name="session"
              placeholder="Select session"
              label="Session"
              options={sessionOptions()}
            />

            {/* <Select
              name="program"
              placeholder="Select program"
              label="Program"
              options={programOptions()}
            /> */}

            <Input
              type="date"
              label="Start Date"
              placeholder=""
              name="startDate"
            />

            <Input type="date" label="End Date" placeholder="" name="endDate" />

            <Input
              type="date"
              label="Late registration start date"
              placeholder=""
              name="lateRegistrationStartDate"
            />

            <Input
              type="date"
              label="Late registration End Date"
              placeholder=""
              name="lateRegistrationEndDate"
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
                  editApplicationBatchMutation?.isPending
                    ? "Submitting..."
                    : "Submit"
                }
                type="submit"
                isLoading={editApplicationBatchMutation?.isPending}
                disabled={editApplicationBatchMutation?.isPending}
              />
            </div>
          </Form>
        );
      }}
    </Formik>
  );
};

export default EditApplicationBatch;
