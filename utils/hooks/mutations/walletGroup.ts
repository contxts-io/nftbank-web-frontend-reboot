import { insertMyWalletGroup } from "@/apis/walletGroup";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";

export function useMutationWalletGroup() {
  return useMutation<any,AxiosError,{name:string}>(
    (walletGroup) => insertMyWalletGroup(walletGroup),
    {
      useErrorBoundary: false,
    },
  );
}