import { FaqPayload, FaqResponse } from "../screens/setup/faq/types";
import {
  GetSubject,
  SubjectPayload,
  SubjectResponse,
} from "../screens/setup/subject/types";
import api from "../utils/api";

export const getAboutUs = async () => {
  return (await api.get("/AboutUsPage/GetAllAboutUs"))?.data as GetResponse;
};

export const createOrUpdateAboutUs = async (payload: Partial<SetupPayload>) => {
  return (
    await api.post("/AboutUsPage/createUpdateAboutUsPage", payload, {
      headers: { "Content-Type": "multipart/form-data" },
    })
  )?.data as Response;
};

export const deleteAboutUs = async (id: number) => {
  return (await api.delete(`/AboutUsPage/DeleteAboutUsById/${id}`))
    ?.data as Response;
};

export const createFaq = async (payload: Partial<FaqPayload>) => {
  return (await api.post(`/HomePage/homePage/CreateUpdateFaq`, payload))
    ?.data as FaqResponse;
};

// export const deleteAboutUs = async (id: number) => {
//   return (await api.delete(`/AboutUsPage/DeleteAboutUsById?Id=${id}`))?.data as Response;
// }

export const createUpdateGeneralTemplate = async (payload: FormData) => {
  return (await api.post("/GeneralTemplate/createUpdateTemplate", payload))
    ?.data as Response;
};

export const getGeneralTemplates = async () => {
  return (await api.get("/GeneralTemplate/GetAllTemplate"))
    ?.data as GeneralTemplateResponse;
};

export const deleteGeneralTemplate = async (id: number) => {
  return (await api.delete(`/GeneralTemplate/DeleteTemplateById?Id${id}`))
    ?.data as Response;
};

export const getGeneralTemplateById = async (id: number) => {
  return (await api.get(`/GeneralTemplate/GetTemplateById?Id=${id}`))
    ?.data as GeneralTemplate;
};

export const StatusOptions = [
  {
    value: true,
    label: "Active",
  },
  {
    value: false,
    label: "Inactive",
  },
];
export const getGender = async () => {
  return (await api.get("/Utilities/Utilities/GetAllGenders"))
    ?.data as GenderResponse;
};

export const createOrUpdateGender = async (payload: Partial<Gender>) => {
  return (await api.post("/Utilities/Utilities/CreateUpdateGender", payload))
    ?.data as Response;
};

export const getMaritalStatus = async () => {
  return (await api.get("/Utilities/Utilities/GetAllMaritalStatus"))
    ?.data as MaritalStatusResponse;
};

export const createOrUpdateMaritalStatus = async (
  payload: Partial<MaritalStatus>
) => {
  return (
    await api.post("/Utilities/Utilities/CreateUpdateMaritalStatus", payload)
  )?.data as Response;
};

export const getCountry = async () => {
  return (await api.get("/Utilities/Utilities/GetAllCountries"))
    ?.data as CountryResponse;
};

export const createOrUpdateCountry = async (payload: Partial<Country>) => {
  return (await api.post("/Utilities/Utilities/CreateUpdateCountry", payload))
    ?.data as Response;
};

export const getState = async () => {
  return (await api.get("/Utilities/Utilities/GetAllStates"))
    ?.data as StateResponse;
};

export const createOrUpdateState = async (payload: Partial<State>) => {
  return (await api.post("/Utilities/Utilities/CreateUpdateState", payload))
    ?.data as Response;
};

export const getLGA = async () => {
  return (await api.get("/Utilities/Utilities/GetAllLgas"))
    ?.data as LGAResponse;
};

export const createOrUpdateLGA = async (payload: Partial<LGA>) => {
  return (await api.post("/Utilities/Utilities/CreateUpdateLga", payload))
    ?.data as Response;
};

export const getHistory = async () => {
  return (await api.get("/AboutUsPage/GetAllHistory"))?.data as GetResponse;
};

export const createOrUpdateHistory = async (payload: Partial<SetupPayload>) => {
  return (
    await api.post("/AboutUsPage/createUpdateHistory", payload, {
      headers: { "Content-Type": "multipart/form-data" },
    })
  )?.data as Response;
};

