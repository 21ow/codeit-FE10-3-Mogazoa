import axiosInstance from '@/lib/axiosInstance';
import { QueryClient, QueryKey, queryOptions } from '@tanstack/react-query';

const queryClient = new QueryClient();

export const createQueries = <R, P>(baseURL: string, params?: P) => ({
  all: () => {
    const queryKey = params ? [`${baseURL}`, params] : [`${baseURL}`];

    return queryOptions({
      queryKey: queryKey,
      queryFn: async (): Promise<R> => {
        const response = await axiosInstance.get<R>(`${baseURL}`, { params });
        return response.data;
      },
      initialData: () => {
        const cachedData = queryClient.getQueryData<R>(queryKey);
        return cachedData;
      },
      staleTime: 10000,
      refetchIntervalInBackground: true,
    });
  },

  detail: (id: string) => {
    return queryOptions({
      queryKey: [`${baseURL}`, id] as QueryKey,
      queryFn: async () => {
        const response = await axiosInstance.get<R>(`${baseURL}/${id}`);
        return response.data;
      },
    });
  },
});
