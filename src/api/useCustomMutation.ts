'use client';

import apiEndpoints from './apiEndpoints';
import { createRequest, onError, generateUrl } from './util/httpUtils';
import { useMutation } from 'react-query';

const useCustomMutation = <T>(
  endpointKey: string,
  method: 'post' | 'patch' | 'delete',
  data: Record<string, string | number>,
  params?: Record<string, string>
) => {
  const endpoint = apiEndpoints[endpointKey];
  const apiConfig = endpoint[method];

  if (!apiConfig) {
    throw new Error(`Invalid API configuration for ${endpointKey}.${method}`);
  }

  const url = generateUrl({ apiConfig, params });

  const fetchData = async (): Promise<T> => {
    const response = await createRequest<T>({ method, url, data });
    return response?.data;
  };

  const mutationOptions = {
    onError,
  };

  return useMutation(fetchData, mutationOptions);
};

export default useCustomMutation;
