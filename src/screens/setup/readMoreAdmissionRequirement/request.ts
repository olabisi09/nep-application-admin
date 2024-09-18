import api from "../../../utils/api";

export const getAdmissionRequirementDetailsByAdmissionReqId = async (
  id: number
) => {
  return (
    await api.get(
      `/ReadMore/GetAdmissionRequirementDetailByAdmissionReqId?Id=${id}`
    )
  )?.data as AdmissionRequirementDetailsResponse;
};

export const deleteAdmissionRequirementDetailsById = async (id: number) => {
  return (
    await api.delete(`/ReadMore/DeleteAdmissionRequirementDetailById?Id=${id}`)
  )?.data as Response;
};

export const createOrUpdateAdmissionRequirementDetail = async (
  payload: Partial<AdmissionReqDetailsPayload>
) => {
  return (
    await api.post("/ReadMore/CreateUpdateAdmissionRequirementDetail", payload)
  )?.data as Response;
};

export const getProgramTypes = async () => {
  return (await api.get("/Academics/GetAllProgramTypesAsync"))
    ?.data as ProgramTypeResponse;
};
