import { getMe } from "@/apis/auth";
import { AxiosError } from "axios";
import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import { TMe } from "@/interfaces/user";

export function useMe() {
  return useQuery<TMe,AxiosError>(
    ['me'],
    async () => {
      const { data } = await getMe();
      return data.data;
    },
    {
      retry: 1,
      staleTime: Infinity,
      cacheTime: Infinity,
      useErrorBoundary: false,
      refetchOnWindowFocus: false, 
    },
  );
}
export function useMeManual() {
  return useQuery<TMe,AxiosError>(
    ['me'],
    async () => {
      const { data } = await getMe();
      return data.data;
    },
    {
      staleTime: Infinity,
      cacheTime: Infinity,
      useErrorBoundary: false,
      enabled: false,
      refetchOnWindowFocus: false, 
    },
  );
}