import type { Dispatch, SetStateAction } from 'react';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { notification } from 'antd';

import api from '../../utils/api';

export const useDeleteDiscountMutation = (id: number, setOpenDelete: Dispatch<SetStateAction<boolean>>) => {
  const queryClient = useQueryClient();

  const deleteDiscount = async () => {
    const res = await api.delete(`/Coupon/deleteCoupon/${id}`);
    return res.data;
  };

  const mutation = useMutation({
    mutationKey: ['delete-discount', id],
    mutationFn: deleteDiscount,
    onSuccess: (data) => {
      notification.success({
        message: 'Success',
        description: data?.message,
      });
      queryClient.invalidateQueries({ queryKey: ['get-all-discounts'] });
      setOpenDelete(false);
    },
    onError: (error: any) => {
      notification.error({
        message: 'Error',
        description: error?.response?.data?.message || error?.message || 'An error occurred',
      });
    },
  });

  const deleteDiscountHandler = async () => {
    return mutation.mutateAsync();
  };

  return { deleteDiscountHandler, isDeleteLoading: mutation.isPending };
};
