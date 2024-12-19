import axios from 'axios';
import { getAccessToken, _LOGIN_NEED_MESSAGE_ } from './storage/authStorage';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
  headers: {
    accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

const NO_TOKEN_ENDPOINTS = ['/auth/signUp', '/auth/signIn', '/oauthApps'];

axiosInstance.interceptors.request.use(
  (config) => {
    const token = getAccessToken();
    //dino@gmail.com, 12341234
    //임시 토큰
    // const token =
    //   'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NzMyLCJ0ZWFtSWQiOiIxMC0zIiwiaWF0IjoxNzM0NTEzNTUyLCJpc3MiOiJzcC1tb2dhem9hIn0.tbvOoiH-iTR1CZW5rhjJW5KSr2Go8cxGwqRWxLGwqZ8';

    if (!token && config.url && !NO_TOKEN_ENDPOINTS.includes(config.url)) {
      throw new Error(`Failed to getAccessToken(), ${_LOGIN_NEED_MESSAGE_}`);
    }

    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response?.status === 401) {
      throw new Error(error.response.data.message);
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
