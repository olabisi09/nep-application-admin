import "./index.scss";

import { Route, Routes } from "react-router-dom";
import DashboardLayout from "./layouts/dashboardLayout/dashboardLayout";
import FacultySetUp from "./screens/setup/faculty/faculty";
import { routes } from "./routes";
import AddUsers from "./screens/userManagement/user/addUsers";
import AdminRoles from "./screens/userManagement/role/adminRoles";
import SignIn from "./screens/auth/signIn";
import AuthLayout from "./layouts/authLayout/authLayout";
import ForgotPassword from "./screens/auth/forgotPassword";
import ResetPassword from "./screens/auth/resetPassword";
import AboutUs from "./screens/setup/aboutUs/aboutUs";
import Faq from "./screens/setup/faq/faq";
import History from "./screens/setup/history/history";
import SchoolInfoTemplate from "./screens/setup/schoolInfoTemplate/schoolInfoTemplate";
import WhySchool from "./screens/setup/whySchool/whySchool";
import SchoolForm from "./screens/setup/form/form";
import SocialMedia from "./screens/setup/socialMedia/socialMedia";
import StudentLife from "./screens/setup/studentLife/studentLife";
import NewsAndEvents from "./screens/setup/newsAndEvents/newsAndEvents";

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
      path: routes.setup.facultySetup,
      element: <FacultySetUp />,
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
