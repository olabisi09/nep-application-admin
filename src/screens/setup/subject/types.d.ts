interface SubjectPayload {
  id: number;
  subject: string;
  activeStatus: boolean;
  isDeleted: boolean;
}

interface SubjectResponse {
  statusCode: number;
  message: string;
  totalSize: number;
  data: Subject[];
}

interface GetSubject {
  statusCode: number;
  message: string;
  data: Subject[];
}

interface Subject {
  id: number;
  subject: string;
  activeStatus: boolean;
  isDeleted: boolean;
}
