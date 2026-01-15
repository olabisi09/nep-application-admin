import {
  getApplicantInstitution,
  getApplicantPersonalInfo,
  getApplicantWorkHistory,
} from '../../screens/userManagement/user/request';
import { useQueries } from '@tanstack/react-query';

interface PersonalInfo {
  id: number;
  applicantId: string;
  applicationNumber: string;
  fName: string;
  mNane: string;
  lName: string;
  gender: string;
  genderId: number;
  maritalStatus: string;
  maritalStatusId: number;
  countryId: number;
  countryName: string;
  religion: string;
  religionId: number;
  phoneNo: string;
  dateOfBirth: string;
  lga: string;
  lgaId: number;
  stateOfOrigin: string;
  stateOfOriginId: number;
  address: string;
  email: string;
  zipCode: number;
  disability: string;
  disabilityId: number;
  describeDisability: null;
  imageUrl: string;
  isActive: boolean;
  title: string;
  titleId: number;
  city: string;
  nextOfKinFName: null;
  nextOfKinLName: null;
  nextOfKinAdress: null;
  nextOfKinPhoneNo: null;
  relationshipWithNextOfKin: null;
}

interface ApplicantParams {
  PageNumber?: number;
  PageSize?: number;
  programId?: number;
  modeOfStudyId?: number;
  programTypeId?: number;
  applicationBatchId?: number;
  name?: string;
}

interface Institution {
  id: number;
  applicantId: string;
  institutionName: string;
  discipline: string;
  cgpa: string;
  startDate: string;
  endDate: string;
  certificateUrl: string;
  isDeleted: boolean;
}

interface WorkHistory {
  id: number;
  applicantId: string;
  companyName: string;
  position: string;
  startDate: string;
  endDate: string;
  isCurrentJob: boolean;
  employmentUrl: string;
  isDeleted: boolean;
}

export const useApplicantDetails = (applicantId: string) => {
  const [personalInfoQuery, institutionQuery, workHistoryQuery] = useQueries({
    queries: [
      {
        queryKey: ['applicant-personal-info', applicantId],
        queryFn: () => getApplicantPersonalInfo(applicantId),
      },
      {
        queryKey: ['applicant-institutions', applicantId],
        queryFn: () => getApplicantInstitution(applicantId),
      },
      {
        queryKey: ['applicant-work-history', applicantId],
        queryFn: () => getApplicantWorkHistory(applicantId),
      },
    ],
  });

  const personalInfo = personalInfoQuery.data?.data as PersonalInfo;
  const institutions = institutionQuery.data?.data as Institution[];
  const workHistory = workHistoryQuery.data?.data as WorkHistory[];

  const isLoading = personalInfoQuery.isLoading || institutionQuery.isLoading || workHistoryQuery.isLoading;
  const isError = personalInfoQuery.isError || institutionQuery.isError || workHistoryQuery.isError;

  return {
    personalInfo,
    institutions,
    workHistory,
    isLoading,
    isError,
  };
};
