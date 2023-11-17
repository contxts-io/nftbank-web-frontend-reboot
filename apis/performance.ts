import { IInventoryCollectionList, IInventoryCollectionListPerformance, IInventoryItemList, InventoryValue, InventoryValueNested, PerformanceCollection, UnrealizedValue } from "@/interfaces/inventory";
import { TokenPerformance } from "@/interfaces/token";
import { Paging } from "@/interfaces/utils";
import { ItemParam, TCollectionParam } from "@/store/requestParam";
import instance from "@/utils/axiosInterceptor";

export const getInventoryUnrealizedPerformance = async<T = UnrealizedValue>(walletAddress?: string): Promise<T> => {
  const query = walletAddress ? `?walletAddress=${walletAddress}` : '';
  // const { data } = await instance.get<{data:T}>(`/inventory/value${query}`);
  const { data } = await instance.get<{data:T}>(`/performance/unrealized${query}`);
  return data.data;
}
export type PerformanceParam = {
  walletAddress: string;
  year: number;
  gnlChartType: 'overall' | 'realized' | 'unrealized';
}
type PerformanceParamKey = keyof PerformanceParam;
export const getPerformanceChart = async<T = { data: PerformanceCollection[] }>(requestParam: PerformanceParam): Promise<T> => {
  console.log('getPerformanceChart requestParam',requestParam)
  const query = Object.keys(requestParam)
  .filter(function(key) {
      return requestParam[key as PerformanceParamKey] && requestParam[key as PerformanceParamKey] !== ""; // 값이 있는 속성만 필터링
  })
    .map(function (key) {
      const value = requestParam[key as PerformanceParamKey];
      if (Array.isArray(value)) {
        // 만약 값이 배열이면 요소를 쉼표로 연결하여 문자열로 변환
        return value.length > 0 ? `${encodeURIComponent(key)}=${value.map((v) => encodeURIComponent(v)).join(",")}`:'';
      } else {
        return `${encodeURIComponent(key)}=${encodeURIComponent(value as string)}`;
      }
  })
    .join('&');
    console.log('getPerformanceChart query',query);
  const { data } = await instance.get<{data:T}>(`/performance/chart?${query.replace('&&','&')}`);
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
