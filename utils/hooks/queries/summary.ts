import { getSummaryGasSpend, getSummaryRealized, getSummaryTotalSale, getSummaryTotalSpend, getSummaryUnrealized } from "@/apis/inventory";
import { TSummary, TUnrealized } from "@/interfaces/summary";
import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";

export function useSummaryTotalSpend(walletAddress?: string) {
  return useQuery<TSummary,AxiosError>(
    ['summary','totalSpend',walletAddress],
    async () => {
      const value = await getSummaryTotalSpend(walletAddress);
      return value;
    },
    {
      enabled: walletAddress !== '',
      staleTime: Infinity,
      cacheTime: Infinity,
      useErrorBoundary: false,
    },
  );
}
export function useSummaryGasSpend(walletAddress?: string) {
  return useQuery<TSummary,AxiosError>(
    ['summary','gasSpend',walletAddress],
    async () => {
      const value = await getSummaryGasSpend(walletAddress);
      return value;
    },
    {
      enabled: walletAddress !== '',
      staleTime: Infinity,
      cacheTime: Infinity,
      useErrorBoundary: false,
    },
  );
}
export function useSummaryTotalSale(walletAddress?: string) {
  return useQuery<TSummary,AxiosError>(
    ['summary','totalSale',walletAddress],
    async () => {
      const value = await getSummaryTotalSale(walletAddress);
      return value;
    },
    {
      enabled: walletAddress !== '',
      staleTime: Infinity,
      cacheTime: Infinity,
      useErrorBoundary: false,
    },
  );
}
export function useSummaryUnrealized(walletAddress?: string) {
  return useQuery<TUnrealized,AxiosError>(
    ['summary','unrealized',walletAddress],
    async () => {
      const value = await getSummaryUnrealized(walletAddress);
      return value;
    },
    {
      enabled: walletAddress !== '',
      staleTime: Infinity,
      cacheTime: Infinity,
      useErrorBoundary: false,
    },
  );
}
export function useSummaryRealized(walletAddress?: string) {
  return useQuery<TSummary,AxiosError>(
    ['summary','realized',walletAddress],
    async () => {
      const value = await getSummaryRealized(walletAddress);
      return value;
    },
    {
      enabled: walletAddress !== '',
      staleTime: Infinity,
      cacheTime: Infinity,
      useErrorBoundary: false,
    },
  );
}