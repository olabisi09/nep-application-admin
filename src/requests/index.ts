import api from "../utils/api";

export const getAboutUs = async () => {
  return (await api.get("/AboutUsPage/GetAllAboutUs"))?.data as GetResponse;
};

export const createOrUpdateAboutUs = async (payload: Partial<SetupPayload>) => {
  return (
    await api.post("/AboutUsPage/createUpdateAboutUsPage", payload, {
      headers: { "Content-Type": "multipart/form-data" },
    })
  )?.data as Response;
};

export const deleteAboutUs = async (id: number) => {
  return (await api.delete(`/AboutUsPage/DeleteAboutUsById?Id=${id}`))
    ?.data as Response;
};

export const getAllAcademicSession = async () => {
  return (await api.get("/ReadMore/GetAllAcademicSessions"))
    ?.data as SessionResponse;
};

export const createUpdateSession = async (payload: Partial<Session>) => {
  return (await api.post("/ReadMore/createUpdateAcademicSession", payload))
    ?.data as Response;
};

export const deleteSession = async (id: number) => {
  return (await api.delete(`/ReadMore/DeleteAcademicSessionById?Id=${id}`))
    ?.data as Response;
};

export const getAllCategory = async () => {
  return (await api.get("/Academics/GetAllCategoryAsync"))
    ?.data as CategoryResponse;
};
// export const getAllCareerProspect = async () => {
//   return (await api.get('/ReadMore/GetAllCareerProspects'))?.data as CareerProspectResponse;
// }

export const createUpdateLevel = async (payload: Partial<Level>) => {
  return (await api.post("/ReadMore/CreateUpdateLevel", payload))
    ?.data as Response;
};

export const getAllLevel = async () => {
  return (await api.get("/ReadMore/GetAllLevel"))?.data as LevelResponse;
};

export const deleteLevel = async (id: number) => {
  return (await api.delete(`/ReadMore/DeleteLevelById?Id=${id}`))
    ?.data as Response;
};

export const createUpdateTuition = async (payload: Partial<Tuition>) => {
  return (await api.post("/ReadMore/CreateUpdateTuition", payload))
    ?.data as Response;
};

export const getAllTuitionFee = async () => {
  return (await api.get("/ReadMore/GetAllTuition"))?.data as TuitionResponse;
};

export const deleteTuition = async (id: number) => {
  return (await api.delete(`/ReadMore/DeleteTuitionById?Id=${id}`))
    ?.data as Response;
};

export const createUpdateTuitionYear = async (
  payload: Partial<TuitionYear>
) => {
  return (await api.post("/ReadMore/CreateUpdateTuitionYear", payload))
    ?.data as Response;
};

export const getAllTuitionYear = async () => {
  return (await api.get("/ReadMore/GetAllTuitionYear"))
    ?.data as TuitionYearResponse;
};

export const deleteTuitionYear = async (id: number) => {
  return (await api.delete(`/ReadMore/DeleteTuitionYearById?Id=${id}`))
    ?.data as Response;
};

export const createFaq = async (payload: Partial<FAQ>) => {
  return (await api.post(`/HomePage/homePage/CreateUpdateFaq`, payload))
    ?.data as FaqResponse;
};

export const getAllFAQ = async () => {
  return (await api.get("/HomePage/homePage/GetAllFaq"))?.data as FaqResponse;
};
export const deleteFAQ = async (id: number) => {
  return (await api.delete(`/HomePage/DeleteFaqId?Id=${id}`))?.data as Response;
};

export const getFAQItemsByFaqId = async (id: number | string) => {
  return (await api.get(`/HomePage/homePage/GetFaqItemsByFaqId?Id=${id}`))
    ?.data as FaqItemResponse;
};

export const createOrUpdateFaqItem = async (payload: Partial<FaqItem>) => {
  return (await api.post(`/HomePage/homePage/CreateUpdateFaqItems`, payload))
    ?.data as Response;
};
export const deleteFAQItem = async (id: number) => {
  return (await api.delete(`/HomePage/DeleteFaqItemId?Id=${id}`))
    ?.data as Response;
};
// export const createFaq = async (payload: Partial<FAQ>) => {
//   return (await api.post(`/HomePage/homePage/CreateUpdateFaq`, payload))
//     ?.data as FaqResponse;
// };

