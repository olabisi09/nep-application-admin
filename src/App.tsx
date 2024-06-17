import "./index.scss";

import { Route, Routes } from "react-router-dom";
import DashboardLayout from "./layouts/dashboardLayout/dashboardLayout";
import FacultySetUp from "./screens/setup/faculty/faculty";
import { routes } from "./routes";
import AddUsers from "./screens/userManagement/user/addUsers";
import AdminRoles from "./screens/userManagement/role/adminRoles";

function App() {
  // const authRoute = [
  //   {
  //     path: routes.auth.login,
  //     element: <Login />,
  //   },
  //   {
  //     path: routes.auth.register,
  //     element: <Register />,
  //   },
  // ];

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
