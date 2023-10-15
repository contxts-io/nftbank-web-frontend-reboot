import { Collection } from "@/interfaces/collection";
import { ValuationEdit } from "@/interfaces/valuation";
import { atom } from "jotai";

export const selectedCollectionInventoryAtom = atom<Collection[]>([]);
export const customValuationAtom = atom<ValuationEdit[]>([]);