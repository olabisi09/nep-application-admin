import { NavLink, Outlet } from "react-router-dom";
import Header from "./header";
import Sidebar from "./sidebar";
import styles from "./dashboardLayout.module.scss";
import { Breadcrumb, Drawer } from "antd";
import { useState, memo } from "react";

const DashboardLayout = () => {
  const [openSidebar, setOpenSidebar] = useState(false);

  const handleOpen = () => setOpenSidebar(true);
  const handleClose = () => setOpenSidebar(false);

  const breadcrumb = [
    {
      title: "User Management",
    },
    {
      title: (
        <NavLink
          className={({ isActive }) =>
            isActive ? styles.breadcrumbActive : ""
          }
          to="/admin-users"
        >
          Admin Users
        </NavLink>
      ),
    },
  ];

  return (
    <main className={styles.container}>
      <section className={styles.sidebar}>
        <Sidebar />
      </section>
      <Drawer
        onClose={handleClose}
        placement={"left"}
        open={openSidebar}
        width={"70%"}
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
