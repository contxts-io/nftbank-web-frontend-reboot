import { Collection, } from "@/interfaces/collection";
import { Token } from "@/interfaces/token";
import { TSpam } from "@/interfaces/spam";
import { ValuationEdit } from "@/interfaces/valuation";
import { atom } from "jotai";
import { BasicParam } from "@/interfaces/request";
import { TUser } from "@/interfaces/user";

const PREFIX = 'PORTFOLIO'

export const portfolioNicknameAtom = atom<string>('');
export const portfolioProfileAtom = atom<TUser | null>(null);
portfolioProfileAtom.debugLabel = `${PREFIX}_portfolioProfileAtom`;

export const portfolioUserAtom = atom<BasicParam | null>(null);
portfolioUserAtom.debugLabel = `${PREFIX}_portfolioUserAtom`;

export const networkIdAtom = atom<'ethereum'>('ethereum');
export const selectedCollectionInventoryAtom = atom<Collection[]>([]);
export const customValuationAtom = atom<ValuationEdit[]>([]);
export const addedSpamListAtom = atom<TSpam[]>([]);
export const selectedTokenAtom = atom<Token|null>(null);