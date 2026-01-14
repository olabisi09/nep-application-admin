/* eslint-disable no-undef */
import { FC } from 'react';

import { useMutation, useQueries, useQueryClient } from '@tanstack/react-query';
import { App } from 'antd';
import { Form, Formik, FormikValues } from 'formik';
import * as Yup from 'yup';

import { Button } from '../../../custom';
import Input from '../../../custom/input/input';
import Select from '../../../custom/select/select';
import {
  StatusOptions,
  createOrUpdateApplicationFee,
  getAllApplicationBatch,
  getAllModeOfStudy,
  getAllProgramsApplicationFee,
} from '../../../requests';
// import { toDateInputValue } from '../../../utils/formatDate';
import { validator } from '../../../utils/validator';
import styles from '../styles.module.scss';

import { getProgramTypes } from './request';

interface ComponentProps {
  record: GetAllFeeSetup;
  handleClose: () => void;
}

const AddApplicationFee: FC<ComponentProps> = ({ record, handleClose }) => {
  const { notification } = App.useApp();
  const queryClient = useQueryClient();

  const createUpdateApplicationFeeMutation = useMutation({
    mutationFn: createOrUpdateApplicationFee,
    mutationKey: ['create-update-applicationFee'],
  });

  const createUpdateApplicationFeeHandler = async (values: FormikValues, resetForm: () => void) => {
    const payload: Partial<ApplicationFee> = {
      id: record?.id || 0,
      modeOfStudyId: values.modeOfStudy,
      programId: values.programName,
      programTypeId: values.programType,
      amount: values.amount,
      activeStatus: values.status === 'true',
      applicationBatchId: Number(values.applicationBatch),
      lateApplicationAmount: values.lateRegAmount,
      // applicationStartDate: values.applicationStartDate,
      // applicationEndDate: values.applicationEndDate,
      // lateApplicationStartDate: values.lateRegStartDate,
      // lateApplicationEndDate: values.lateRegEndDate,
    };

    try {
      await createUpdateApplicationFeeMutation.mutateAsync(payload, {
        onSuccess: () => {
          notification.success({
            message: 'Success',
          });

          queryClient.refetchQueries({
            queryKey: ['get-all-fee-setup'],
          });

          resetForm();
          handleClose();
        },
      });
    } catch (error: any) {
      notification.error({
        message: 'Error',
        description: error?.response.data?.message || error?.response?.data?.title,
      });
    }
  };

  const queries = useQueries({
    queries: [
      {
        queryKey: ['get-all-program'],
        queryFn: getAllProgramsApplicationFee,
      },
      { queryKey: ['get-AllModeOfStudy'], queryFn: getAllModeOfStudy },
      { queryKey: ['get-ApplicationBatch'], queryFn: getAllApplicationBatch },
      { queryKey: ['get-program-types'], queryFn: getProgramTypes },
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
    lateRegAmount: validator.amount,
    // applicationStartDate: validator.applicationStartDate,
    // applicationEndDate: validator.applicationEndDate,
    // lateRegStartDate: validator.lateRegStartDate,
    // lateRegEndDate: validator.lateRegEndDate,
  });

  const hasRecord = Object.keys(record)?.length > 0;

  return (
    <Formik
      initialValues={{
        programName: record?.programId ?? '',
        programType: record?.programTypeId ?? '',
        modeOfStudy: record?.modeOfStudyId ?? '',
        applicationBatch: record?.applicationBatchId ?? '',
        amount: record?.amount ?? '',
        status: String(record?.activeStatus) || '',
        lateRegAmount: record?.lateApplicationAmount ?? '',
        // applicationStartDate: toDateInputValue(record?.applicationStartDate ?? null),
        // applicationEndDate: toDateInputValue(record?.applicationEndDate ?? null),
        // lateRegStartDate: toDateInputValue(record?.lateApplicationStartDate ?? record?.applicationStartDate ?? null),
        // lateRegEndDate: toDateInputValue(record?.lateApplicationEndDate ?? record?.applicationEndDate ?? null),
      }}
      onSubmit={(values, { resetForm }) => {
        createUpdateApplicationFeeHandler(values, resetForm);
      }}
      validationSchema={validationSchema}
      enableReinitialize
    >
      {() => {
        return (
          <Form>
            <section className="fields">
              <Select name="programName" placeholder="Select Program" label="Program Name" options={programOptions} />

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

              {/* <Input name="applicationStartDate" type="date" placeholder="Select Date" label="Application Start Date" />
              <Input name="applicationEndDate" type="date" placeholder="Select Date" label="Application End Date" /> */}

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

              <div>
                <p className={styles.modalHeading}>Late Registration</p>
              </div>

              {/* <Input
                name="lateRegStartDate"
                type="date"
                placeholder="Select Date"
                label="Late Registration Start Date"
              />

              <Input name="lateRegEndDate" type="date" placeholder="Select Date" label="Late Registration End Date" /> */}

              <Input name="lateRegAmount" placeholder="0.00" label="Amount" />

              <div className="btn-group">
                <Button type="button" variant="text" text="Cancel" onClick={handleClose} />

                <Button
                  type="submit"
                  disabled={createUpdateApplicationFeeMutation.isPending}
                  isLoading={createUpdateApplicationFeeMutation.isPending}
                  text={hasRecord ? 'Update' : 'Create'}
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
