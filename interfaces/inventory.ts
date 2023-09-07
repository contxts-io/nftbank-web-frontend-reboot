import { Collection } from "./collection";
import { TCurrency } from "./constants";

export type IInventoryValue = {
  value: {
    eth: {
      amount: number,
      currency: TCurrency
    },
    usd: {
      amount: null,
      currency: null
    },
    difference: {
      eth: {
        amount: number,
        currency: TCurrency
      },
      usd: {
        amount: null,
        currency: null
      },
      percentage: number,
      base: string
    }
  },
  processedAt: string
}
export type IInventoryCollectionList = {
  collections: Collection[],
  paging: Paging,
  processedAt: string,
}