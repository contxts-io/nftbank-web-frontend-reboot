import { atom } from "jotai";
export type TSortOrder = 'asc' | 'desc'
export type TSort = 'amount' | 'acquisitionPrice'
type currency = 'eth' | 'usd';
export type TCollectionParam = {
  searchCollection: string,
  networkId: string,
  includeGasUsed: boolean,
  page: number,
  limit: number,
  sort: TSort,
  order :TSortOrder,
  w: string,
}
export type ItemParam = {
  networkId: string,
  userId?: string,
  walletAddress?: string,
  walletGroupId?: string,
  assetContractAddress: string[],
  currency: currency,
  includeGasUsed: boolean,
  sort: TSort,
  order: TSortOrder,
  limit: number,
  page: number,
}
export const inventoryCollectionAtom = atom<TCollectionParam>({
  searchCollection: '',
  networkId: 'ethereum',
  includeGasUsed: false,
  page: 1,
  limit: 10,
  sort: 'acquisitionPrice',
  order :'desc',
  w: '',
})
export const inventorySpamCollectionAtom = atom<TCollectionParam>({
  searchCollection: '',
  networkId: 'ethereum',
  includeGasUsed: false,
  page: 1,
  limit: 10,
  sort: 'acquisitionPrice',
  order :'desc',
  w: '',
})
// export const inventoryItemCollectionAtom = atom<TCollectionParam>({})
export const inventoryItemListAtom = atom<ItemParam>({
  networkId: 'ethereum',
  includeGasUsed: false,
  assetContractAddress: [],
  page: 1,
  limit: 10,
  currency: 'eth',
  sort: 'acquisitionPrice',
  order: 'desc',
})