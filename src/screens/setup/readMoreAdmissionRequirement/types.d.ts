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
  programTypeId: number;
  activeStatus: boolean;
  isDeleted: boolean;
}

interface ProgramTypeResponse extends GenericResponse {
  data: ProgramType[];
}

interface ProgramType {
  name: string;
  id: number;
  created: string;
  createdBy: null;
  activeStatus: boolean;
}
