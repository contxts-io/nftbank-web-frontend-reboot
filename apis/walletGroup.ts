import { TWalletGroup } from "@/interfaces/inventory";
import instance from "@/utils/axiosInterceptor";

export const getWalletGroup = async<T = TWalletGroup>(param: {id: string, nickname: string}) => {
  const result = await instance.get<{data: T}>(`/wallet-group/${param.id}?nickname=${param.nickname}`);
  return result;
}
export const getWalletGroupList = async<T = { data: TWalletGroup[] }>(nickname: string) => {
  const query = nickname ? `?nickname=${nickname}` : '';
  const result = await instance.get<{data: T}>(`/wallet-group${query}`);
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
export const deleteMyWalletGroup = async(postData: {id:string}) => {
  const result = await instance.delete(`/wallet-group/${postData.id}`);
  return result.data;
}