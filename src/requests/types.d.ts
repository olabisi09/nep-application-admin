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
  figure: string;
  imageUrl: string;
  activeStatus: boolean;
  isDeleted: boolean;
  readMoreId: number;
  studentLifeId: string;
  image: any;
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
interface StateResponse extends Response {
  data: State[];
}

interface State {
  id: number;
  stateName: string;
  activeStatus?: boolean;
  countryId: string;
}
interface LGAResponse extends Response {
  data: LGA[];
}

interface LGA {
  id: number;
  stateId: number;
  lgaName: string;
  activeStatus?: boolean;
  countryId: number;
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
  id: number;
  readmoreId: number;
  description: string;
  activeStatus: boolean;
  isDeleted: boolean;
}

interface ScholarshipResponse extends Response {
  data: CommonPayload[];
}

interface Testimonial {
  id: number;
  readMoreId: number;
  image: any;
  imageUrl: string;
  description: string;
  activeStatus: boolean;
  isDeleted: boolean;
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

interface SchoolSummaryResponse extends GetResponse {
  data: SchoolSummary[];
}

interface SchoolSummary {
  id: number;
  title: string;
  figure: string;
  activeStatus: boolean;
  studentLifeId: number;
  isDeleted: boolean;
}

interface FitnessAthleticsResponse extends GetResponse {
  data: FitnessAthletics[];
}

interface FitnessAthletics {
  id: number;
  title: string;
  description: string;
  activeStatus: boolean;
  isDeleted: boolean;
  studentLifeId: number;
}
interface FAQ {
  id: number;
  name: string;
  description: string;
  activeStatus: boolean;
}

interface FaqResponse extends Response {
  data: FAQ;
}
interface FaqItemResponse extends Response {
  data: FaqItem[];
}
interface FaqItem {
  id: number;
  question: string;
  answer: string;
  faqId: number;
  activeStatus: boolean;
  isDeleted: boolean;
}
interface AccreditationResponse extends Response {
  data: AccreditationData[];
}

interface Accreditation extends Response {
  data: AdmissionRequirement;
}

interface AccreditationPayload extends AdmissionRequirement {}

interface AccreditationType {
  description: string;
  id: number;
  program: number;
  activeStatus: boolean;
  readMoreId: number;
}

interface AccreditationData {
  id: number;
  readMoreId: number;
  description: string;
  isDeleted: boolean;
  activeStatus: boolean;
  programName: string;
}

interface AccreditationSetup {
  Id: string;
  description: string;
}
interface CommonPayload {
  id: number;
  readmoreId: number;
  description: string;
  activeStatus: boolean;
  isDeleted: boolean;
}

interface ScholarshipResponse extends Response {
  data: CommonPayload[];
}

interface SupportAndGuidanceResponse extends FitnessAthleticsResponse {}
interface SupportAndGuidance extends FitnessAthletics {}

interface CommonPayload {
  id: number;
  readMoreId: number;
  description: string;
  activeStatus: boolean;
  isDeleted: boolean;
}

interface StudentActivityResponse extends Response {
  data: StudentActivity[];
}

interface StudentActivity {
  id: number;
  imageUrl: string;
  title: string;
  activityTitle: string;
  activityDescription: string;
  description: string;
  activeStatus: boolean;
  isDeleted: boolean;
  studentLifeId: number;
}

interface CareerProspectResponse extends Response {
  data: CareerProspect[];
}

interface CareerProspect {
  id: number;
  readMoreId: number;
  description: string;
  activeStatus: boolean;
  isDeleted: boolean;
  programName: string;
}

interface CampusExperienceItemResponse extends Response {
  data: CampusExperienceItem[];
}

interface CampusExperienceItem {
  id: number;
  campusExperienceId: number;
  description: string;
  activeStatus: boolean;
  isDeleted: boolean;
}

interface SupportGuidanceItemResponse extends Response {
  data: SupportGuidanceItem[];
}

interface SupportGuidanceItem {
  id: number;
  supportGuidanceId: number;
  title: string;
  description: string;
  activeStatus: boolean;
  isDeleted: boolean;
}

interface StudentActivitiesResponse extends Response {
  data: StudentActivities[];
}

interface StudentActivities extends FitnessAthletics {}

interface FitnessAthleticsItemResponse extends Response {
  data: FitnessAthleticsItem[];
}

interface FitnessAthleticsItem {
  id: number;
  fitnessId: number;
  title: string;
  description: string;
  activeStatus: boolean;
  isDeleted: boolean;
}

interface ApplicationFeeResponse extends Response {
  data: ApplicationFeePayload[];
}

interface ApplicationFee {
  id: number;
  modeOfStudyId: number;
  programId: number;
  programTypeId: number;
  amount: number;
  cost: number;
  activeStatus: boolean;
  isDeleted: boolean;
  programTypeId: number;
}

interface GetAllProgramApplicationFeeResponse extends Response {
  data: GetAllProgramApplicationFee[];
}

interface GetAllProgramApplicationFee {
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

interface ModeOfStudyResponse extends Response {
  data: ModeOfStudyPayload[];
}

interface ModeOfStudy {
  id: number;
  name: string;
  activeStatus: boolean;
  isDeleted: boolean;
}

interface FitnessImageResponse extends Response {
  data: FitnessImage[];
}

interface FitnessImage {
  id: number;
  imagePath: string;
  image: null;
  fitnessId: number;
  activeStatus: boolean;
  isDeleted: boolean;
}

interface CampusExperienceImageResponse extends Response {
  data: CampusExperienceImage[];
}

interface CampusExperienceImage {
  id: number;
  campusExperienceId: number;
  imageUrl: string;
  image: null;
  activeStatus: boolean;
  isDeleted: boolean;
}

interface SignInResponse extends Response {
  data: SignInData;
}

interface SignInData {
  token: string;
  expiration: string;
  role: string[];
  isNewApplicant: null;
  isNewUser: boolean;
  email: null;
  applicantId: string;
  isAdmin: boolean;
}

interface SignInPayload {
  email: string;
  password: string;
}

interface ForgotResponse extends Response {
  data: ForgotPayload;
}

interface ForgotPayload {
  email: string;
}

interface ResetResponse extends Response {
  data: ResetPayload;
}

interface ResetPayload {
  password: string;
  confirmPassword: string;
  email: string;
  token: string;
}

interface getAllFeeSetupResponse extends Response {
  data: getAllFeeSetup[];
}

interface getAllFeeSetup {
  id: number;
  modeOfStudyId: number;
  modeOfStudy: string;
  program: string;
  programId: number;
  amount: number;
  applicationBatchId: number;
  applicationBatchName: null;
  programTypeId: number;
  programTypeName: string;
  activeStatus: boolean;
  programTypeId: number;
  programTypeName: null | string;
  isDeleted: boolean;
}

interface applicationBatchResponse extends Response {
  data: getAllApplicationBatch[];
}

interface getAllApplicationBatch {
  id: number;
  batchName: string;
  sessionId: number;
  programId: number;
  lateStartDate: string;
  lateEndDate: string;
  startDate: string;
  endDate: string;
  isActive: boolean;
}

interface GetDepartmentsResponse extends Response {
  data: Department[];
}

interface Department {
  id: number;
  name: string;
  description: string;
  categoryId: number;
  categoryName: string;
  categoryCode: string;
  activeStatus: boolean;
  isDeleted: boolean;
}

interface ModeOfStudy {
  id: number;
  name: string;
  activeStatus: boolean;
  isDeleted: boolean;
}

interface ModeOfStudyResponse extends Response {
  data: ModeOfStudy[];
}
interface Title {
  id: number;
  titleName: string;
  activeStatus: boolean;
  isDeleted: boolean;
}
interface TitleResponse extends Response {
  data: Title[];
}

interface FacultyResponse {
  code: number;
  message: string;
  data: createOrUpdateFacultyPayload;
}

interface createOrUpdateFacultyPayload {
  id?: any;
  categoryCode: string;
  name: string;
  description: string;
}

interface DeleteFacultyPayload {
  Id: number;
}
interface GetFacultyResponse {
  code: number;
  message: string;
  data: FacultyResponse[];
}

interface FacultyResponse {
  categoryCode: string;
  name: string;
  description: string;
  id: number;
  created: string;
  createdBy: null;
  activeStatus: boolean;
}

interface DeleteFacultyResponse {
  code: number;
  message: string;
  data: null;
}

interface updateFacultyResponse {
  code: number;
  message: string;
  data: null;
}

interface UpdateFacultyPayload {
  id?: any;
  categoryCode: string;
  name: string;
  description: string;
}

interface CategoryPayload {
  categoryCode: string;
  name: string;
  description: string;
}
interface WhyResponse extends Response {
  data: Why;
}

interface Why {
  id: number;
  schoolName: string;
  activeStatus: boolean;
  isDeleted: boolean;
}

interface WhyItemResponse extends Response {
  data: WhyItem[];
}

interface WhyItem {
  id: number;
  whyId: number;
  name: string;
  description: string;
  iconUrl: string;
  activeStatus: boolean;
  isDeleted: boolean;
  description: string;
}

interface editFacultyResponse {
  code: number;
  message: string;
  data: null;
}

interface editFacultyPayload {
  id: number;
  categoryCode: string;
  name: string;
  description: string;
}

interface getAllProgramTypeResponse {
  code: number;
  message: string;
  data: getAllProgramType[];
}

interface getAllProgramType {
  name: string;
  id: number;
  created: string;
  createdBy: null;
  activeStatus: boolean;
}

interface RootObject {
  statusCode: number;
  message: string;
  data: Datum[];
}

interface Datum {
  id: number;
  modeOfStudyId: number;
  modeOfStudy: string;
  program: string;
  programId: number;
  amount: number;
  applicationBatchId: number;
  applicationBatchName: null | string;
  activeStatus: boolean;
  programTypeId: number;
  programTypeName: null | string;
  isDeleted: boolean;
}
