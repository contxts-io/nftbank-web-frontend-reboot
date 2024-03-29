import { Value, ValueNested } from "./collection";
import { Paging } from "./utils";

type SendReceive = {
  fromAddress: string;
  toAddress: string;
  standard: string;
  tokenId: string | null;
  amount: string;
}
export type Activity = {
  networkId: string,
  txHash: string,
  functionName: string,
  gasFee: number,
  send: SendReceive[],
  receive: SendReceive[]
}
export type ActivityItem = {
  activity: Activity[],
  processedAt: string,
    paging: Paging
}
export type AcquisitionType = {
  type: 'buy' | 'mint' | 'transfer' ,
  amount: number,
  costBasis : Value,
}