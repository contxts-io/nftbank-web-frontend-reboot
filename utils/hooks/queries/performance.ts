import { getCollectionList, getCollectionValuableCount, getInventoryValue, getItemList, getItemValuableCount } from '@/apis/inventory';
import { getCollectionListPerformance, getInventoryUnrealizedPerformance, getInventoryValuePerformance, getItemListPerformance, getPerformanceChart } from '@/apis/performance';
import { IInventoryCollectionList, IInventoryCollectionListPerformance, IInventoryItemList, IInventoryValue, PerformanceCollection, UnrealizedValue } from '@/interfaces/inventory';
import { ItemParam, TCollectionParam } from '@/store/requestParam';
import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';

export function useInventoryValuePerformance(walletAddress?: string) {
  return useQuery<IInventoryValue,AxiosError>(
    ['inventoryValuePerformance',walletAddress],
    async () => {
      const inventoryValue = await getInventoryValuePerformance(walletAddress);
      return inventoryValue;
    },
    {
      enabled: walletAddress !== '',
      staleTime: Infinity,
      cacheTime: Infinity,
      useErrorBoundary: false,
    },
  );
}
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

export function useInventoryCollectionListPerformance(requestParam: TCollectionParam) {
  return useQuery<IInventoryCollectionListPerformance,AxiosError>(
    ['inventoryCollectionListPerformance',requestParam],
    async () => {
      const inventoryCollectionList = await getCollectionListPerformance(requestParam);
      return inventoryCollectionList;
    },
    {
      enabled: requestParam.walletAddress !== '',
      staleTime: Infinity,
      cacheTime: Infinity,
      useErrorBoundary: false,
    },
  );
}
export const useInventoryCollectionsInfinitePerformance = (requestParam: TCollectionParam) => {
  const fetchData = async ({ pageParam = 1 }) => {
    const result = await getCollectionListPerformance({...requestParam, page: pageParam});
    const isLast = (result.paging.total / result.paging.limit) == result.paging.page;
        
    return {
      ...result,
      nextPage: pageParam + 1,
      isLast,
    };
  }

  const query = useInfiniteQuery(['inventoryCollectionListPerformance',requestParam], fetchData, {
    getNextPageParam: (lastPage) => {
      if (!lastPage.isLast) return lastPage.nextPage;
      return undefined;
    },
    enabled: requestParam.walletAddress !== '',
    staleTime: Infinity,
    cacheTime: Infinity,
    useErrorBoundary: false,
    refetchOnWindowFocus: false,
    refetchOnMount: true,
    refetchOnReconnect: true,
    retry: 2,
  });

  return query;
};
export const useInventoryItemInfinitePerformance = (requestParam: ItemParam) => {
  const fetchData = async ({ pageParam = 1 }) => {
    const result = await getItemListPerformance({...requestParam, page: pageParam});
    const isLast = (result.paging.total / result.paging.limit) == result.paging.page;
        
    return {
      ...result,
      nextPage: pageParam + 1,
      isLast,
    };
  }

  const query = useInfiniteQuery(['inventoryItemListPerformance',requestParam], fetchData, {
    getNextPageParam: (lastPage) => {
      if (!lastPage.isLast) return lastPage.nextPage;
      return undefined;
    },
    enabled: requestParam.walletAddress !== '',
    staleTime: Infinity,
    cacheTime: Infinity,
    useErrorBoundary: false,
    refetchOnWindowFocus: false,
    refetchOnMount: true,
    refetchOnReconnect: true,
    retry: 1,
  });

  return query;
};
export const useInventoryItemPerformance = (requestParam: ItemParam) => {
  return useQuery<IInventoryItemList,AxiosError>(
    ['inventoryItemListPerformance',requestParam],
    async () => {
      const inventoryItemList = await getItemListPerformance(requestParam);
      return inventoryItemList;
    },
    {
      enabled: requestParam.walletAddress !== '',
      staleTime: Infinity,
      cacheTime: Infinity,
      useErrorBoundary: false,
    },
  );
}
export function usePerformanceChart(walletAddress: string) {
  return useQuery<{data: PerformanceCollection[]},AxiosError>(
    ['inventoryPerformanceChart',walletAddress],
    async () => {
      const result = await getPerformanceChart(walletAddress);
      return result;
    },
    {
      enabled: walletAddress !== '',
      staleTime: Infinity,
      cacheTime: Infinity,
      useErrorBoundary: false,
    },
  );
}