import { NavLink } from "react-router-dom";
import { ReactComponent as KwarafaLogo } from "../../assets/logo.svg";
import { ReactComponent as Settings } from "../../assets/settings.svg";
import { ReactComponent as Line } from "../../assets/line.svg";
import { ReactComponent as Logout } from "../../assets/logout.svg";
import styles from "./dashboardLayout.module.scss";
import { Menu } from "antd";

const Sidebar = () => {
  const items = [
    {
      key: "userManagement",
      label: "User Management",
      icon: <Settings />,
      children: [
        { key: "addUsers", label: <a href="/">Add Users</a>, icon: <Line /> },
        { key: "addRoles", label: "Add Roles", icon: <Line /> },
      ],
    },
    {
      key: "biodata",
      label: "Setup Bio-Data",
      icon: <Settings />,
      children: [
        { key: "addTitle", label: "Add Title", icon: <Line /> },
        { key: "addGender", label: "Add Gender", icon: <Line /> },
        {
          key: "addMaritalStatus",
          label: "Add Marital Status",
          icon: <Line />,
        },
        { key: "addCountry", label: "Add Country", icon: <Line /> },
        { key: "addState", label: "Add State", icon: <Line /> },
        { key: "addLGA", label: "Add LGA", icon: <Line /> },
      ],
    },
    {
      key: "programs",
      label: "Setup Programs",
      icon: <Settings />,
      children: [
        { key: "faculty", label: "Faculty", icon: <Line /> },
        { key: "department", label: "Department", icon: <Line /> },
        { key: "program", label: "Program", icon: <Line /> },
        {
          key: "readMoreProgram",
          label: "Read More - Program",
          icon: <Line />,
        },
        {
          key: "readMoreCourse",
          label: "Read More -Course Overview",
          icon: <Line />,
        },
        {
          key: "admissionRequirements",
          label: "Admission Requirements",
          icon: <Line />,
        },
      ],
    },
    {
      key: "schoolInfo",
      label: "Setup School Info",
      icon: <Settings />,
      children: [
        { key: "aboutUs", label: "About Us", icon: <Settings /> },
        { key: "whyUs", label: "Why Us", icon: <Settings /> },
        { key: "faq", label: "FAQ", icon: <Settings /> },
        { key: "newsAndEvents", label: "News & Events", icon: <Settings /> },
        { key: "history", label: "History", icon: <Settings /> },
        { key: "schoolMgt", label: "School Mgt", icon: <Settings /> },
      ],
    },
  ];
  return (
    <>
      <section>
        <div className={styles.wrapper}>
          <KwarafaLogo />
          <span className={styles.name}>
            <p>KWARARAFA</p>
          </span>
        </div>
        <div className={styles.menuItems}>
          <Menu items={items} mode="inline" inlineIndent={0} />
        </div>
      </section>
      <button className={styles.logout}>
        <Logout />
        <p className={styles.end}>Logout</p>
      </button>
    </>
  );
};

export default Sidebar;
