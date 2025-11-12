import { useState } from 'react';

import { useMutation, useQueries, useQueryClient } from '@tanstack/react-query';
import { App, Checkbox, Spin } from 'antd';
import { Form, Formik, FormikValues } from 'formik';
import * as Yup from 'yup';

import { Button, Select } from '../../../custom';
import Input from '../../../custom/input/input';
import { StatusOptions, getAllAcademicSession } from '../../../requests';
import { validator } from '../../../utils/validator';
import { getAllProgram } from '../program/request';

import { createUpdateApplicationBatch } from './request';

interface Props {
  handleClose: () => void;
}

const AddApplicationBatch = ({ handleClose }: Props) => {
  const { notification } = App.useApp();
  const queryClient = useQueryClient();
  const [isLateRegistrationEnabled, setIsLateRegistrationEnabled] = useState(false);

  const queries = useQueries({
    queries: [
      { queryKey: ['get-all-session'], queryFn: () => getAllAcademicSession(1, 10) },
      { queryKey: ['get-all-program'], queryFn: () => getAllProgram() },
    ],
  });

  const { data: session, isLoading: isSessionLoading, isError: isSessionError, error: sessionError } = queries[0];

  // const {
  //   data: program,
  //   isLoading: isProgramLoading,
  //   isError: isProgramError,
  //   error: programError,
  // } = queries[1];

  const sessionData = session?.data ?? [];
  // const programData = program?.data ?? [];

  const addApplicationBatchMutation = useMutation({
    mutationFn: createUpdateApplicationBatch,
  });

  const handleAddApplicationBatch = async (values: FormikValues, resetForm: () => void) => {
    // eslint-disable-next-line no-undef
    let payload: ApplicationBatchPayload = {
      id: 0,
      batchName: values.batchName,
      sessionId: values.session,
      programId: values.program,
      startDate: values.startDate,
      endDate: values.endDate,
      isActive: true,
    };

    if (isLateRegistrationEnabled) {
      payload.lateEndDate = values.lateRegistrationEndDate;
      payload.lateStartDate = values.lateRegistrationStartDate;
    }

    try {
      await addApplicationBatchMutation.mutateAsync(payload, {
        onSuccess: (data) => {
          notification.success({
            message: 'Success',
            description: data?.message,
          });

          queryClient.refetchQueries({
            queryKey: ['get-all-application-batch'],
          });
          handleClose();
          resetForm();
        },
      });
    } catch (error: any) {
      notification.error({
        message: 'Error',
        description: error?.response?.data?.message,
      });
    }
  };

  const validate = Yup.object().shape({
    batchName: validator.applicationBatch,
    session: validator.session,
    startDate: validator.startDate,
    endDate: validator.endDate,
    lateRegistrationStartDate: isLateRegistrationEnabled
      ? Yup.date()
          .required('Late Application Start Date is required')
          .transform((value) => (value ? new Date(value) : null))
          .typeError('Invalid date format')
          .min(Yup.ref('startDate'), 'Late Application Start Date cannot be before Start Date')
          .max(Yup.ref('endDate'), 'Late Application Start Date cannot be after End Date')
      : Yup.date()
          .transform((value) => (value ? new Date(value) : null))
          .nullable()
          .notRequired(),
    lateRegistrationEndDate: isLateRegistrationEnabled
      ? Yup.date()
          .required('Late Application End Date is required')
          .transform((value) => (value ? new Date(value) : null))
          .typeError('Invalid date format')
          .min(
            Yup.ref('lateRegistrationStartDate'),
            'Late Application End Date cannot be before Late Application Start Date',
          )
          .max(Yup.ref('endDate'), 'Late Application End Date cannot be after End Date')
      : Yup.date()
          .transform((value) => (value ? new Date(value) : null))
          .nullable()
          .notRequired(),
  });

  const sessionOptions = () => {
    if (isSessionLoading) {
      return [<option value="">{<Spin size="small" />}</option>];
    } else if (isSessionError) {
      return [<option value="">{sessionError?.message}</option>];
    } else {
      return sessionData?.map((item) => (
        <option key={item?.id} value={item?.id}>
          {item?.name}
        </option>
      ));
    }
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
  return (
    <Formik
      initialValues={{
        batchName: '',
        session: '',
        startDate: '',
        endDate: '',
        lateRegistrationStartDate: '',
        lateRegistrationEndDate: '',
      }}
      onSubmit={(values, { resetForm }) => {
        handleAddApplicationBatch(values, resetForm);
      }}
      validationSchema={validate}
      enableReinitialize={true}
    >
      {() => {
        return (
          <Form className="fields">
            <Input label="Batch Name" placeholder="Batch name" name="batchName" />

            <Select name="session" placeholder="Select session" label="Session" options={sessionOptions()} />

            {/* <Select
              name="program"
              placeholder="Select program"
              label="Program"
              options={programOptions()}
            /> */}

            <Input type="date" label="Start Date" placeholder="" name="startDate" />

            <Input type="date" label="End Date" placeholder="" name="endDate" />
            <Checkbox
              checked={isLateRegistrationEnabled}
              onChange={(e) => setIsLateRegistrationEnabled(e.target.checked)}
            >
              Enable late application period
            </Checkbox>

            {isLateRegistrationEnabled && (
              <>
                <Input
                  type="date"
                  label="Late registration start date"
                  placeholder=""
                  name="lateRegistrationStartDate"
                />

                <Input type="date" label="Late registration End Date" placeholder="" name="lateRegistrationEndDate" />
              </>
            )}
            <Select
              name="isActive"
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
                text={addApplicationBatchMutation?.isPending ? 'Submitting...' : 'Submit'}
                type="submit"
                isLoading={addApplicationBatchMutation?.isPending}
                disabled={addApplicationBatchMutation?.isPending}
              />
            </div>
          </Form>
        );
      }}
    </Formik>
  );
};

export default AddApplicationBatch;
