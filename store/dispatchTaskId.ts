import { atom } from "jotai";

export const historicalNavTaskIdAtom = atom<{walletAddress : string, taskId:string | 'CACHED'}[]>([]);
export const performanceTaskIdAtom = atom<string | 'CACHED'>('');