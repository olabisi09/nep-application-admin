export const routes = {
  auth: {
    login: "/",
    forgotPassword: "/forgot-password",
    resetPassword: "/reset-password",
  },
  setup: {
    faculty: "/faculty-setup",
    department: "/department-setup",
    program: "/program-setup",
    readMoreProgram: "/read-more-program-setup",
    readMoreCourse: "/read-more-course-overview-setup",
    readMoreAdmissionRequirement: "/read-more-admission-requirement-setup",
    careerProspects: "/career-prospects-setup",
    session: "/session-setup",
    modeOfStudy: "/mode-of-study-setup",
    applicationFee: "/application-setup",
    tuitionFee: "/tuition-fee-setup",
    level: "/level-setup",
    tuitionYears: "/tuition-years-setup",
    curriculum: "/curriculum-setup",
    scholarship: "/scholarship-setup",
    testimony: "/testimony-setup",
    accreditation: "/accreditation-setup",
    qualification: "/qualification-type-setup",
    subject: "/subject-setup",
    careerProspectItems: "/career-prospect-items/:id",

    country: "/country-setup",
    state: "/state-setup",
    lga: "/lga-setup",
    gender: "/gender-setup",
    title: "/title-setup",
    maritalStatus: "/marital-status-setup",

    aboutUs: "/about-us",
    whyUs: "/why-us",
    faq: "/faq",
    newsAndEvents: "/news-and-events",
    history: "/history",
    schoolMgt: "/school-management",
    schoolInfo: "/school-info",
    socialMedia: "/social-media",
    form: "/form-setup",
    studentLife: "/student-life",
    overview: "/student-life/:id/overview",
    schoolSummary: "/student-life/:id/school-summary",
    fitnessAndAthletics: "/student-life/:id/fitness-and-athletics",
    supportAndGuidance: "/student-life/:id/support-and-guidance",
    studentActivities: "/student-life/:id/student-activities",
  },
  userMgt: {
    addUsers: "/admin-users",
    addRoles: "/admin-roles",
  },
  onboarding: "/onboarding",
};

export const breadcrumbNames = [
  {
    title: "User Management",
    routes: [
      {
        path: "/admin-users",
        title: "Admin Users",
      },
      {
        path: "/admin-roles",
        title: "Admin Roles",
      },
    ],
  },
  {
    title: "Setup School Info",
    routes: [
      {
        path: "/about-us",
        title: "About us",
      },
      {
        path: "/faq",
        title: "FAQ",
      },
      {
        path: "/history",
        title: "History",
      },
      {
        path: "/school-info",
        title: "Template",
      },
      {
        path: "/social-media",
        title: "Social Media Link",
      },
      {
        path: "/student-life",
        title: "Student Life",
        //children: [{title: "Overview", path: "/student-life/overview"}]
      },
      {
        path: "/form-setup",
        title: "Form Setup",
      },
      {
        path: "/faculty-setup",
        title: "Faculty Setup",
      },
      {
        path: "/why-us",
        title: "Why Us",
      },
      {
        path: "/news-and-events",
        title: "News and Events",
      },
      {
        path: "/school-management",
        title: "School Management",
      },
      {
        path: "/",
        title: "Home",
      },
    ],
  },
];
