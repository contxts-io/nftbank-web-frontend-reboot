import { TCurrency } from "@/interfaces/constants";
import { BasicParam } from "@/interfaces/request";
import { atom } from "jotai";
export enum SortOrder {
  Desc = '-1',Asc = '1'
}
export type TSort = 'amount' | 'nav' | 'spam'

export type TCollectionParam = {
  walletAddress: string,
  searchCollection: string,
  sortCol: 'nav' | 'amount' | 'spam',
  sortOrder: SortOrder,
  page: number,
  limit: number,
}
export type ItemParam = BasicParam & {
  assetContract: string[],
  currency: TCurrency,
  // sort: TSort,
  // order: SortOrder,
  sortCol: 'nav' | 'amount' | 'spam',
  sortOrder: SortOrder,
  limit: number,
  page: number,
}
export type TPeriod = {
  year: number | 'all',
  // quarter: 'q1'|'q2'|'q3'|'q4'|'all',
}
export type TAnalysisGainAndLossParam = TPeriod & BasicParam & {
  limit: number,
  page: number,
}
export type TAcquisitionParam =BasicParam &  TPeriod & {
  page?: number}
export type TOverviewHistoricalValueParam = BasicParam & {
  // interval: 'hourly' | 'daily' | 'weekly' | 'monthly' | 'quarterly',
  window: '1d'| '3d'| '7d'| '30d'| '90d'| 'ytd'| '365d'| 'all',
  taskId?: string,
}
type SpamParam = {
  includeSpam:boolean,
  includeCustomSpam:boolean,
  includeNonSpam:boolean,
}
export const inventoryCollectionAtom = atom<TCollectionParam>({
  walletAddress: '',
  searchCollection: '',
  page: 1,
  limit: 30,
  sortCol: 'nav',
  sortOrder: SortOrder.Desc,
})
export const inventoryItemFilterCollectionAtom = atom<TCollectionParam>({
  searchCollection: '',
  walletAddress: '',
  page: 1,
  limit: 30,
  sortCol: 'nav',
  sortOrder: SortOrder.Desc,
})
export const inventorySpamCollectionAtom = atom<TCollectionParam & SpamParam>({
  searchCollection: '',
  walletAddress: '',
  page: 1,
  limit: 30,
  sortCol: 'spam',
  sortOrder: SortOrder.Desc,
  includeSpam: true,
  includeCustomSpam: true,
  includeNonSpam: true,
})
// export const inventoryItemCollectionAtom = atom<TCollectionParam>({})
export const inventoryItemListAtom = atom<ItemParam & {paging : boolean}>({
  walletAddress: '',
  networkId: 'ethereum',
  assetContract: [],
  page: 1,
  limit: 30,
  currency: 'eth',
  sortCol: 'nav',
  sortOrder: SortOrder.Desc,
  paging: true,
})
export const analysisGainAndLossParamAtom = atom<TAnalysisGainAndLossParam>({
  limit: 10,
  page: 1,
  year: 'all',
  networkId: 'ethereum',
})
export const overviewHistoricalValueParamAtom = atom<TOverviewHistoricalValueParam>({
  networkId: 'ethereum',
  window: '7d',
})
export const analysisAcquisitionParamAtom = atom<TAcquisitionParam>({
  year: 2024,
  networkId: 'ethereum',
})