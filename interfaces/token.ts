import { Collection, CollectionMetadata, PerformanceValue, TValuation, Value, ValueNested } from "./collection";
export type TokenBasic = {name:string,imageUrl:string,tokenId:string}
export type TToken = {
  collection: CollectionMetadata,
  token: TokenBasic,
  amount: number,
  costBasis: Value,
  proceed: Value,
  gainLoss: Value,
  roi: Value,
  acquisitionDate: string,
  soldDate: string,
}
export type Token = Collection & {
  token: {
    tokenId: number,
    name: string,
    imageUrl: string,
  },
  amount?: number,
  costBasis: Value | null,
  acquisitionDate: string | null,
  valuation: TValuation[] | null,
  nav: ValueNested &{
    percentage: number,
    base: string,
  },
}
export type TokenPerformance = Token & PerformanceValue
export type TokenNested = Collection & {
  token: {
    tokenId: number,
    name: string,
    imageUrl: string,
  },
  amount?: number,
  costBasis: ValueNested | null,
  acquisitionDate: string | null,
  valuation: TValuation[] | null,
  nav: ValueNested &{
    percentage: number,
    base: string,
  },
}