// export const deleteAboutUs = async (id: number) => {
//   return (await api.delete(`/AboutUsPage/DeleteAboutUsById?Id=${id}`))?.data as Response;
// }

export const createUpdateGeneralTemplate = async (payload: FormData) => {
  return (await api.post("/GeneralTemplate/createUpdateTemplate", payload))
    ?.data as Response;
};

export const getGeneralTemplates = async () => {
  return (await api.get("/GeneralTemplate/GetAllTemplate"))
    ?.data as GeneralTemplateResponse;
};

export const deleteGeneralTemplate = async (id: number) => {
  return (await api.delete(`/GeneralTemplate/DeleteTemplateById?Id=${id}`))
    ?.data as Response;
};

export const getGeneralTemplateById = async (id: number) => {
  return (await api.get(`/GeneralTemplate/GetTemplateById?Id=${id}`))
    ?.data as GeneralTemplate;
};

export const StatusOptions = [
  {
    value: true,
    label: "Active",
  },
  {
    value: false,
    label: "Inactive",
  },
];

export const createOrUpdateGender = async (payload: Partial<Gender>) => {
  return (await api.post("/Utilities/Utilities/CreateUpdateGender", payload))
    ?.data as Response;
};

export const getMaritalStatus = async () => {
  return (await api.get("/Utilities/Utilities/GetAllMaritalStatus"))
    ?.data as MaritalStatusResponse;
};

export const createOrUpdateMaritalStatus = async (
  payload: Partial<MaritalStatus>
) => {
  return (
    await api.post("/Utilities/Utilities/CreateUpdateMaritalStatus", payload)
  )?.data as Response;
};

export const getCountry = async () => {
  return (await api.get("/Utilities/Utilities/GetAllCountries"))
    ?.data as CountryResponse;
};

export const createOrUpdateCountry = async (payload: Partial<Country>) => {
  return (await api.post("/Utilities/Utilities/CreateUpdateCountry", payload))
    ?.data as Response;
};

export const getQualification = async () => {
  return (await api.get("/Utilities/Utilities/GetAllCountries"))
    ?.data as CountryResponse;
};

export const createOrUpdateQualification = async (
  payload: Partial<QualificationType>
) => {
  return (await api.post("/Utilities/Utilities/CreateUpdateCountry", payload))
    ?.data as Response;
};

export const getQualificationType = async () => {
  return (await api.get("/Utilities/Utilities/GetAllQualificationType"))
    ?.data as QualificationTypeResponse;
};

export const createOrUpdateQualificationType = async (
  payload: Partial<QualificationType>
) => {
  return (
    await api.post(
      "/Utilities/Utilities/CreateUpdateQualificationType",
      payload
    )
  )?.data as Response;
};

export const getState = async () => {
  return (await api.get("/Utilities/Utilities/GetAllStates"))
    ?.data as StateResponse;
};

export const getStateByCountryId = async (id: number) => {
  return (await api.get(`/Utilities/Utilities/GetStateByCountryId?id=${id}`))
    ?.data as StateResponse;
};

export const createOrUpdateState = async (payload: Partial<State>) => {
  return (await api.post("/Utilities/Utilities/CreateUpdateState", payload))
    ?.data as Response;
};

export const getLGA = async () => {
  return (await api.get("/Utilities/Utilities/GetAllLgas"))
    ?.data as LGAResponse;
};

export const createOrUpdateLGA = async (payload: Partial<LGA>) => {
  return (await api.post("/Utilities/Utilities/CreateUpdateLga", payload))
    ?.data as Response;
};

export const getHistory = async () => {
  return (await api.get("/AboutUsPage/GetAllHistory"))?.data as GetResponse;
};

