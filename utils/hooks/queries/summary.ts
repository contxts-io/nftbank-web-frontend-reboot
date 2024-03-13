import { getSummaryGasSpend, getSummaryRealized, getSummaryTotalSale, getSummaryTotalSpend, getSummaryUnrealized } from "@/apis/inventory";
import { BasicParam } from "@/interfaces/request";
import { TSummary, TUnrealized } from "@/interfaces/summary";
import { freshnessAtom } from "@/store/freshness";
import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useAtomValue } from "jotai";

export function useSummaryTotalSpend(searchParam: BasicParam | null) {
  const dataFreshness = useAtomValue(freshnessAtom).find((f)=>f.status === 'ALL');
  return useQuery<TSummary,AxiosError>(
    [searchParam,'summary','totalSpend', dataFreshness?.processedAt],
    async () => {
      const value = await getSummaryTotalSpend(searchParam);
      return value;
    },
    {
      staleTime: Infinity,
      keepPreviousData: true,
      cacheTime: Infinity,
      useErrorBoundary: false,
      enabled: !!searchParam,
    },
  );
}
export function useSummaryGasSpend(searchParam:BasicParam | null) {
  const dataFreshness = useAtomValue(freshnessAtom).find((f)=>f.status === 'ALL');
  return useQuery<TSummary,AxiosError>(
    [searchParam, 'summary','gasSpend',dataFreshness?.processedAt],
    async () => {
      const value = await getSummaryGasSpend(searchParam);
      return value;
    },
    {
      
      staleTime: Infinity,
      keepPreviousData: true,
      cacheTime: Infinity,
      useErrorBoundary: false,
      enabled: !!searchParam,
    },
  );
}
export function useSummaryTotalSale(searchParam: BasicParam | null) {
  const dataFreshness = useAtomValue(freshnessAtom).find((f)=>f.status === 'ALL');
  return useQuery<TSummary,AxiosError>(
    [searchParam, 'summary','totalSale', dataFreshness?.processedAt],
    async () => {
      const value = await getSummaryTotalSale(searchParam);
      return value;
    },
    {
      staleTime: Infinity,
      keepPreviousData: true,
      cacheTime: Infinity,
      useErrorBoundary: false,
      enabled: !!searchParam,
    },
  );
}
export function useSummaryUnrealized(searchParam: BasicParam | null) {
  const dataFreshness = useAtomValue(freshnessAtom).find((f)=>f.status === 'CURRENT');
  return useQuery<TUnrealized,AxiosError>(
    [searchParam, 'summary','unrealized', dataFreshness?.processedAt],
    async () => {
      const value = await getSummaryUnrealized(searchParam);
      return value;
    },
    {
      
      staleTime: Infinity,
      keepPreviousData: true,
      cacheTime: Infinity,
      useErrorBoundary: false,
      enabled: !!searchParam,
    },
  );
}
export function useSummaryRealized(searchParam: BasicParam | null) {
  const dataFreshness = useAtomValue(freshnessAtom).find((f)=>f.status === 'ALL');
  return useQuery<TSummary,AxiosError>(
    [searchParam,'summary','realized',dataFreshness?.processedAt],
    async () => {
      const value = await getSummaryRealized(searchParam);
      return value;
    },
    {
      
      staleTime: Infinity,
      keepPreviousData: true,
      cacheTime: Infinity,
      useErrorBoundary: false,
      enabled: !!searchParam,
    },
  );
}