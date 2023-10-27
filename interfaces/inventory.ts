import { Collection, PerformanceValue, TDifference, TValue, Token, Value } from "./collection";
import { TChain } from "./constants";
import { Paging } from "./utils";

export type IInventoryValue = {
  value: {
    eth: {
      amount: string,
      difference: {
        amount: string,
        percentage: number,
      }
    },
    usd: {
      amount: string,
      difference: {
        amount: string,
        percentage: number,
      }
    },
  },
  processedAt: string
}
export type UnrealizedValue = {
    gainLoss: {
      eth: string,
      usd: string,
    },
    roi: {
      eth: number,
      usd: number
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
export type ICollection = {
  networkId: TChain,
  assetContract: string,
  name: string,
  symbol: string,
}
export type PositionCollection = {
  collection: ICollection,
  value: {
    eth: Value & {difference: TDifference | null},
    usd: Value & {difference: TDifference | null},
  },
}
export type PositionCollectionAmount = {
  collection: ICollection,
  amount: number,
  difference: number,
}
export type PerformanceCollection = {
  gainLoss: {
    eth: string,
    usd: string,
  } | null,
  roi: {
    eth: number,
    usd: number
  }| null,
  processedAt: string
}