import { TWalletList, getMyWalletList, getWalletList } from "@/apis/wallet";
import { portfolioUserAtom } from "@/store/portfolio";
import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useAtomValue } from "jotai";
import { useMe } from "./auth";

export function useMyWalletList(q?: string) {
  return useQuery<TWalletList,AxiosError>(
    ['myWalletList',q],
    async () => {
      const result = await getMyWalletList(q);
  return result;
    },
    {
      staleTime: Infinity,
      cacheTime: Infinity,
      useErrorBoundary: false,
      // enabled: q !== undefined && q !== '' && q.startsWith('0x') || (!q.startsWith('0x') && validationWalletAddress(q)),
    },
  );
}
export function useWalletList(param:{nickname:string}) {
  return useQuery<TWalletList,AxiosError>(
    ['walletList',param.nickname],
    async () => {
      const result = await getWalletList(param.nickname);
  return result;
    },
    {
      staleTime: Infinity,
      cacheTime: Infinity,
      useErrorBoundary: false,
    },
  );
}