import { TChain, TCurrency, TStandard, TValuationType } from "./constants"

type IChain = {
  name: TChain,
  imageUrl: string,
}
type Value = {
  amount: string | null,
  currency: 'ETH' | 'USD',
}
type TValue = {
  eth: Value,
  usd: Value,
}
type TDifference = {
  amount: string | null,
  percentage: number | null,
}
export type TValuation = {
  type: TValuationType,
  accuracy: number,
  default: boolean,
  selected: boolean,
}
  
export type CollectionMetadata = {
  chain: IChain,
  name: string,
  symbol: string,
  imageUrl: string,
  standard: TStandard,
  assetContract: string,
}
export type PerformanceValue = {
  costBasis: TValue | null,
  acquisitionPrice: TValue| null,
  gasFee: TValue | null,
}
export type Collection = {
  collection: CollectionMetadata,
  amount: string,
  costBasis: TValue | null,
  acquisitionPrice: TValue| null,
  gasFee: TValue | null,
  valuation: TValuation[]
  
  nav: {
    eth: Value & {difference: TDifference | null},
    usd: Value & {difference: TDifference | null},
  },
    // eth: TValue & {
    //   difference: {
    //     amount: string,
    //     percentage : number,
    //   }
    // },
    // usd: TValue & {
    //   difference: {
    //     amount: string,
    //     percentage : number,
    //   }
    // },
}
export type Token = Collection & {
  token: {
    tokenId: number,
    name: string,
    imageUrl: string,
  },
  amount?: number,
  costBasis: TValue | null,
  acquisitionDate: string | null,
  valuation: TValuation[] | null,
  nav: {
    eth: Value & {difference: TDifference},
    usd: Value & { difference: TDifference },
    percentage: number,
    base: string,
  },
}
export type ValuationItem = {
  accuracy: number,
  isDefault: boolean,
  isSelected: boolean,
}