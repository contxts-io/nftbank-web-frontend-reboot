import { TDifference, TValue, Value } from "./collection"

type SummaryType = 'totalSpend'|'gasSpend';
export type TSummary = {
  [key: string]: TValue, 
} & {
  processedAt: string
};
export type TUnrealized = {
  gainLoss: {
    eth: Value & {difference: TDifference | null},
    usd: Value & {difference: TDifference | null},
  },
  processedAt: string
}
