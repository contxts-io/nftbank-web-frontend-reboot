import { getSummaryGasSpend, getSummaryRealized, getSummaryTotalSale, getSummaryTotalSpend, getSummaryUnrealized } from "@/apis/inventory";
import { BasicParam } from "@/interfaces/request";
import { TSummary, TUnrealized } from "@/interfaces/summary";
import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";

export function useSummaryTotalSpend(searchParam:BasicParam | null) {
  return useQuery<TSummary,AxiosError>(
    [searchParam,'summary','totalSpend'],
    async () => {
      const value = await getSummaryTotalSpend(searchParam);
      return value;
    },
    {
      staleTime: Infinity,
      cacheTime: Infinity,
      useErrorBoundary: false,
    },
  );
}
export function useSummaryGasSpend(searchParam:BasicParam | null) {
  return useQuery<TSummary,AxiosError>(
    ['summary','gasSpend',searchParam],
    async () => {
      const value = await getSummaryGasSpend(searchParam);
      return value;
    },
    {
      
      staleTime: Infinity,
      cacheTime: Infinity,
      useErrorBoundary: false,
    },
  );
}
export function useSummaryTotalSale(searchParam:BasicParam | null) {
  return useQuery<TSummary,AxiosError>(
    ['summary','totalSale',searchParam],
    async () => {
      const value = await getSummaryTotalSale(searchParam);
      return value;
    },
    {
      staleTime: Infinity,
      cacheTime: Infinity,
      useErrorBoundary: false,
    },
  );
}
export function useSummaryUnrealized(searchParam:BasicParam | null) {
  return useQuery<TUnrealized,AxiosError>(
    ['summary','unrealized',searchParam],
    async () => {
      const value = await getSummaryUnrealized(searchParam);
      return value;
    },
    {
      
      staleTime: Infinity,
      cacheTime: Infinity,
      useErrorBoundary: false,
    },
  );
}
export function useSummaryRealized(searchParam:BasicParam | null) {
  return useQuery<TSummary,AxiosError>(
    ['summary','realized',searchParam],
    async () => {
      const value = await getSummaryRealized(searchParam);
      return value;
    },
    {
      
      staleTime: Infinity,
      cacheTime: Infinity,
      useErrorBoundary: false,
    },
  );
}