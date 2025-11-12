import './index.scss';

import { Route, Routes } from 'react-router-dom';

import ProtectedRoute from './hooks/protectedRoutes';
import AuthLayout from './layouts/authLayout/authLayout';
import DashboardLayout from './layouts/dashboardLayout/dashboardLayout';
import { routes } from './routes';
import ForgotPassword from './screens/auth/forgotPassword';
import ResetPassword from './screens/auth/resetPassword';
import SignIn from './screens/auth/signIn';
import AboutUs from './screens/setup/aboutUs/aboutUs';
import AccreditationSetup from './screens/setup/accreditation/accreditation';
import ApplicationBatchSetup from './screens/setup/applicationBatch/applicationBatch';
import ApplicationFeeSetup from './screens/setup/applicationFeeSetup/applicationFee';
import CountrySetup from './screens/setup/biodata/country/country';
import DisabilitySetup from './screens/setup/biodata/disability/disability';
import GenderSetup from './screens/setup/biodata/gender/gender';
import LgaSetup from './screens/setup/biodata/lga/lga';
import MaritalSetup from './screens/setup/biodata/maritalStatus/maritalStatus';
import ReligionSetup from './screens/setup/biodata/religion/religion';
import StateSetup from './screens/setup/biodata/state/state';
import TitleSetup from './screens/setup/biodata/title/title';
import CareerProspectItems from './screens/setup/careerProspects/careerProspectItems/careerProspectItems';
import CareerProspectsSetup from './screens/setup/careerProspects/careerProspects';
import ContactUs from './screens/setup/contactUs/contactUs';
import CurriculumSetup from './screens/setup/curriculum/curriculum';
import DepartmentSetup from './screens/setup/department/department';
import DiscountFee from './screens/setup/discount';
import DisplayTabSetup from './screens/setup/displayTab.tsx/displayTab';
import ExploreProgrammes from './screens/setup/exploreProgrammes/exploreProgrammes';
import FacultySetUp from './screens/setup/faculty/faculty';
import Faq from './screens/setup/faq/faq';
import FaqItem from './screens/setup/faq/faqItem/faqItem';
import SchoolForm from './screens/setup/form/form';
import GradeSetUp from './screens/setup/grade/grade';
import History from './screens/setup/history/history';
import LevelSetup from './screens/setup/level/level';
import ModeOfStudySetup from './screens/setup/modeOfStudy/modeOfStudy';
import NewsAndEvents from './screens/setup/newsAndEvents/newsAndEvents';
import ProgramSetUp from './screens/setup/program/program';
import ProgramSetup from './screens/setup/programType/programType';
import QualificationTypeSetup from './screens/setup/qualificationType/qualificationType';
import ReadMoreAdmissionRequirementSetup from './screens/setup/readMoreAdmissionRequirement/admissionRequirement';
import AdmissionReqDetail from './screens/setup/readMoreAdmissionRequirement/admissionRequirementDetail/admissionReqDetail';
import ReadMoreCourseSetup from './screens/setup/readMoreCourse/readMoreCourse';
import ReadMoreProgramSetup from './screens/setup/readMoreProgram/readMoreProgram';
import ScholarShip from './screens/setup/scholarship/scholarship';
import SchoolID from './screens/setup/schoolIDConfig/schoolIDConfig';
import SchoolInfoTemplate from './screens/setup/schoolInfoTemplate/schoolInfoTemplate';
import SchoolMgt from './screens/setup/schoolMgt/schoolMgt';
import SessionSetup from './screens/setup/session/session';
import SocialMedia from './screens/setup/socialMedia/socialMedia';
import CampusExperience from './screens/setup/studentLife/campusExperience/campusExperience';
import CampusExperienceImages from './screens/setup/studentLife/campusExperience/items/campusExperienceImage';
import CampusExperienceItem from './screens/setup/studentLife/campusExperience/items/campusExperienceItem';
import FitnessAndAthletics from './screens/setup/studentLife/fitnessAndAthletics.tsx/fitnessAndAthletics';
import FitnessAthleticsItem from './screens/setup/studentLife/fitnessAndAthletics.tsx/items/fitnessAthleticsItem';
import FitnessAthleticsImages from './screens/setup/studentLife/fitnessAndAthletics.tsx/items/fitnessImages';
import Overview from './screens/setup/studentLife/overview/overview';
import SchoolSummary from './screens/setup/studentLife/schoolSummary/schoolSummary';
import StudentActivityItem from './screens/setup/studentLife/studentActivities/item/studentActivities';
import StudentActivity from './screens/setup/studentLife/studentActivities/studentActivity';
import StudentLife from './screens/setup/studentLife/studentLife';
import SupportGuidanceItem from './screens/setup/studentLife/supportAndGuidance/items/supportGuidanceItem';
import SupportAndGuidance from './screens/setup/studentLife/supportAndGuidance/supportAndGuidance';
import SubjectSetup from './screens/setup/subject/subject';
import TabSetUp from './screens/setup/tab/tab';
import TestimonySetup from './screens/setup/testimonial/testimonial';
import TuitionFeeSetup from './screens/setup/tuition/tuition';
import TuitionYearsSetup from './screens/setup/tuitionYear/tuitionYears';
import WhyItem from './screens/setup/whySchool/whyItem/whyItem';
import WhySchool from './screens/setup/whySchool/whySchool';
import StudentUser from './screens/userManagement/user/users';

