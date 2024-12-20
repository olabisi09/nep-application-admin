/* eslint-disable no-undef */
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { App } from 'antd';
import { Form, Formik, FormikValues } from 'formik';
import { useParams } from 'react-router-dom';
import * as Yup from 'yup';

import { Button, Editor, Input, Select } from '../../../../custom';
import { StatusOptions, createOrUpdateStudentActivity } from '../../../../requests';

const StudentActivityForm = ({ handleClose, item }: { handleClose: () => void; item: StudentActivities }) => {
  const { id } = useParams();
  const { notification } = App.useApp();
  const queryClient = useQueryClient();

  const addStudentActivityMutation = useMutation({
    mutationFn: createOrUpdateStudentActivity,
  });

  const studentLifeId = id ?? '';

  const handleAddStudentActivity = async (values: FormikValues, resetForm: () => void) => {
    const payload: Partial<Setup> = {
      id: item?.id ?? 0,
      studentLifeId: studentLifeId,
      title: values.title,
      description: values.description,
      activeStatus: values.status === 'true',
      isDeleted: false,
    };

    try {
      await addStudentActivityMutation.mutateAsync(payload, {
        onSuccess: (data) => {
          notification.success({
            message: 'Success',
            description: data?.message,
          });

          queryClient.refetchQueries({ queryKey: ['get-support-guidance'] });

          resetForm();
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

  const validateSetup = Yup.object().shape({
    title: Yup.string().required('Title is required'),
    description: Yup.string().required('Description is required'),
    status: Yup.string().required('Status is required'),
  });

  const initialStatus = item?.activeStatus ?? '';
  const hasRecords = Object.keys(item).length > 0;

  return (
    <Formik
      initialValues={{
        title: item.title ?? '',
        description: item.description ?? '',
        status: String(initialStatus),
      }}
      onSubmit={(values, { resetForm }) => handleAddStudentActivity(values, resetForm)}
      validationSchema={validateSetup}
      enableReinitialize
    >
      {({ setFieldValue }) => (
        <Form className="fields">
          <Input name="title" label="Title" placeholder="Input title" />

          <Editor
            name="description"
            label="Description"
            onChange={(_, editor) => {
              const data = editor.getData();
              setFieldValue('description', data);
            }}
            initialData={item?.description ?? ''}
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
            <Button type="button" onClick={handleClose} variant="text" text="Cancel" />

            <Button
              type="submit"
              isLoading={addStudentActivityMutation.isPending}
              disabled={addStudentActivityMutation.isPending}
              text={hasRecords ? 'Update' : 'Create'}
            />
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default StudentActivityForm;
