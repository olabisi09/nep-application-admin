import api from "../../../utils/api";

export const CreateUpdateExplore = async (payload: ExplorePayload) => {
  return (await api.post("/Utilities/Utilities/CreateUpdateExplore", payload))?.data;
};

export const getAllExplore = async () => {
  return (await api.get("/Utilities/Utilities/GetAllExplore"))
    ?.data as ExploreResponse;
};

