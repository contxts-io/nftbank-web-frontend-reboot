import { ICurrency } from "@/interfaces/inventory";
import { atom } from "jotai";
type TCurrency = 'eth' | 'usd';
export const currencyAtom = atom<TCurrency>('eth')