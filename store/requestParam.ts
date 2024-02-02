import { TCurrency } from "@/interfaces/constants";
import { BasicParam } from "@/interfaces/request";
import { atom } from "jotai";
export type TSortOrder = 'asc' | 'desc'
export type TSort = 'amount' | 'nav' | 'spam'

export type TCollectionParam = {
  searchCollection: string,
  sort: TSort,
  page: number,
  limit: number,
  order :TSortOrder,
}
export type ItemParam = BasicParam & {
  assetContract: string[],
  currency: TCurrency,
  sort: TSort,
  order: TSortOrder,
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
  searchCollection: '',
  page: 1,
  limit: 30,
  sort: 'nav',
  order :'desc',
})
export const inventoryItemFilterCollectionAtom = atom<TCollectionParam>({
  searchCollection: '',
  page: 1,
  limit: 30,
  sort: 'nav',
  order :'desc',
})
export const inventorySpamCollectionAtom = atom<TCollectionParam & SpamParam>({
  searchCollection: '',
  page: 1,
  limit: 30,
  sort: 'spam',
  order: 'desc',
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
  sort: 'nav',
  order: 'desc',
  paging: true,
})
export const analysisGainAndLossParamAtom = atom<TAnalysisGainAndLossParam>({
  limit: 10,
  page: 1,
  year: 2024,
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