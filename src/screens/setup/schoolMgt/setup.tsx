/* eslint-disable no-undef */
import { ChangeEvent, useState } from 'react';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { App } from 'antd';
import { Form, Formik, FormikValues } from 'formik';
import * as Yup from 'yup';

import { ReactComponent as Image } from '../../../assets/image.svg';
import { Select } from '../../../custom';
import Button from '../../../custom/button/button';
import Input from '../../../custom/input/input';
import Upload from '../../../custom/upload/upload';
import { StatusOptions, createOrUpdateSchoolMgt } from '../../../requests';
import { validator } from '../../../utils/validator';

const CreateSchoolMgt = ({ handleClose }: { handleClose: () => void }) => {
  const { notification } = App.useApp();
  const queryClient = useQueryClient();
  const [upload, setUpload] = useState<File | null>(null);

  const addSchoolMgtMutation = useMutation({
    mutationFn: createOrUpdateSchoolMgt,
  });

  const validate = Yup.object().shape({
    title: Yup.string().required('Title is required'),
    description: Yup.string().required('Description is required'),
    status: validator.status,
  });

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files;
    if (file) {
      setUpload(file[0]);
    }
  };

  const clearFile = () => {
    setUpload(null);
  };

  const handleAddSchoolMgt = async (values: FormikValues, resetForm: () => void) => {
    const payload: Partial<SetupPayload> = {
      Title: values.title,
      Description: values.description,
      Image: upload,
      ActiveStatus: values.activeStatus === 'true',
      IsDeleted: false,
    };

    try {
      await addSchoolMgtMutation.mutateAsync(payload, {
        onSuccess: (data) => {
          notification.success({
            message: 'Success',
            description: data?.message,
          });
          queryClient.refetchQueries({ queryKey: ['get-school-mgt'] });
          handleClose();
          resetForm();
          clearFile();
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
      initialValues={{
        title: '',
        description: '',
        status: '',
      }}
      onSubmit={(values, { resetForm }) => {
        handleAddSchoolMgt(values, resetForm);
      }}
      validationSchema={validate}
    >
      <Form className="fields">
        <Input name="title" label="Title" placeholder="Input title" />
        <Input type="textarea" name="description" label="Description" placeholder="Input description" />

        {upload ? (
          <div className="small-gap">
            <Image />
            <span>{upload.name}</span>
            <Button onClick={clearFile} variant="text" text="x" />
          </div>
        ) : (
          <Upload name="image" label="Image" onChange={handleFileChange} />
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

          <Button text="Create" disabled={addSchoolMgtMutation.isPending} isLoading={addSchoolMgtMutation.isPending} />
        </div>
      </Form>
    </Formik>
  );
};

const EditSchoolMgt = ({ item, handleClose }: { item: Setup; handleClose: () => void }) => {
  const queryClient = useQueryClient();
  const { notification } = App.useApp();
  const [upload, setUpload] = useState<File | null>(null);
  const editSchoolMgtMutation = useMutation({
    mutationFn: createOrUpdateSchoolMgt,
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files;
    if (file) {
      setUpload(file[0]);
    }
  };

  const clearFile = () => {
    setUpload(null);
  };

  const handleEditSchoolMgt = async (values: FormikValues, resetForm: () => void) => {
    let payload: Partial<SetupPayload> = {
      Id: item.id,
      Title: values.title,
      Description: values.description,
      ActiveStatus: values.status === 'true',
      IsDeleted: false,
    };

    if (upload) {
      payload.Image = upload;
    }

    try {
      await editSchoolMgtMutation.mutateAsync(payload, {
        onSuccess: (data) => {
          notification.success({
            message: 'Success',
            description: data?.message,
          });
          queryClient.refetchQueries({ queryKey: ['get-school-mgt'] });
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

  return (
    <Formik
      initialValues={{
        title: item?.title,
        description: item?.description,
        status: String(item?.activeStatus),
        //image: upload || item?.image,
      }}
      onSubmit={(values, { resetForm }) => {
        handleEditSchoolMgt(values, resetForm);
      }}
      enableReinitialize
    >
      <Form className="fields">
        <Input name="title" label="Title" placeholder="Input title" />
        <Input type="textarea" name="description" label="Description" placeholder="Input description" />

        {upload ? (
          <div className="small-gap">
            <Image />
            <span>{upload.name}</span>
            <Button onClick={clearFile} variant="text" text="x" />
          </div>
        ) : (
          <Upload name="image" label="Image" onChange={handleFileChange} />
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
            text="Update"
            isLoading={editSchoolMgtMutation.isPending}
            disabled={editSchoolMgtMutation.isPending}
          />
        </div>
      </Form>
    </Formik>
  );
};

export { CreateSchoolMgt, EditSchoolMgt };
