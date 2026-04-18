interface UserResponse {
  totalSize: number;
  statusCode: number;
  message: string;
  data: User[];
}

interface User {
  applicantId: string;
  applicationNumber: string;
  lastName: string;
  firstName: string;
  middleName: null | string;
  email: string;
  phoneNumber: string;
  genderId: number;
  genderName: null;
  address: string;
  titleId: null | number;
  titleName: null | string;
  maritalStatusId: number;
  maritalStatusName: string;
  religionId: number;
  religionName: string;
  dateOfBirth: string;
  countyId: number;
  countryName: null | string;
  stateId: number;
  stateName: null | string;
  lgaId: number;
  lgaName: null | string;
  applicationBatchId: number;
  applicationBatchName: string;
  programId: number;
  programName: string;
  programTypeId: number;
  programTypeName: string;
  modeOfStudyId: number;
  modeofStudyName: string;
  isAdmitted: null;
  disabilityId: number;
  disabilityName: string;
  imageUrl: string;
  city: null | string;
}

interface ApplicantParams {
  PageNumber?: number;
  PageSize?: number;
  programId?: number;
  modeOfStudyId?: number;
  programTypeId?: number;
  applicationBatchId?: number;
  sessionId?: number;
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

interface Qualification {
  id: number;
  applicantId: string;
  qualificationType: string;
  examNumber: string;
  subjects: Subject[];
  certificateiUrl: string;
  isDeleted: boolean;
}

interface Subject {
  id: number;
  qualificationId: number;
  subject: string;
  grade: string;
  activeStatus: boolean;
  isDeleted: boolean;
  applicantId: null;
}

interface StudyDetails {
  applicantId: string;
  applicationNumber: string;
  lastName: string;
  firstName: string;
  middleName: null;
  email: string;
  phoneNumber: string;
  dateOfBirth: string;
  countyId: number;
  stateId: number;
  lgaId: number;
  programId: number;
  modeOfStudyId: number;
  applicationBatchId: number;
  programName: string;
  modeOfStudyName: string;
  applicationBatchName: string;
  programTypeId: number;
  programTypeName: string;
  institutionShortName: string;
  hasPaidAcceptanceFee: boolean;
  canPayAcceptanceFee: boolean;
}
