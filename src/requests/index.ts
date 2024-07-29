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