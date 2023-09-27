import { atom } from "jotai";

export const inventoryTypeAtom = atom<'collection' | 'item'>('collection');
export const inventoryItemViewTypeAtom = atom<'listView'|'cardView'>('listView');