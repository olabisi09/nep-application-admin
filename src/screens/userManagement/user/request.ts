import { buildQuery } from '../../../utils/buildQuery';
import api from '../../../utils/api';

export const getAllStudentUser = async (params: ApplicantParams) => {
  const url = buildQuery(params);
  return (await api.get(`/Authorization/GetAllApplicant${url}`))?.data as UserResponse;
};

export const downloadStudentUsers = async (params: ApplicantParams) => {
  const url = buildQuery(params);
  return (await api.get(`/Authorization/downloadAllApplicant${url}`, { responseType: 'blob' }))?.data as Blob;
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

export const getApplicantQualifications = async (applicantId: string) => {
  return (await api.get(`/StudentInfo/StudentInfo/GetQualificationByApplicantId?Id=${applicantId}`))
    ?.data as APIResponse<Qualification[]>;
};

export const admitApplicants = async (payload: { applicationNumber: string[] }) => {
  return (await api.post(`/Authorization/AdmitApplicantsAsync`, payload))?.data as APIResponse<any>;
};
