import { NavLink } from "react-router-dom";
import { ReactComponent as KwarafaLogo } from "../../assets/grid_view.svg";
import { ReactComponent as BioData } from "../../assets/grid_view.svg";
import { ReactComponent as Institute } from "../../assets/grid_view.svg";
import { ReactComponent as WorkHistory } from "../../assets/grid_view.svg";
import { ReactComponent as Payments } from "../../assets/grid_view.svg";
import { ReactComponent as Dashboard } from "../../assets/grid_view.svg";
import { ReactComponent as Logout } from "../../assets/grid_view.svg";
import styles from "./dashboardLayout.module.scss";
// import { logout } from "../utils/logout";
// import { useAtomValue } from "jotai";

const Sidebar = () => {
  return (
    <>
      <div className={styles.wrapper}>
        <KwarafaLogo className={styles.logo} />

        <span className={styles.name}>
          <p>KWARARAFA</p>
          <p>UNIVERSITY WAKARI</p>
        </span>
      </div>
      <nav className={styles.sidebarNav}>
        <NavLink
          className={({ isActive }) => (isActive ? styles.activeLink : "")}
          to={"/dashboard"}
        >
          <span>
            <Dashboard />
          </span>
          Dashboard
        </NavLink>
        <NavLink
          className={({ isActive }) => (isActive ? styles.activeLink : "")}
          to={"/bio-data"}
        >
          <span>
            <BioData />
          </span>
          Bio-data
        </NavLink>

        <NavLink
          className={({ isActive }) => (isActive ? styles.activeLink : "")}
          to={"/institute"}
        >
          <span>
            <Institute />
          </span>
          Institution
        </NavLink>
        <NavLink
          className={({ isActive }) => (isActive ? styles.activeLink : "")}
          to={"/qualification"}
        >
          <span>
            <Institute />
          </span>
          Qualification
        </NavLink>
        <NavLink
          className={({ isActive }) => (isActive ? styles.activeLink : "")}
          to={"/work-history"}
        >
          <span>
            <WorkHistory />
          </span>
          Work History
        </NavLink>
        <NavLink
          className={({ isActive }) => (isActive ? styles.activeLink : "")}
          to={"/payments"}
        >
          <span>
            {" "}
            <Payments />
          </span>
          Payments
        </NavLink>

        <NavLink
          className={({ isActive }) => (isActive ? styles.activeLink : "")}
          to={""}
          // onClick={logout}
          style={{ marginBlockStart: "10rem" }}
        >
          <span>
            {" "}
            <Logout />
          </span>
          Logout
        </NavLink>
      </nav>
    </>
  );
};

export default Sidebar;
