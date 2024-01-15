import { getUser } from "@/apis/user";
import { TUser } from "@/interfaces/user";
import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";

export function useUser(nickname:string | null) {
  return useQuery<TUser,AxiosError>(
    ['user',nickname],
    async () => {
      const result = await getUser(nickname as string);
  return result;
    },
    {
      staleTime: Infinity,
      cacheTime: Infinity,
      useErrorBoundary: false,
      enabled: !!nickname,
    },
  );
}