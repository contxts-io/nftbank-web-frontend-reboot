import { TChain, TStandard, TValuationType } from "./constants"

type IChain = {
  name: TChain,
  imageUrl: string,
}
export type ValueDifference = {
  amount: string | null,
  difference: TDifference
}
export type ValueNested = {
  eth: ValueDifference,
  usd: ValueDifference,
}
export type Value = {
  eth: string,
  usd: string,
}
export type TDifference = {
  amount: string | null,
  percentage: string | null,
}
export type TValuation = {
  type: TValuationType,
  accuracy: string,
  default: boolean,
  selected: boolean,
}
  
export type CollectionMetadata = {
  chain: IChain,
  name: string | null,
  symbol: string,
  imageUrl: string,
  standard: TStandard,
  assetContract: string,
}
export type PerformanceValue = {
  // costBasis: Value | null,
  acquisitionPrice: Value| null,
  gasFee: Value | null,
}
export type Collection = {
  collection: CollectionMetadata,
  spam: {
    isSpam: boolean,
    spamType: 'system' | 'custom' | null,
  },
  amount: string,
  valuation: TValuation[]
  nav: ValueNested,
} & PerformanceValue
