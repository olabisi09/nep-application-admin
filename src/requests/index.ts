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
export const getGender = async () => {
  return (await api.get('/Utilities/Utilities/GetAllGenders'))?.data as GenderResponse;
}

export const createOrUpdateGender = async (payload: Partial<Gender>) => {
  return (await api.post('/AboutUsPage/createUpdateAboutUsPage', payload))?.data as Response;
}

export const getMaritalStatus = async () => {
  return (await api.get('/Utilities/Utilities/GetAllMaritalStatus'))?.data as MaritalStatusResponse;
}

export const createOrUpdateMaritalStatus = async (payload: Partial<MaritalStatus>) => {
  return (await api.post('/Utilities/Utilities/CreateUpdateMaritalStatus', payload))?.data as Response;
}

