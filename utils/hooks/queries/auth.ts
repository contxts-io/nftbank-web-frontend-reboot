import { getMe } from "@/apis/auth";
import { AxiosError } from "axios";
import { useInfiniteQuery, useQuery } from '@tanstack/react-query';

export function useMe() {
  return useQuery<any,AxiosError>(
    ['me'],
    async () => {
      const { data } = await getMe();
      return data.data;
    },
    {
      staleTime: Infinity,
      cacheTime: Infinity,
      useErrorBoundary: false,
    },
  );
}