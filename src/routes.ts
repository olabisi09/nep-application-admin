export const routes = {
  auth: {
    login: '/',
    forgotPassword: '/forgot-password',
    resetPassword: '/reset-password',
  },
  setup: {
    faculty: '/faculty-setup',
    department: '/department-setup',
    program: '/program-setup',
    programType: '/program-type-setup',
    readMoreProgram: '/read-more-program-setup',
    readMoreCourse: '/read-more-course-overview-setup',
    readMoreAdmissionRequirement: '/read-more-admission-requirement-setup',
    careerProspects: '/career-prospects-setup',
    session: '/session-setup',
    modeOfStudy: '/mode-of-study-setup',
    applicationFee: '/application-setup',
    discountFee: '/discount-fee',
    tuitionFee: '/tuition-fee-setup',
    level: '/level-setup',
    tuitionYears: '/tuition-years-setup',
    curriculum: '/curriculum-setup',
    scholarship: '/scholarship-setup',
    testimony: '/testimonial-setup',
    accreditation: '/accreditation-setup',
    qualification: '/qualification-type-setup',
    subject: '/subject-setup',
    careerProspectItems: '/career-prospect-items/:id',
    admissionRequirementDetail: '/admission-requirement/:id/details',
    applicationBatch: '/application-batch',
    grade: 'grade-setup',
    tab: '/tab-setup',
    DisplayTabSetup: '/tab-display',

    country: '/country-setup',
    state: '/state-setup',
    lga: '/lga-setup',
    gender: '/gender-setup',
    title: '/title-setup',
    maritalStatus: '/marital-status-setup',
    disability: '/disability-setup',
    religion: '/religion-setup',

    exploreProgrammes: 'explore-programmes',
    aboutUs: '/about-us',
    whyUs: '/why-us',
    whyItems: '/why-us/:id/why-items',
    faq: '/faq',
    faqItem: '/faq/:id/faq-items',
    newsAndEvents: '/news-and-events',
    history: '/history',
    schoolMgt: '/school-management',
    schoolInfo: '/school-info',
    socialMedia: '/social-media',
    form: '/form-setup',
    studentLife: '/student-life',
    overview: '/student-life/:id/overview',
    schoolSummary: '/student-life/:id/school-summary',
    fitnessAndAthletics: '/student-life/:id/fitness-and-athletics',
    fitnessAndAthleticsItem: '/student-life/:id/fitness-athletics-item',
    fitnessAndAthleticsImage: '/student-life/:id/fitness-athletics-image',
    supportAndGuidance: '/student-life/:id/support-and-guidance',
    supportAndGuidanceItem: '/student-life/:id/support-and-guidance-item',
    studentActivities: '/student-life/:id/student-activities',
    studentActivitiesItem: '/student-life/:id/student-activities-item',
    campusExperience: '/student-life/:id/campus-experience',
    campusExperienceItem: '/student-life/:id/campus-experience-item',
    campusExperienceImage: '/student-life/:id/campus-experience-image',
  },
  userMgt: {
    addUsers: '/admin-users',
    addRoles: '/admin-roles',
    contactUs: '/contact-us',
    addSchoolId: '/school-id-config',
    users: '/applicants',
    userDetails: '/applicants/:id',
  },
  onboarding: '/onboarding',
};

export const breadcrumbNames = [
  {
    title: 'User Management',
    routes: [
      {
        path: '/applicants',
        title: 'Applicants',
      },
      {
        path: '/admin-roles',
        title: 'Admin Roles',
      },
      {
        path: '/contact-us',
        title: 'Contact Us',
      },
    ],
  },
  {
    title: 'Setup School Info',
    routes: [
      {
        path: '/about-us',
        title: 'About us',
      },
      {
        path: '/faq',
        title: 'FAQ',
      },
      {
        path: '/history',
        title: 'History',
      },
      {
        path: '/school-info',
        title: 'Template',
      },
      {
        path: '/social-media',
        title: 'Social Media Link',
      },
      {
        path: '/student-life',
        title: 'Student Life',
        //children: [{title: "Overview", path: "/student-life/overview"}]
      },
      {
        path: '/form-setup',
        title: 'Form Setup',
      },
      {
        path: '/faculty-setup',
        title: 'Faculty Setup',
      },
      {
        path: '/why-us',
        title: 'Why Us',
      },
      {
        path: '/news-and-events',
        title: 'News and Events',
      },
      {
        path: '/school-management',
        title: 'School Management',
      },
      {
        path: '/',
        title: 'Home',
      },
    ],
  },
];
