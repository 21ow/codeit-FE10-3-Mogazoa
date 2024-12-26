import axiosInstance from '@/lib/axiosInstance';
import { AxiosResponse, AxiosError } from 'axios';

type GenerateUrlProps = {
  apiConfig: {
    url: string | ((...params: string[]) => string);
  };
  params?: Record<string, string>;
};

type createRequestProps = {
  method: 'get' | 'post' | 'patch' | 'delete';
  url: string;
  data?: Record<string, string | number>;
};

export const generateUrl = ({ apiConfig, params }: GenerateUrlProps) => {
  if (typeof apiConfig.url === 'function') {
    return apiConfig.url(...Object.values(params || {}));
  }

  return apiConfig.url;
};

export const createRequest = async <T>({
  method,
  url,
  data,
}: createRequestProps): Promise<AxiosResponse<T>> => {
  const response = await axiosInstance({ method, url, data });
  return response;
};

export const onError = (error: AxiosError) => {
  if (error?.response?.status === 500) {
    alert('서버에 문제가 발생했습니다. 잠시 후 다시 시도해 주세요.');
  } else if (error?.response?.status === 404) {
    alert('요청한 데이터가 없습니다.');
  } else {
    alert('예기치 못한 오류가 발생했습니다.');
  }
};
