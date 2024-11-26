import api from "../../../utils/api";

export const getAllCourseOverview = async (
  pageNumber?: number,
  pageSize?: number
) => {
  return (
    await api.get(
      `/ReadMore/GetAllCourseOverviews/?PageNumber=${pageNumber}&PageSize=${pageSize}`
    )
  )?.data as ReadMoreOverviewResponse;
};

export const createOrUpdateCourseOverview = async (
  payload: Partial<CommonPayload>
) => {
  return (await api.post("/ReadMore/createUpdateCourseOverview", payload))
    ?.data as Response;
};
