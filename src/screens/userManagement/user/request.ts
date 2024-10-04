import api from "../../../utils/api";

export const getAllStudentUser = async (
  pageNumber?: number,
  pageSize?: number
) => {
  return (
    await api.get(
      `/Authorization/GetAllApplicant?PageNumber=${pageNumber}&PageSize=${pageSize}`
    )
  )?.data as UserResponse;
};
