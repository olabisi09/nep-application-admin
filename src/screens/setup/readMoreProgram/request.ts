import api from "../../../utils/api";

export const getReadMoreProgrammes = async () => {
  return (await api.get("/ReadMore/GetAllReadMoreProgrammes"))
    ?.data as ReadMoreProgrammeResponse;
};

export const createOrUpdateReadMoreProgrammes = async (
  payload: Partial<CommonPayload>
) => {
  return (await api.post("/ReadMore/createUpdateReadMoreProgramme", payload))
    ?.data as Response;
};
