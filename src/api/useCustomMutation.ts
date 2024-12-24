'use client';

import apiEndpoints from './apiEndpoints';
import { createRequest, onError, generateUrl } from './util/httpUtils';
import { useMutation } from 'react-query';

const useCustomMutation = (
  endpointKey: string,
  method: 'post' | 'patch' | 'delete',
  params?: Record<string, string>,
  data?: Record<string, object>
) => {
  const endpoint = apiEndpoints[endpointKey];
  const apiConfig = endpoint[method];

  if (!apiConfig) {
    throw new Error(`Invalid API configuration for ${endpointKey}.${method}`);
  }

  const url = generateUrl({ apiConfig, params });

  const fetchData = async <T>(): Promise<T> => {
    const response = await createRequest<T>({ method, url, data });
    return response?.data;
  };

  const mutationOptions = {
    onError,
  };

  return useMutation(fetchData, mutationOptions);
};

export default useCustomMutation;
