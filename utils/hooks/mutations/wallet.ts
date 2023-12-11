import { deleteMyWallet, insertMyWalletBulk, updateMyWallet } from "@/apis/wallet";
import { BasicWallet, TWallet } from "@/interfaces/inventory";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";

export function useMutationInsertWalletBulk() {
  return useMutation<any,AxiosError,BasicWallet[]>(
    (wallets) => insertMyWalletBulk(wallets),
    {
      useErrorBoundary: false,
    },
  );
}
export function useMutationUpdateWallet() {
  return useMutation<{ data: TWallet },AxiosError,{walletId:string,name:string}>(
    (wallet) => updateMyWallet(wallet),
    {
      useErrorBoundary: false,
    },
  );
}
export function useMutationDeleteWallet() {
  return useMutation<{ data: TWallet },AxiosError,{walletId:string}>(
    (wallet) => deleteMyWallet(wallet),
    {
      useErrorBoundary: false,
    },
  );
}