import { BasicWallet, TWallet } from "@/interfaces/inventory";
import { TSpam } from "@/interfaces/spam";
import { Paging } from "@/interfaces/utils";
import instance from "@/utils/axiosInterceptor";
import { jsonToQueryString } from "@/utils/common";

export type TWalletList = {
  data: TWallet[],
  paging: Paging,
}
export type SearchParam = {
  name?: string,
  walletAddress?: string,
}
export const getMyWalletList = async<T = TWalletList>(q?:string) => {
  // const query = jsonToQueryString(searchParam);
  const {data} = await instance.get<{data: T}>(`/wallet${q ? `?q=${q}` : ''}`);
  return data.data;
}
export const getWalletList = async<T = TWalletList>(searchParam: { nickname: string }) => {
  const query = jsonToQueryString(searchParam);
  const {data} = await instance.get<{data: T}>(`/wallet?${query}`);
  return data.data;
}
export const updateMyWallet = async<T = { data: TWallet }>(data: {walletId:string,name:string}) => {
  const result = await instance.put<{ data: T }>(`/wallet/${data.walletId}`, {name:data.name});
  return result.data;
}
export const deleteMyWallet = async<T = { data: TWallet }>(data: {walletId:string}) => {
  const result = await instance.delete<{ data: T }>(`/wallet/${data.walletId}`);
  return result.data;
}
export const insertMyWalletBulk = async<T = { data: TWallet[] }>(data: BasicWallet[]) => {
  const result = await instance.post<{ data: T }>('/wallet/bulk', data);
  return result.data;
}
export const verifyWalletAddress = async<T = { data: {verified: boolean, processedAt: string} }>(walletAddress:string) => {
  const result = await instance.get<T>(`/verifyWalletAddress?walletAddress=${walletAddress}`);
  return result.data;
}