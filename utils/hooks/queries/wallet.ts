import { TWalletList, getMyWalletList, getWalletList } from "@/apis/wallet";
import { portfolioUserAtom } from "@/store/portfolio";
import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useAtomValue } from "jotai";
import { useMe } from "./auth";
import { BasicParam } from "@/interfaces/request";

export function useMyWalletList(param?: BasicParam & {search?:string}) {
  const { data: me } = useMe();
  return useQuery<TWalletList,AxiosError>(
    ['myWalletList',param],
    async () => {
      const result = await getMyWalletList({...param, nickname: me?.nickname,networkId:'ethereum'});
  return result;
    },
    {
      staleTime: Infinity,
      cacheTime: Infinity,
      useErrorBoundary: false,
      enabled: Boolean(!!me && !!me.nickname && me.nickname !== ''),
      // enabled: q !== undefined && q !== '' && q.startsWith('0x') || (!q.startsWith('0x') && validationWalletAddress(q)),
    },
  );
}
export function useWalletList(param: BasicParam) {
  return useQuery<TWalletList,AxiosError>(
    ['walletList', param],
    async () => {
      const result = await getWalletList(param);
  return result;
    },
    {
      staleTime: Infinity,
      cacheTime: Infinity,
      useErrorBoundary: false,
      enabled: Boolean(!!param.nickname && param.nickname !== '')
    },
  );
}