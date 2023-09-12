import { atom } from "jotai";

export const inventoryTypeAtom = atom<'collection'|'item'>('collection');