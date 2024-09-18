interface ProgramTypeResponse extends GenericResponse {
  data: ProgramType[];
}

interface ProgramType {
  name: string;
  id: number;
  created: string;
  createdBy: null;
  activeStatus: boolean;
}
