import { USER_STORAGE_KEY } from './constants';

export const logout = () => {
  localStorage.removeItem(USER_STORAGE_KEY);
  window.location.href = '/';
};
