import { IInventoryCollectionList, IInventoryItemList, IInventoryValue } from "@/interfaces/inventory";
import { TCollectionParam } from "@/store/requestParam";
import instance from "@/utils/axiosInterceptor";

export const getInventoryValue = async<T=IInventoryValue> (): Promise<T> => {
  const { data } = await instance.get<T>('/inventory/value');
  console.log('getInventoryValue', data);
  return data;
}

type Key = keyof TCollectionParam;
export const getCollectionList = async<T = IInventoryCollectionList>(requestParam: TCollectionParam): Promise<T> => {
  const query = Object.keys(requestParam)
  .filter(function(key) {
      return requestParam[key as Key] !== ""; // 값이 있는 속성만 필터링
  })
  .map(function(key) {
      return encodeURIComponent(key) + '=' + encodeURIComponent(requestParam[key as Key]);
  })
  .join('&');
  const { data } = await instance.get<{data:T}>(`/inventory/collectionStats?${query}`);
  return data.data;
}
export const getItemList = async<T = IInventoryItemList>(requestParam: TCollectionParam): Promise<T> => {
  const { data } = await instance.get<{data:T}>(`/inventory/item`);
  return data.data;

}