import { ResponseAcquisitionTypesData, ResponseRealizedTokensData, TResponseInventoryValueHistory, getCollectionList, getCollectionValuableCount, getInventoryAcquisitionType, getInventoryCollectionPositionValue, getInventoryRealizedTokens, getInventoryValue, getInventoryValueHistory, getItemList, getItemValuableCount } from '@/apis/inventory';
import { AcquisitionType } from '@/interfaces/activity';
import { Token } from '@/interfaces/collection';
import { IInventoryCollectionList, IInventoryItemList, IInventoryValue, IStat, PositionCollection } from '@/interfaces/inventory';
import { ItemParam, TCollectionParam } from '@/store/requestParam';
import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';

export function useInventoryValue(walletAddress?: string) {
  return useQuery<IInventoryValue,AxiosError>(
    ['inventoryValue',walletAddress],
    async () => {
      const inventoryValue = await getInventoryValue(walletAddress);
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
export function useCollectionCount(walletAddress?: string) {
  return useQuery<IStat,AxiosError>(
    ['collectionCount',walletAddress],
    async () => {
      const count = await getCollectionValuableCount(walletAddress);
      return count;
    },
    {
      enabled: walletAddress !== '',
      staleTime: Infinity,
      cacheTime: Infinity,
      useErrorBoundary: false,
    },
  );
}
export function useItemCount(walletAddress?: string) {
  return useQuery<IStat,AxiosError>(
    ['itemCount',walletAddress],
    async () => {
      const count = await getItemValuableCount(walletAddress);
      return count;
    },
    {
      enabled: walletAddress !== '',
      staleTime: Infinity,
      cacheTime: Infinity,
      useErrorBoundary: false,
    },
  );
}

export function useInventoryCollectionList(requestParam: TCollectionParam) {
  return useQuery<IInventoryCollectionList,AxiosError>(
    ['inventoryCollectionList',requestParam],
    async () => {
      const inventoryCollectionList = await getCollectionList(requestParam);
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

export function useInventoryItemFilter(requestParam: TCollectionParam) {
  return useQuery<IInventoryCollectionList,AxiosError>(
    ['inventoryItemFilter',requestParam],
    async () => {
      const inventoryItemFilterCollections = await getCollectionList(requestParam);
      return inventoryItemFilterCollections;
    },
    {
      enabled: requestParam.walletAddress !== '',
      staleTime: Infinity,
      cacheTime: Infinity,
      useErrorBoundary: false,
    },
  );
}
export function useInventoryItemList(requestParam: ItemParam) {
  return useQuery<IInventoryItemList,AxiosError>(
    ['inventoryItemList',requestParam],
    async () => {
      const inventoryItemList = await getItemList(requestParam);
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
export const useInventoryItemInfinite = (requestParam: ItemParam) => {
  const fetchData = async ({ pageParam = 1 }) => {
    const result = await getItemList({...requestParam, page: pageParam});
    const isLast = (result.paging.total / result.paging.limit) <= result.paging.page ? true : false;
        
    return {
      ...result,
      page: pageParam,
      nextPage: pageParam + 1,
      isLast,
    };
  }

  const query = useInfiniteQuery(['inventoryItemList',requestParam], fetchData, {
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
export const useInventoryCollectionsInfinite = (requestParam: TCollectionParam) => {
  const fetchData = async ({ pageParam = 1 }) => {
    const result = await getCollectionList({...requestParam, page: pageParam});
    const isLast = (result.paging.total / result.paging.limit) <= result.paging.page ? true : false;
        
    return {
      ...result,
      page: pageParam,
      nextPage: pageParam + 1,
      isLast,
    };
  }

  const query = useInfiniteQuery(['inventoryCollectionList',requestParam], fetchData, {
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
export const useInventoryValueHistorical = (walletAddress?: string) => {
  return useQuery<TResponseInventoryValueHistory,AxiosError>(
    ['inventoryValueHistorical',walletAddress],
    async () => {
      const inventoryValueHistorical = await getInventoryValueHistory(walletAddress);
      return inventoryValueHistorical;
    },
    {
      enabled: walletAddress !== '',
      staleTime: Infinity,
      cacheTime: Infinity,
      useErrorBoundary: false,
    },
  );
}
export const useInventoryCollectionPositionValue = (walletAddress?: string) => {
  return useQuery<PositionCollection[],AxiosError>(
    ['inventoryCollectionPositionValue',walletAddress],
    async () => {
      const value = await getInventoryCollectionPositionValue(walletAddress);
      return value.data;
    },
    {
      enabled: walletAddress !== '',
      staleTime: Infinity,
      cacheTime: Infinity,
      useErrorBoundary: false,
    },
  );
}
export const useInventoryRealizedTokens = (walletAddress?: string) => {
  return useQuery<ResponseRealizedTokensData,AxiosError>(
    ['inventoryRealizedTokens',walletAddress],
    async () => {
      const value = await getInventoryRealizedTokens(walletAddress);
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
export const useInventoryValuePolling = (walletAddress?: string) => {
  return useQuery<IInventoryValue,AxiosError>(
    ['inventoryValuePolling',walletAddress],
    async () => {
      const inventoryValue = await getInventoryValue(walletAddress);
      return inventoryValue;
    },
    {
      enabled: walletAddress !== '',
      refetchInterval: 10000,
      staleTime: 0,
      cacheTime: 0,
      useErrorBoundary: false,
    },
  );
}
export const useInventoryAcquisitionTypes = (walletAddress?: string) => {
  return useQuery<ResponseAcquisitionTypesData,AxiosError>(
    ['inventoryAcquisitionTypes',walletAddress],
    async () => {
      const value = await getInventoryAcquisitionType(walletAddress);
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