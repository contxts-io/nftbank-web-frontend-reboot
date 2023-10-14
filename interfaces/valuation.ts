type ValuePair = {
  eth: string | null,
  usd: string | null,
}
export type TokenHistory = {
  floor: ValuePair | null,
  estimate: ValuePair | null,
  traitFloor: ValuePair | null,
  d30Avg: ValuePair | null,
  d90Avg: ValuePair | null,
  processedAt: string
}[]
  