import { TCurrency } from "@/interfaces/constants";
import { atom } from "jotai";

export const currencyAtom = atom<TCurrency>('usd');
export type TPriceType = 'costBasis' | 'acquisitionPrice';
export const priceTypeAtom = atom<TPriceType>('costBasis')