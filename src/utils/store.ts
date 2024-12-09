import { atomWithStorage } from "jotai/utils";

type UserData = {
  token: string;
  expiration: string;
  role: string[];
  isNewApplicant?: any;
  isNewUser: boolean;
  email: any;
  applicantId: string;
  isAdmin?: boolean;
};

const defaultUser = localStorage.getItem("student-info");

export const userAtom = atomWithStorage<UserData | undefined>(
  "student-info",
  JSON.parse(defaultUser!) ?? undefined
);
