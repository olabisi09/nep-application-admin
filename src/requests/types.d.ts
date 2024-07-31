interface Response {
  statusCode: number;
  message: string;
}

interface AboutUsResponse extends Response {
  data: AboutUs[];
}

interface AboutUs {
  id: number;
  title: string;
  description: string;
  image?: any;
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
  data: Gender[]
}

interface Gender {
  id: number;
  genderName: string;
activeStatus: boolean;
}
interface MaritalStatusResponse extends Response {
  data: MaritalStatus[]
}

interface MaritalStatus {
  id?: number;
  statusName: string;
activeStatus?: boolean;
}

interface CountryResponse extends Response {
  data: Country[]
}

interface Country {
  id?: number;
  countryName: string;
activeStatus?: boolean;
}
