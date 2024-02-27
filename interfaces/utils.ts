export type Paging = {
  limit: number,
  page: number,
  total: number,
}
export type PagingCursor = {
  nextCursor: string | null,
  hasNext: boolean,
}
export type DataFreshness = {
  status: 'Current' | 'All',
  processedAt: string,
}