/* eslint-disable no-undef */
import api from "../../../utils/api";

export const getProgramTypes = async () => {
  return (await api.get("/Academics/GetAllProgramTypesAsync"))
    ?.data as ProgramTypeResponse;
};

export const createProgramType = async (payload: CreateProgramTypePayload) => {
  return (await api.post("/Academics/CreateProgramTypesAsync", payload))
    ?.data as Response;
};

export const editProgramType = async (payload: EditProgramTypePayload) => {
  return (await api.put("/Academics/UpdateProgramTypesAsync", payload))
    ?.data as Response;
};

export const deleteProgramType = async (id: number) => {
  return (await api.delete(`/Academics/DeleteProgramTypesAsync?Id=${id}`))
    ?.data as Response;
};

