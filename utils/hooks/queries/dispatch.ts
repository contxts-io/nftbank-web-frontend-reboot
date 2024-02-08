import { TDispatch, dispatchDailyNav, dispatchPerformance } from "@/apis/dispatch";
import { TResponseInventoryValueHistory, getInventoryValueHistory } from "@/apis/inventory";
import { historicalNavTaskIdAtom } from "@/store/dispatchTaskId";
import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useAtom, useAtomValue, useSetAtom } from "jotai";

export function useDispatchDailyNav(walletAddress:string) {
  return useQuery<TDispatch,AxiosError>(
    ['dispatchDailyNav',walletAddress],
    async () => {
      const result = await dispatchDailyNav(walletAddress);
      if (result.taskId === 'CACHED') {
        return result;  
      }
      await new Promise(resolve => setTimeout(resolve, 1000));
      return result;
    },
    {
      retry: 1,
      staleTime: Infinity,
      cacheTime: Infinity,
      useErrorBoundary: false,
      refetchOnWindowFocus: false, 
      enabled: !!walletAddress && walletAddress !== '',
    },
  );
}
export function useDispatchPerformance(walletAddress:string) {
  return useQuery<TDispatch,AxiosError>(
    ['dispatchPerformance',walletAddress],
    async () => {
      const result = await dispatchPerformance(walletAddress);
      if (result.taskId === 'CACHED') {
        return result;  
      }
      await new Promise(resolve => setTimeout(resolve, 1000));
      return result;
    },
    {
      retry: 1,
      staleTime: Infinity,
      cacheTime: Infinity,
      useErrorBoundary: false,
      refetchOnWindowFocus: false, 
      enabled: !!walletAddress && walletAddress !== '',
    },
  );
}