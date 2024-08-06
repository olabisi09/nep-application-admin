export interface SubjectPayload {
  id: number;
  subject: string;
  activeStatus: boolean;
  isDeleted: boolean;
}

export interface SubjectResponse {
  statusCode: number;
  message: string;
  data: any;
}

export interface GetSubject {
  statusCode: number;
  message: string;
  data: Subject[];
}

export interface Subject {
  id: number;
  subject: string;
  activeStatus: boolean;
  isDeleted: boolean;
}
