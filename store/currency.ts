import { atom } from "jotai";
type TCurrency = 'eth' | 'usd';
export const currencyAtom = atom<TCurrency>('eth')

type TPriceType = 'costBasis' | 'acquisitionPrice';
export const priceTypeAtom = atom<TPriceType>('acquisitionPrice')