export const createOrUpdateHistory = async (payload: Partial<SetupPayload>) => {
  return (
    await api.post("/AboutUsPage/createUpdateHistory", payload, {
      headers: { "Content-Type": "multipart/form-data" },
    })
  )?.data as Response;
};

export const deleteHistory = async (id: number) => {
  return (await api.delete(`/AboutUsPage/DeleteHistoryById?Id=${id}`))
    ?.data as Response;
};

export const getSchoolMgt = async () => {
  return (await api.get("/AboutUsPage/GetAllSchoolMgt"))?.data as GetResponse;
};

export const createOrUpdateSchoolMgt = async (
  payload: Partial<SetupPayload>
) => {
  return (
    await api.post("/AboutUsPage/createUpdateSchoolMgt", payload, {
      headers: { "Content-Type": "multipart/form-data" },
    })
  )?.data as Response;
};

export const deleteSchoolMgt = async (id: number) => {
  return (await api.delete(`/AboutUsPage/DeleteSchoolMgtById?Id=${id}`))
    ?.data as Response;
};

export const getEvents = async () => {
  return (await api.get(`/HomePage/HomePage/GetAllNewEvent`))
    ?.data as GetResponse;
};

export const createOrUpdateEvent = async (payload: Partial<SetupPayload>) => {
  return (
    await api.post("/HomePage/HomePage/CreateUpdateNewEvent", payload, {
      headers: { "Content-Type": "multipart/form-data" },
    })
  )?.data as Response;
};

// export const deleteEvents = async (id: number) => {
//   return (await api.delete(`/HomePage/DeleteNewEventById?Id=${id}`))?.data as Response;
// }

export const getSocialMedia = async () => {
  return (await api.get("/GeneralTemplate/GetAllSocialMediaLinks"))
    ?.data as SocialMediaResponse;
};

export const createOrUpdateSocialMedia = async (
  payload: Partial<SocialMedia>
) => {
  return (
    await api.post("/HomePage/HomePage/createUpdateSocialMediaLink", payload)
  )?.data as Response;
};

export const deleteSocialMedia = async (id: number) => {
  return (await api.delete(`/AboutUsPage/DeleteSocialMediaLinkById?Id=${id}`))
    ?.data as Response;
};

export const getGender = async () => {
  return (await api.get("/Utilities/Utilities/GetAllGenders"))
    ?.data as GenderResponse;
};

export const createUpdateSocialMediaLink = async (
  payload: Partial<SocialMediaLink>
) => {
  return (
    await api.post("/GeneralTemplate/createUpdateSocialMediaLink", payload, {
      headers: { "Content-Type": "multipart/form-data" },
    })
  )?.data as Response;
};

export const getSocialMediaLinks = async () => {
  return (await api.get("/GeneralTemplate/GetAllSocialMediaLinks"))
    ?.data as SocialMediaLinkResponse;
};

export const deleteSocialMediaLink = async (id: number) => {
  return (
    await api.delete(`/GeneralTemplate/DeleteSocialMediaLinkById?Id=${id}`)
  )?.data as Response;
};

export const getSocialMediaLinkById = async (id: number) => {
  return (await api.get(`/GeneralTemplate/GetSocialMediaLinkById?Id=${id}`))
    ?.data as GeneralTemplate;
};

export const getStudentLife = async () => {
  return (await api.get("/StudentLife/studentlife/GetAllStudentLife"))
    ?.data as GetResponse;
};

export const createOrUpdateStudentLife = async (payload: Partial<Setup>) => {
  return (
    await api.post("/StudentLife/studentlife/CreateUpdateStudentLife", payload)
  )?.data as Response;
};

// export const createOrUpdateSchoolSummary = async (payload: Partial<Setup>) => {
//   return (
//     await api.post(
//       "/StudentLife/studentlife/CreateUpdateSchoolSummary",
//       payload
//     )
//   )?.data as Response;
// };

// export const createOrUpdateCampusExperience = async (
//   payload: Partial<Setup>
// ) => {
//   return (
//     await api.post(
//       "/StudentLife/studentlife/CreateUpdateCampusExperience",
//       payload
//     )
//   )?.data as Response;
// };

