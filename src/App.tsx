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
      path: routes.setup.aboutUs,
      element: <AboutUs />,
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
