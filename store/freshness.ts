import { DataFreshness } from "@/interfaces/utils";
import { atom } from "jotai";

export const freshnessAtom = atom<DataFreshness[]>([]);