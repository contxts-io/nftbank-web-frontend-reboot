import { TChain, TCurrency, TStandard, TValuationType } from "./constants"

type IChain = {
  chain: {
    name: TChain,
    imageUrl: string,
  }
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
  amount: number,
  costBasis: {
    eth: {
      amount: number,
      currency: TCurrency,
    },
    usd: {
      amount: number,
      currency: TCurrency,
    }
  },
  valuation: {
    type: TValuationType,
  },
  nav: {
    eth: {
      amount: number,
      currency: TCurrency,
    },
    usd: {
      amount: number,
      currency: null
    },
    difference: {
      eth: {
        amount: number,
        currency: TCurrency,
      },
      usd: {
        amount: number,
        currency: TCurrency,
      },
      percentage: number,
      base: string
    }
  }
}