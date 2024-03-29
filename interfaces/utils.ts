export type Paging = {
  limit: number,
  page: number,
  total: number,
}
export type PagingCursor = {
  nextCursor: string | null,
  hasNext: boolean,
}
export type FreshnessStatus = 'CURRENT' | 'ALL'
export type DataFreshness = {
  status: FreshnessStatus,
  processedAt: string,
}