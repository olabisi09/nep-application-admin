import { string } from "yup";

export const validator = {
  programName: string().required("Program Name is required"),
  status: string().required("Active Status is required"),
  description: string().required("Description is required"),
  title: string().required("Title is required"),
};
