import { TCurrency } from "@/interfaces/constants";
import { atom } from "jotai";
export const currencyAtom = atom<TCurrency>('eth')

export type TPriceType = 'costBasis' | 'acquisitionPrice';
export const priceTypeAtom = atom<TPriceType>('acquisitionPrice')