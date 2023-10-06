import { Collection, PerformanceValue, Token } from "./collection";
import { TCurrency } from "./constants";

export type IInventoryValue = {
  value: {
    eth: {
      amount: string,
      currency: TCurrency
      difference: {
        amount: string,
        percentage: number,
      }
    },
    usd: {
      amount: string,
      currency: TCurrency
      difference: {
        amount: string,
        percentage: number,
      }
    },
  },
  processedAt: string
}
export type IInventoryCollectionList = {
  collections: Collection[],
  paging: Paging,
  processedAt: string,
}
type CollectionPerformance = Collection & PerformanceValue;
export type IInventoryCollectionListPerformance = {
  collections: CollectionPerformance[],
  paging: Paging,
  processedAt: string,
}
export type IInventoryItemList = {
  tokens: Token[],
  paging: Paging,
  processedAt: string,
}
export type IStat = {
  totalCount: number, valuableCount: number, spamCount: number, processedAt: string
}