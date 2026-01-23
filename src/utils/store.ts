/* eslint-disable no-console */
import { atom } from 'jotai';
import { atomWithStorage } from 'jotai/utils';
import { USER_STORAGE_KEY } from './constants';

export type UserData = {
  token: string;
  expiration: string;
  role: string[];
  // isNewApplicant?: any;
  isNewUser: boolean;
  email: any;
  applicantId: string;
  isAdmin?: boolean;
  institutionShortName?: string;
};

const defaultUser = localStorage.getItem(USER_STORAGE_KEY);

let parsedUser: UserData | undefined;

try {
  const storedData = defaultUser ? JSON.parse(defaultUser) : undefined;
  parsedUser = storedData && storedData.token ? storedData : undefined;
} catch (error) {
  console.error('Error parsing user data from localStorage:', error);
  parsedUser = undefined; // Fallback to undefined on parse failure
}

export const userAtom = atomWithStorage<UserData | undefined>(USER_STORAGE_KEY, parsedUser);

export const isEditAtom = atom<boolean>(false);
