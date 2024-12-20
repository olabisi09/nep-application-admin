import api from "../../../utils/api";

export const getProgramTypes = async () => {
  return (await api.get("/Academics/GetAllProgramTypesAsync"))
    // eslint-disable-next-line no-undef
    ?.data as ProgramTypeResponse;
};
