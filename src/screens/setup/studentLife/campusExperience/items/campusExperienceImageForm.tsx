/* eslint-disable no-undef */
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { App } from 'antd';
import { Form, Formik, FormikValues } from 'formik';
import { useParams } from 'react-router-dom';
import { object } from 'yup';

import { ReactComponent as Image } from '../../../../../assets/image.svg';
import { Button, Select, Upload } from '../../../../../custom';
import { StatusOptions, createOrUpdateCampusExperienceImage } from '../../../../../requests';
import { validator } from '../../../../../utils/validator';

interface SetupInit {
  name: string;
  image: File | null;
}

const CampusExperienceImageForm = ({
  handleClose,
  item,
}: {
  handleClose: () => void;
  item: Partial<CampusExperienceImage>;
}) => {
  const { id } = useParams();
  const { notification } = App.useApp();
  const queryClient = useQueryClient();

  const campusExperienceImageMutation = useMutation({
    mutationFn: createOrUpdateCampusExperienceImage,
  });

  const campusExperienceId = id?.toString() ?? '';
  const itemId = item?.id?.toString() ?? '0';

  const handleAddUpdateCampusExperienceImage = async (values: FormikValues, resetForm: () => void) => {
    const formData = new FormData();
    formData.append('Id', itemId);
    formData.append('CampusExperienceId', campusExperienceId);
    formData.append('Image', values.image);
    formData.append('ActiveStatus', String(values.status === 'true'));

    try {
      await campusExperienceImageMutation.mutateAsync(formData, {
        onSuccess: (data) => {
          notification.success({
            message: 'Success',
            description: data?.message,
          });

          queryClient.refetchQueries({ queryKey: ['get-fitness-image'] });

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

  const validateSetup = object().shape({
    status: validator.status,
    // image: validator.file,
  });

  const initialStatus = item?.activeStatus ?? '';
  const hasRecords = Object.keys(item).length > 0;

  return (
    <Formik
      enableReinitialize
      initialValues={
        {
          name: '',
          image: null,
          status: initialStatus,
        } as SetupInit
      }
      onSubmit={(values, { resetForm }) => handleAddUpdateCampusExperienceImage(values, resetForm)}
      validationSchema={validateSetup}
    >
      {({ setFieldValue, values }) => (
        <Form className="fields">
          {values.image ? (
            <div className="small-gap">
              <Image />
              <span>{values.image.name}</span>
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
              isLoading={campusExperienceImageMutation.isPending}
              disabled={campusExperienceImageMutation.isPending}
              text={hasRecords ? 'Update' : 'Create'}
            />
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default CampusExperienceImageForm;
