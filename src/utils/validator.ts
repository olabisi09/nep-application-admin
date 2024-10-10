import { string } from "yup";
import * as Yup from "yup";

export const validator = {
  programName: string().required("Department Name is required"),
  programType: string().required("Program Type is required"),
  status: string().required("Status is required"),
  description: string().required("Description is required"),
  title: string().required("Title is required"),
  file: Yup.mixed().required("A File is required"),
  amount: Yup.number().required("An Amount is required"),
  modeOfStudy: string().required("Mode of study is required"),
  applicationBatch: string().required("Application Batch is required"),
  session: string().required("Session is required"),
  program: string().required("Program is required"),
  email: string()
    .email("Invalid email Address")
    .required("Email Address  is required"),
  password: string()
    .required("Password is required")
    .max(20, "Password must have a maximum length of 20 characters")
    .matches(
      /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}/,
      "Password must have Upper case, Lower case and number "
    ),

  newPassword: string()
    .required("Password is required")
    .max(20, "Password must have a maximum length of 20 characters")
    .matches(
      /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}/,
      "Password must have Upper case, Lower case and number "
    ),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("newPassword")], "Passwords must match")
    .required("Enter Confirm Password"),
  startDate: Yup.date()
    .required("Start Date is required")
    .transform((value) => (value ? new Date(value) : null)) // Ensure date is parsed
    .typeError("Invalid date format"),
  endDate: Yup.date()
    .required("End Date is required")
    .transform((value) => (value ? new Date(value) : null))
    .typeError("Invalid date format")
    .min(Yup.ref("startDate"), "End Date cannot be before Start Date"),
  lateApplicationStartDate: Yup.date()
    .required("Late Application Start Date is required")
    .transform((value) => (value ? new Date(value) : null))
    .typeError("Invalid date format")
    .min(
      Yup.ref("startDate"),
      "Late Application Start Date cannot be before Start Date"
    )
    .max(
      Yup.ref("endDate"),
      "Late Application Start Date cannot be after End Date"
    ),
  lateApplicationEndDate: Yup.date()
    .required("Late Application End Date is required")
    .transform((value) => (value ? new Date(value) : null))
    .typeError("Invalid date format")
    // .min(
    //   Yup.ref("lateApplicationStartDate"),
    //   "Late Application End Date cannot be before Late Application Start Date"
    // )
    .max(
      Yup.ref("endDate"),
      "Late Application End Date cannot be after End Date"
    ),
};
