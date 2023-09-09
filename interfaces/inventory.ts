import { Collection } from "./collection";
import { TCurrency } from "./constants";

export type IInventoryValue = {
  value: {
    eth: {
      amount: string,
      currency: TCurrency
    },
    usd: {
      amount: string,
      currency: TCurrency
    },
    difference: {
      eth: {
        amount: string,
        currency: TCurrency
      },
      usd: {
        amount: string,
        currency: TCurrency
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