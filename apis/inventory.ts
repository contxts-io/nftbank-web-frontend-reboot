import { AcquisitionType } from "@/interfaces/activity";
import { ValueNested } from "@/interfaces/collection";
import { IInventoryCollectionList, IInventoryItemList, InventoryValue, InventoryValueNested, IStat, PositionCollection, PositionCollectionAmount } from "@/interfaces/inventory";
import { BasicParam } from "@/interfaces/request";
import { TSummary, TUnrealized } from "@/interfaces/summary";
import { TToken } from "@/interfaces/token";
import { Paging, PagingCursor } from "@/interfaces/utils";
import { ItemParam, TAcquisitionParam, TAnalysisGainAndLossParam, TCollectionParam, TOverviewHistoricalValueParam } from "@/store/requestParam";
import instance from "@/utils/axiosInterceptor";
import { jsonToQueryString } from "@/utils/common";

export const getInventoryValue = async<T = InventoryValueNested>(searchParam: BasicParam | null): Promise<T> => {
  const query = jsonToQueryString(searchParam);
  const { data } = await instance.get<{data:T}>(`/inventory/value?${query}`);
  return data.data;
}
export const getCollectionValuableCount = async<T = IStat>(searchParam: BasicParam | null): Promise<T> => {
  const query = jsonToQueryString(searchParam);
  const { data } = await instance.get<{data:T}>(`/inventory/collection/stat?${query}`);
  return data.data;
}
export const getItemValuableCount = async<T = IStat>(searchParam: BasicParam | null): Promise<T> => {
  const query = jsonToQueryString(searchParam);
  const { data } = await instance.get<{data:T}>(`/inventory/token/stat?${query}`);
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
  // const query = jsonToQueryString(requestParam);
  const { data } = await instance.get<{data:T}>(`/inventory/collection?${query}`);
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
  console.log('getItemList query',query);
  // const { data } = await instance.get<{data:T}>(`/inventory/token?${query.replace('&&','&')}`);
  const { data } = await instance.post<{data:T}>(`/inventory/token`,requestParam);
  return data.data;
}
export const getSummaryTotalSpend = async<T = TSummary>(searchParam:BasicParam | null): Promise<T> => {
  const query = jsonToQueryString(searchParam);
  const {data} = await instance.get<{data:T}>(`/inventory/summary/total-spend?${query}`);
  return data.data;
} 
export const getSummaryGasSpend = async<T = TSummary>(searchParam:BasicParam | null): Promise<T> => {
  const query = jsonToQueryString(searchParam);
  const {data} = await instance.get<{data:T}>(`/inventory/summary/gas-spend?${query}`);
  return data.data;
}
export const getSummaryTotalSale = async<T = TSummary>(searchParam:BasicParam | null): Promise<T> => {
  const query = jsonToQueryString(searchParam);
  const {data} = await instance.get<{data:T}>(`/inventory/summary/total-sale?${query}`);
  return data.data;
}
export const getSummaryUnrealized = async<T = TUnrealized>(searchParam:BasicParam | null): Promise<T> => {
  const query = jsonToQueryString(searchParam);
  const {data} = await instance.get<{data:T}>(`/inventory/summary/unrealized?${query}`);
  return data.data;
}
export const getSummaryRealized = async<T = TSummary>(searchParam:BasicParam | null): Promise<T> => {
  const query = jsonToQueryString(searchParam);
  const {data} = await instance.get<{data:T}>(`/inventory/summary/realized?${query}`);
  return data.data;
}
export type TResponseInventoryValueHistory = { data: InventoryValue[],min: ValueNested, max:ValueNested };
type HistoryValueKey = keyof TOverviewHistoricalValueParam;
export const getInventoryValueHistory = async<T = TResponseInventoryValueHistory>(requestParam: TOverviewHistoricalValueParam): Promise<T> => {
  const query = Object.keys(requestParam)
  .filter(function(key) {
      return requestParam[key as HistoryValueKey] && requestParam[key as HistoryValueKey] !== ""; // 값이 있는 속성만 필터링
  })
    .map(function (key) {
      const value = requestParam[key as HistoryValueKey];
      if (Array.isArray(value)) {
        // 만약 값이 배열이면 요소를 쉼표로 연결하여 문자열로 변환
        return value.length > 0 ? `${encodeURIComponent(key)}=${value.map((v) => encodeURIComponent(v)).join(",")}`:'';
      } else {
        return `${encodeURIComponent(key)}=${encodeURIComponent(value as string)}`;
      }
  })
    .join('&');
  const {data} = await instance.get<{data:T}>(`/inventory/history?${query.replace('&&','&')}`);
  // const {data} = await instance.get<{data:T}>(`/inventory/value/history?walletAddress=0x7e0de483a33bd04d2efe38686be5cb25cfd3e533&networkId=ethereum&window=7d`);
  return data.data;
}
export const getInventoryCollectionPositionValue = async<T = { data: PositionCollection[] }>(requestParam: BasicParam): Promise<T> => {
  const query = jsonToQueryString(requestParam);
  const { data } = await instance.get<{ data: T }>(`/inventory/collection/position/value?${query}`);
  return data.data;
}
export const getInventoryCollectionPositionAmount = async<T = { data: PositionCollectionAmount[] }>(requestParam: BasicParam): Promise<T> => {
  const query = jsonToQueryString(requestParam);
  const { data } = await instance.get<{ data: T }>(`/inventory/collection/position/amount?${query}`);
  return data.data;
}
export type ResponseRealizedTokensData = {
  data: TToken[],
  processedAt: string,
  paging: PagingCursor,
}
type GainAndLossKey = keyof TAnalysisGainAndLossParam;
export const getInventoryRealizedTokens = async<T = ResponseRealizedTokensData>(requestParam: TAnalysisGainAndLossParam): Promise<T> => {
  // const query = Object.keys(requestParam)
  // .filter(function(key) {
  //     return requestParam[key as GainAndLossKey] && requestParam[key as GainAndLossKey] !== ""; // 값이 있는 속성만 필터링
  // })
  //   .map(function (key) {
  //     const value = requestParam[key as GainAndLossKey];
  //     if (Array.isArray(value)) {
  //       // 만약 값이 배열이면 요소를 쉼표로 연결하여 문자열로 변환
  //       return value.length > 0 ? `${encodeURIComponent(key)}=${value.map((v) => encodeURIComponent(v)).join(",")}`:'';
  //     } else {
  //       return `${encodeURIComponent(key)}=${encodeURIComponent(value as string)}`;
  //     }
  // })
  //   .join('&');
  const query = jsonToQueryString(requestParam);
  const { data } = await instance.get<{ data: T }>(`/inventory/realized/token?${query}`);
  return data.data;
}

export type ResponseAcquisitionTypesData = {
  data: AcquisitionType[],
  processedAt: string,
  paging: Paging,
}
type AcquisitionKey = keyof TAcquisitionParam;
export const getInventoryAcquisitionType = async<T = ResponseAcquisitionTypesData>(requestParam: TAcquisitionParam): Promise<T> => {
  const query = Object.keys(requestParam)
  .filter(function(key) {
      return requestParam[key as AcquisitionKey] && requestParam[key as AcquisitionKey] !== ""; // 값이 있는 속성만 필터링
  })
    .map(function (key) {
      const value = requestParam[key as AcquisitionKey];
      if (Array.isArray(value)) {
        // 만약 값이 배열이면 요소를 쉼표로 연결하여 문자열로 변환
        return value.length > 0 ? `${encodeURIComponent(key)}=${value.map((v) => encodeURIComponent(v)).join(",")}`:'';
      } else {
        return `${encodeURIComponent(key)}=${encodeURIComponent(value as string)}`;
      }
  })
    .join('&');
  const { data } = await instance.get<{ data: T }>(`/inventory/acquisition-type?${query.replace('&&','&')}`);
  return data.data;
}