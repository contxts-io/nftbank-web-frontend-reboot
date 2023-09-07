import { IInventoryCollectionList, IInventoryValue } from "@/interfaces/inventory";
import { TCollectionParam } from "@/store/requestParam";
import instance from "@/utils/axiosInterceptor";

export const getInventoryValue = async<T=IInventoryValue> (): Promise<T> => {
  const { data } = await instance.get<T>('/inventory/value');
  console.log('getInventoryValue', data);
  return data;
}

export const getCollectionList =  async<T=IInventoryCollectionList> (requestParam:TCollectionParam): Promise<T>  => {
  const { data } = await instance.get<T>('/inventory/collectionStats');
  console.log('getCollectionList', data);
  return data;
}