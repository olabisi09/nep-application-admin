import { Outlet } from "react-router-dom";
import Header from "./header";
import Sidebar from "./sidebar";
import styles from "./dashboardLayout.module.scss";
import { Drawer } from "antd";
import { useState } from "react";

const DashboardLayout = () => {
  const [openSidebar, setOpenSidebar] = useState(false);

  const handleOpen = () => setOpenSidebar(true);
  const handleClose = () => setOpenSidebar(false);

  return (
    <main className={styles.container}>
      <section className={styles.sidebar}>
        <Sidebar />
      </section>
      <Drawer
        placement={"left"}
        onClose={handleClose}
        open={openSidebar}
        width={"70%"}
      >
        <Sidebar />
      </Drawer>
      <section className={styles.mainContent}>
        <Header handleOpenSidebar={handleOpen} />
        <div className={styles.children}>
          <Outlet />
        </div>
      </section>
    </main>
  );
};

export default DashboardLayout;
