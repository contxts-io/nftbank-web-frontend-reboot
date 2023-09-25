import { atom } from "jotai";

export const inventoryTypeAtom = atom<'collection' | 'item'>('item');
export const inventoryItemViewTypeAtom = atom<'listView'|'cardView'>('listView');