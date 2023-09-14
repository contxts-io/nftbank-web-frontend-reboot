import { TChain, TCurrency, TStandard, TValuationType } from "./constants"

type IChain = {
  name: TChain,
  imageUrl: string,
}
type Value = {
  amount: string,
  currency: 'ETH' | 'USD',
}
type TValue = {
  eth: Value,
  usd: Value,
}
type TDifference = {
  amount: string,
  percentage: number,
}
export type CollectionMetadata = {
  chain: IChain,
  name: string,
  symbol: string,
  imageUrl: string,
  standard: TStandard,
  contractAddress: string,
}
export type Collection = {
  collection: CollectionMetadata,
  amount: string,
  costBasis: TValue | null,
  acquisitionPrice: TValue| null,
  gasFee: TValue | null,

  valuation: {
    type: TValuationType,
  },
  nav: {
    eth: Value & {difference: TDifference},
    usd: Value & {difference: TDifference},
    base: string,
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
export type Item = Collection & {
  item: {
    tokenId: number,
    name: string,
    imageUrl: string,
  },
  amount?: number,
  costBasis: TValue,
  valuation: Valuation,
  nav: {
    eth: Value & {difference: TDifference},
    usd: Value & { difference: TDifference },
    percentage: number,
    base: string,
  },
}
export type Valuation = {
  [key: string]: ValuationItem
}
export type ValuationItem = {
  accuracy: number,
  isDefault: boolean,
  isSelected: boolean,
}