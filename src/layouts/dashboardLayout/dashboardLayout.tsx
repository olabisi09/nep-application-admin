import { NavLink, Outlet, useLocation } from "react-router-dom";
import Header from "./header";
import Sidebar from "./sidebar";
import styles from "./dashboardLayout.module.scss";
import { Breadcrumb, Drawer } from "antd";
import { useState, memo } from "react";
import { breadcrumbNames } from "../../routes";
import { useScreenWidth } from "../../utils/useScreenWidth";

const DashboardLayout = () => {
  const location = useLocation();
  const { width: screenWidth } = useScreenWidth();
  const [openSidebar, setOpenSidebar] = useState(false);

  const handleOpen = () => setOpenSidebar(true);
  const handleClose = () => setOpenSidebar(false);

  const currentLocation = breadcrumbNames?.find((x) =>
    x.routes?.find((y) => y.path === location.pathname)
  );
  
  const currentRoute = currentLocation?.routes?.find(
    (x) => x.path === location.pathname
  );

  let breadcrumb = [
    {
      title: currentLocation?.title,
    },
    {
      title: (
        <NavLink
          className={({ isActive }) =>
            isActive ? styles.breadcrumbActive : ""
          }
          to={currentRoute?.path || ""}
        >
          {currentRoute?.title}
        </NavLink>
      ),
    },
  ];

  // if (currentRoute?.children) {
  //   currentRoute?.children?.forEach((x) => {
  //     breadcrumb.push({
  //       title: (
  //         <NavLink
  //           className={({ isActive }) =>
  //             isActive ? styles.breadcrumbActive : ""
  //           }
  //           to={x.path}
  //         >
  //           {x.title}
  //         </NavLink>
  //       ),
  //     });
  //   });
  // }

  return (
    <main className={styles.container}>
      <section className={styles.sidebar}>
        <Sidebar />
      </section>
      
      <Drawer
        onClose={handleClose}
        placement={"left"}
        open={openSidebar}
        width={screenWidth < 1024 ? "75%" : "22%"}
      >
        <Sidebar />
      </Drawer>
      
      <section className={styles.mainContent}>
        <Header handleOpenSidebar={handleOpen} />
        <div className={styles.children}>
          <Breadcrumb items={breadcrumb} />
          <Outlet />
        </div>
      </section>
    </main>
  );
};

export default memo(DashboardLayout);
