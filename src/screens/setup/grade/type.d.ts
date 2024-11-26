interface GradeResponse {
  statusCode: number;
  message: string;
  totalSize: number;
  data: Grade[];
}

interface Grade {
  id: number;
  grade: string;
  activeStatus: boolean;
  isDeleted: boolean;
}

interface GradePayload {
  id: number;
  grade: string;
  activeStatus: boolean;
  isDeleted: boolean;
}