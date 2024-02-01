import { IInventoryCollectionList, IInventoryCollectionListPerformance, IInventoryItemList, InventoryValue, InventoryValueNested, PerformanceCollection, UnrealizedValue } from "@/interfaces/inventory";
import { BasicParam } from "@/interfaces/request";
import { TokenPerformance } from "@/interfaces/token";
import { Paging } from "@/interfaces/utils";
import { ItemParam, TCollectionParam } from "@/store/requestParam";
import instance from "@/utils/axiosInterceptor";
import { jsonToQueryString } from "@/utils/common";

export const getInventoryUnrealizedPerformance = async<T = UnrealizedValue>(requestParam: BasicParam): Promise<T> => {
  const query = jsonToQueryString(requestParam);
  // const { data } = await instance.get<{data:T}>(`/inventory/value${query}`);
  const { data } = await instance.get<{data:T}>(`/performance/unrealized?${query}`);
  return data.data;
}
export type PerformanceParam = {
  year: number | 'all';
  gnlChartType: 'overall' | 'realized' | 'unrealized';
}
type PerformanceParamKey = keyof PerformanceParam;
export const getPerformanceChart = async<T = { data: PerformanceCollection[] }>(requestParam: PerformanceParam & BasicParam): Promise<T> => {
  // const query = Object.keys(requestParam)
  // .filter(function(key) {
  //     return requestParam[key as PerformanceParamKey] && requestParam[key as PerformanceParamKey] !== ""; // 값이 있는 속성만 필터링
  // })
  //   .map(function (key) {
  //     const value = requestParam[key as PerformanceParamKey];
  //     if (Array.isArray(value)) {
  //       // 만약 값이 배열이면 요소를 쉼표로 연결하여 문자열로 변환
  //       return value.length > 0 ? `${encodeURIComponent(key)}=${value.map((v) => encodeURIComponent(v)).join(",")}`:'';
  //     } else {
  //       return `${encodeURIComponent(key)}=${encodeURIComponent(value as string)}`;
  //     }
  // })
  //   .join('&');
  const query = jsonToQueryString(requestParam);
  const { data } = await instance.get<{data:T}>(`/performance/chart?${query}`);
return data.data;
}

type AnnualParam = {
  window?: string;
}
type AnnualParamKey = keyof AnnualParam;
export const getPerformanceChartAnnual = async<T = { data: PerformanceCollection }>(requestParam: AnnualParam & BasicParam): Promise<T> => {
  // const query = Object.keys(requestParam)
  // .filter(function(key) {
  //     return requestParam[key as AnnualParamKey] && requestParam[key as AnnualParamKey] !== ""; // 값이 있는 속성만 필터링
  // })
  //   .map(function (key) {
  //     const value = requestParam[key as AnnualParamKey];
  //     if (Array.isArray(value)) {
  //       // 만약 값이 배열이면 요소를 쉼표로 연결하여 문자열로 변환
  //       return value.length > 0 ? `${encodeURIComponent(key)}=${value.map((v) => encodeURIComponent(v)).join(",")}`:'';
  //     } else {
  //       return `${encodeURIComponent(key)}=${encodeURIComponent(value as string)}`;
  //     }
  // })
  //   .join('&');
  const query = jsonToQueryString(requestParam);
  const result = await instance.get<T>(`/performance/chart/annual?${query}`);
  console.log('annual query',result);
return result.data;
}
