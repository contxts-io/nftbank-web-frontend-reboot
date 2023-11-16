import { TCurrency } from "@/interfaces/constants";
import { atom } from "jotai";
export type TSortOrder = 'asc' | 'desc'
export type TSort = 'amount' | 'nav' | 'spam'

export type TCollectionParam = {
  searchCollection: string,
  networkId: string,
  walletAddress: string,
  sort: TSort,
  includeGasUsed: string,
  page: number,
  limit: number,
  order :TSortOrder,
}
export type ItemParam = {
  networkId: string,
  userId?: string,
  walletAddress?: string,
  walletGroupId?: string,
  assetContract: string[],
  currency: TCurrency,
  includeGasUsed: string,
  sort: TSort,
  order: TSortOrder,
  limit: number,
  page: number,
}
export type TPeriod = {
  year: number,
  quarter: 'q1'|'q2'|'q3'|'q4'|'all',
}
export type TAnalysisGainAndLossParam = TPeriod &{
  limit: number,
  nextCursor: string | null,
  userId: string,
  walletAddress: string,
  walletGroupId: string,
  networkId: 'ethereum',
}
export type TAcquisitionParam = TPeriod & {
  userId: string,
  walletAddress: string,
  walletGroupId: string,
  networkId: 'ethereum',
}
export type TOverviewHistoricalValueParam = {
  networkId: 'ethereum',
  userId: string,
  walletAddress: string,
  walletGroupId: string,
  // interval: 'hourly' | 'daily' | 'weekly' | 'monthly' | 'quarterly',
  window: '1d'| '3d'| '7d'| '30d'| '90d'| 'ytd'| '365d'| 'all',

}
type SpamParam = {
  includeSpam:boolean,
  includeCustomSpam:boolean,
  includeNonSpam:boolean,
}
export const inventoryCollectionAtom = atom<TCollectionParam>({
  searchCollection: '',
  networkId: 'ethereum',
  walletAddress: '',
  includeGasUsed: 'false',
  page: 1,
  limit: 30,
  sort: 'nav',
  order :'desc',
})
export const inventoryItemFilterCollectionAtom = atom<TCollectionParam>({
  searchCollection: '',
  networkId: 'ethereum',
  walletAddress: '',
  includeGasUsed: 'false',
  page: 1,
  limit: 30,
  sort: 'nav',
  order :'desc',
})
export const inventorySpamCollectionAtom = atom<TCollectionParam & SpamParam>({
  searchCollection: '',
  networkId: 'ethereum',
  walletAddress: '',
  includeGasUsed: 'false',
  page: 1,
  limit: 30,
  sort: 'spam',
  order: 'desc',
  includeSpam: true,
  includeCustomSpam: true,
  includeNonSpam: true,
})
// export const inventoryItemCollectionAtom = atom<TCollectionParam>({})
export const inventoryItemListAtom = atom<ItemParam>({
  walletAddress: '',
  networkId: 'ethereum',
  includeGasUsed: 'false',
  assetContract: [],
  page: 1,
  limit: 10,
  currency: 'eth',
  sort: 'nav',
  order: 'desc',
})
export const analysisGainAndLossParamAtom = atom<TAnalysisGainAndLossParam>({
  limit: 1,
  nextCursor: null,
  year: 2023,
  quarter: 'all',
  userId: '',
  walletAddress: '',
  walletGroupId: '',
  networkId: 'ethereum',
})
export const overviewHistoricalValueParamAtom = atom<TOverviewHistoricalValueParam>({
  userId: '',
  walletAddress: '',
  walletGroupId: '',
  networkId: 'ethereum',
  // interval: 'daily',
  window: '7d',
})
export const analysisAcquisitionParamAtom = atom<TAcquisitionParam>({
  year: 2023,
  quarter: 'all',
  userId: '',
  walletAddress: '',
  walletGroupId: '',
  networkId: 'ethereum',
})