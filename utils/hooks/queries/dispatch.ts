import { TDispatch, dispatchDailyNav, dispatchPerformance } from "@/apis/dispatch";
import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";

export function useDispatchDailyNav(walletAddress:string) {
  return useQuery<TDispatch,AxiosError>(
    ['dailyNav',walletAddress],
    async () => {
      const result = await dispatchDailyNav(walletAddress);
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