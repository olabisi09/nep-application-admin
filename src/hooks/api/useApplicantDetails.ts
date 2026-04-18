import {
  getApplicantInstitution,
  getApplicantPersonalInfo,
  getApplicantQualifications,
  getApplicantStudyDetails,
  getApplicantWorkHistory,
} from '../../screens/userManagement/user/request';
import { useQueries } from '@tanstack/react-query';

export const useApplicantDetails = (applicantId: string) => {
  const [personalInfoQuery, studyDetailsQuery, institutionQuery, workHistoryQuery, qualificationsQuery] = useQueries({
    queries: [
      {
        queryKey: ['applicant-personal-info', applicantId],
        queryFn: () => getApplicantPersonalInfo(applicantId),
      },
      {
        queryKey: ['applicant-study-details', applicantId],
        queryFn: () => getApplicantStudyDetails(applicantId),
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
  const studyDetails = studyDetailsQuery.data?.data as StudyDetails;
  const institutions = institutionQuery.data?.data as Institution[];
  const workHistory = workHistoryQuery.data?.data as WorkHistory[];
  const qualifications = qualificationsQuery.data?.data as Qualification[];

  const personalInfoLoading = personalInfoQuery.isLoading;
  const studyDetailsLoading = studyDetailsQuery.isLoading;
  const institutionLoading = institutionQuery.isLoading;
  const workHistoryLoading = workHistoryQuery.isLoading;
  const qualificationsLoading = qualificationsQuery.isLoading;

  const personalInfoError = personalInfoQuery.isError;
  const studyDetailsError = studyDetailsQuery.isError;
  const institutionError = institutionQuery.isError;
  const workHistoryError = workHistoryQuery.isError;
  const qualificationsError = qualificationsQuery.isError;

  return {
    personalInfo,
    studyDetails,
    institutions,
    workHistory,
    qualifications,

    personalInfoLoading,
    studyDetailsLoading,
    institutionLoading,
    workHistoryLoading,
    qualificationsLoading,

    personalInfoError,
    studyDetailsError,
    institutionError,
    workHistoryError,
    qualificationsError,
  };
};
