import { BasicParam } from "@/interfaces/request";
import { TChain } from "@/interfaces/constants";
import { atom } from "jotai";
const PREFIX = 'MY_SETTINGS'
export const inventoryTypeAtom = atom<'collection' | 'item'>('collection');
export const inventoryItemViewTypeAtom = atom<'listView' | 'cardView'>('cardView');
export const openModalAtom = atom<'walletConnect' | 'walletEdit' | 'walletDelete' | 'walletGroup' | null>(null);
export const myDefaultPortfolioAtom = atom<BasicParam | null>(null);
myDefaultPortfolioAtom.debugLabel = `${PREFIX}_myDefaultPortfolioAtom`;
export const selectedChainAtom = atom< TChain | 'all'>('all');
