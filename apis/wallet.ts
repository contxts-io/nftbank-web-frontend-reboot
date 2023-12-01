import { TWallet } from "@/interfaces/inventory";
import instance from "@/utils/axiosInterceptor";

export const getMyWalletList = async<T = { data: TWallet[] }>() => {
  const result = await instance.get<{data: T}>('/wallet');
  return result.data;
}
export const updateMyWalletBulk = async<T = { data: TWallet[] }>(data: TWallet[]) => {
  const result = await instance.put<{data: T}>('/wallet/bulk', data);
  return result.data;
}