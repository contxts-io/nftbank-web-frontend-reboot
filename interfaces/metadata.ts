import { CollectionMetadata } from "./collection"
type Trait = {
  traitType: string,
  value: string,
  tokenCount: number
}
export type Metadata = 
  {
    collection: CollectionMetadata,
    tokenId: number,
    name: string,
    imageUrl: string,
    rarity: number,
    rarityRank: number,
    traits: Trait[],
  }