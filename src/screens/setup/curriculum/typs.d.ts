export interface CurriculumResponse extends Response {
  data: Curriculum[];
}

export interface Curriculum {
  id: number;
  readmoreId: number;
  levelId: number;
  description: string;
  activeStatus: boolean;
  isDeleted: boolean;
  programName: string;
  levelName: string;
}

export interface CurriculumPayload {
  id: number;
  readmoreId: number;
  levelId: number;
  description: string;
  activeStatus: boolean;
  isDeleted: boolean;
  programName: string;
}
