interface GenericResponse {
  statusCode: number;
  totalSize: number;
  message: string;
}

interface ReadMoreOverviewResponse extends GenericResponse {
  data: ReadMoreOverview[];
}

interface ReadMoreOverview {
  id: number;
  readMoreId: number;
  description: string;
  activeStatus: boolean;
  isDeleted: boolean;
  programName: string;
}
