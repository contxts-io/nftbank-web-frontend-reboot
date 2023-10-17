import { IInventoryCollectionList, IInventoryItemList, IInventoryValue, IStat } from "@/interfaces/inventory";
import { TokenHistory, ValuationEdit } from "@/interfaces/valuation";
import { ItemParam, TCollectionParam } from "@/store/requestParam";
import instance from "@/utils/axiosInterceptor";

export type TokenParam = {
  networkId: string,
  assetContract: string,
  tokenId: number,
}
type Key = keyof TokenParam;
export const getValuationTokenHistory = async<T = TokenHistory>(requestParam:TokenParam): Promise<T> => {
  const query = Object.keys(requestParam)
  .filter(function(key) {
      return requestParam[key as Key] !== ""; // 값이 있는 속성만 필터링
  })
  .map(function(key) {
      return encodeURIComponent(key) + '=' + encodeURIComponent(requestParam[key as Key]);
  })
  .join('&');
  const { data } = await instance.get<{ data: { data: T } }>(`/valuation/token/history?${query}&interval=daily&window=30d&limit=30
  `);
  return data.data.data;
}

export const insertCustomValuations = async (valuations: ValuationEdit[]) => {
  const result = await instance.post<{ data: { data: ValuationEdit[] } }>('/valuation/custom/bulk', valuations);
  console.log('insertCustomValuations', result)
  return result;
}