export interface DiscountProps {
  record: DiscountsDatum;
  handleClose: () => void;
}

export interface DiscountsResponse {
  code: number;
  message: string;
  data: DiscountsDatum[];
}

interface DiscountsDatum {
  id: number;
  created: string;
  createdBy: null;
  name: string;
  code: string;
  applicantEmail: null;
  couponUseLimit: number;
  couponUseCount: number;
  capAmount: null;
  discountType: string;
  discountAmount: number;
  applicationBatchId: number;
  applicationBatch: ApplicationBatch;
  activeStatus: boolean;
  lastModifiedDate: string;
  lastModifiedBy: null;
}

interface ApplicationBatch {
  id: number;
  batchName: string;
  sessionId: number;
  lateStartDate: string;
  lateEndDate: string;
  startDate: string;
  endDate: string;
  isActive: boolean;
}
