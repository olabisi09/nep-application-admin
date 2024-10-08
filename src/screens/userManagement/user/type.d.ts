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