import api from "../../../utils/api";

export const getAllCourseOverview = async () => {
  return (await api.get("/ReadMore/GetAllCourseOverviews"))
    ?.data as ReadMoreOverviewResponse;
};

export const createOrUpdateCourseOverview = async (
  payload: Partial<CommonPayload>
) => {
  return (await api.post("/ReadMore/createUpdateCourseOverview", payload))
    ?.data as Response;
};