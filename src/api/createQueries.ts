import axiosInstance from '@/lib/axiosInstance';
import { QueryKey, queryOptions } from '@tanstack/react-query';

export const createQueries = <R>(
  baseURL: string,
  params?: Record<string, string | number>
) => ({
  all: () =>
    queryOptions({
      queryKey: params ? [`${baseURL}`, params] : ([`${baseURL}`] as QueryKey),
      queryFn: async (): Promise<R> => {
        const response = await axiosInstance.get<R>(`${baseURL}`, params);
        return response.data;
      },
    }),

  detail: (id: string) =>
    queryOptions({
      queryKey: [`${baseURL}`, id] as QueryKey,
      queryFn: async () => {
        const response = await axiosInstance.get<R>(`${baseURL}/${id}`);
        return response.data;
      },
    }),
});