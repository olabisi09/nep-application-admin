import { useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import api from '../../utils/api';

export const useGetAllDiscountQuery = () => {
  const fetchDiscounts = async (): Promise<DiscountsResponse> => {
    return (await api.get('/Coupon/getAllCoupons'))?.data;
  };

  const { data, isLoading, isError, error, refetch } = useQuery<DiscountsResponse, AxiosError<ApiErrorResponse>>({
    queryKey: ['get-all-discounts'],
    queryFn: fetchDiscounts,
  });

  const errorMessage = error?.response?.data?.message || error?.message || 'Failed to fetch discounts';

  return {
    data,
    isLoading,
    isError,
    errorMessage,
    refetch,
  };
};
