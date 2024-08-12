import api from "../utils/api"

export const getAboutUs = async () => {
  return (await api.get('/AboutUsPage/GetAllAboutUs'))?.data as GetResponse;
}

export const createOrUpdateAboutUs = async (payload: Partial<SetupPayload>) => {
  return (await api.post('/AboutUsPage/createUpdateAboutUsPage', payload, { headers: { 'Content-Type': 'multipart/form-data' } }))?.data as Response;
}

export const deleteAboutUs = async (id: number) => {
  return (await api.delete(`/AboutUsPage/DeleteAboutUsById?Id=${id}`))?.data as Response;
}

export const getHistory = async () => {
  return (await api.get('/AboutUsPage/GetAllHistory'))?.data as GetResponse;
}

export const createOrUpdateHistory = async (payload: Partial<SetupPayload>) => {
  return (await api.post('/AboutUsPage/createUpdateHistory', payload, { headers: { 'Content-Type': 'multipart/form-data' } }))?.data as Response;
}

export const deleteHistory = async (id: number) => {
  return (await api.delete(`/AboutUsPage/DeleteHistoryById?Id=${id}`))?.data as Response;
}

export const getSchoolMgt = async () => {
  return (await api.get('/AboutUsPage/GetAllSchoolMgt'))?.data as GetResponse;
}

export const createOrUpdateSchoolMgt = async (payload: Partial<SetupPayload>) => {
  return (await api.post('/AboutUsPage/createUpdateSchoolMgt', payload, { headers: { 'Content-Type': 'multipart/form-data' } }))?.data as Response;
}

export const deleteSchoolMgt = async (id: number) => {
  return (await api.delete(`/AboutUsPage/DeleteSchoolMgtById?Id=${id}`))?.data as Response;
}

export const getEvents = async () => {
  return (await api.get(`/HomePage/HomePage/GetAllNewEvent`))?.data as GetResponse;
}

export const createOrUpdateEvent = async (payload: Partial<SetupPayload>) => {
  return (await api.post('/HomePage/HomePage/CreateUpdateNewEvent', payload, { headers: { 'Content-Type': 'multipart/form-data' } }))?.data as Response;
}

// export const deleteEvents = async (id: number) => {
//   return (await api.delete(`/HomePage/DeleteNewEventById?Id=${id}`))?.data as Response;
// }

export const getSocialMedia = async () => {
  return (await api.get('/GeneralTemplate/GetAllSocialMediaLinks'))?.data as SocialMediaResponse;
}

export const createOrUpdateSocialMedia = async (payload: Partial<SocialMedia>) => {
  return (await api.post('/HomePage/HomePage/createUpdateSocialMediaLink', payload))?.data as Response;
}

export const deleteSocialMedia = async (id: number) => {
  return (await api.delete(`/AboutUsPage/DeleteSocialMediaLinkById?Id=${id}`))?.data as Response;
}

export const getGender = async () => {
  return (await api.get('/Utilities/Utilities/GetAllGenders'))?.data as GenderResponse;
}

export const createOrUpdateGender = async (payload: Partial<Gender>) => {
  return (await api.post('/Utilities/Utilities/CreateUpdateGender', payload))?.data as Response;
}

export const getMaritalStatus = async () => {
  return (await api.get('/Utilities/Utilities/GetAllMaritalStatus'))?.data as MaritalStatusResponse;
}

export const createOrUpdateMaritalStatus = async (payload: Partial<MaritalStatus>) => {
  return (await api.post('/Utilities/Utilities/CreateUpdateMaritalStatus', payload))?.data as Response;
}

export const getCountry = async () => {
  return (await api.get('/Utilities/Utilities/GetAllCountry'))?.data as CountryResponse;
}

export const createOrUpdateCountry = async (payload: Partial<Country>) => {
  return (await api.post('/Utilities/Utilities/CreateUpdateCountry', payload))?.data as Response;
}

export const getStudentLife = async () => {
  return (await api.get('/StudentLife/studentlife/GetAllStudentLife'))?.data as GetResponse;
}

export const createOrUpdateStudentLife = async (payload: Partial<Setup>) => {
  return (await api.post('/StudentLife/studentlife/CreateUpdateStudentLife', payload))?.data as Response;
}

export const createOrUpdateSchoolSummary = async (payload: Partial<Setup>) => {
  return (await api.post('/StudentLife/studentlife/CreateUpdateSchoolSummary', payload))?.data as Response;
}

export const getCampusExperienceByStudentLifeId = async (studentLifeId: string) => {
  return (await api.get(`/StudentLife/studentlife/GetCampusExperienceByStudentLifeId?Id=${studentLifeId}`))?.data as GetByStudentLifeResponse;
}

export const createOrUpdateCampusExperience = async (payload: Partial<ItemByStudentLifePayload>) => {
  return (await api.post('/StudentLife/studentlife/CreateUpdateCampusExperience', payload))?.data as Response;
}

export const deleteCampusExperience = async (id: number) => {
  return (await api.delete(`/StudentLife/studentlife/DeleteCampusExperience?Id=${id}`))?.data as Response;
}

export const getOverview = async () => {
  return (await api.get('/StudentLife/studentlife/GetAllOverview'))?.data as GetByStudentLifeResponse;
}

export const getOverviewByStudentLifeId = async (id: string | number) => {
  return (await api.get(`/StudentLife/studentlife/GetOverviewByStudentLifeId?Id=${id}`))?.data as GetByStudentLifeResponse;
}

export const createOrUpdateOverview= async (payload: Partial<ItemByStudentLifePayload>) => {
  return (await api.post('/StudentLife/studentlife/createUpdateOverView', payload, { headers: { 'Content-Type': 'multipart/form-data' } }))?.data as Response;
}

export const deleteOverview = async (id: number) => {
  return (await api.delete(`/StudentLife/studentlife/DeleteOverview?Id=${id}`))?.data as Response;
}

export const getTemplate = async () => {
  return (await api.get(`/GeneralTemplate/GetAllTemplate`))?.data as GetTemplateResponse;
}

export const createOrUpdateTemplate = async (payload: Partial<TemplatePayload>) => {
  return (await api.post(`/GeneralTemplate/createUpdateTemplate`, payload, { headers: { 'Content-Type': 'multipart/form-data' } }))?.data as Response
}

export const deleteTemplate = async (id: number | string) => {
  return (await api.delete(`/GeneralTemplate/DeleteTemplateById?Id=${id}`))?.data as Response;
}