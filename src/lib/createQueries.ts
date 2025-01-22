import axiosInstance from '@/lib/axiosInstance';
import { QueryClient, QueryKey, queryOptions } from '@tanstack/react-query';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchInterval: 5000,
      refetchIntervalInBackground: true,
    },
  },
});

export const createQueries = <R, P>(baseURL: string, params?: P) => ({
  all: () => {
    const queryKey: QueryKey = params ? [`${baseURL}`, params] : [`${baseURL}`];

    return queryOptions({
      queryKey: queryKey,
      queryFn: async (): Promise<R> => {
        const response = await axiosInstance.get<R>(`${baseURL}`, { params });
        return response.data;
      },
      initialData: () => {
        const cachedData = queryClient.getQueryData<R>(queryKey);
        return cachedData || ([] as R);
      },
    });
  },

  detail: (id: string) => {
    const queryKey: QueryKey = params
      ? [`${baseURL}`, id, params]
      : [`${baseURL}`, id];

    return queryOptions({
      queryKey: queryKey,
      queryFn: async () => {
        const response = await axiosInstance.get<R>(`${baseURL}/${id}`);
        return response.data;
      },
      initialData: () => {
        const cachedData = queryClient.getQueryData<R>(queryKey);
        return cachedData || ([] as R);
      },
    });
  },
});