export const createOrUpdateFitnessAthletics = async (
  payload: Partial<Setup>
) => {
  return (
    await api.post(
      "/StudentLife/studentlife/CreateUpdateFitnessAthletics",
      payload
    )
  )?.data as Response;
};

export const createOrUpdateSupportGuidance = async (
  payload: Partial<Setup>
) => {
  return (
    await api.post("/StudentLife/studentlife/CreateUpdateSupportGuidance", payload
    )
  )?.data as Response;
};

export const createOrUpdateStudentActivity = async (
  payload: Partial<Setup>
) => {
  return (
    await api.post(
      "/StudentLife/studentlife/CreateUpdateStudentActivity",
      payload
    )
  )?.data as Response;
};

export const getStudentActivityByStudentLifeId = async (
  id: string | number
) => {
  return (
    await api.get(
      `/StudentLife/studentlife/GetStudentActivityByStudentLifeId?Id=${id}`
    )
  )?.data as StudentActivitiesResponse;
};

export const deleteStudentActivity = async (id: number) => {
  return (
    await api.delete(`/StudentLife/studentlife/DeleteStudentActivity?Id=${id}`)
  )?.data as Response;
};

export const getCampusExperienceByStudentLifeId = async (
  studentLifeId: string
) => {
  return (
    await api.get(
      `/StudentLife/studentlife/GetCampusExperienceByStudentLifeId?Id=${studentLifeId}`
    )
  )?.data as GetByStudentLifeResponse;
};

export const createOrUpdateCampusExperience = async (
  payload: Partial<ItemByStudentLife>
) => {
  return (
    await api.post(
      "/StudentLife/studentlife/CreateUpdateCampusExperience",
      payload
    )
  )?.data as Response;
};

export const deleteCampusExperience = async (id: number) => {
  return (
    await api.delete(`/StudentLife/studentlife/DeleteCampusExperience?Id=${id}`)
  )?.data as Response;
};

export const getOverview = async () => {
  return (await api.get("/StudentLife/studentlife/GetAllOverview"))
    ?.data as GetByStudentLifeResponse;
};

export const getOverviewByStudentLifeId = async (id: string | number) => {
  return (
    await api.get(
      `/StudentLife/studentlife/GetOverviewByStudentLifeId?Id=${id}`
    )
  )?.data as GetByStudentLifeResponse;
};

export const createOrUpdateOverview = async (
  payload: Partial<ItemByStudentLifePayload>
) => {
  return (
    await api.post("/StudentLife/studentlife/createUpdateOverView", payload, {
      headers: { "Content-Type": "multipart/form-data" },
    })
  )?.data as Response;
};

export const deleteOverview = async (id: number) => {
  return (await api.delete(`/StudentLife/studentlife/DeleteOverview?Id=${id}`))
    ?.data as Response;
};

export const getTemplate = async () => {
  return (await api.get(`/GeneralTemplate/GetAllTemplate`))
    ?.data as GetTemplateResponse;
};

export const createOrUpdateTemplate = async (
  payload: Partial<TemplatePayload>
) => {
  return (
    await api.post(`/GeneralTemplate/createUpdateTemplate`, payload, {
      headers: { "Content-Type": "multipart/form-data" },
    })
  )?.data as Response;
};

export const deleteTemplate = async (id: number | string) => {
  return (await api.delete(`/GeneralTemplate/DeleteTemplateById?Id=${id}`))
    ?.data as Response;
};

// export const createOrUpdateOverview = async (payload: Partial<Setup>) => {
//   return (
//     await api.post("/StudentLife/studentlife/createUpdateOverView", payload)
//   )?.data as Response;
// };

export const createOrUpdateSubject = async (
  payload: Partial<SubjectPayload>
) => {
  return (await api.post("/Utilities/Utilities/CreateUpdateSubject", payload))
    ?.data as SubjectResponse;
};

export const getSubject = async () => {
  return (await api.get(`Utilities/Utilities/GetAllSubject`))
    ?.data as GetSubject;
};

