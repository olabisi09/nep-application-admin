import Input from "../../../custom/input/input";
import Select from "../../../custom/select/select";
import { useMutation, useQueries, useQueryClient } from "@tanstack/react-query";
import { App } from "antd";
import {
  createOrUpdateApplicationFee,
  getAllApplicationBatch,
  getAllModeOfStudy,
  getAllProgramsApplicationFee,
  StatusOptions,
} from "../../../requests";
import { Formik, FormikValues, Form } from "formik";
import { FC } from "react";
import { Button } from "../../../custom";
import * as Yup from "yup";
import { validator } from "../../../utils/validator";
import { getProgramTypes } from "./request";

interface ComponentProps {
  record: GetAllFeeSetup;
  handleClose: () => void;
}

const AddApplicationFee: FC<ComponentProps> = ({ record, handleClose }) => {
  const { notification } = App.useApp();
  const queryClient = useQueryClient();

  const createUpdateApplicationFeeMutation = useMutation({
    mutationFn: createOrUpdateApplicationFee,
    mutationKey: ["create-update-applicationFee"],
  });

  const createUpdateApplicationFeeHandler = async (values: FormikValues) => {
    const payload: Partial<ApplicationFee> = {
      id: record?.id || 0,
      modeOfStudyId: values.modeOfStudy,
      programId: values.programName,
      programTypeId: values.programType,
      amount: values.amount,
      activeStatus: values.activeStatus,
    };

    try {
      await createUpdateApplicationFeeMutation.mutateAsync(payload, {
        onSuccess: (data) => {
          notification.success({
            message: "Success",
          });

          queryClient.refetchQueries({
            queryKey: ["get-all-fee-setup"],
          });
          handleClose();
        },
      });
    } catch (error: any) {
      notification.error({
        message: "Error",
        description:
          error?.response.data?.message || error?.response?.data?.title,
      });
    }
  };

  const queries = useQueries({
    queries: [
      {
        queryKey: ["get-all-program"],
        queryFn: getAllProgramsApplicationFee,
      },
      { queryKey: ["get-AllModeOfStudy"], queryFn: getAllModeOfStudy },
      { queryKey: ["get-ApplicationBatch"], queryFn: getAllApplicationBatch },
      { queryKey: ["get-program-types"], queryFn: getProgramTypes },
    ],
  });

  const programQuery = queries[0];
  const modeQuery = queries[1];
  const applicationBatchQuery = queries[2];
  const programTypesQuery = queries[3];

  const programData = programQuery?.data?.data ?? [];
  const modeOfStudyData = modeQuery?.data?.data ?? [];
  const applicationBatchData = applicationBatchQuery?.data?.data ?? [];
  const programTypesData = programTypesQuery?.data?.data ?? [];

  const programOptions = programData?.map((item) => (
    <option key={item?.id} value={item?.id}>
      {item?.name}
    </option>
  ));

  const programTypesOptions = programTypesData?.map((item) => (
    <option key={item?.id} value={item?.id}>
      {item?.name}
    </option>
  ));

  const modeOfStudyOptions = modeOfStudyData?.map((item) => (
    <option key={item?.id} value={item?.id}>
      {item?.name}
    </option>
  ));

  const applicationBatchOptions = applicationBatchData?.map((item) => (
    <option key={item?.id} value={item?.id}>
      {item?.batchName}
    </option>
  ));

  const validationSchema = Yup.object().shape({
    programName: validator.programName,
    programType: validator.programType,
    modeOfStudy: validator.modeOfStudy,
    amount: validator.amount,
    applicationBatch: validator.applicationBatch,
  });

  const hasRecord = Object.keys(record)?.length > 0;

  return (
    <Formik
      initialValues={{
        programName: record?.programId ?? "",
        programType: record?.programTypeId ?? "",
        modeOfStudy: record?.modeOfStudyId ?? "",
        applicationBatch: record?.id ?? "",
        amount: record?.amount ?? "",
      }}
      onSubmit={(values) => {
        createUpdateApplicationFeeHandler(values);
      }}
      validationSchema={validationSchema}>
      {(props) => {
        return (
          <Form>
            <section className="fields">
              <Select
                name="programName"
                placeholder="Select Program"
                label="Program Name"
                options={programOptions}
              />
              <Select
                name="programType"
                placeholder="Select Program Type"
                label="Program Type"
                options={programTypesOptions}
              />
              <Select
                name="modeOfStudy"
                label="Mode of Study"
                placeholder="Select Mode of Study"
                options={modeOfStudyOptions}
              />

              <Select
                label="Application Batch"
                placeholder="Select Batch"
                name="applicationBatch"
                options={applicationBatchOptions}
              />

              <Input name="amount" placeholder="0.00" label="Amount" />

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
                  variant="text"
                  text="Cancel"
                  onClick={handleClose}
                />
                <Button
                  type="submit"
                  disabled={createUpdateApplicationFeeMutation.isPending}
                  isLoading={createUpdateApplicationFeeMutation.isPending}
                  text={hasRecord ? "Update" : "Create"}
                />
              </div>
            </section>
          </Form>
        );
      }}
    </Formik>
  );
};

export default AddApplicationFee;
