import { atom } from "jotai";

type WalletAccount = {
  address: `0x${string}`;
  provider: string;
};
export const connectedWalletAddressAtom = atom<WalletAccount | null>(null);
export const emailAtom = atom<string>('');