export const routes = {
    auth: {
      login: "/",
      forgotPassword: "/forgot-password",
      resetPassword: "/reset-password"
    },
    setup: {
      home: "/",
      facultySetup: "/faculty-setup",
      aboutUs: "/about-us",
      whyUs: "/why-us",
      faq: "/faq",
      newsAndEvents: "/news-and-events",
      history: "/history",
      schoolMgt: "/school-management",
      schoolInfo: "/school-info",
      socialMedia: "/social-media",
      form: "/form-setup"
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
        title: "Admin Users"
      },
      {
        path: "/admin-roles",
        title: "Admin Roles"
      }
    ]
  },
  {
    title: "Setup School Info",
    routes: [
      {
        path: "/about-us",
        title: "About us"
      },
      {
        path: "/faq",
        title: "FAQ"
      },
      {
        path: "/history",
        title: "History"
      },
      {
        path: "/school-info",
        title: "Template"
      },
      {
        path: "/social-media",
        title: "Social Media Link"
      }
    ]
  }
]