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
    // {
    //   path: routes.main.home,
    //   element: <Home />,
    // },
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
      <Route element={<AuthLayout />}>
        {authRoute.map((item) => (
          <Route key={item.path} path={item.path} element={item.element} />
        ))}
      </Route>
      <Route element={<DashboardLayout />}>
        {setupRoute.map((item) => (
          <Route key={item.path} path={item.path} element={item.element} />
        ))}
        {userMgtRoutes.map((item) => (
          <Route key={item.path} path={item.path} element={item.element} />
        ))}
      </Route>
    </Routes>
  );
}

export default App;
