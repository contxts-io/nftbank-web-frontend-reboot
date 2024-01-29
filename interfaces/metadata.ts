import { CollectionMetadata } from "./collection"
import { TChain } from "./constants"
type Trait = {
  traitType: string,
  traitValue: string,
  rarityScore : number,
}
export type Metadata = 
  {
    networkId: TChain,
    lastAcquisitionDate: string,
    assetContract: string,
    collection: CollectionMetadata,
    marketPlace: string,
    tokenId: string,
    name: string,
    imageUrl: string,
    rarity: number,
    rarityRank: number,
    rarityTraits: Trait[],
    owner: string | null,
  }