import { atom } from "jotai";
type TSortOrder = 'asc' | 'desc'
export type TCollectionParam = {
  searchCollection: string,
  cursor: number,
  limit: number,
  sort: {
    field: string,
    order: TSortOrder,
  }
}
export const inventoryCollectionAtom = atom<TCollectionParam>({
  searchCollection: '',
  cursor: 0,
  limit: 50,
  sort: {
    field: 'amount',
    order: 'desc',
  }
})