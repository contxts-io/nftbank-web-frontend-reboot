import { Collection, Token } from "@/interfaces/collection";
import { TSpam } from "@/interfaces/spam";
import { ValuationEdit } from "@/interfaces/valuation";
import { atom } from "jotai";

export const selectedCollectionInventoryAtom = atom<Collection[]>([]);
export const customValuationAtom = atom<ValuationEdit[]>([]);
export const addedSpamListAtom = atom<TSpam[]>([]);
export const selectedTokenAtom = atom<Token|null>(null);