import { getWalletGroup, getWalletGroupList } from "@/apis/walletGroup";
import { TWalletGroup } from "@/interfaces/inventory";
import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";

export function useWalletGroupList(nickname:string | null) {
  return useQuery<{data:TWalletGroup[]},AxiosError>(
    ['groupList',nickname],
    async () => { 
      const result = await getWalletGroupList(nickname || '');
      return result.data;
    },
    {
      staleTime: Infinity,
      cacheTime: Infinity,
      useErrorBoundary: false,
      enabled : !!nickname,
    },
  );
}
export function useWalletGroup(param: {id:string, nickname: string}) {
  return useQuery<TWalletGroup,AxiosError>(
    ['group',param],
    async () => {
      const { data } = await getWalletGroup(param);
      return data.data;
    },
    {
      staleTime: Infinity,
      cacheTime: Infinity,
      useErrorBoundary: false,
      enabled: Boolean(param.id && param.id !== '' && param.nickname && param.nickname !== '')
    },
  );
}