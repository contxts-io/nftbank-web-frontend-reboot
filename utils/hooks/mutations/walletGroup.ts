import { UpsertWalletGroup, deleteMyWalletGroup, insertMyWalletGroup, updateMyWalletGroup } from "@/apis/walletGroup";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";

export function useMutationInsertWalletGroup() {
  return useMutation<any,AxiosError,UpsertWalletGroup>(
    (walletGroup) => insertMyWalletGroup(walletGroup),
    {
      useErrorBoundary: false,
    },
  );
}
export function useMutationUpsertWalletGroup() {
  return useMutation<any,AxiosError,UpsertWalletGroup & {id?:string}>(
    (walletGroup) => walletGroup.id ? updateMyWalletGroup(walletGroup as UpsertWalletGroup & {id:string}) : insertMyWalletGroup(walletGroup),
    {
      useErrorBoundary: false,
    },
  );
}
export function useMutationDeleteWalletGroup() {
  return useMutation<{ id: string }, AxiosError, { walletGroupId: string }>(
    (param) => deleteMyWalletGroup({id:param.walletGroupId}),
    {
      useErrorBoundary: false,
    },
  );
}