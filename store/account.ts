import { atom } from "jotai";

export const connectedWalletAddressAtom = atom<`0x${string}` | undefined>(undefined);