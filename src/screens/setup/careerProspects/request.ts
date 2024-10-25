import api from "../../../utils/api";

export const getCareerProspectItemByCareerProspectId = async (
  id: string | number
) => {
  return (
    await api.get(`/ReadMore/GetCareerProspectItemByCareerProspectId?Id=${id}`)
  )?.data as CareerProspectItemResponse;
};

export const createOrUpdateCareerProspectItem = async (
  payload: Partial<CareerProspectItemPayload>
) => {
  return (await api.post("/ReadMore/CreateUpdateCareerProspectItem", payload))
    ?.data as Response;
};

export const deleteCareerProspectItem = async (id: number) => {
  return (await api.delete(`/ReadMore/DeleteCareerProspectItemById?Id=${id}`))
    ?.data;
};
