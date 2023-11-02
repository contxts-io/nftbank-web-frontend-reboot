import { IInventoryCollectionList, IInventoryCollectionListPerformance, IInventoryItemList, InventoryValue, InventoryValueNested, PerformanceCollection, UnrealizedValue } from "@/interfaces/inventory";
import { TokenPerformance } from "@/interfaces/token";
import { Paging } from "@/interfaces/utils";
import { ItemParam, TCollectionParam } from "@/store/requestParam";
import instance from "@/utils/axiosInterceptor";

export const getInventoryValuePerformance = async<T = InventoryValueNested>(walletAddress?: string): Promise<T> => {
  const query = walletAddress ? `?walletAddress=${walletAddress}` : '';
  // const { data } = await instance.get<{data:T}>(`/inventory/value${query}`);
  const { data } = await instance.get<{data:T}>(`/performance/value${query}`);
  return data.data;
}
export const getInventoryUnrealizedPerformance = async<T = UnrealizedValue>(walletAddress?: string): Promise<T> => {
  const query = walletAddress ? `?walletAddress=${walletAddress}` : '';
  // const { data } = await instance.get<{data:T}>(`/inventory/value${query}`);
  const { data } = await instance.get<{data:T}>(`/performance/unrealized${query}`);
  return data.data;
}
type Key = keyof TCollectionParam;
export const getCollectionListPerformance = async<T = IInventoryCollectionListPerformance>(requestParam: TCollectionParam): Promise<T> => {
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
type ItemPerformanceList = {
  data: TokenPerformance[];
  paging: Paging;
  processedAt: string;
}
export const getItemListPerformance = async<T = ItemPerformanceList>(requestParam: ItemParam): Promise<T> => {
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
    console.log('getItemListPerformance query',query);
  const { data } = await instance.get<{data:T}>(`/performance/token?${query.replace('&&','&')}`);
  return data.data;
}

export const getPerformanceChart = async<T = {data: PerformanceCollection[]}>(walletAddress: string): Promise<T> => {
  const { data } = await instance.get<{data:T}>(`/performance/chart?walletAddress=${walletAddress}`);
return data.data;
}

type AnnualParam = {
  walletAddress: string;
  window?: string;
}
type AnnualParamKey = keyof AnnualParam;
export const getPerformanceChartAnnual = async<T = { data: PerformanceCollection }>(requestParam: AnnualParam): Promise<T> => {
  const query = Object.keys(requestParam)
  .filter(function(key) {
      return requestParam[key as AnnualParamKey] && requestParam[key as AnnualParamKey] !== ""; // 값이 있는 속성만 필터링
  })
    .map(function (key) {
      const value = requestParam[key as AnnualParamKey];
      if (Array.isArray(value)) {
        // 만약 값이 배열이면 요소를 쉼표로 연결하여 문자열로 변환
        return value.length > 0 ? `${encodeURIComponent(key)}=${value.map((v) => encodeURIComponent(v)).join(",")}`:'';
      } else {
        return `${encodeURIComponent(key)}=${encodeURIComponent(value as string)}`;
      }
  })
    .join('&');
  const result = await instance.get<T>(`/performance/chart/annual?${query.replace('&&','&')}`);
  console.log('annual query',result);
return result.data;
}