export const deleteCountry = async (id: number) => {
  return (await api.delete(`/Utilities/Utilities/Deletecountry?Id=${id}`))
    ?.data as Response;
};

export const deleteGender = async (id: number) => {
  return (await api.delete(`/Utilities/Utilities/DeleteGender?Id=${id}`))
    ?.data as Response;
};

export const createOrUpdateSchoolSummary = async (payload: Partial<Setup>) => {
  return (
    await api.post(
      "/StudentLife/studentlife/CreateUpdateSchoolSummary",
      payload
    )
  )?.data as Response;
};

export const deleteMaritalStatus = async (id: number) => {
  return (await api.delete(`/Utilities/Utilities/DeleteMaritalStatus?Id=${id}`))
    ?.data as Response;
};

export const deleteState = async (id: number) => {
  return (await api.delete(`/Utilities/Utilities/DeleteState?Id=${id}`))
    ?.data as Response;
};

export const deleteLGA = async (id: number) => {
  return (await api.delete(`/Utilities/Utilities/DeleteLga?Id=${id}`))
    ?.data as Response;
};

export const deleteSubject = async (id: number) => {
  return (await api.delete(`/Utilities/Utilities/DeleteSubject?Id=${id}`))
    ?.data as Response;
};

export const getAdmissionRequirements = async () => {
  return (await api.get("/ReadMore/GetAllAdmissionRequirements"))
    ?.data as AdmissionRequirementResponse;
};

export const createOrUpdateAdmissionRequirement = async (
  payload: Partial<AdmissionRequirement>
) => {
  return (await api.post("/ReadMore/createUpdateAdmissionRequirement", payload))
    ?.data as Response;
};

export const deleteAdmissionRequirement = async (id: number) => {
  return (await api.delete(`/ReadMore/DeleteAdmissionRequirementById?Id=${id}`))
    ?.data as Response;
};

export const getAllPrograms = async () => {
  return (await api.get("/Academics/GetAllProgramAsync"))
    ?.data as ProgramResponse;
};

export const deleteQualificationType = async (id: number) => {
  return (
    await api.delete(`/Utilities/Utilities/DeleteQualificationType?Id=${id}`)
  )?.data as Response;
};

export const getAllAccreditation = async () => {
  return (await api.get("/ReadMore/GetAllAccreditations"))
    ?.data as AccreditationResponse;
};

export const createOrUpdateScholarship = async (
  payload: Partial<CommonPayload>
) => {
  return (await api.post(`/ReadMore/CreateUpdateScholarship`, payload))
    ?.data as Response;
};

export const getAllScholarships = async () => {
  return (await api.get("/ReadMore/GetAllScholarship"))
    ?.data as ScholarshipResponse;
};

export const deleteScholarship = async (id: number) => {
  return (await api.delete(`/ReadMore/DeleteScholarshipById?Id=${id}`))
    ?.data as Response;
};

export const getAccreditationById = async (id: number) => {
  return (await api.get(`/ReadMore/GetAccreditationById?Id=${id}`))
    ?.data as Accreditation;
};

export const createOrUpdateAccreditation = async (
  payload: Partial<AccreditationType>
) => {
  return (await api.post("/ReadMore/createUpdateAccreditation", payload))
    ?.data as Response;
};

export const deleteAccreditationById = async (id: number) => {
  return (await api.delete(`/ReadMore/DeleteAccreditationById?Id=${id}`))
    ?.data as Response;
};

export const getSchoolSummaryByStudentLifeId = async (id: string | number) => {
  return (
    await api.get(
      `/StudentLife/studentlife/GetSchoolsummaryByStudentLifeId?Id=${id}`
    )
  )?.data as SchoolSummaryResponse;
};

export const deleteSchoolSummary = async (id: number) => {
  return (
    await api.delete(`/StudentLife/studentlife/DeleteSchoolSummary?Id=${id}`)
  )?.data as Response;
};

export const getFitnessAndAthleticsByStudentLifeId = async (
  id: string | number
) => {
  return (
    await api.get(
      `/StudentLife/studentlife/GetFitnessAthleticsByStudentLifeId?Id=${id}`
    )
  )?.data as FitnessAthleticsResponse;
};

