/* eslint-disable no-undef */
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { App } from 'antd';
import { Form, Formik, FormikValues } from 'formik';
import { useParams } from 'react-router-dom';
import * as Yup from 'yup';

import { Button, Editor, Select } from '../../../../../custom';
import { StatusOptions, createOrUpdateCampusExperienceItem } from '../../../../../requests';
import { validator } from '../../../../../utils/validator';

const CampusExperienceItemForm = ({ handleClose, item }: { handleClose: () => void; item: CampusExperienceItem }) => {
  const { id } = useParams();
  const { notification } = App.useApp();
  const queryClient = useQueryClient();

  const addCampusExperienceItemMutation = useMutation({
    mutationFn: createOrUpdateCampusExperienceItem,
  });

  const campusExperienceId = parseInt(id ?? '') ?? 0;

  const handleCampusExperienceItem = async (values: FormikValues, resetForm: () => void) => {
    const payload: Partial<CampusExperienceItem> = {
      id: item?.id ?? 0,
      campusExperienceId,
      description: values.description,
      activeStatus: values.status === 'true',
      isDeleted: false,
    };

    try {
      await addCampusExperienceItemMutation.mutateAsync(payload, {
        onSuccess: (data) => {
          notification.success({
            message: 'Success',
            description: data?.message,
          });
          queryClient.refetchQueries({
            queryKey: ['get-campus-experience-by-id'],
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

  const validationSchema = Yup.object().shape({
    status: validator.status,
    description: validator.description,
  });

  const initialStatus = item?.activeStatus ?? '';
  const hasRecords = Object.keys(item).length > 0;

  return (
    <Formik
      initialValues={{
        description: item.description ?? '',
        status: String(initialStatus),
      }}
      onSubmit={(values, { resetForm }) => handleCampusExperienceItem(values, resetForm)}
      validationSchema={validationSchema}
      enableReinitialize
    >
      {({ setFieldValue }) => {
        return (
          <Form className="fields">
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
                isLoading={addCampusExperienceItemMutation.isPending}
                disabled={addCampusExperienceItemMutation.isPending}
                text={hasRecords ? 'Update' : 'Create'}
              />
            </div>
          </Form>
        );
      }}
    </Formik>
  );
};

export default CampusExperienceItemForm;
