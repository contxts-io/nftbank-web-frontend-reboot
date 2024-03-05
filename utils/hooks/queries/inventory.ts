import { ResponseAcquisitionTypesData, TResponseInventoryValueHistory, getCollectionList, getCollectionValuableCount, getInventoryAcquisitionType, getInventoryCollectionPositionAmount, getInventoryCollectionPositionValue, getInventoryRealizedTokens, getInventoryValue, getInventoryValueHistory, getItemList, getItemValuableCount } from '@/apis/inventory';
import { IInventoryCollectionList, IInventoryItemList, InventoryValue, InventoryValueNested, IStat, PositionCollection, PositionCollectionAmount } from '@/interfaces/inventory';
import { BasicParam } from '@/interfaces/request';
import { freshnessAtom } from '@/store/freshness';
import { ItemParam, TAcquisitionParam, TAnalysisGainAndLossParam, TCollectionParam, TOverviewHistoricalValueParam } from '@/store/requestParam';
import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { useAtomValue } from 'jotai';

export function useInventoryValue(searchParam: BasicParam | null) {
  const dataFreshness = useAtomValue(freshnessAtom).find((f)=>f.status === 'ALL');
  return useQuery<InventoryValueNested,AxiosError>(
    ['inventoryValue', searchParam, dataFreshness?.processedAt],
    async () => {
      const inventoryValue = await getInventoryValue(searchParam);
      return inventoryValue;
    },
    {
      keepPreviousData: true,
      staleTime: Infinity,
      cacheTime: Infinity,
      useErrorBoundary: false,
      // enabled: searchParam !== null && searchParam.walletAddress !== undefined && searchParam?.walletAddress !== '' && searchParam?.walletAddress !== undefined,
      enabled: searchParam !== null,
    },
  );
}
export function useCollectionCount(searchParam: BasicParam | null) {
  return useQuery<IStat,AxiosError>(
    ['collectionCount',searchParam],
    async () => {
      const count = await getCollectionValuableCount(searchParam);
      return count;
    },
    {
      staleTime: Infinity,
      cacheTime: Infinity,
      useErrorBoundary: false,
    },
  );
}
export function useItemCount(searchParam: BasicParam | null) {
  return useQuery<IStat,AxiosError>(
    ['itemCount',searchParam],
    async () => {
      const count = await getItemValuableCount(searchParam);
      return count;
    },
    {
      staleTime: Infinity,
      cacheTime: Infinity,
      useErrorBoundary: false,
    },
  );
}

export function useInventoryCollectionList(requestParam: TCollectionParam) {
  const dataFreshness = useAtomValue(freshnessAtom).find((f) => f.status === 'CURRENT');
  const dataParam: TCollectionParam = {
    ...requestParam,
    limit: requestParam.limit * requestParam.page,
    page: 1,
  }
  return useQuery<IInventoryCollectionList,AxiosError>(
    ['inventoryCollectionListFresh',requestParam, dataFreshness?.processedAt],
    async () => {
      const inventoryCollectionList = await getCollectionList(dataParam);
      return inventoryCollectionList;
    },
    {
      staleTime: Infinity,
      cacheTime: Infinity,
      useErrorBoundary: false,
      keepPreviousData: true,
    },
  );
}

