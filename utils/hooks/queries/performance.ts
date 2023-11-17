import { PerformanceParam, getInventoryUnrealizedPerformance, getPerformanceChart, getPerformanceChartAnnual } from '@/apis/performance';
import { IInventoryCollectionListPerformance, IInventoryItemList, InventoryValueNested, PerformanceCollection, UnrealizedValue } from '@/interfaces/inventory';
import { ItemParam, TCollectionParam } from '@/store/requestParam';
import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';

export function useInventoryUnrealizedPerformance(walletAddress?: string) {
  return useQuery<UnrealizedValue,AxiosError>(
    ['inventoryUnrealizedValuePerformance',walletAddress],
    async () => {
      const unrealizedValue = await getInventoryUnrealizedPerformance(walletAddress);
      return unrealizedValue;
    },
    {
      enabled: walletAddress !== '',
      staleTime: Infinity,
      cacheTime: Infinity,
      useErrorBoundary: false,
    },
  );
}
export function usePerformanceChart(requestParam: PerformanceParam) {
  return useQuery<{data: PerformanceCollection[]},AxiosError>(
    ['inventoryPerformanceChart',requestParam],
    async () => {
      const result = await getPerformanceChart(requestParam);
      return result;
    },
    {
      enabled: requestParam.walletAddress !== '',
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
export function usePerformanceChartAnnual(requestParam:PerformanceParam & {window?: string}) {
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