export const deleteFitnessAthletics = async (id: number) => {
  return (
    await api.delete(`/StudentLife/studentlife/DeleteFitnessAthletics?Id=${id}`)
  )?.data as Response;
};

export const getFitnessAndAthleticsItemByFitnessId = async (
  id: string | number
) => {
  return (
    await api.get(
      `/StudentLife/studentlife/GetFitnessAthleticsItemByFitnessId?Id=${id}`
    )
  )?.data as FitnessAthleticsItemResponse;
};

export const getFitnessAndAthleticsImagesByFitnessId = async (
  id: string | number
) => {
  return (
    await api.get(
      `/StudentLife/studentlife/GetFitnessImageByFitnessAthleticsId?Id=${id}`
    )
  )?.data as FitnessImageResponse;
};

export const createOrUpdateFitnessAthleticsItem = async (
  payload: Partial<CommonPayload>
) => {
  return (
    await api.post(
      "/StudentLife/studentlife/CreateUpdateFitnessAthleticsItem",
      payload
    )
  )?.data as Response;
};

export const createOrUpdateFitnessImage = async (payload: FormData) => {
  return (
    await api.post(
      "/StudentLife/studentlife/CreateUpdateFitnessImage",
      payload,
      {
        headers: { "Content-Type": "multipart/form-data" },
      }
    )
  )?.data as Response;
};

export const deleteFitnessAthleticsItem = async (id: number) => {
  return (
    await api.delete(`/StudentLife/studentlife/DeleteFitnessImage?Id=${id}`)
  )?.data as Response;
};

export const deleteFitnessAthleticsImage = async (id: number) => {
  return (
    await api.delete(
      `/StudentLife/studentlife/DeleteFitnessAthleticsItem?Id=${id}`
    )
  )?.data as Response;
};

export const getSupportAndGuidanceByStudentLifeId = async (
  id: string | number
) => {
  return (
    await api.get(
      `/StudentLife/studentlife/GetSupportGuidanceByStudentLifeId?Id=${id}`
    )
  )?.data as SupportAndGuidanceResponse;
};

export const createOrUpdateStudentActivityItem = async (payload: FormData) => {
  return (
    await api.post(
      "/StudentLife/studentlife/CreateUpdateStudentActivityItem",
      payload,
      {
        headers: { "Content-Type": "multipart/form-data" },
      }
    )
  )?.data as Response;
};

export const getStudentActivitiesByStudentActivityId = async (
  id: string | number
) => {
  return (
    await api.get(
      `/StudentLife/studentlife/GetStudentActivityItemByStudentActivityId?Id=${id}`
    )
  )?.data as StudentActivityResponse;
};

export const getCareerProspects = async () => {
  return (await api.get("/ReadMore/GetAllCareerProspects"))
    ?.data as CareerProspectResponse;
};

export const createOrUpdateCareerProspect = async (
  payload: Partial<CommonPayload>
) => {
  return (await api.post("/ReadMore/createUpdateCareerProspect", payload))
    ?.data as Response;
};

export const deleteCareerProspect = async (id: number) => {
  return (await api.delete(`/ReadMore/DeleteCareerProspectById?Id=${id}`))
    ?.data as Response;
};

export const getCampusExperienceItemByCampusExperienceId = async (
  id: string | number
) => {
  return (
    await api.get(
      `/StudentLife/studentlife/GetCampusExperienceItemByCampusExperienceId?Id=${id}`
    )
  )?.data as CampusExperienceItemResponse;
};

export const createOrUpdateCampusExperienceItem = async (
  payload: Partial<CommonPayload>
) => {
  return (
    await api.post(
      "/StudentLife/studentlife/CreateUpdateCampusExperienceItem",
      payload
    )
  )?.data as Response;
};

export const getSupportGuidanceItemBySupportGuidanceId = async (
  id: string | number
) => {
  return (
    await api.get(
      `/StudentLife/studentlife/GetSupportItemBySupportGuidanceId?Id=${id}`
    )
  )?.data as SupportGuidanceItemResponse;
};

