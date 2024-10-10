import api from "../../../utils/api";

export const CreateUpdateGrade = async (payload: GradePayload) => {
  return (await api.post("/Utilities/Utilities/CreateUpdateGrade", payload))
    ?.data;
};

export const getGrades = async () => {
  return (await api.get("/Utilities/Utilities/GetAllGrade"))
    ?.data as GradeResponse;
};

export const deleteGrade = async (id: number) => {
  return (await api.delete(`/Utilities/Utilities/DeleteGrade?Id=${id}`))
    ?.data as GradeResponse;
};
