import { string } from "yup";
import * as Yup from "yup";
import ModeOfStudy from "../screens/setup/modeOfStudy/modeOfStudy";

export const validator = {
  programName: string().required("Program Name is required"),
  status: string().required("Status is required"),
  description: string().required("Description is required"),
  title: string().required("Title is required"),
  file: Yup.mixed().required("A File is required"),
  amount: Yup.number().required("An Amount is required"),
  ModeOfStudy: string().required("Mode of study is required"),
};
