import "./index.scss";

import { Route, Routes } from "react-router-dom";
import DashboardLayout from "./layouts/dashboardLayout/dashboardLayout";
import FacultySetUp from "./screens/setup/faculty/faculty";
import DepartmentSetup from "./screens/setup/department/department";
import ProgramSetup from "./screens/setup/program/program";
import ReadMoreProgramSetup from "./screens/setup/readMoreProgram/readMoreProgram";
import ReadMoreCourseSetup from "./screens/setup/readMoreCourse/readMoreCourse";
import ReadMoreAdmissionRequirementSetup from "./screens/setup/readMoreAdmissionRequirement/admissionRequirement";
import CareerProspectsSetup from "./screens/setup/careerProspects/careerProspects";
import SessionSetup from "./screens/setup/session/session";
import ModeOfStudySetup from "./screens/setup/modeOfStudy/modeOfStudy";
import ApplicationFeeSetup from "./screens/setup/applicationFeeSetup/applicationFee";
import TuitionFeeSetup from "./screens/setup/tuition/tuition";
import TuitionYearsSetup from "./screens/setup/tuitionYear/tuitionYears";
import LevelSetup from "./screens/setup/level/level";

import { routes } from "./routes";
import AddUsers from "./screens/userManagement/user/addUsers";
import AdminRoles from "./screens/userManagement/role/adminRoles";
import SignIn from "./screens/auth/signIn";
import AuthLayout from "./layouts/authLayout/authLayout";
import ForgotPassword from "./screens/auth/forgotPassword";
import ResetPassword from "./screens/auth/resetPassword";
import AboutUs from "./screens/setup/aboutUs/aboutUs";
import CurriculumSetup from "./screens/setup/curriculum/curriculum";
import ScholarShip from "./screens/setup/scholarship/scholarship";
import TestimonySetup from "./screens/setup/testimonial/testimonial";
import AccreditationSetup from "./screens/setup/accreditation/accreditation";
import QualificationTypeSetup from "./screens/setup/qualificationType/qualificationType";
import SubjectSetup from "./screens/setup/subject/subject";
import CountrySetup from "./screens/setup/biodata/country/country";
import StateSetup from "./screens/setup/biodata/state/state";
import LgaSetup from "./screens/setup/biodata/lga/lga";
import GenderSetup from "./screens/setup/biodata/gender/gender";
import TitleSetup from "./screens/setup/biodata/title/title";
import MaritalSetup from "./screens/setup/biodata/maritalStatus/maritalStatus";
import Faq from "./screens/setup/faq/faq";
import History from "./screens/setup/history/history";
import SchoolInfoTemplate from "./screens/setup/schoolInfoTemplate/schoolInfoTemplate";
import WhySchool from "./screens/setup/whySchool/whySchool";
import SchoolForm from "./screens/setup/form/form";
import SocialMedia from "./screens/setup/socialMedia/socialMedia";
import StudentLife from "./screens/setup/studentLife/studentLife";
import NewsAndEvents from "./screens/setup/newsAndEvents/newsAndEvents";
import SchoolMgt from "./screens/setup/schoolMgt/schoolMgt";
import Overview from "./screens/setup/studentLife/overview/overview";
import SchoolSummary from "./screens/setup/studentLife/schoolSummary/schoolSummary";
import FitnessAndAthletics from "./screens/setup/studentLife/fitnessAndAthletics.tsx/fitnessAndAthletics";
import SupportAndGuidance from "./screens/setup/studentLife/supportAndGuidance/supportAndGuidance";
import StudentActivities from "./screens/setup/studentLife/studentActivities/studentActivities";
import CareerProspectItems from "./screens/setup/careerProspects/careerProspectItems/careerProspectItems";

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
      path: routes.setup.program,
      element: <ProgramSetup />,
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
      path: routes.setup.supportAndGuidance,
      element: <SupportAndGuidance />,
    },
    {
      path: routes.setup.studentActivities,
      element: <StudentActivities />,
    },
    {
      path: routes.setup.careerProspectItems,
      element: <CareerProspectItems />,
    },
  ];

  const userMgtRoutes = [
    {
      path: routes.userMgt.addUsers,
      element: <AddUsers />,
    },
    {
      path: routes.userMgt.addRoles,
      element: <AdminRoles />,
    },
  ];

  return (
    <Routes>
      <Route path="*" element={<SignIn />} />
      <Route element={<AuthLayout />}>
        {authRoute.map((item) => (
          <Route key={item.path} path={item.path} element={item.element} />
        ))}
      </Route>
      <Route element={<DashboardLayout />}>
        {userMgtRoutes.concat(setupRoute).map((item) => (
          <Route key={item.path} path={item.path} element={item.element} />
        ))}
      </Route>
    </Routes>
  );
}

export default App;
