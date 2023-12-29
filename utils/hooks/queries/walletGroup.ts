import { getWalletGroup, getWalletGroupList } from "@/apis/walletGroup";
import { TWalletGroup } from "@/interfaces/inventory";
import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";

export function useWalletGroupList(nickname:string) {
  return useQuery<{data:TWalletGroup[]},AxiosError>(
    ['groupList',nickname],
    async () => {
      const result = await getWalletGroupList(nickname);
      return result.data;
    },
    {
      staleTime: Infinity,
      cacheTime: Infinity,
      useErrorBoundary: false,
    },
  );
}
export function useMyWalletGroup(id:string) {
  return useQuery<TWalletGroup,AxiosError>(
    ['group',id],
    async () => {
      const { data } = await getWalletGroup(id);
      return data.data;
    },
    {
      staleTime: Infinity,
      cacheTime: Infinity,
      useErrorBoundary: false,
    },
  );
}