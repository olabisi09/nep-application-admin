/* eslint-disable no-undef */
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { App } from 'antd';
import { Form, Formik, FormikValues } from 'formik';
import { object } from 'yup';

import { Button, Editor, Input, Select } from '../../../../custom';
import { createOrUpdateStudentLife } from '../../../../requests';
import { validator } from '../../../../utils/validator';

const EditStudentLife = ({ item, handleClose }: { item: Setup; handleClose: () => void }) => {
  const { notification } = App.useApp();
  const queryClient = useQueryClient();

  const editStudentLifeMutation = useMutation({
    mutationFn: createOrUpdateStudentLife,
  });

  const handleEditStudentLife = async (values: FormikValues, resetForm: () => void) => {
    const payload: Partial<Setup> = {
      id: item.id,
      title: values.title,
      description: values.description,
      activeStatus: values.status === 'Active',
    };

    try {
      await editStudentLifeMutation.mutateAsync(payload, {
        onSuccess: (data) => {
          notification.success({
            message: 'Success',
            description: data?.message,
          });
          queryClient.refetchQueries({ queryKey: ['get-student-life'] });
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

  const validationSchema = object().shape({
    title: validator.title,
    description: validator.description,
    status: validator.status,
  });

  const statusOptions = (
    <>
      <option>Active</option>
      <option>Inactive</option>
    </>
  );

  return (
    <Formik
      initialValues={{
        title: item.title,
        description: item.description,
        status: item.activeStatus ? 'Active' : 'Inactive',
      }}
      onSubmit={(values, { resetForm }) => handleEditStudentLife(values, resetForm)}
      validationSchema={validationSchema}
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
            initialData={item.description}
          />

          <Select name="status" label="Status" placeholder="Select status" options={statusOptions} />

          <div className="btn-group">
            <Button type="button" onClick={handleClose} variant="text" text="Cancel" />

            <Button
              type="submit"
              isLoading={editStudentLifeMutation.isPending}
              disabled={editStudentLifeMutation.isPending}
              text="Update"
            />
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default EditStudentLife;
