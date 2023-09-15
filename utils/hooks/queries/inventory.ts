import { getCollectionList, getCollectionValuableCount, getInventoryValue, getItemList, getItemValuableCount } from '@/apis/inventory';
import { IInventoryCollectionList, IInventoryItemList, IInventoryValue } from '@/interfaces/inventory';
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
      staleTime: Infinity,
      cacheTime: Infinity,
      useErrorBoundary: false,
    },
  );
}
export function useCollectionCount(walletAddress?: string) {
  return useQuery<{count:number},AxiosError>(
    ['collectionCount',walletAddress],
    async () => {
      const count = await getCollectionValuableCount(walletAddress);
      return count;
    },
    {
      staleTime: Infinity,
      cacheTime: Infinity,
      useErrorBoundary: false,
    },
  );
}
export function useItemCount(walletAddress?: string) {
  return useQuery<{count:number},AxiosError>(
    ['itemCount',walletAddress],
    async () => {
      const count = await getItemValuableCount(walletAddress);
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
export function useInventoryItemList(requestParam: ItemParam) {
  return useQuery<IInventoryItemList,AxiosError>(
    ['inventoryItemList',requestParam],
    async () => {
      const inventoryItemList = await getItemList(requestParam);
      return inventoryItemList;
    },
    {
      staleTime: Infinity,
      cacheTime: Infinity,
      useErrorBoundary: false,
    },
  );
}