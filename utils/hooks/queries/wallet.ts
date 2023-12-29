import { TWalletList, getMyWalletList, getWalletList } from "@/apis/wallet";
import { validationWalletAddress } from "@/utils/common";
import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";

export function useMyWalletList(q?: string) {
  return useQuery<TWalletList,AxiosError>(
    ['myWalletList',q],
    async () => {
      const result = await getMyWalletList(q as string);
  return result;
    },
    {
      staleTime: Infinity,
      cacheTime: Infinity,
      useErrorBoundary: false,
      enabled: q == undefined || q == '' || !q.startsWith('0x') ||(q.startsWith('0x') && validationWalletAddress(q)),
    },
  );
}
export function useWalletList(param:{nickname:string}) {
  return useQuery<TWalletList,AxiosError>(
    ['walletList',param],
    async () => {
      const result = await getWalletList(param);
  return result;
    },
    {
      staleTime: Infinity,
      cacheTime: Infinity,
      useErrorBoundary: false,
    },
  );
}