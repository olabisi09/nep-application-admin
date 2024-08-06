interface Response {
  statusCode: number;
  message: string;
}

interface GetResponse extends Response {
  data: Setup[];
}

interface Setup {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
  activeStatus: boolean;
  isDeleted: boolean;
}

interface GeneralTemplate {
  id: number;
  schoolName: string;
  logo: string;
  logoUrl: string;
  homePageImage: string;
  homePageImageUrl: string;
  aboutUsImage: string;
  aboutUsImageUrl: string;
  loginBackgroundImage: string;
  loginBackgroundImageUrl: string;
  schoolEmailAddress: string;
  schoolPhoneNumber: string;
  schoolAddress: string;
  activeStatus: boolean;
  isDeleted: boolean;
}

interface GeneralTemplateResponse extends Response {
  data: GeneralTemplate[];
}

interface GenderResponse extends Response {
  data: Gender[];
}

interface Gender {
  id: number;
  genderName: string;
  activeStatus: boolean;
}
interface MaritalStatusResponse extends Response {
  data: MaritalStatus[];
}

interface MaritalStatus {
  id: number;
  statusName: string;
  activeStatus?: boolean;
}

interface CountryResponse extends Response {
  data: Country[];
}

interface Country {
  id: number;
  countryName: string;
  activeStatus?: boolean;
}
interface StateResponse extends Response {
  data: State[];
}

interface State {
  id: number;
  stateName: string;
  activeStatus?: boolean;
  countryName: string;
}
interface LGAResponse extends Response {
  data: LGA[];
}

interface LGA {
  id: number;
  stateId: string;
  lgaName: string;
  activeStatus?: boolean;
  countryId: string;
}
interface QualificationTypeResponse extends Response {
  data: QualificationType[];
}

interface QualificationType {
  id: number;
  qualificationType: string;
  activeStatus?: boolean;
}
interface SetupPayload {
  Id: number;
  Title: string;
  Description: string;
  ImageUrl: string;
  Image: any;
  ActiveStatus: boolean;
  IsDeleted: boolean;
}
