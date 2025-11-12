/* eslint-disable no-console */
import { atom } from 'jotai';
import { atomWithStorage } from 'jotai/utils';

type UserData = {
  token: string;
  expiration: string;
  role: string[];
  // isNewApplicant?: any;
  isNewUser: boolean;
  email: any;
  applicantId: string;
  isAdmin?: boolean;
};

const defaultUser = localStorage.getItem('student-info');

let parsedUser: UserData | undefined;

try {
  const storedData = defaultUser ? JSON.parse(defaultUser) : undefined;
  parsedUser = storedData && storedData.token ? storedData : undefined;
} catch (error) {
  console.error('Error parsing user data from localStorage:', error);
  parsedUser = undefined; // Fallback to undefined on parse failure
}

export const userAtom = atomWithStorage<UserData | undefined>('student-info', parsedUser);

export const isEditAtom = atom<boolean>(false);