export const createOrUpdateSupportGuidanceItem = async (
  payload: Partial<CommonPayload>
) => {
  return (
    await api.post("/StudentLife/studentlife/CreateUpdateSupportItem", payload)
  )?.data as Response;
};

export const deleteSupportGuidance = async (id: number) => {
  return (
    await api.delete(`/StudentLife/studentlife/DeleteSupportGuidance?Id=${id}`)
  )?.data as Response;
};

export const deleteSupportGuidanceItem = async (id: number) => {
  return (
    await api.delete(`/StudentLife/studentlife/DeleteSupportItem?Id=${id}`)
  )?.data as Response;
};

export const createOrUpdateCampusExperienceImage = async (
  payload: FormData
) => {
  return (
    await api.post(
      "/StudentLife/studentlife/CreateUpdateCampusExperienceImage",
      payload,
      {
        headers: { "Content-Type": "multipart/form-data" },
      }
    )
  )?.data as Response;
};

export const getCampusExperienceImagesByCampusExperienceId = async (
  id: string | number
) => {
  return (
    await api.get(
      `/StudentLife/studentlife/GetCampusExperienceImageByCampusExperienceId?Id=${id}`
    )
  )?.data as CampusExperienceImageResponse;
};

export const deleteCampusExperienceImage = async (id: number) => {
  return (
    await api.delete(
      `/StudentLife/studentlife/DeleteCampusExperienceImage?Id=${id}`
    )
  )?.data as Response;
};

export const createOrUpdateApplicationFee = async (
  payload: Partial<ApplicationFee>
) => {
  return (await api.post("/ReadMore/CreateUpdateFeeSetup", payload))
    ?.data as ApplicationFeeResponse;
};

export const getAllProgramsApplicationFee = async () => {
  return (await api.get("/Academics/GetAllProgramAsync"))
    ?.data as GetAllProgramApplicationFeeResponse;
};

export const signInUser = async (payload: SignInPayload) => {
  return (await api.post(`/Authorization/Adminlogin`, payload))
    ?.data as SignInResponse;
};

export const forgotPasswordAdmin = async (payload: ForgotPayload) => {
  return (await api.post(`/Authorization/AdminForgotPassword`, payload))
    ?.data as ForgotResponse;
};

export const resetPasswordAdmin = async (payload: Partial<ResetPayload>) => {
  return (await api.post(`/Authorization/AdminResetPassword`, payload))
    ?.data as ResetResponse;
};

export const getAllFeeSetup = async () => {
  return (await api.get("/ReadMore/GetAllFeeSetup"))
    ?.data as getAllFeeSetupResponse;
};

export const deleteFeeSetup = async (id: number) => {
  return (await api.delete(`/ReadMore/DeleteFeeSetupById?Id=${id}`))
    ?.data as Response;
};

export const getAllApplicationBatch = async () => {
  return (await api.get(`/Utilities/Utilities/GetAllApplicationBatch`))
    ?.data as applicationBatchResponse;
};

export const getDepartments = async () => {
  return (await api.get("/Academics/GetAllDepartmentAsync"))
    ?.data as GetDepartmentsResponse;
};

export const createDepartment = async (payload: Partial<Department>) => {
  return (await api.post("/Academics/CreateDepartmentAsync", payload))
    ?.data as Response;
};

export const updateDepartment = async (payload: Partial<Department>) => {
  return (await api.put("/Academics/UpdateDepartmentAsync", payload))
    ?.data as Response;
};

export const deleteDepartment = async (id: number) => {
  return (await api.delete(`/Academics/DeleteDepartmentAsync?Id=${id}`))
    ?.data as Response;
};

export const createOrUpdateTestimonial = async (
  payload: Partial<Testimonial>
) => {
  return (
    await api.post("/ReadMore/createUpdateTestimonial", payload, {
      headers: { "Content-Type": "multipart/form-data" },
    })
  )?.data as Response;
};

export const getAllTestimonials = async () => {
  return (await api.get(`/ReadMore/GetAllTestimonials`))
    ?.data as TestimonialResponse;
};

