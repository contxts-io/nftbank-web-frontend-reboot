import { getUser } from "@/apis/user";
import { TWalletList, getMyWalletList } from "@/apis/wallet";
import { TUser } from "@/interfaces/user";
import { validationWalletAddress } from "@/utils/common";
import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";

export function useUser(nickname?:string) {
  return useQuery<TUser,AxiosError>(
    ['user',nickname],
    async () => {
      const result = await getUser(nickname);
  return result;
    },
    {
      staleTime: Infinity,
      cacheTime: Infinity,
      useErrorBoundary: false,
    },
  );
}