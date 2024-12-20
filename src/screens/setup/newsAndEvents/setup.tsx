/* eslint-disable no-undef */
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { App } from 'antd';
import { Form, Formik, FormikValues } from 'formik';

import { ReactComponent as Image } from '../../../assets/image.svg';
import Button from '../../../custom/button/button';
import Editor from '../../../custom/editor/editor';
import Input from '../../../custom/input/input';
import Select from '../../../custom/select/select';
import Upload from '../../../custom/upload/upload';
import { StatusOptions, createOrUpdateEvent } from '../../../requests';
import { formatDate } from '../../../utils/formatDate';
import { validateSetup } from '../../../utils/validations';

interface Init {
  title: string;
  description: string;
  image: File | null;
  status: string;
}

export const CreateEvent = ({ handleClose }: { handleClose: () => void }) => {
  const { notification } = App.useApp();
  const queryClient = useQueryClient();
  const addEventMutation = useMutation({ mutationFn: createOrUpdateEvent });

  const handleAddEvent = async (values: FormikValues, resetForm: () => void) => {
    const formData = new FormData();
    formData.append('Title', values.title);
    formData.append('Description', values.description);
    formData.append('EventDate', values.eventDate);
    formData.append('Image', values.image);
    formData.append('ActiveStatus', String(values.status === 'true'));

    try {
      await addEventMutation.mutateAsync(formData, {
        onSuccess: (data) => {
          notification.success({
            message: 'Success',
            description: data?.message,
          });

          queryClient.refetchQueries({ queryKey: ['get-events'] });

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

  return (
    <Formik
      initialValues={
        {
          title: '',
          description: '',
          image: null,
          status: '',
        } as Init
      }
      onSubmit={(values, { resetForm }) => handleAddEvent(values, resetForm)}
      validationSchema={validateSetup}
    >
      {({ values, setFieldValue }) => (
        <Form className="fields">
          <Input name="title" label="Title" placeholder="Input title" />
          <Editor
            name="description"
            label="Description"
            onChange={(_, editor) => {
              const data = editor.getData();
              setFieldValue('description', data);
            }}
          />

          <Input name="eventDate" type="date" label="Event date" min={new Date().toISOString().split('T')[0]} />

          {values.image ? (
            <div className="small-gap">
              <Image />
              <span>{values.image?.name}</span>
              <Button onClick={() => setFieldValue('image', null)} variant="text" text="x" />
            </div>
          ) : (
            <Upload
              name="image"
              label="Image"
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
            <Button type="button" onClick={handleClose} variant="text" text="Cancel" />
            <Button
              type="submit"
              isLoading={addEventMutation.isPending}
              disabled={addEventMutation.isPending}
              text="Create"
            />
          </div>
        </Form>
      )}
    </Formik>
  );
};

export const EditEvent = ({ item, handleClose }: { item: Setup; handleClose: () => void }) => {
  const queryClient = useQueryClient();
  const { notification } = App.useApp();
  const editEventMutation = useMutation({
    mutationFn: createOrUpdateEvent,
  });

  const handleEditEvent = async (values: FormikValues) => {
    const formData = new FormData();
    formData.append('Id', item?.id?.toString());
    formData.append('Title', values.title);
    formData.append('EventDate', values.eventDate);
    formData.append('Description', values.description);
    formData.append('ActiveStatus', String(values.status === 'true'));

    if (values.image) {
      formData.append('Image', values.image);
    }

    try {
      await editEventMutation.mutateAsync(formData, {
        onSuccess: (data) => {
          notification.success({
            message: 'Success',
            description: data?.message,
          });
          queryClient.refetchQueries({ queryKey: ['get-events'] });
          handleClose();
        },
      });
    } catch (error: any) {
      notification.error({
        message: 'Error',
        description: error?.response?.data?.message ?? error?.response?.data?.errors?.Image[0],
      });
    }
  };

  return (
    <Formik
      initialValues={
        {
          title: item.title,
          description: item.description,
          eventDate: formatDate(item?.eventDate),
          image: null,
          status: String(item.activeStatus ?? ''),
        } as Init
      }
      onSubmit={(values) => handleEditEvent(values)}
      enableReinitialize
    >
      {({ values, setFieldValue }) => (
        <Form className="fields">
          <Input name="title" label="Title" placeholder="Input title" />
          <Input name="eventDate" type="date" label="Event date" min={new Date().toISOString().split('T')[0]} />
          <Editor
            name="description"
            label="Description"
            onChange={(_, editor) => {
              const data = editor.getData();
              setFieldValue('description', data);
            }}
            initialData={item?.description}
          />

          {values.image ? (
            <div className="small-gap">
              <Image />
              <span>{values.image?.name}</span>
              <Button onClick={() => setFieldValue('image', null)} variant="text" text="x" />
            </div>
          ) : (
            <Upload
              name="image"
              label="Image"
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
            <Button type="button" onClick={handleClose} variant="text" text="Cancel" />
            <Button
              type="submit"
              isLoading={editEventMutation.isPending}
              disabled={editEventMutation.isPending}
              text="Update"
            />
          </div>
        </Form>
      )}
    </Formik>
  );
};
