import { getMyWalletGroup, getMyWalletGroupList } from "@/apis/walletGroup";
import { TWalletGroup } from "@/interfaces/inventory";
import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";

export function useMyWalletGroupList() {
  return useQuery<{data:TWalletGroup[]},AxiosError>(
    ['groupList'],
    async () => {
      const result = await getMyWalletGroupList();
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
  return useQuery<{data:TWalletGroup},AxiosError>(
    ['group',id],
    async () => {
      const result = await getMyWalletGroup(id);
  return result.data;
    },
    {
      staleTime: Infinity,
      cacheTime: Infinity,
      useErrorBoundary: false,
    },
  );
}