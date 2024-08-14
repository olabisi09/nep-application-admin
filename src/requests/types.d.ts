interface Response {
  statusCode: number;
  message: string;
}

interface GetResponse extends Response {
  data: Setup[];
}

interface AboutUs {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
  activeStatus: boolean;
  isDeleted: boolean;
}

interface SessionResponse extends Response {
  data: Session[];
}

interface Session {
  id: number;
  name: string;
  activeStatus: boolean;
  isDeleted: boolean;
}

interface CategoryResponse extends Response {
  data: Category[];
}

interface Category {
  categoryCode: string;
  name: string;
  description: string;
  id: number;
  created: string;
  createdBy: any;
  activeStatus: boolean;
}

interface LevelResponse extends Response {
  data: Level[];
}

interface Level {
  id: number;
  levelName: string;
  isActive: boolean;
  isDeleted: boolean;
}

interface TuitionResponse extends Response {
  data: Tuition[];
}

interface Tuition {
  id: number;
  readmoreId: number;
  description: string;
  activeStatus: boolean;
}

interface TuitionYearResponse extends Response {
  data: TuitionYear[];
}

interface TuitionYear {
  id: number;
  tuitionId: number;
  levelId: number;
  readmoreId: number;
  feeDescription: string;
  isActive: boolean;
  isDeleted: boolean;
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
  readMoreId: number;
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
  qualificationName: string;
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

interface SocialMediaLink {
  id: number;
  templateId: number;
  socialMediaName: string;
  socialMediaUrl: string;
  socialMediaLogo: any;
  socialMediaLogoUrl: string;
  activeStatus: boolean;
  isDeleted: boolean;
}

interface SocialMediaLinkResponse extends Response {
  data: SocialMediaLink[];
}
interface AdmissionRequirement {
  activeStatus: boolean;
  description: string;
  id: number;
  isDeleted: boolean;
  readMoreId: number;
}
interface AdmissionRequirementResponse extends Response {
  data: AdmissionRequirement[];
}
interface Program {
  categoryCode: string;
  programTypeCode: string;
  programCategoryCode: any;
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
  createdBy: any;
  activeStatus: boolean;
}
interface ProgramResponse extends Response {
  data: Program[];
}

interface CommonPayload {
  id: number
  readmoreId: number
  description: string
  activeStatus: boolean
  isDeleted: boolean
}

interface ScholarshipResponse extends Response {
  data: CommonPayload[];
}

interface Testimonial {
  id: number
  readMoreId: number
  image: any
  imageUrl: string
  description: string
  activeStatus: boolean
  isDeleted: boolean
}

interface TestimonialResponse extends Response {
  data: Testimonial[];
}

interface OverviewResponse extends GetResponse {
  data: Overview[];
  studentLifeId: number;
}

interface Overview {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
  studentLifeId: number;
  activeStatus: boolean;
  isDeleted: boolean;
}
interface FAQ {
  id:number;
  name: string;
  description: string;
  activeStatus: boolean;
}

interface FaqResponse extends Response {
  data: FAQ[];
}
interface AccreditationResponse extends AdmissionRequirementResponse {}

interface Accreditation extends Response {
  data: AdmissionRequirement;
}

interface AccreditationType {
  status: string;
  description: string;
  id: number;
  program: number;
}

interface AccreditationSetup {
  Id: string;
  description: string;
}

interface ModeOfStudy{
  id: number,
  name: string,
  activeStatus: boolean,
  isDeleted: boolean
}

interface ModeOfStudyResponse extends Response {
  data: ModeOfStudy[];
}
