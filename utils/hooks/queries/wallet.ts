import { TWalletList, getMyWalletList } from "@/apis/wallet";
import { TWallet } from "@/interfaces/inventory";
import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";

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