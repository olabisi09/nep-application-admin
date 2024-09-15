import api from "../../../utils/api";

export const getProgramTypes = async () => {
    return (await api.get("/Academics/GetAllProgramTypesAsync"))
      ?.data as ProgramTypeResponse;
  };