import { Collection, PerformanceValue, TDifference, ValueNested, Value, TValuation } from "./collection";
import { TChain } from "./constants";
import { Token } from "./token";
import { Paging } from "./utils";

export type InventoryValueNested = {
  value: ValueNested,
  processedAt: string
}
export type InventoryValue = {
  value: Value,
  processedAt: string
}
export type UnrealizedValue = {
    gainLoss: Value,
    roi: Value,
    processedAt: string
}
export type IInventoryCollectionList = {
  data: Collection[],
  paging: Paging,
  processedAt: string,
}
type CollectionPerformance = Collection & PerformanceValue;
export type IInventoryCollectionListPerformance = {
  data: CollectionPerformance[],
  paging: Paging,
  processedAt: string,
}
export type IInventoryItemList = {
  data: Token[],
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
  imageUrl: string,
}
export type PositionCollection = {
  collection: ICollection,
  value: ValueNested,
  valuation: TValuation | null,
}
export type PositionCollectionAmount = {
  collection: ICollection,
  amount: number,
  difference: number,
}
export type PerformanceCollection = {
  gainLoss: Value | null,
  roi: Value | null,
  processedAt: string
}
export type BasicWallet = {
    name?: string,
    networkName: 'evm',
    walletAddress: string,
    provider: string,
}
export type TWallet = {
  id: string,
  value: Value,
  position: PositionCollection[],
} & BasicWallet
export type TGroups = {
  id: string,
  name: string,
}
export type TWalletGroup = {
  id: string,
  name: string,
  walletsCount: number,
  value: Value,
  position: PositionCollection[],
  walletIds: string[],
  wallets: {
    data: TWallet[],
    paging: Paging,
  } | null,
}