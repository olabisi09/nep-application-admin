/* eslint-disable no-undef */
import api from "../../../utils/api";

export const createUpdateApplicationBatch = async (
  payload: ApplicationBatchPayload
) => {
  return (
    await api.post("/Utilities/Utilities/CreateUpdateApplicationBatch", payload)
  )?.data;
};

export const getApplicationBatch = async (
  pageNumber?: number,
  pageSize?: number
) => {
  return (
    await api.get(
      `/Utilities/Utilities/GetAllApplicationBatch?PageNumber=${pageNumber}&PageSize=${pageSize}`
    )
  )?.data as applicationBatchResponse;
};

export const deleteApplicationBatch = async (id: number) => {
  return await api.delete(
    `/Utilities/Utilities/DeleteApplicationBatch?Id=${id}`
  );
};
