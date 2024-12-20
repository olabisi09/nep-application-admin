/* eslint-disable no-undef */
import { useMutation } from '@tanstack/react-query';
import { App } from 'antd';
import { Form, Formik, FormikValues } from 'formik';
import { object } from 'yup';

import { ReactComponent as Image } from '../../../../assets/image.svg';
import { Button, Input, Select, Upload } from '../../../../custom';
import { StatusOptions, createUpdateWhyItem } from '../../../../requests';
import { validator } from '../../../../utils/validator';

export const SetupWhyItem = ({
  whyItem,
  whyId,
  handleClose,
  refetch,
}: {
  whyItem?: WhyItem;
  whyId: number | string;
  handleClose: () => void;
  refetch: () => void;
}) => {
  const { notification } = App.useApp();

  const createUpdateWhyItemMutation = useMutation({
    mutationFn: createUpdateWhyItem,
  });

  const hasRecord = Object.keys(whyItem!)?.length > 0;
  
  const validationSchema = object().shape({
    title: validator.title,
    description: validator.description,
    ...(!hasRecord && { image: validator.file }),
    status: validator.status,
  });

  const handleCreateUpdateWhyItem = async (values: FormikValues, resetForm: () => void) => {
    const payload = new FormData();
    payload.append('Id', whyItem?.id ? `${whyItem?.id}` : '0');
    payload.append('WhyId', `${whyId}`);
    payload.append('Name', values.title);
    payload.append('Description', values.description);
    payload.append('Icon', values.image || '');
    if (whyItem?.iconUrl) {
      payload.append('IconUrl', whyItem.iconUrl);
    }
    payload.append('ActiveStatus', values.status === 'true' ? 'true' : 'false');
    payload.append('IsDeleted', 'false');

    try {
      await createUpdateWhyItemMutation.mutateAsync(payload, {
        onSuccess: (data) => {
          notification.success({
            message: 'Success',
            description: data?.message,
          });
          handleClose();
          refetch();
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

  const initialStatus = whyItem?.activeStatus;

  return (
    <Formik
      initialValues={{
        image: null,
        title: whyItem?.name ?? '',
        description: whyItem?.description ?? '',
        status: String(initialStatus ?? ''),
      }}
      onSubmit={(values, { resetForm }) => {
        handleCreateUpdateWhyItem(values, resetForm);
      }}
      validationSchema={validationSchema}
      enableReinitialize
    >
      {({ setFieldValue, values }) => (
        <Form className="fields">
          <Input name="title" label="Title" placeholder="Input title" />
          <Input type="textarea" name="description" label="Description" placeholder="Input description" />

          {values.image ? (
            <div className="small-gap">
              <Image />
              <span>{(values.image as File)?.name}</span>
              <Button onClick={() => setFieldValue('image', null)} variant="text" text="x" />
            </div>
          ) : (
            <Upload
              name="image"
              label="Icon Upload"
              onChange={(e) => {
                const file = e.target.files;
                if (file) {
                  setFieldValue('image', file[0]);
                }
              }}
            />
          )}

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
            <Button onClick={handleClose} type="button" variant="text" text="Cancel" />

            <Button
              type="submit"
              text={whyItem ? 'Update' : 'Create'}
              isLoading={createUpdateWhyItemMutation.isPending}
              disabled={createUpdateWhyItemMutation.isPending}
            />
          </div>
        </Form>
      )}
    </Formik>
  );
};
