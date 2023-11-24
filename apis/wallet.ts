import { TWallet } from "@/interfaces/inventory";
import { TSpam } from "@/interfaces/spam";
import instance from "@/utils/axiosInterceptor";

export const getMyWalletList = async<T = TWallet[]>() => {
  const {data} = await instance.get<{data: T}>('/wallet');
  return data.data;
}