import "./index.scss";

import { Route, Routes } from "react-router-dom";
import DashboardLayout from "./layouts/dashboardLayout/dashboardLayout";
import FacultySetUp from "./screens/setup/faculty/faculty";
import { routes } from "./routes";

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


  return (
    <Routes>
      <Route element={<DashboardLayout />}>
        {setupRoute.map((item) => (
          <Route key={item.path} path={item.path} element={item.element} />
        ))}
      </Route>

     
    </Routes>
  );
}

export default App;
