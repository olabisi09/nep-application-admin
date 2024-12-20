/* eslint-disable no-undef */
import api from "../../../utils/api";

export const getProgramTypes = async () => {
  return (await api.get("/Academics/GetAllProgramTypesAsync"))
    ?.data as ProgramTypeResponse;
};

export const getAllProgram = async (pageNumber?: number, pageSize?: number) => {
  return (await api.get(`/Utilities/Utilities/GetAllProgramDetails?PageNumber=${pageNumber}&PageSize=${pageSize}`))
    ?.data as ProgramDataResponse;
};

export const getAllDepartment = async () => {
  return (await api.get("/Academics/GetAllDepartmentAsync"))
    ?.data as DepartmentResponse;
};

export const createUpdateProgram = async (payload: ProgramPayload) => {
  return (
    await api.post("/Utilities/Utilities/CreateUpdateProgramDeytails", payload)
  )?.data as Response;
};

export const deleteProgram = async (id: number) => {
  return (
    await api.delete(`/Utilities/Utilities/DeleteProgramDetailsId?Id=${id}`)
  )?.data as Response;
};
