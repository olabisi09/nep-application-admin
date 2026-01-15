/* eslint-disable no-undef */
import { buildQuery } from '../../../utils/buildQuery';
import api from '../../../utils/api';

export const getAllStudentUser = async (params: ApplicantParams) => {
  const url = buildQuery(params);
  return (await api.get(`/Authorization/GetAllApplicant${url}`))?.data as UserResponse;
};

export const getApplicantPersonalInfo = async (applicantId: string) => {
  return (await api.get(`/StudentInfo/StudentInfo/GetPersonalInfoByApplicantId?Id=${applicantId}`))
    ?.data as APIResponse<PersonalInfo>;
};

export const getApplicantInstitution = async (applicantId: string) => {
  return (await api.get(`/StudentInfo/StudentInfo/GetInstitutionByApplicantId?Id=${applicantId}`))?.data as APIResponse<
    Institution[]
  >;
};

export const getApplicantWorkHistory = async (applicantId: string) => {
  return (await api.get(`/StudentInfo/StudentInfo/GetWorkHistoryByApplicantId?Id=${applicantId}`))?.data as APIResponse<
    WorkHistory[]
  >;
};
