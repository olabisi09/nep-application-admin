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

export const createOrUpdateCampusExperience = async (payload: Partial<Setup>) => {
  return (await api.post('/StudentLife/studentlife/CreateUpdateCampusExperience', payload))?.data as Response;
}

export const createOrUpdateFitnessAthletics = async (payload: Partial<Setup>) => {
  return (await api.post('/StudentLife/studentlife/CreateUpdateFitnessAthletics', payload))?.data as Response;
}

export const createOrUpdateSupportGuidance = async (payload: Partial<Setup>) => {
  return (await api.post('/StudentLife/studentlife/CreateUpdateSupportGuidance', payload))?.data as Response;
}

export const createOrUpdateStudentActivity = async (payload: Partial<Setup>) => {
  return (await api.post('/StudentLife/studentlife/CreateUpdateStudentActivity', payload))?.data as Response;
export const createOrUpdateOverview= async (payload: Partial<Setup>) => {
  return (await api.post('/StudentLife/studentlife/createUpdateOverView', payload))?.data as Response;
}