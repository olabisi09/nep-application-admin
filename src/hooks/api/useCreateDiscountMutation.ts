import { useMutation, useQueryClient } from '@tanstack/react-query';
import { notification } from 'antd';
import { FormikValues } from 'formik';

import api from '../../utils/api';

export const useCreateDiscountMutation = (handleClose: () => void) => {
  const queryClient = useQueryClient();

  const createDiscount = async (payload: FormData) => {
    return (await api.post('/Coupon/createCoupon', payload))?.data;
  };

  const createCouponMutation = useMutation({
    mutationKey: ['create-discount'],
    mutationFn: createDiscount,
  });

  const createDiscountHandler = async (values: FormikValues, resetForm: () => void) => {
    const formData = new FormData();

    formData.append('Name', values.discountName);
    formData.append('Code', values.discountCode);
    formData.append('ApplicantEmail', values.applicantEmail);
    formData.append('CouponUseLimit', values.couponUseLimit);
    formData.append('CapAmount', values.cap);
    formData.append('discountType', values.discountType);
    formData.append('DiscountAmount', values.discountAmount);
    formData.append('ApplicationBatchId', values.applicationBatch);
    formData.append('ActiveStatus', values.status);

    try {
      await createCouponMutation.mutateAsync(formData, {
        onSuccess: (data) => {
          notification.success({
            message: data?.message || 'Discount created successfully',
          });

          queryClient.refetchQueries({
            queryKey: ['get-all-discounts'],
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

  return { createDiscountHandler, isLoading: createCouponMutation.isPending };
};
