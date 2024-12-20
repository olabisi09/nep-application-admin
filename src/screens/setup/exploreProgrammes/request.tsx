/* eslint-disable no-undef */
import api from "../../../utils/api";

export const createUpdateExplore = async (payload: ExplorePayload) => {
  return (await api.post("/Utilities/Utilities/CreateUpdateExplore", payload))
    ?.data;
};

export const getAllExplore = async () => {
  return (await api.get("/Utilities/Utilities/GetAllExplore"))
    ?.data as ExploreResponse;
};

export const deleteExplore = async (id: number) => {
  return (await api.delete(`/Utilities/Utilities/DeleteExplor?Id=${id}`))?.data;
};
