interface Response {
  statusCode: number;
  message: string;
}

interface ProgramPayload {
  id?: number;
  programTypeId: number;
  programId: number;
  activeStatus: boolean;
  isDeleted?: boolean;
}

interface ProgramDataResponse extends Response {
  data: ProgramData[];
}

interface ProgramData {
  id: number;
  programTypeId: number;
  programId: number;
  programTypeName: string;
  program: string;
  activeStatus: boolean;
  isDeleted: boolean;
}

interface DepartmentResponse {
  code: number;
  message: string;
  data: Department[];
}

interface Department {
  categoryId: number;
  categoryName: string;
  categoryCode: string;
  name: string;
  description: string;
  isDeleted: boolean;
  id: number;
  created: string;
  createdBy: null;
  activeStatus: boolean;
}
