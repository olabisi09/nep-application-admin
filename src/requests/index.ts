import api from "../utils/api"

export const getAboutUs = async () => {
  return (await api.get('/AboutUsPage/GetAllAboutUs'))?.data as AboutUsResponse;
}

export const createOrUpdateAboutUs = async (payload: Partial<AboutUs>) => {
  return (await api.post('/AboutUsPage/createUpdateAboutUsPage', payload))?.data as Response;
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
  return (await api.get('/Utilities/Utilities/GetAllCountry'))?.data as CountryResponse;
}

export const createOrUpdateCountry = async (payload: Partial<Country>) => {
  return (await api.post('/Utilities/Utilities/CreateUpdateCountry', payload))?.data as Response;
}
