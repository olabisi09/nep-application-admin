interface Response {
  statusCode: number;
  message: string;
}

interface GetResponse extends Response {
  data: Setup[];
}

interface SocialMediaResponse extends Response {
  data: SocialMedia[];
}

interface Setup {
  id: number;
  title: string;
  description: string;
  figure: number;
  imageUrl: string;
  activeStatus: boolean;
  isDeleted: boolean;
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

interface SocialMedia {
  id: number;
  templateId: number;
  socialMediaName: string;
  socialMediaUrl: string;
  activeStatus: boolean;
  isDeleted: boolean;
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
  id?: number;
  statusName: string;
  activeStatus?: boolean;
}

interface CountryResponse extends Response {
  data: Country[];
}

interface Country {
  id?: number;
  countryName: string;
  activeStatus?: boolean;
}


interface GetByStudentLifeResponse extends GetResponse {
  data: ItemByStudentLife[];
  studentLifeId: number;
}

interface ItemByStudentLife {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
  studentLifeId: number;
  activeStatus: boolean;
  isDeleted: boolean;
}

interface ItemByStudentLifePayload extends SetupPayload {
  StudentLifeId: number | string;
}

interface GetTemplateResponse extends Response {
  data: Template[];
}

interface Template {
  id: number;
  schoolName: string;
  logoUrl: string;
  homePageImageUrl: string;
  aboutUsImageUrl: string;
  loginBackgroundImageUrl: string;
  schoolEmailAddress: string;
  schoolPhoneNumber: string;
  schoolAddress: string;
  activeStatus: boolean;
  isDeleted: boolean;
}

interface TemplatePayload {
  Id: number;
  SchoolName: string;
  Logo: any;
  HomePageImage: any;
  AboutUsImage: any;
  LoginBackgroundImage: any;
  SchoolEmailAddress: string;
  SchoolPhoneNumber: string;
  SchoolAddress: string;
  ActivStatus: boolean;
  IsDeleted: boolean;
}