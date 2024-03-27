import { getSummaryGasSpend, getSummaryRealized, getSummaryTotalSale, getSummaryTotalSpend, getSummaryUnrealized } from "@/apis/inventory";
import { BasicParam } from "@/interfaces/request";
import { TSummary, TUnrealized } from "@/interfaces/summary";
import { freshnessAtom, keepPreviousDataAtom } from "@/store/freshness";
import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useAtomValue } from "jotai";

export function useSummaryTotalSpend(searchParam: BasicParam | null) {
  const dataFreshness = useAtomValue(freshnessAtom).find((f) => f.status === 'ALL');
  const keepPreviousData = useAtomValue(keepPreviousDataAtom);
  return useQuery<TSummary,AxiosError>(
    ['summary','totalSpend', searchParam, dataFreshness?.processedAt],
    async () => {
      const value = await getSummaryTotalSpend(searchParam);
      return value;
    },
    {
      staleTime: Infinity,
      keepPreviousData: keepPreviousData,
      cacheTime: Infinity,
      useErrorBoundary: false,
      enabled: !!searchParam,
    },
  );
}
export function useSummaryGasSpend(searchParam:BasicParam | null) {
  const dataFreshness = useAtomValue(freshnessAtom).find((f) => f.status === 'ALL');
  const keepPreviousData = useAtomValue(keepPreviousDataAtom);
  return useQuery<TSummary,AxiosError>(
    [ 'summary','gasSpend', searchParam, dataFreshness?.processedAt],
    async () => {
      const value = await getSummaryGasSpend(searchParam);
      return value;
    },
    {
      
      staleTime: Infinity,
      keepPreviousData: keepPreviousData,
      cacheTime: Infinity,
      useErrorBoundary: false,
      enabled: !!searchParam,
    },
  );
}
export function useSummaryTotalSale(searchParam: BasicParam | null) {
  const dataFreshness = useAtomValue(freshnessAtom).find((f) => f.status === 'ALL');
  const keepPreviousData = useAtomValue(keepPreviousDataAtom);
  return useQuery<TSummary,AxiosError>(
    [ 'summary','totalSale', searchParam, dataFreshness?.processedAt],
    async () => {
      const value = await getSummaryTotalSale(searchParam);
      return value;
    },
    {
      staleTime: Infinity,
      keepPreviousData: keepPreviousData,
      cacheTime: Infinity,
      useErrorBoundary: false,
      enabled: !!searchParam,
    },
  );
}
export function useSummaryUnrealized(searchParam: BasicParam | null) {
  const dataFreshness = useAtomValue(freshnessAtom).find((f) => f.status === 'CURRENT');
  const keepPreviousData = useAtomValue(keepPreviousDataAtom);
  return useQuery<TUnrealized,AxiosError>(
    [ 'summary','unrealized', searchParam, dataFreshness?.processedAt],
    async () => {
      const value = await getSummaryUnrealized(searchParam);
      return value;
    },
    {
      
      staleTime: Infinity,
      keepPreviousData: keepPreviousData,
      cacheTime: Infinity,
      useErrorBoundary: false,
      enabled: !!searchParam,
    },
  );
}
export function useSummaryRealized(searchParam: BasicParam | null) {
  const dataFreshness = useAtomValue(freshnessAtom).find((f) => f.status === 'ALL');
  const keepPreviousData = useAtomValue(keepPreviousDataAtom);
  return useQuery<TSummary,AxiosError>(
    ['summary','realized', searchParam, dataFreshness?.processedAt],
    async () => {
      const value = await getSummaryRealized(searchParam);
      return value;
    },
    {
      
      staleTime: Infinity,
      keepPreviousData: keepPreviousData,
      cacheTime: Infinity,
      useErrorBoundary: false,
      enabled: !!searchParam,
    },
  );
}