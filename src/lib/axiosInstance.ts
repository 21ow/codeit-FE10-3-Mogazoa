import axios from 'axios';
import { isAuthRequired } from '@/api/util/isAuthRequired';
import { getToken } from '@/lib/localStorage';

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
      throw new Error(error.response.data.message || 'Unauthorized');
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
