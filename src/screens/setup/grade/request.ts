/* eslint-disable no-undef */
import api from "../../../utils/api";

export const createUpdateGrade = async (payload: GradePayload) => {
  return (await api.post("/Utilities/Utilities/CreateUpdateGrade", payload))
    ?.data;
};

export const getGrades = async (query: PaginationProps) => {
  return (
    await api.get(
      `/Utilities/Utilities/GetAllGrade?PageNumber=${query.pageNumber}&PageSize=${query.pageSize}`
    )
  )?.data as GradeResponse;
};

export const deleteGrade = async (id: number) => {
  return (await api.delete(`/Utilities/Utilities/DeleteGrade?Id=${id}`))
    ?.data as GradeResponse;
};
