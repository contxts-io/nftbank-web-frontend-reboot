import { atom } from "jotai";

type WalletAccount = {
  address: `0x${string}`;
  provider: string;
};
export const userStatusAtom = atom<'SIGN_IN'| 'SIGN_OUT'>('SIGN_OUT');
export const connectedWalletAddressAtom = atom<WalletAccount | null>(null);
export const emailAtom = atom<string>('');