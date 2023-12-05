import { TWallet } from "@/interfaces/inventory";
import { TSpam } from "@/interfaces/spam";
import { Paging } from "@/interfaces/utils";
import instance from "@/utils/axiosInterceptor";

export type TWalletList = {
  data: TWallet[],
  paging: Paging,
}
export const getMyWalletList = async<T = TWalletList>() => {
  const {data} = await instance.get<{data: T}>('/wallet');
  return data.data;
}
export const updateMyWalletBulk = async<T = { data: TWallet[] }>(data: TWallet[]) => {
  const result = await instance.put<{ data: T }>('/wallet/bulk', data);
  return result.data;
}