interface GenericResponse {
  statusCode: number;
  message: string;
}

interface AdmissionRequirementDetailsResponse extends GenericResponse {
  data: AdmissionRequirementDetails[];
}

interface AdmissionRequirementDetails {
  id: number;
  name: string;
  admissionRequirementId: number;
  description: string;
  noOfSittings: number;
  activeStatus: boolean;
  programName: null;
  isDeleted: boolean;
}

interface AdmissionReqDetailsPayload {
  id: number;
  name: string;
  admissionRequirementId: number;
  description: string;
  noOfSittings: number;
  activeStatus: boolean;
  isDeleted: boolean;
}