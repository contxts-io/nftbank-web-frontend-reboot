import { getCollectionList } from "@/apis/inventory";
import { IInventoryCollectionList } from "@/interfaces/inventory";
import { TCollectionParam } from "@/store/requestParam";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";

export function useInventorySpamList(requestParam: TCollectionParam) {
  return useQuery<IInventoryCollectionList,AxiosError>(
    ['inventorySpamList',requestParam],
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
export const useInventorySpamListInfinite = (requestParam: TCollectionParam) => {
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

  const query = useInfiniteQuery(['inventorySpamList',requestParam], fetchData, {
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