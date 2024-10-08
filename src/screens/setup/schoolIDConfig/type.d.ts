interface Payload {
  id?: number;
  codeName: string;
  value: string;
  activeStatus: boolean;
}

interface SchoolIDResponse {
  totalSize: number;
  statusCode: number;
  message: string;
  data: SchoolID[];
}

interface SchoolID {
  id: number;
  codeName: string;
  value: string;
  createdBy: null;
  createdDate: null;
  lastModified: null;
  activeStatus: boolean;
}