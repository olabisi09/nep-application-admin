import api from "../../../utils/api";

export const createUpdateSchoolID = async (payload: Payload) => {
  return (await api.post("/Utilities/Utilities/CreateUpdateLookUp", payload))
    ?.data;
};

export const getAllSchoolID = async (pageNumber?: number, pageSize?: number) => {
  return (
    await api.get(
      `/Utilities/Utilities/GetAllLookUps?PageNumber=${pageNumber}&PageSize=${pageSize}`
    )
  )?.data;
};