export function useInventoryItemFilter(requestParam: TCollectionParam) {
  return useQuery<IInventoryCollectionList,AxiosError>(
    ['inventoryItemFilter',requestParam],
    async () => {
      console.log('2. useInventoryItemFilter',requestParam)
      const inventoryItemFilterCollections = await getCollectionList(requestParam);
      return inventoryItemFilterCollections;
    },
    {
      staleTime: Infinity,
      cacheTime: Infinity,
      useErrorBoundary: false,
    },
  );
}
export function useInventoryItemList(requestParam: ItemParam) {
  const dataFreshness = useAtomValue(freshnessAtom).find((f) => f.status === 'CURRENT');
  const dataParam: ItemParam = {
    ...requestParam,
    limit: requestParam.limit * requestParam.page,
    page: 1,
  }
  return useQuery<IInventoryItemList,AxiosError>(
    ['inventoryItemListFresh',requestParam, dataFreshness?.processedAt],
    async () => {
      const inventoryItemList = await getItemList(dataParam);
      return inventoryItemList;
    },
    {
      enabled: requestParam.walletAddress !== '',
      staleTime: Infinity,
      cacheTime: Infinity,
      useErrorBoundary: false,
      keepPreviousData: true,
    },
  );
}
export const useInventoryItemInfinite = (requestParam: ItemParam) => {
  const fetchData = async ({ pageParam = 1 }) => {
    const result = await getItemList({...requestParam, page: pageParam});
    const isLast = (result.paging.total / result.paging.limit) <= result.paging.page ? true : false;
    // const isLast = result.paging.total !== result.paging.limit ? true : false;
        
    return {
      ...result,
      page: pageParam,
      nextPage: pageParam + 1,
      isLast : isLast,
    };
  }

  const query = useInfiniteQuery(['inventoryItemList',requestParam], fetchData, {
    getNextPageParam: (lastPage) => {
      if (!lastPage.isLast) return lastPage.nextPage;
      return undefined;
    },
    enabled: requestParam.walletAddress !== '',
    keepPreviousData: true,
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
    // const isLast = result.paging.total !== result.paging.limit ? true : false;
    return {
      ...result,
      paging: result.paging,
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
    keepPreviousData: true,
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
export const useInventoryValueHistorical = (requestParam: TOverviewHistoricalValueParam) => {
  const dataFreshness = useAtomValue(freshnessAtom).find((f)=>f.status === 'ALL');
  return useQuery<TResponseInventoryValueHistory,AxiosError>(
    ['inventoryValueHistorical',requestParam, dataFreshness?.processedAt],
    async () => {
      const inventoryValueHistorical = await getInventoryValueHistory(requestParam);
      return inventoryValueHistorical;
    },
    {
      enabled: requestParam.walletAddress !== '',
      staleTime: Infinity,
      cacheTime: Infinity,
      useErrorBoundary: false,
      keepPreviousData: true,
    },
  );
}
export const useInventoryCollectionPositionValue = (requestParam: BasicParam) => {
  const dataFreshness = useAtomValue(freshnessAtom).find((f)=>f.status === 'ALL');
  return useQuery<PositionCollection[],AxiosError>(
    ['inventoryCollectionPositionValue',requestParam, dataFreshness?.processedAt],
    async () => {
      const value = await getInventoryCollectionPositionValue(requestParam);
      return value.data;
    },
    {
      keepPreviousData: true,
      staleTime: Infinity,
      cacheTime: Infinity,
      useErrorBoundary: false,
      enabled: !!requestParam.walletAddress,
    },
  );
}
export const useInventoryCollectionPositionAmount = (requestParam: BasicParam) => {
  const dataFreshness = useAtomValue(freshnessAtom).find((f)=>f.status === 'ALL');
  return useQuery<PositionCollectionAmount[],AxiosError>(
    ['inventoryCollectionPositionAmount',requestParam, dataFreshness?.processedAt],
    async () => {
      const value = await getInventoryCollectionPositionAmount(requestParam);
      return value.data;
    },
    {
      keepPreviousData: true,
      staleTime: Infinity,
      cacheTime: Infinity,
      useErrorBoundary: false,
      enabled: !!requestParam.walletAddress,
    },
  );
}
export const useInventoryRealizedTokens = (requestParam: TAnalysisGainAndLossParam) => {
  const dataFreshness = useAtomValue(freshnessAtom).find((f) => f.status === 'ALL');
  const dataParam: TAnalysisGainAndLossParam = {
    ...requestParam,
    limit: requestParam.limit * requestParam.page,
    page: 1,
  }
  return useQuery(
    ['inventoryRealizedTokensFresh', requestParam, dataFreshness?.processedAt],
    async () => {
      const result = await getInventoryRealizedTokens(dataParam);
      return result;
    },
    {
      enabled: requestParam.walletAddress !== '',
      staleTime: Infinity,
      cacheTime: Infinity,
      useErrorBoundary: false,
      keepPreviousData: true,
    },
  );
}
export const useInventoryRealizedTokensInfinite = (requestParam: TAnalysisGainAndLossParam) => {
  const fetchData = async ({ pageParam = 1 }) => {
    const result = await getInventoryRealizedTokens({ ...requestParam, page: pageParam});
    const isLast = (result.paging.total / result.paging.limit) <= result.paging.page ? true : false;
    return {
      ...result,
      page: pageParam,
      nextPage: pageParam + 1,
      isLast,
    };
  }

  const query = useInfiniteQuery(['inventoryRealizedTokens',requestParam],fetchData, {
    getNextPageParam: (lastPage) => {
      if (!lastPage.isLast) return lastPage.nextPage;
      return undefined;
    },
    keepPreviousData: true,
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
export const useInventoryValuePolling = (searchParam:BasicParam | null) => {
  return useQuery<InventoryValueNested,AxiosError>(
    ['inventoryValuePolling',searchParam],
    async () => {
      const inventoryValue = await getInventoryValue(searchParam);
      return inventoryValue;
    },
    {
      refetchInterval: 10000,
      staleTime: 0,
      cacheTime: 0,
      useErrorBoundary: false,
      enabled: searchParam !== null,
    },
  );
}
export const useInventoryAcquisitionTypes = (requestParam: TAcquisitionParam) => {
  const dataFreshness = useAtomValue(freshnessAtom).find((f)=>f.status === 'ALL');
  return useQuery<ResponseAcquisitionTypesData,AxiosError>(
    ['inventoryAcquisitionTypes',requestParam, dataFreshness?.processedAt],
    async () => {
      const value = await getInventoryAcquisitionType(requestParam);
      return value;
    },
    {
      keepPreviousData: true,
      staleTime: Infinity,
      cacheTime: Infinity,
      useErrorBoundary: false,
    },
  );
}