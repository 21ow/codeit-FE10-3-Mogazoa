import axios from 'axios';
import { BASE_URL } from '@/_constants/urls';

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    // const token = localStorage.getItem('accessToken');
    //임시 토큰
    const token =
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NzMyLCJ0ZWFtSWQiOiIxMC0zIiwiaWF0IjoxNzM0NTEzNTUyLCJpc3MiOiJzcC1tb2dhem9hIn0.tbvOoiH-iTR1CZW5rhjJW5KSr2Go8cxGwqRWxLGwqZ8';
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
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
      alert('로그인이 필요합니다.');
      // window.location.href = '/login'
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
