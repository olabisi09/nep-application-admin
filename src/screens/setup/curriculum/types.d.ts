interface CurriculumResponse extends Response {
  data: Curriculum[];
}

interface Curriculum {
  id: number;
  readmoreId: number;
  levelId: number;
  description: string;
  activeStatus: boolean;
  isDeleted: boolean;
  programName: string;
  levelName: string;
}

interface CurriculumPayload {
  id: number;
  readmoreId: number;
  levelId: number;
  description: string;
  activeStatus: boolean;
  isDeleted: boolean;
  programName: string;
}
