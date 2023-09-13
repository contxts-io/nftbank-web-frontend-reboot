import { atom } from "jotai";
export type TSortOrder = 'asc' | 'desc'
export type TSort = 'amount'|'acq_price_eth'
export type TCollectionParam = {
  searchCollection: string,
  page: number,
  limit: number,
  sort: TSort,
  order :TSortOrder,
  w: string,
}
export const inventoryCollectionAtom = atom<TCollectionParam>({
  searchCollection: '',
  page: 1,
  limit: 5,
  sort: 'acq_price_eth',
  order :'desc',
  w: '',
})
export const inventorySpamCollectionAtom = atom<TCollectionParam>({
  searchCollection: '',
  page: 1,
  limit: 5,
  sort: 'acq_price_eth',
  order :'desc',
  w: '',
})
export const inventoryItemCollectionAtom = atom<TCollectionParam>({})
export const inventoryItemListAtom = atom<TCollectionParam>({
  searchCollection: '',
  page: 1,
  limit: 5,
  sort: 'acq_price_eth',
  order: 'desc',
  w: '',
})