import { TWalletGroup } from "@/interfaces/inventory";
import instance from "@/utils/axiosInterceptor";

export const getMyWalletGroup = async<T = TWalletGroup>(id:string) => {
  const result = await instance.get<{data: T}>(`/wallet-group/${id}`);
  return result;
}
export const getMyWalletGroupList = async<T = { data: TWalletGroup[] }>() => {
  const result = await instance.get<{data: T}>('/wallet-group');
  return result.data;
}
export type UpsertWalletGroup = {name:string, walletIds:string[]}
export const insertMyWalletGroup = async(postData: UpsertWalletGroup) => {
  const result = await instance.post('/wallet-group',postData);
  return result.data;
}
export const updateMyWalletGroup = async(postData: UpsertWalletGroup & {id:string}) => {
  const result = await instance.put(`/wallet-group/${postData.id}`,postData);
  return result.data;
}