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
