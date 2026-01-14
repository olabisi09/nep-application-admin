/* eslint-disable no-undef */
import { buildQuery } from '../../../utils/buildQuery';
import api from '../../../utils/api';

export const getAllStudentUser = async (params: ApplicantParams) => {
  const url = buildQuery(params);
  return (await api.get(`/Authorization/GetAllApplicant${url}`))?.data as UserResponse;
};
