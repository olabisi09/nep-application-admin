interface getall {
  code: number;
  message: string;
  data: Datum[];
}

interface Datum {
  categoryCode: string;
  programTypeCode: string;
  programCategoryCode: null;
  code: string;
  name: string;
  description: string;
  requirements: string;
  duration: string;
  qualification: string;
  careerProspect: string;
  tuition: string;
  curriculum: string;
  scholarship: string;
  userStory: string;
  accreditation: string;
  id: number;
  created: string;
  createdBy: null;
  activeStatus: boolean;
}

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

interface CreateProgramTypePayload {
  name: string;
  activeStatus: boolean;
}

interface EditProgramTypePayload extends CreateProgramTypePayload {
  id: number;

}
