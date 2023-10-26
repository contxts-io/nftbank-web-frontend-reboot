import { AcquisitionType } from "@/interfaces/activity";
import { TValue, Token } from "@/interfaces/collection";
import { IInventoryCollectionList, IInventoryItemList, IInventoryValue, IStat, PositionCollection } from "@/interfaces/inventory";
import { TSummary, TUnrealized } from "@/interfaces/summary";
import { TToken } from "@/interfaces/token";
import { Paging, PagingCursor } from "@/interfaces/utils";
import { ItemParam, TCollectionParam } from "@/store/requestParam";
import instance from "@/utils/axiosInterceptor";

export const getInventoryValue = async<T = IInventoryValue>(walletAddress?: string): Promise<T> => {
  const query = walletAddress ? `?walletAddress=${walletAddress}` : '';
  const { data } = await instance.get<{data:T}>(`/inventory/value${query}`);
  return data.data;
}
export const getCollectionValuableCount = async<T = IStat>(walletAddress?: string): Promise<T> => {
  const query = walletAddress ? `?walletAddress=${walletAddress}` : '';
  const { data } = await instance.get<{data:T}>(`/inventory/collection/stat${query}`);
  return data.data;
}
export const getItemValuableCount = async<T = IStat>(walletAddress?: string): Promise<T> => {
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
  const { data } = await instance.get<{data:T}>(`/inventory/token?${query.replace('&&','&')}`);
  return data.data;
}
export const getSummaryTotalSpend = async<T = TSummary>(walletAddress?: string): Promise<T> => {
  const {data} = await instance.get<{data:T}>(`/inventory/summary/total-spend?walletAddress=${walletAddress}`);
  return data.data;
}
export const getSummaryGasSpend = async<T = TSummary>(walletAddress?: string): Promise<T> => {
  const {data} = await instance.get<{data:T}>(`/inventory/summary/gas-spend?walletAddress=${walletAddress}`);
  return data.data;
}
export const getSummaryTotalSale = async<T = TSummary>(walletAddress?: string): Promise<T> => {
  const {data} = await instance.get<{data:T}>(`/inventory/summary/total-sale?walletAddress=${walletAddress}`);
  return data.data;
}
export const getSummaryUnrealized = async<T = TUnrealized>(walletAddress?: string): Promise<T> => {
  const {data} = await instance.get<{data:T}>(`/inventory/summary/unrealized?walletAddress=${walletAddress}`);
  return data.data;
}
export const getSummaryRealized = async<T = TSummary>(walletAddress?: string): Promise<T> => {
  const {data} = await instance.get<{data:T}>(`/inventory/summary/realized?walletAddress=${walletAddress}`);
  return data.data;
}
export type TResponseInventoryValueHistory = { data: IInventoryValue[],min: TValue, max:TValue };
export const getInventoryValueHistory = async<T =TResponseInventoryValueHistory>(period?: string): Promise<T> => {
  const {data} = await instance.get<{data:T}>(`/inventory/value/history`);
  return data.data;
}
export const getInventoryCollectionPositionValue = async<T ={data: PositionCollection[]}>(walletAddress?: string): Promise<T> => {
  const { data } = await instance.get<{ data: T }>(`/inventory/collection/position/value?walletAddress=${walletAddress}`);
  return data.data;
}
export type ResponseRealizedTokensData = {
  data: TToken[],
  processedAt: string,
  paging: PagingCursor,
}
export const getInventoryRealizedTokens = async<T = ResponseRealizedTokensData>(requestParam?: any): Promise<T> => {
  const { data } = await instance.get<{ data: T }>(`/inventory/realized/token`);
  return data.data;
}

export type ResponseAcquisitionTypesData = {
  data: AcquisitionType[],
  processedAt: string,
  paging: Paging,
}
export const getInventoryAcquisitionType = async<T = ResponseAcquisitionTypesData>(requestParam?: any): Promise<T> => {
  const { data } = await instance.get<{ data: T }>(`/inventory/acquisition-type`);
  return data.data;
}