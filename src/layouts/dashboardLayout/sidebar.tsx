import { Menu } from "antd";
import { NavLink } from "react-router-dom";

import { ReactComponent as KwarafaLogo } from "../../assets/logo.svg";
import { ReactComponent as Settings } from "../../assets/settings.svg";
import { ReactComponent as Line } from "../../assets/line.svg";
import { ReactComponent as Logout } from "../../assets/logout.svg";
import { ReactComponent as Arrow } from "../../assets/menu-arrow.svg";

import styles from "./dashboardLayout.module.scss";
import { logout } from "../../utils/logout";
import { routes } from "../../routes";
import { icons } from "ckeditor5";

const Sidebar = () => {
  const items = [
    {
      key: "userManagement",
      label: "User Management",
      icon: <Settings />,
      children: [
        {
          key: "users",
          label: <NavLink to={routes.userMgt.users}>Applicants</NavLink>,
          icon: <Line />,
        },
        // {
        //   key: "addUsers",
        //   label: <NavLink to="/admin-users">Add Users</NavLink>,
        //   icon: <Line />,
        // },
        // {
        //   key: "addRoles",
        //   label: <NavLink to="/admin-roles">Add Roles</NavLink>,
        //   icon: <Line />,
        // },
        {
          key: "contactUs",
          label: (
            <NavLink to={routes.userMgt.contactUs}>Contact Feed Back</NavLink>
          ),
          icon: <Line />,
        },
        {
          key: "schoolId",
          label: (
            <NavLink to={routes.userMgt.addSchoolId}>Add School ID</NavLink>
          ),
          icon: <Line />,
        },
      ],
    },
    {
      key: "biodata",
      label: "Setup Bio-Data",
      icon: <Settings />,
      children: [
        {
          key: "addTitle",
          label: <NavLink to="/title-setup">Add Title</NavLink>,
          icon: <Line />,
        },
        {
          key: "addDisability",
          label: <NavLink to="/disability-setup">Add Disability</NavLink>,
          icon: <Line />,
        },
        {
          key: "addReligion",
          label: <NavLink to="/religion-setup">Add Religion</NavLink>,
          icon: <Line />,
        },
        {
          key: "addGender",
          label: <NavLink to="/gender-setup">Add Gender</NavLink>,
          icon: <Line />,
        },
        {
          key: "addMaritalStatus",
          label: (
            <NavLink to="/marital-status-setup">Add Marital Status</NavLink>
          ),
          icon: <Line />,
        },
        {
          key: "addCountry",
          label: <NavLink to="/country-setup">Add Country</NavLink>,
          icon: <Line />,
        },
        {
          key: "addState",
          label: <NavLink to="/state-setup">Add State</NavLink>,
          icon: <Line />,
        },
        {
          key: "addLGA",
          label: <NavLink to="/lga-setup">Add LGA</NavLink>,
          icon: <Line />,
        },
      ],
    },
    {
      key: "programs",
      label: "Setup Programs",
      icon: <Settings />,
      children: [
        {
          key: "faculty",
          label: <NavLink to="/faculty-setup">Faculty</NavLink>,
          icon: <Line />,
        },
        {
          key: "department",
          label: <NavLink to="/department-setup">Department</NavLink>,
          icon: <Line />,
        },
        {
          key: "program",
          label: <NavLink to="/program-setup">Program</NavLink>,
          icon: <Line />,
        },
        {
          key: "programType",
          label: <NavLink to="/program-type-setup">Program Type</NavLink>,
          icon: <Line />,
        },
        {
          key: "applicationBatch",
          label: (
            <NavLink to={routes.setup.applicationBatch}>
              Application Batch
            </NavLink>
          ),
          icon: <Line />,
        },
        {
          key: "readMoreProgram",
          label: (
            <NavLink to="/read-more-program-setup">Read More - Program</NavLink>
          ),
          icon: <Line />,
        },
        {
          key: "readMoreCourse",
          label: (
            <NavLink to="/read-more-course-overview-setup">
              Read More -Course Overview
            </NavLink>
          ),
          icon: <Line />,
        },
        {
          key: "admissionRequirements",
          label: (
            <NavLink to="/read-more-admission-requirement-setup">
              Admission Requirements
            </NavLink>
          ),
          icon: <Line />,
        },
        {
          key: "careerProspects",
          label: (
            <NavLink to="/career-prospects-setup">Career Prospects</NavLink>
          ),
          icon: <Line />,
        },
        {
          key: "sessionSetup",
          label: <NavLink to="/session-setup">Session</NavLink>,
          icon: <Line />,
        },
        {
          key: "modeOfStudy",
          label: <NavLink to="/mode-of-study-setup">Mode Of Study</NavLink>,
          icon: <Line />,
        },
        {
          key: "applicationFee",
          label: <NavLink to="/application-setup">Application Fee</NavLink>,
          icon: <Line />,
        },
        {
          key: "tuitionFee",
          label: <NavLink to="/tuition-fee-setup">Tuition Fee</NavLink>,
          icon: <Line />,
        },
        {
          key: "level",
          label: <NavLink to="/level-setup">Level</NavLink>,
          icon: <Line />,
        },
        {
          key: "tuitionYears",
          label: <NavLink to="/tuition-Years-setup">Tuition Years</NavLink>,
          icon: <Line />,
        },
        {
          key: "curriculum",
          label: <NavLink to="/curriculum-setup">Curriculum</NavLink>,
          icon: <Line />,
        },
        {
          key: "scholarship",
          label: <NavLink to="/scholarship-setup">Scholarship</NavLink>,
          icon: <Line />,
        },
        {
          key: "testimonial",
          label: <NavLink to="/testimonial-setup">Testimonial</NavLink>,
          icon: <Line />,
        },
        {
          key: "accreditation",
          label: <NavLink to="/accreditation-setup">Accreditation</NavLink>,
          icon: <Line />,
        },
        {
          key: "qualificationType",
          label: (
            <NavLink to="/qualification-type-setup">Qualification Type</NavLink>
          ),
          icon: <Line />,
        },
        {
          key: "subject",
          label: <NavLink to="/subject-setup">Subject</NavLink>,
          icon: <Line />,
        },
        {
          key: "grade",
          label: <NavLink to={routes.setup.grade}>Grade</NavLink>,
          icon: <Line />,
        },
      ],
    },
    {
      key: "schoolInfo",
      label: "Setup School Info",
      icon: <Settings />,
      children: [
        {
          key: "exploreProgrammes",
          label: (
            <NavLink to={routes.setup.exploreProgrammes}>
              Explore Programmes
            </NavLink>
          ),
          icon: <Line />,
        },
        {
          key: "aboutUs",
          label: <NavLink to={"/about-us"}>About Us</NavLink>,
          icon: <Line />,
        },
        {
          key: "whyUs",
          label: <NavLink to={"/why-us"}>Why Us</NavLink>,
          icon: <Line />,
        },
        {
          key: "faq",
          label: <NavLink to={"/faq"}>FAQ</NavLink>,
          icon: <Line />,
        },
        {
          key: "newsAndEvents",
          label: <NavLink to={"/news-and-events"}>News & Events</NavLink>,
          icon: <Line />,
        },
        {
          key: "history",
          label: <NavLink to={"/history"}>History</NavLink>,
          icon: <Line />,
        },
        {
          key: "schoolMgt",
          label: <NavLink to={"/school-management"}>School Mgt</NavLink>,
          icon: <Line />,
        },
        {
          key: "schoolInfoTemplate",
          label: <NavLink to={"/school-info"}>Template</NavLink>,
          icon: <Line />,
        },
        {
          key: "socialMedia",
          label: <NavLink to={"/social-media"}>Social Media Link</NavLink>,
          icon: <Line />,
        },
        {
          key: "studentLife",
          label: <NavLink to={"/student-life"}>Student Life</NavLink>,
          icon: <Line />,
        },
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
          <Menu
            items={items}
            mode="inline"
            inlineIndent={0}
            defaultOpenKeys={["schoolInfo"]}
            expandIcon={(info) => (
              <Arrow className={info.isOpen ? "rotate" : ""} />
            )}
          />
        </div>
      </section>
      
      <button className={styles.logout} onClick={logout}>
        <Logout />
        <p className={styles.end}>Logout</p>
      </button>
    </>
  );
};

export default Sidebar;
