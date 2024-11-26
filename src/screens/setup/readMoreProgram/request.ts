import api from "../../../utils/api";

export const getReadMoreProgrammes = async (
  pageNumber?: number,
  pageSize?: number
) => {
  return (
    await api.get(
      `/ReadMore/GetAllReadMoreProgrammes?PageNumber=${pageNumber}&PageSize=${pageSize}`
    )
  )?.data as ReadMoreProgrammeResponse;
};

export const createOrUpdateReadMoreProgrammes = async (
  payload: Partial<CommonPayload>
) => {
  return (await api.post("/ReadMore/createUpdateReadMoreProgramme", payload))
    ?.data as Response;
};
