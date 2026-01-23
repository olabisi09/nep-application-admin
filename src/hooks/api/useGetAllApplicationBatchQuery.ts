import { useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import api from '../../utils/api';

export const useGetAllApplicationBatchQuery = () => {
  const fetchAllApplicationBatch = async () => {
    return (await api.get(`/Utilities/Utilities/GetAllApplicationBatch`))?.data as ApplicationBatchResponse;
  };

  const { data, isLoading, isError, error } = useQuery<ApplicationBatchResponse, AxiosError<ApiErrorResponse>>({
    queryKey: ['get-all-application-batch'],
    queryFn: fetchAllApplicationBatch,
  });

  const errorMessage = error?.response?.data?.message || error?.message || 'Failed to fetch application batches';

  return {
    applicationBatchData: data?.data ?? [],
    isApplicationBatchLoading: isLoading,
    isApplicationBatchError: isError,
    applicationBatchErrorMessage: errorMessage,
  };
};
