import { IInventoryCollectionList, IInventoryItemList, IInventoryValue } from "@/interfaces/inventory";
import { ItemParam, TCollectionParam } from "@/store/requestParam";
import instance from "@/utils/axiosInterceptor";

export const getInventoryValue = async<T = IInventoryValue>(walletAddress?: string): Promise<T> => {
  const query = walletAddress ? `?walletAddress=${walletAddress}` : '';
  // const { data } = await instance.get<{data:T}>(`/inventory/value${query}`);
  const { data } = await instance.get<{data:T}>(`/performance/value${query}`);
  return data.data;
}
export const getCollectionValuableCount = async<T = { count: number }>(walletAddress?: string): Promise<T> => {
  const query = walletAddress ? `?walletAddress=${walletAddress}` : '';
  const { data } = await instance.get<{data:T}>(`/inventory/collection/stat${query}`);
  return data.data;
}
export const getItemValuableCount = async<T = { count: number }>(walletAddress?: string): Promise<T> => {
  const query = walletAddress ? `?walletAddress=${walletAddress}` : '';
  const { data } = await instance.get<{data:T}>(`/inventory/token/stat${query}`);
  return data.data;
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
  const { data } = await instance.get<{data:T}>(`/performance/collection?${query}`);
  return data.data;
}

type ItemKey = keyof ItemParam;
export const getItemList = async<T = IInventoryItemList>(requestParam: ItemParam): Promise<T> => {
  const query = Object.keys(requestParam)
  .filter(function(key) {
      return requestParam[key as ItemKey] && requestParam[key as ItemKey] !== ""; // 값이 있는 속성만 필터링
  })
    .map(function (key) {
      const value = requestParam[key as ItemKey];
      if (Array.isArray(value)) {
        // 만약 값이 배열이면 요소를 쉼표로 연결하여 문자열로 변환
        return value.length > 0 ? `${encodeURIComponent(key)}=${value.map((v) => encodeURIComponent(v)).join(",")}`:'';
      } else {
        return `${encodeURIComponent(key)}=${encodeURIComponent(value as string)}`;
      }
  })
    .join('&');
  console.log('query',query);
  const { data } = await instance.get<{data:T}>(`/performance/token?${query.replace('&&','&')}`);
  return data.data;

}