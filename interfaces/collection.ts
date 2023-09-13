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
export type Collection = {
  collection: {
    chain: IChain,

    name: string,
    symbol: string,
    imageUrl: string,
    standard: TStandard,
    assetContract: string,
  },
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
export type Item = {
  collection: Collection,
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