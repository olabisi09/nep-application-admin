import { string } from "yup";
import * as Yup from "yup";

export const validator = {
  programName: string().required("Program Name is required"),
  status: string().required("Status is required"),
  description: string().required("Description is required"),
  title: string().required("Title is required"),
  file: Yup.mixed().required("A File is required"),
};
