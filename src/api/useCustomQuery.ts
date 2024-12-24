'use client';

import apiEndpoints from './apiEndpoints';
import { createRequest, onError, generateUrl } from './util/httpUtils';
import webStorage from '../util/webStorage';
import { useQuery } from 'react-query';

const useCustomQuery = <T>(
  endpointKey: string,
  params?: Record<string, string>
) => {
  const endpoint = apiEndpoints[endpointKey];
  const apiConfig = endpoint['get'];

  if (!apiConfig) {
    throw new Error(`Invalid API configuration for ${endpointKey}.get`);
  }

  const url = generateUrl({ apiConfig, params });

  const fetchData = async <T>(): Promise<T> => {
    const response = await createRequest<T>({ method: 'get', url });
    return response?.data;
  };

  const storageType = apiConfig.storageType;
  const storageKey = apiConfig.storageKey;
  const queryKey = [...url.matchAll(/\$\{(.*?)\}/g)].map((match) => match[1]);

  const queryOptions = {
    onSuccess: (data: T) => {
      if (storageKey && storageType) {
        webStorage.setItem(storageKey, data, storageType);
      }
    },
    onError,
    initialData:
      storageKey && storageType
        ? webStorage.getItem(storageKey, storageType)
        : undefined,
  };

  return useQuery(queryKey, fetchData, queryOptions);
};

export default useCustomQuery;
