import { Collection } from "@/interfaces/collection";
import { atom } from "jotai";

export const selectedCollectionInventoryAtom = atom<Collection[]>([]);