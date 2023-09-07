import { getCollectionList, getInventoryValue } from '@/apis/inventory';
import { IInventoryCollectionList, IInventoryValue } from '@/interfaces/inventory';
import { TCollectionParam } from '@/store/requestParam';
import { useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';

export function useInventoryValue() {
  return useQuery<IInventoryValue,AxiosError>(
    ['inventoryValue'],
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
