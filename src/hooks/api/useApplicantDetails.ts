import {
  getApplicantInstitution,
  getApplicantPersonalInfo,
  getApplicantQualifications,
  getApplicantWorkHistory,
} from '../../screens/userManagement/user/request';
import { useQueries } from '@tanstack/react-query';

export const useApplicantDetails = (applicantId: string) => {
  const [personalInfoQuery, institutionQuery, workHistoryQuery, qualificationsQuery] = useQueries({
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
      {
        queryKey: ['applicant-qualifications', applicantId],
        queryFn: () => getApplicantQualifications(applicantId),
      },
    ],
  });

  const personalInfo = personalInfoQuery.data?.data as PersonalInfo;
  const institutions = institutionQuery.data?.data as Institution[];
  const workHistory = workHistoryQuery.data?.data as WorkHistory[];
  const qualifications = qualificationsQuery.data?.data as Qualification[];

  const isLoading =
    personalInfoQuery.isLoading ||
    institutionQuery.isLoading ||
    workHistoryQuery.isLoading ||
    qualificationsQuery.isLoading;
  const isError =
    personalInfoQuery.isError || institutionQuery.isError || workHistoryQuery.isError || qualificationsQuery.isError;

  return {
    personalInfo,
    institutions,
    workHistory,
    qualifications,
    isLoading,
    isError,
  };
};
