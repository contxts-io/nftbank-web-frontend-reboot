import { getMyWalletList } from "@/apis/wallet";
import { TWallet } from "@/interfaces/inventory";
import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";

export function useMyWalletList() {
  return useQuery<{data:TWallet[]},AxiosError>(
    ['walletList'],
    async () => {
      const result = await getMyWalletList();
  return result.data;
    },
    {
      staleTime: Infinity,
      cacheTime: Infinity,
      useErrorBoundary: false,
    },
  );
}