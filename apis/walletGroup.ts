import { TWalletGroup } from "@/interfaces/inventory";
import instance from "@/utils/axiosInterceptor";

export const getMyWalletGroup = async<T = { data: TWalletGroup }>(id:string) => {
  const result = await instance.get<{data: T}>(`/wallet-group/${id}`);
  return result.data;
}
export const getMyWalletGroupList = async<T = { data: TWalletGroup[] }>() => {
  const result = await instance.get<{data: T}>('/wallet-group');
  return result.data;
}
export const insertMyWalletGroup = async(postData:{name:string}) => {
  const result = await instance.post('/wallet-group',postData);
  return result.data;
}