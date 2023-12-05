import { PerformanceParam, getInventoryUnrealizedPerformance, getPerformanceChart, getPerformanceChartAnnual } from '@/apis/performance';
import { IInventoryCollectionListPerformance, IInventoryItemList, InventoryValueNested, PerformanceCollection, UnrealizedValue } from '@/interfaces/inventory';
import { BasicParam } from '@/interfaces/request';
import { ItemParam, TCollectionParam } from '@/store/requestParam';
import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';

export function useInventoryUnrealizedPerformance(searchParam: BasicParam) {
  return useQuery<UnrealizedValue,AxiosError>(
    ['inventoryUnrealizedValuePerformance',searchParam],
    async () => {
      const unrealizedValue = await getInventoryUnrealizedPerformance(searchParam);
      return unrealizedValue;
    },
    {
      staleTime: Infinity,
      cacheTime: Infinity,
      useErrorBoundary: false,
    },
  );
}
export function usePerformanceChart(requestParam: PerformanceParam & BasicParam) {
  return useQuery<{data: PerformanceCollection[]},AxiosError>(
    ['inventoryPerformanceChart',requestParam],
    async () => {
      const result = await getPerformanceChart(requestParam);
      return result;
    },
    {
      staleTime: Infinity,
      cacheTime: Infinity,
      useErrorBoundary: false,
    },
  );
}
type Param = {
  walletAddress: string;
  window?: string;
}
export function usePerformanceChartAnnual(requestParam: PerformanceParam & BasicParam & {window?: string}) {
  return useQuery<PerformanceCollection,AxiosError>(
    ['inventoryPerformanceChartAnnual',requestParam],
    async () => {
      const result = await getPerformanceChartAnnual({...requestParam, window: requestParam.window || 'ytd'});
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