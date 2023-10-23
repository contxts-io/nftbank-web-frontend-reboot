import { TCurrency } from "@/interfaces/constants";
import { atom } from "jotai";
export type TSortOrder = 'asc' | 'desc'
export type TSort = 'amount' | 'nav' | 'spam'

export type TCollectionParam = {
  searchCollection: string,
  networkId: string,
  walletAddress: string,
  sort: TSort,
  includeGasUsed: string,
  page: number,
  limit: number,
  order :TSortOrder,
}
export type ItemParam = {
  networkId: string,
  userId?: string,
  walletAddress?: string,
  walletGroupId?: string,
  assetContract: string[],
  currency: TCurrency,
  includeGasUsed: string,
  sort: TSort,
  order: TSortOrder,
  limit: number,
  page: number,
}
type SpamParam = {
  includeSpam:boolean,
  includeCustomSpam:boolean,
  includeNonSpam:boolean,
}
export const inventoryCollectionAtom = atom<TCollectionParam>({
  searchCollection: '',
  networkId: 'ethereum',
  walletAddress: '',
  includeGasUsed: 'false',
  page: 1,
  limit: 30,
  sort: 'nav',
  order :'desc',
})
export const inventoryItemFilterCollectionAtom = atom<TCollectionParam>({
  searchCollection: '',
  networkId: 'ethereum',
  walletAddress: '',
  includeGasUsed: 'false',
  page: 1,
  limit: 30,
  sort: 'nav',
  order :'desc',
})
export const inventorySpamCollectionAtom = atom<TCollectionParam & SpamParam>({
  searchCollection: '',
  networkId: 'ethereum',
  walletAddress: '',
  includeGasUsed: 'false',
  page: 1,
  limit: 30,
  sort: 'spam',
  order: 'desc',
  includeSpam: true,
  includeCustomSpam: true,
  includeNonSpam: true,
})
// export const inventoryItemCollectionAtom = atom<TCollectionParam>({})
export const inventoryItemListAtom = atom<ItemParam>({
  walletAddress: '',
  networkId: 'ethereum',
  includeGasUsed: 'false',
  assetContract: [],
  page: 1,
  limit: 30,
  currency: 'eth',
  sort: 'nav',
  order: 'desc',
})