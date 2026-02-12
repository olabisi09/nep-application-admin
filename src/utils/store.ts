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

const parseStoredUser = (): UserData | undefined => {
  if (!defaultUser || defaultUser === 'undefined' || defaultUser === 'null') {
    return undefined;
  }

  try {
    const storedData = JSON.parse(defaultUser);
    return storedData && storedData.token ? storedData : undefined;
  } catch (error) {
    console.error('Error parsing user data from localStorage:', error);
    return undefined;
  }
};

const parsedUser = parseStoredUser();

export const userAtom = atomWithStorage<UserData | undefined>(USER_STORAGE_KEY, parsedUser);

export const isEditAtom = atom<boolean>(false);
