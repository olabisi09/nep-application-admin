import api from "../../../utils/api";

export const CreateUpdateSubject = async (payload: SubjectPayload) => {
  return (await api.post("/Utilities/Utilities/CreateUpdateSubj", payload))
    ?.data;
};

export const getSubjects = async () => {
  return (await api.get("/Utilities/Utilities/GetAllSubj"))
    ?.data as SubjectResponse;
};

export const deleteSubjects = async (id: number) => {
  return (await api.delete(`/Utilities/Utilities/DeleteSubj?Id=${id}`))?.data as SubjectResponse;
};
