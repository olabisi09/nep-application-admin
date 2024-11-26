interface GenericResponse {
  statusCode: number;
  totalSize: number;
  message: string;
}

interface ReadMoreProgrammeResponse extends GenericResponse {
  data: ReadMoreProgramme[];
}

interface ReadMoreProgramme {
  id: number;
  readmoreId: number;
  description: string;
  duration: string;
  academicSessionId: number;
  academicSessionName: null;
  activeStatus: boolean;
  programName: null | string;
  sessionIntake: string;
}

interface ReadMoreProgrammePayload {
  id: number;
  readmoreId: number;
  description: string;
  duration: string;
  activeStatus: boolean;
  isDeleted: boolean;
  sessionIntake: string;
}
