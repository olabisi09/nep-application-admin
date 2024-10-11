interface ApplicationBatchPayload {
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

interface ApplicationBatchResponse {
  statusCode: number;
  message: string;
  data: ApplicationBatch[];
}

interface ApplicationBatch {
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