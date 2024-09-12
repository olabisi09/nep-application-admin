interface GenericResponse {
  statusCode: number;
  message: string;
}

interface CareerProspectItemResponse extends GenericResponse {
  data: CareerProspectItem[];
}

interface CareerProspectItem {
  id: number;
  careerProspectId: number;
  title: null;
  description: string;
  activeStatus: boolean;
  isDeleted: boolean;
  careerProspectName: null;
}

interface CareerProspectItemPayload {
  id: number;
  careerProspectId: number;
  title: string;
  description: string;
  activeStatus: boolean;
  isDeleted: boolean;
}
