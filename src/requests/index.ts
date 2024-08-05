import api from "../utils/api"

export const getAboutUs = async () => {
  return (await api.get('/AboutUsPage/GetAllAboutUs'))?.data as GetResponse;
}

export const createOrUpdateAboutUs = async (payload: Partial<SetupPayload>) => {
  return (await api.post('/AboutUsPage/createUpdateAboutUsPage', payload, { headers: { 'Content-Type': 'multipart/form-data' } }))?.data as Response;
}

export const deleteAboutUs = async (id: number) => {
  return (await api.delete(`/AboutUsPage/DeleteAboutUsById/${id}`))?.data as Response;
}

export const createUpdateGeneralTemplate  = async(payload: FormData) => {
  return (await api.post('/GeneralTemplate/createUpdateTemplate', payload))?.data as Response;
}

export const getGeneralTemplates = async () => {
  return (await api.get('/GeneralTemplate/GetAllTemplate'))?.data as GeneralTemplateResponse;
}

export const deleteGeneralTemplate = async (id: number) => {
  return (await api.delete(`/GeneralTemplate/DeleteTemplateById?Id${id}`))?.data as Response;
}

export const getGeneralTemplateById = async (id: number) => {
  return (await api.get(`/GeneralTemplate/GetTemplateById?Id=${id}`))?.data as GeneralTemplate;
}

export const StatusOptions = [{
  value: true,
  label: 'Active',
}
 , {
  value: false,
  label: 'Inactive',
 }]
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
  return (await api.get('/Utilities/Utilities/GetAllCountries'))?.data as CountryResponse;
}

export const createOrUpdateCountry = async (payload: Partial<Country>) => {
  return (await api.post('/Utilities/Utilities/CreateUpdateCountry', payload))?.data as Response;
}

export const getState = async () => {
  return (await api.get('/Utilities/Utilities/GetAllStates'))?.data as StateResponse;
}

export const createOrUpdateState = async (payload: Partial<State>) => {
  return (await api.post('/Utilities/Utilities/CreateUpdateState', payload))?.data as Response;
}

export const getLGA = async () => {
  return (await api.get('/Utilities/Utilities/GetAllLgas'))?.data as LGAResponse;
}

export const createOrUpdateLGA = async (payload: Partial<LGA>) => {
  return (await api.post('/Utilities/Utilities/CreateUpdateLga', payload))?.data as Response;
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
export const deleteCountry = async (id: number) => {
  return (await api.delete(`/Utilities/Utilities/Deletecountry?Id=${id}`))?.data as Response;
}
export const deleteGender = async (id: number) => {
  return (await api.delete(`/Utilities/Utilities/DeleteGender?Id=${id}`))?.data as Response;
}
export const deleteMaritalStatus = async (id: number) => {
  return (await api.delete(`/Utilities/Utilities/DeleteMaritalStatus?Id=${id}`))?.data as Response;
}
export const deleteState = async (id: number) => {
  return (await api.delete(`/Utilities/Utilities/DeleteState?Id=${id}`))?.data as Response;
}
export const deleteLGA = async (id: number) => {
  return (await api.delete(`/Utilities/Utilities/DeleteLga?Id=${id}`))?.data as Response;
}