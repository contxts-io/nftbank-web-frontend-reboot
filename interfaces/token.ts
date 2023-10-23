import { CollectionMetadata, TValue } from "./collection";
export type TokenBasic = {name:string,imageUrl:string,tokenId:string}
export type TToken = {
  collection: CollectionMetadata,
  token: TokenBasic,
  amount: number,
  costBasis: TValue,
  proceed: TValue,
  gainLoss: TValue,
  roi: {
    eth: number,
    usd: number,
  },
  acquisitionDate: string,
  soldDate: string,
}