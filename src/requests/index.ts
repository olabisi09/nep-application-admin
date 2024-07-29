import { FaqPayload } from "../screens/setup/faq/types";
import api from "../utils/api";

export const getAboutUs = async () => {
  return (await api.get("/AboutUsPage/GetAllAboutUs"))?.data as AboutUsResponse;
};

export const createOrUpdateAboutUs = async (payload: Partial<AboutUs>) => {
  return (await api.post("/AboutUsPage/createUpdateAboutUsPage", payload))
    ?.data as Response;
};

export const deleteAboutUs = async (id: number) => {
  return (await api.delete(`/AboutUsPage/DeleteAboutUsById/${id}`))
    ?.data as Response;
};

export const createFaq = async (payload: FaqPayload) => {
  return (await api.post(`/HomePage/CreateUpdateFaq`, payload))
    ?.data as Response;
};
