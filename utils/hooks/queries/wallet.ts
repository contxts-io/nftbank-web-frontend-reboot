import { TWalletList, getMyWalletList } from "@/apis/wallet";
import { TWallet } from "@/interfaces/inventory";
import { userStatusAtom } from "@/store/account";
import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useAtomValue } from "jotai";

export function useMyWalletList() {
  return useQuery<TWalletList,AxiosError>(
    ['walletList'],
    async () => {
      const result = await getMyWalletList();
      return result;
    },
    {
      staleTime: Infinity,
      cacheTime: Infinity,
      useErrorBoundary: false,
    },
  );
}