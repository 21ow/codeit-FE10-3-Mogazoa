import axios from 'axios';
import { isAuthRequired, NO_TOKEN_ENDPOINTS } from '@/api/util/isAuthRequired';
const BASE_URL = 'https://mogazoa-api.vercel.app/10-33';

const _LOGIN_NEED_MESSAGE_ = '로그인이 필요한 서비스입니다.';

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
  headers: {
    accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    const path = config.url || '';
    const method = config?.method || '';

    if (config.data instanceof FormData) {
      config.headers['Content-Type'] = 'multipart/form-data';
      return config;
    }

    if (!isAuthRequired(path, method)) {
      return config;
    }

    const token = localStorage.getItem('signInToken');

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