function App() {
  const authRoute = [
    {
      path: routes.auth.login,
      element: <SignIn />,
    },
    {
      path: routes.auth.forgotPassword,
      element: <ForgotPassword />,
    },
    {
      path: routes.auth.resetPassword,
      element: <ResetPassword />,
    },
  ];

  const setupRoute = [
    {
      path: routes.setup.faculty,
      element: <FacultySetUp />,
    },
    {
      path: routes.setup.department,
      element: <DepartmentSetup />,
    },
    {
      path: routes.setup.programType,
      element: <ProgramSetup />,
    },
    {
      path: routes.setup.program,
      element: <ProgramSetUp />,
    },
    {
      path: routes.setup.readMoreProgram,
      element: <ReadMoreProgramSetup />,
    },
    {
      path: routes.setup.readMoreCourse,
      element: <ReadMoreCourseSetup />,
    },
    {
      path: routes.setup.readMoreAdmissionRequirement,
      element: <ReadMoreAdmissionRequirementSetup />,
    },
    {
      path: routes.setup.careerProspects,
      element: <CareerProspectsSetup />,
    },
    {
      path: routes.setup.session,
      element: <SessionSetup />,
    },
    {
      path: routes.setup.modeOfStudy,
      element: <ModeOfStudySetup />,
    },
    {
      path: routes.setup.applicationFee,
      element: <ApplicationFeeSetup />,
    },
    {
      path: routes.setup.discountFee,
      element: <DiscountFee />,
    },
    {
      path: routes.setup.tuitionFee,
      element: <TuitionFeeSetup />,
    },
    {
      path: routes.setup.level,
      element: <LevelSetup />,
    },
    {
      path: routes.setup.tuitionYears,
      element: <TuitionYearsSetup />,
    },
    {
      path: routes.setup.curriculum,
      element: <CurriculumSetup />,
    },
    {
      path: routes.setup.scholarship,
      element: <ScholarShip />,
    },
    {
      path: routes.setup.testimony,
      element: <TestimonySetup />,
    },
    {
      path: routes.setup.accreditation,
      element: <AccreditationSetup />,
    },
    {
      path: routes.setup.qualification,
      element: <QualificationTypeSetup />,
    },
    {
      path: routes.setup.subject,
      element: <SubjectSetup />,
    },

    {
      path: routes.setup.country,
      element: <CountrySetup />,
    },
    {
      path: routes.setup.state,
      element: <StateSetup />,
    },
    {
      path: routes.setup.lga,
      element: <LgaSetup />,
    },
    {
      path: routes.setup.gender,
      element: <GenderSetup />,
    },
    {
      path: routes.setup.title,
      element: <TitleSetup />,
    },
    {
      path: routes.setup.maritalStatus,
      element: <MaritalSetup />,
    },
    {
      path: routes.setup.disability,
      element: <DisabilitySetup />,
    },
    {
      path: routes.setup.religion,
      element: <ReligionSetup />,
    },
    {
      path: routes.setup.aboutUs,
      element: <AboutUs />,
    },
    {
      path: routes.setup.faq,
      element: <Faq />,
    },
    {
      path: routes.setup.history,
      element: <History />,
    },
    {
      path: routes.setup.schoolInfo,
      element: <SchoolInfoTemplate />,
    },
    {
      path: routes.setup.whyUs,
      element: <WhySchool />,
    },
    {
      path: routes.setup.form,
      element: <SchoolForm />,
    },
    {
      path: routes.setup.socialMedia,
      element: <SocialMedia />,
    },
    {
      path: routes.setup.studentLife,
      element: <StudentLife />,
    },
    {
      path: routes.setup.newsAndEvents,
      element: <NewsAndEvents />,
    },
    {
      path: routes.setup.schoolMgt,
      element: <SchoolMgt />,
    },
    {
      path: routes.setup.overview,
      element: <Overview />,
    },
    {
      path: routes.setup.schoolSummary,
      element: <SchoolSummary />,
    },
    {
      path: routes.setup.fitnessAndAthletics,
      element: <FitnessAndAthletics />,
    },
    {
      path: routes.setup.fitnessAndAthleticsItem,
      element: <FitnessAthleticsItem />,
    },
    {
      path: routes.setup.fitnessAndAthleticsImage,
      element: <FitnessAthleticsImages />,
    },
    {
      path: routes.setup.supportAndGuidance,
      element: <SupportAndGuidance />,
    },
    {
      path: routes.setup.studentActivities,
      element: <StudentActivity />,
    },
    {
      path: routes.setup.studentActivitiesItem,
      element: <StudentActivityItem />,
    },
    {
      path: routes.setup.careerProspectItems,
      element: <CareerProspectItems />,
    },
    {
      path: routes.setup.faqItem,
      element: <FaqItem />,
    },
    {
      path: routes.setup.campusExperience,
      element: <CampusExperience />,
    },
    {
      path: routes.setup.campusExperienceItem,
      element: <CampusExperienceItem />,
    },
    {
      path: routes.setup.campusExperienceImage,
      element: <CampusExperienceImages />,
    },
    {
      path: routes.setup.supportAndGuidanceItem,
      element: <SupportGuidanceItem />,
    },
    {
      path: routes.setup.admissionRequirementDetail,
      element: <AdmissionReqDetail />,
    },
    {
      path: routes.setup.whyItems,
      element: <WhyItem />,
    },
    {
      path: routes.setup.exploreProgrammes,
      element: <ExploreProgrammes />,
    },
    {
      path: routes.userMgt.addSchoolId,
      element: <SchoolID />,
    },

    {
      path: routes.userMgt.contactUs,
      element: <ContactUs />,
    },

    {
      path: routes.userMgt.users,
      element: <StudentUser />,
    },
    {
      path: routes.setup.applicationBatch,
      element: <ApplicationBatchSetup />,
    },
    {
      path: routes.setup.grade,
      element: <GradeSetUp />,
    },
    {
      path: routes.setup.tab,
      element: <TabSetUp />,
    },
    {
      path: routes.setup.DisplayTabSetup,
      element: <DisplayTabSetup />,
    },
  ];

  // const userMgtRoutes = [
  //   {
  //     path: routes.userMgt.addUsers,
  //     element: <AddUsers />,
  //   },
  //   {
  //     path: routes.userMgt.addRoles,
  //     element: <AdminRoles />,
  //   },

  //   {
  //     path: routes.userMgt.addSchoolId,
  //     element: <SchoolID />,
  //   },
  //   {
  //     path: routes.userMgt.contactUs,
  //     element: <ContactUs />,
  //   },
  // ];

  return (
    <Routes>
      <Route path="*" element={<SignIn />} />
      <Route element={<AuthLayout />}>
        {authRoute.map((item) => (
          <Route key={item.path} path={item.path} element={item.element} />
        ))}
      </Route>

      <Route element={<DashboardLayout />}>
        {setupRoute.map((item) => (
          <Route key={item.path} path={item.path} element={<ProtectedRoute>{item.element}</ProtectedRoute>} />
        ))}
      </Route>

      {/* <Routes>
        <Route element={<AuthLayout />}>
          {authRoute.map((item) => (
            <Route
              key={item.path}
              path={item.path}
              element={<ProtectedRoute>{item.element}</ProtectedRoute>}
            />
          ))}
        </Route>
      </Routes> */}
    </Routes>
  );
}

export default App;
