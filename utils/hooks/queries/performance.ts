import { PerformanceParam, getInventoryUnrealizedPerformance, getPerformanceChart, getPerformanceChartAnnual } from '@/apis/performance';
import { IInventoryCollectionListPerformance, IInventoryItemList, InventoryValueNested, PerformanceCollection, UnrealizedValue } from '@/interfaces/inventory';
import { BasicParam } from '@/interfaces/request';
import { ItemParam, TCollectionParam } from '@/store/requestParam';
import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';

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
export function usePerformanceChart(requestParam: PerformanceParam & BasicParam, polling=true ) {
  return useQuery<{ data: PerformanceCollection[], statusCode?: "PENDING" }, AxiosError>(
    ['inventoryPerformanceChart', requestParam],
    async () => {
      const result = await getPerformanceChart(requestParam);
      return result;
    },
    {
      enabled: requestParam.walletAddress !== '' && !!requestParam.taskId && !!polling,
      staleTime: Infinity,
      cacheTime: Infinity,
      useErrorBoundary: false,
      refetchInterval: 10000,
    },
  );
}
type Param = {
  walletAddress: string;
  window?: string;
}
export function usePerformanceChartAnnual(requestParam: PerformanceParam & BasicParam) {
  return useQuery<PerformanceCollection,AxiosError>(
    ['inventoryPerformanceChartAnnual',requestParam],
    async () => {
      const result = await getPerformanceChartAnnual(requestParam);
      return result.data;
    },
    {
      enabled: requestParam.walletAddress !== '',
      staleTime: Infinity,
      cacheTime: Infinity,
      useErrorBoundary: false,
    },
  );
}