import axios from 'axios';
import { isAuthRequired, NO_TOKEN_ENDPOINTS } from '@/api/util/isAuthRequired';
import { getToken } from '@/store/useAuthStore';
import { LOGIN_NEED_MESSAGE } from '@/constant/message';

const BASE_URL = 'https://mogazoa-api.vercel.app/10-33';

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
    }

    if (isAuthRequired(path, method)) {
      const token = getToken();

      if (!token && !NO_TOKEN_ENDPOINTS.includes(path)) {
        throw new Error(`${LOGIN_NEED_MESSAGE}`);
      }

      if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
      }
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
      throw new Error(error.response.data.message || 'Unauthorized');
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
