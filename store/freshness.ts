import { DataFreshness } from "@/interfaces/utils";
import { atom } from "jotai";
const PREFIX = 'FRESHNESS'
export const freshnessAtom = atom<DataFreshness[]>([
  {
    status: 'ALL',
    processedAt: '',
  },
  {
    status: 'CURRENT',
    processedAt: '',
  },
]);
freshnessAtom.debugLabel = `${PREFIX}_freshnessAtom`;

export const keepPreviousDataAtom = atom<boolean>(true);
keepPreviousDataAtom.debugLabel = `${PREFIX}_keepPreviousDataAtom`;