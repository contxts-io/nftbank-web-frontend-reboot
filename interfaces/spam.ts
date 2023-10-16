import { TChain } from "./constants"

export type TSpam = {
  networkId: TChain,
  assetContract: string,
  isSpam: boolean
}