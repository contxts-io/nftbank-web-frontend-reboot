import { getCollectionList, getCollectionValuableCount, getInventoryValue, getItemList, getItemValuableCount } from '@/apis/inventory';
import { getCollectionListPerformance, getInventoryValuePerformance, getItemListPerformance } from '@/apis/performance';
import { IInventoryCollectionList, IInventoryCollectionListPerformance, IInventoryItemList, IInventoryValue } from '@/interfaces/inventory';
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
      staleTime: Infinity,
      cacheTime: Infinity,
      useErrorBoundary: false,
    },
  );
}