export const deleteHistory = async (id: number) => {
  return (await api.delete(`/AboutUsPage/DeleteHistoryById?Id=${id}`))
    ?.data as Response;
};

export const getSchoolMgt = async () => {
  return (await api.get("/AboutUsPage/GetAllSchoolMgt"))?.data as GetResponse;
};

export const createOrUpdateSchoolMgt = async (
  payload: Partial<SetupPayload>
) => {
  return (
    await api.post("/AboutUsPage/createUpdateSchoolMgt", payload, {
      headers: { "Content-Type": "multipart/form-data" },
    })
  )?.data as Response;
};

export const deleteSchoolMgt = async (id: number) => {
  return (await api.delete(`/AboutUsPage/DeleteSchoolMgtById?Id=${id}`))
    ?.data as Response;
};

export const getEvents = async () => {
  return (await api.get(`/HomePage/HomePage/GetAllNewEvent`))
    ?.data as GetResponse;
};

export const createOrUpdateEvent = async (payload: Partial<SetupPayload>) => {
  return (
    await api.post("/HomePage/HomePage/CreateUpdateNewEvent", payload, {
      headers: { "Content-Type": "multipart/form-data" },
    })
  )?.data as Response;
};

// export const deleteEvents = async (id: number) => {
//   return (await api.delete(`/HomePage/DeleteNewEventById?Id=${id}`))?.data as Response;
// }

export const getSocialMedia = async () => {
  return (await api.get("/GeneralTemplate/GetAllSocialMediaLinks"))
    ?.data as SocialMediaResponse;
};

export const createOrUpdateSocialMedia = async (
  payload: Partial<SocialMedia>
) => {
  return (
    await api.post("/HomePage/HomePage/createUpdateSocialMediaLink", payload)
  )?.data as Response;
};

export const deleteSocialMedia = async (id: number) => {
  return (await api.delete(`/AboutUsPage/DeleteSocialMediaLinkById?Id=${id}`))
    ?.data as Response;
};

export const getStudentLife = async () => {
  return (await api.get("/StudentLife/studentlife/GetAllStudentLife"))
    ?.data as GetResponse;
};

export const createOrUpdateStudentLife = async (payload: Partial<Setup>) => {
  return (
    await api.post("/StudentLife/studentlife/CreateUpdateStudentLife", payload)
  )?.data as Response;
};

export const createOrUpdateSchoolSummary = async (payload: Partial<Setup>) => {
  return (
    await api.post(
      "/StudentLife/studentlife/CreateUpdateSchoolSummary",
      payload
    )
  )?.data as Response;
};

export const createOrUpdateCampusExperience = async (
  payload: Partial<Setup>
) => {
  return (
    await api.post(
      "/StudentLife/studentlife/CreateUpdateCampusExperience",
      payload
    )
  )?.data as Response;
};

export const createOrUpdateSubject = async (
  payload: Partial<SubjectPayload>
) => {
  return (await api.post("/Utilities/Utilities/CreateUpdateSubject", payload))
    ?.data as SubjectResponse;
};

export const getSubject = async () => {
  return (await api.get(`Utilities/Utilities/GetAllSubject`))
    ?.data as GetSubject;
};

export const deleteCountry = async (id: number) => {
  return (await api.delete(`/Utilities/Utilities/Deletecountry?Id=${id}`))
    ?.data as Response;
};
export const deleteGender = async (id: number) => {
  return (await api.delete(`/Utilities/Utilities/DeleteGender?Id=${id}`))
    ?.data as Response;
};
export const deleteMaritalStatus = async (id: number) => {
  return (await api.delete(`/Utilities/Utilities/DeleteMaritalStatus?Id=${id}`))
    ?.data as Response;
};
export const deleteState = async (id: number) => {
  return (await api.delete(`/Utilities/Utilities/DeleteState?Id=${id}`))
    ?.data as Response;
};

export const deleteSubject = async (id: number) => {
  return (await api.delete(`/Utilities/Utilities/DeleteSubject?Id=${id}`))
    ?.data as Response;
};
