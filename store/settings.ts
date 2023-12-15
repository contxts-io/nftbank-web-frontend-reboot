import { BasicParam } from "@/interfaces/request";
import { atom } from "jotai";

export const inventoryTypeAtom = atom<'collection' | 'item'>('collection');
export const inventoryItemViewTypeAtom = atom<'listView' | 'cardView'>('listView');
export const openModalAtom = atom<'walletConnect' | 'walletEdit' | 'walletDelete' | 'walletGroup' | null>(null);
export const myDefaultPortfolioAtom = atom<BasicParam | null>(null);