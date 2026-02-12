import axios, { AxiosInstance } from 'axios';
import { USER_STORAGE_KEY } from './constants';
import { UserData } from './store';

const institution = process.env.REACT_APP_INSTITUTION_NAME || 'JHU';

export const api: AxiosInstance = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
  env: {
    // The FormData class to be used to automatically serialize the payload into a FormData object
    FormData: globalThis?.FormData,
  },
});

// Helper function to safely parse user data from localStorage
const getStoredUserData = (): UserData | undefined => {
  const stored = localStorage.getItem(USER_STORAGE_KEY);
  if (!stored || stored === 'undefined' || stored === 'null') {
    return undefined;
  }
  try {
    return JSON.parse(stored) as UserData;
  } catch (error) {
    console.error('Error parsing user data from localStorage:', error);
    return undefined;
  }
};

// Set up axios request interceptors
api.interceptors.request.use(
  function (config) {
    let token = '';
    if (typeof (config?.headers as any).authorization === 'undefined') {
      const tokenModel = getStoredUserData();

      if (tokenModel?.token) {
        token = tokenModel?.token;
      }
    }
    config.headers = {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
      'X-Institution': institution,
      ...config.headers,
    } as any;

    if (config.method === 'post' || config.method === 'put') {
      const tokenModel = getStoredUserData();
      if (tokenModel?.institutionShortName) {
        if (config.data instanceof FormData) {
          config.data.append('InstitutionShortName', tokenModel?.institutionShortName || '');
        } else if (typeof config.data === 'object' && config.data !== null) {
          config.data.institutionShortName = tokenModel?.institutionShortName || '';
        }
      }
    }

    return config;
  },
  function (error: any) {
    if (getOnlineStatus() === 'offline') {
      error = { message: 'You are currently offline. Kindly turn on your network or try again' };
      return Promise.reject(error);
    }
  },
);

api.interceptors.response.use(null, function (error) {
  //   if (error?.response?.status === 401 || error?.response?.status === 403) {
  //   }

  return Promise.reject(error);
});

function getOnlineStatus() {
  return navigator.onLine ? 'online' : 'offline';
}

window.addEventListener('offline', getOnlineStatus);
window.addEventListener('online', getOnlineStatus);

export default api;