export const deleteTestimonial = async (id: number) => {
  return (await api.delete(`/ReadMore/DeleteTestimonialById?Id=${id}`))
    ?.data as Response;
};

export const getAllModeOfStudy = async () => {
  return (await api.get("/Utilities/Utilities/GetAllModeOfStudy"))
    ?.data as ModeOfStudyResponse;
};

export const deleteModeOfStudy = async (id: number) => {
  return (await api.delete(`/Utilities/Utilities/DeleteModeOfStudy?Id=${id}`))
    ?.data as Response;
};

export const createOrUpdateModeOfStudy = async (
  payload: Partial<ModeOfStudy>
) => {
  return (
    await api.post(`/Utilities/Utilities/CreateUpdateModeOfStudy`, payload)
  )?.data as Response;
};

export const createOrUpdateTitle = async (payload: Partial<ModeOfStudy>) => {
  return (await api.post(`/Utilities/Utilities/CreateUpdateTitle`, payload))
    ?.data as Response;
};

export const getAllTitles = async () => {
  return (await api.get("/Utilities/Utilities/GetAllTitle"))
    ?.data as TitleResponse;
};

export const deleteTitle = async (id: number) => {
  return (await api.delete(`/Utilities/Utilities/DeleteTitle?Id=${id}`))
    ?.data as Response;
};

export const createFaculty = async (
  payload: Partial<createOrUpdateFacultyPayload>
) => {
  return (await api.post(`/Academics/CreatCategory`, payload))
    ?.data as FacultyResponse;
};

export const getFaculty = async () => {
  return (await api.get("/Academics/GetAllCategoryAsync"))
    ?.data as GetFacultyResponse;
};

export const deleteFaculty = async (id: number) => {
  return (await api.delete(`/Academics/DeleteCategoryAsync?Id=${id}`))
    ?.data as DeleteFacultyResponse;
};

export const updateFaculty = async ({
  categoryCode,
  name,
  description,
}: CategoryPayload) => {
  return (
    await api.put(
      `/Academics/UpdateCategoryAsync?CategoryCode=${categoryCode}&Name=${name}&Description=${description}`
    )
  )?.data as updateFacultyResponse;
};

export const getAllCurriculum = async () => {
  return (await api.get("/ReadMore/GetAllCurriculum"))
    ?.data as CurriculumResponse;
};

export const createOrUpdateCurriculum = async (
  payload: Partial<CurriculumPayload>
) => {
  return (await api.post("/ReadMore/CreateUpdateCuriculum", payload))
    ?.data as Response;
};

export const deleteCurriculum = async (id: number) => {
  return (await api.delete(`/ReadMore/DeleteCurriculumById?Id=${id}`))
    ?.data as Response;
};
export const getAllWhy = async () => {
  return (await api.get(`HomePage/HomePage/GetAllWhy`))?.data as WhyResponse;
}

export const createUpdateWhy = async (payload: Partial<Why>) => {
  return (await api.post(`HomePage/HomePage/CreateUpdateWhy`, payload))?.data as Response;
}

export const deleteWhy = async (id: number) => {
  return (await api.delete(`HomePage/HomePage/DeleteWhyId?Id=${id}`))?.data as Response;
}

export const getAllWhyItemsByWhyId = async (whyId: number | string) => {
  return (await api.get(`HomePage/HomePage/GetAllWhySchoolItemByWhyId?Id=${whyId}`))?.data as WhyItemResponse
}

export const createUpdateWhyItem = async (payload: FormData) => {
  return (await api.post(`HomePage/HomePage/createUpdateWhySchoolItem`, payload))?.data as Response;
}

export const deleteWhyItem = async (id: number) => {
  return (await api.delete(`HomePage/HomePage/DeleteWhyschoolitemId?Id=${id}`))?.data as Response;
}

export const editFaculty = async (payload: Partial<editFacultyPayload>) => {
  return (await api.put("/Academics/UpdateCategoryAsync", payload))
    ?.data as editFacultyResponse;
};
