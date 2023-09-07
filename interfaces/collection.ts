import { TChain, TCurrency, TStandard, TValuationType } from "./constants"

type IChain = {
  name: TChain,
  imageUrl: string,
}

export type Collection = {
  collection: {
    chain: IChain,
    name: string,
    symbol: string,
    contractAddress: string,
    imageUrl: string,
    standard: TStandard,
  },
  amount: string,
  costBasis: {
    eth: {
      amount: string,
      currency: TCurrency,
    },
    usd: {
      amount: string,
      currency: TCurrency,
    }
  },
  valuation: {
    type: TValuationType,
  },
  nav: {
    eth: {
      amount: string,
      currency: TCurrency,
    },
    usd: {
      amount: string,
      currency: TCurrency,
    },
    difference: {
      eth: {
        amount: string,
        currency: TCurrency,
      },
      usd: {
        amount: string,
        currency: TCurrency,
      },
      percentage: number,
      base: string
    }
  }
}