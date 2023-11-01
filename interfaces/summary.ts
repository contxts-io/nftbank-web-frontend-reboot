import { TDifference, ValueNested, Value } from "./collection"

type SummaryType = 'totalSpend'|'gasSpend';
export type TSummary = {
  [key: string]: Value, 
} & {
  processedAt: string
};
export type TUnrealized = {
  gainLoss: ValueNested,
  processedAt: string
}
