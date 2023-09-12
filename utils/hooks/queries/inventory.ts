import { getCollectionList, getInventoryValue } from '@/apis/inventory';
import { IInventoryCollectionList, IInventoryValue } from '@/interfaces/inventory';
import { TCollectionParam } from '@/store/requestParam';
import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';

export function useInventoryValue(walletAddress: string | null) {
  return useQuery<IInventoryValue,AxiosError>(
    ['inventoryValue',walletAddress],
    async () => {
      const inventoryValue = await getInventoryValue();
      return inventoryValue;
    },
    {
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
      staleTime: Infinity,
      cacheTime: Infinity,
      useErrorBoundary: false,
    },
  );
}
export function useInventoryItemCollection (requestParam: TCollectionParam) {
  const { data, status, hasNextPage, fetchNextPage, isFetchingNextPage, isFetching } = useInfiniteQuery(['inventoryItemFilterCollection', requestParam],
    async ({ pageParam = 1 }) => {
      return await getCollectionList(pageParam);
    },
    {
      getNextPageParam: (lastPage, allPages) => {
      
        // lastPage에는 fetch callback의 리턴값이 전달됨
        // allPage에는 배열안에 지금까지 불러온 데이터를 계속 축적하는 형태 [[data], [data1], .......]
        const maxPage = lastPage.paging.total / 30; // 한번에 30개씩 보여주기
        const nextPage = allPages.length + 1; // 
        return nextPage <= maxPage ? nextPage : undefined; // 다음 데이터가 있는지 없는지 판단
      },
    }
  );
}