import { updateMyWalletBulk } from "@/apis/wallet";
import { insertMyWalletGroup } from "@/apis/walletGroup";
import { TWallet } from "@/interfaces/inventory";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";

export function useMutationWalletBulk() {
  return useMutation<any,AxiosError,TWallet[]>(
    (wallets) => updateMyWalletBulk(wallets),
    {
      useErrorBoundary: false,
    },
  );
}