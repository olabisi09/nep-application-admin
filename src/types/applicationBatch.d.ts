export interface ApplicationBatchResponse extends Response {
  data: GetAllApplicationBatch[];
}

interface GetAllApplicationBatch {
  id: number;
  batchName: string;
  sessionId: number;
  programId: number;
  lateStartDate: string;
  lateEndDate: string;
  startDate: string;
  endDate: string;
  isActive: boolean;
}
