import { TValuation } from "./collection"
import { TChain, TValuationType } from "./constants"

type ValuePair = {
  eth: string | null,
  usd: string | null,
}
export type TokenHistory = {
  floor: ValuePair | null,
  estimate: ValuePair | null,
  traitFloor: ValuePair | null,
  d30Avg: ValuePair | null,
  d90Avg: ValuePair | null,
  processedAt: string
}[]
export type ValuationEdit = {
  networkId: TChain,
  assetContract: string,
  tokenId: number,
  valuationType: TValuationType
}