/* eslint-disable no-undef */
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { App } from 'antd';
import { Form, Formik, FormikValues } from 'formik';
import { useParams } from 'react-router-dom';
import * as Yup from 'yup';

import { Button, Input, Select } from '../../../../custom';
import { StatusOptions, createOrUpdateSchoolSummary } from '../../../../requests';
import { validator } from '../../../../utils/validator';

const SchoolSummaryForm = ({ handleClose, item }: { handleClose: () => void; item: Partial<SchoolSummary> }) => {
  const { id } = useParams();
  const { notification } = App.useApp();
  const queryClient = useQueryClient();

  const addSchoolSummaryMutation = useMutation({
    mutationFn: createOrUpdateSchoolSummary,
  });

  const handleAddSchoolSummary = async (values: FormikValues, resetForm: () => void) => {
    const payload: Partial<Setup> = {
      title: values.title,
      figure: values.figure,
      studentLifeId: id?.toString(),
      activeStatus: values.status === 'Active',
      isDeleted: false,
    };

    try {
      await addSchoolSummaryMutation.mutateAsync(payload, {
        onSuccess: (data) => {
          notification.success({
            message: 'Success',
            description: data?.message,
          });
          queryClient.refetchQueries({ queryKey: ['get-school-summary'] });
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

  const handleEditSchoolSummary = async (values: FormikValues) => {
    const payload: Partial<Setup> = {
      id: item?.id,
      title: values.title,
      figure: values.figure,
      studentLifeId: id?.toString(),
      activeStatus: values.status === 'true',
      isDeleted: false,
    };

    try {
      await addSchoolSummaryMutation.mutateAsync(payload, {
        onSuccess: (data) => {
          notification.success({
            message: 'Success',
            description: data?.message,
          });
          queryClient.refetchQueries({ queryKey: ['get-school-summary'] });
          handleClose();
        },
      });
    } catch (error: any) {
      notification.error({
        message: 'Error',
        description: error?.response?.data?.message,
      });
    }
  };

  const validationSchema = Yup.object().shape({
    title: validator.title,
    status: validator.status,
    figure: validator.description,
  });

  const initialStatus = item?.activeStatus ?? '';
  const hasRecords = Object.keys(item).length > 0;

  return (
    <Formik
      initialValues={{
        title: item?.title ?? '',
        figure: item?.figure ?? '',
        status: String(initialStatus),
      }}
      onSubmit={(values, { resetForm }) => {
        if (hasRecords) {
          handleEditSchoolSummary(values);
        } else {
          handleAddSchoolSummary(values, resetForm);
        }
      }}
      validationSchema={validationSchema}
      enableReinitialize
    >
      <Form className="fields">
        <Input name="title" label="Title" placeholder="Input title" />
        <Input name="figure" label="Figure" placeholder="Input figure" />

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
          <Button type="button" onClick={handleClose} variant="text" text="Cancel" />

          <Button
            type="submit"
            isLoading={addSchoolSummaryMutation.isPending}
            disabled={addSchoolSummaryMutation.isPending}
            text={hasRecords ? 'Update' : 'Create'}
          />
        </div>
      </Form>
    </Formik>
  );
};

export default SchoolSummaryForm;
