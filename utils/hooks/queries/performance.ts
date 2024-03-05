import { PerformanceParam, getInventoryUnrealizedPerformance, getPerformanceChart, getPerformanceChartAnnual } from '@/apis/performance';
import { IInventoryCollectionListPerformance, IInventoryItemList, InventoryValueNested, PerformanceCollection, UnrealizedValue } from '@/interfaces/inventory';
import { BasicParam } from '@/interfaces/request';
import { freshnessAtom } from '@/store/freshness';
import { ItemParam, TCollectionParam } from '@/store/requestParam';
import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { useAtomValue } from 'jotai';

export function useInventoryUnrealizedPerformance(searchParam: BasicParam | null) {
  return useQuery<UnrealizedValue,AxiosError>(
    ['inventoryUnrealizedValuePerformance',searchParam],
    async () => {
      const unrealizedValue = await getInventoryUnrealizedPerformance(searchParam as BasicParam);
      return unrealizedValue;
    },
    {
      staleTime: Infinity,
      cacheTime: Infinity,
      useErrorBoundary: false,
      enabled: searchParam !== null,
    },
  );
}
export function usePerformanceChart(requestParam: PerformanceParam & BasicParam) {
  const dataFreshness = useAtomValue(freshnessAtom).find((f)=>f.status === 'ALL');
  return useQuery<{ data: PerformanceCollection[]}, AxiosError>(
    ['inventoryPerformanceChart', requestParam, dataFreshness?.processedAt],
    async () => {
      const result = await getPerformanceChart(requestParam);
      return result;
    },
    {
      keepPreviousData: true,
      enabled: requestParam.walletAddress !== '',
        // && !!requestParam.taskId && !!polling,
      staleTime: Infinity,
      cacheTime: Infinity,
      useErrorBoundary: false,
      // refetchInterval: 10000,
    },
  );
}
type Param = {
  walletAddress: string;
  window?: string;
}
export function usePerformanceChartAnnual(requestParam: PerformanceParam & BasicParam) {
  const dataFreshness = useAtomValue(freshnessAtom).find((f)=>f.status === 'ALL');
  return useQuery<PerformanceCollection,AxiosError>(
    ['inventoryPerformanceChartAnnual',requestParam, dataFreshness?.processedAt],
    async () => {
      const result = await getPerformanceChartAnnual(requestParam);
      return result.data;
    },
    {
      keepPreviousData: true,
      enabled: requestParam.walletAddress !== '',
      staleTime: Infinity,
      cacheTime: Infinity,
      useErrorBoundary: false,
    },
  );
}