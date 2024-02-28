import { checkFreshnessAndUpdate } from "@/apis/freshness";
import { BasicParam } from "@/interfaces/request";
import { DataFreshness } from "@/interfaces/utils";
import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";

export const useFreshnessAndUpdatePolling = (requestParam:BasicParam | null, forceUpdate: boolean = false) => {
  return useQuery<DataFreshness,AxiosError>(
    ['freshness',requestParam],
    async () => {
      if (requestParam === null) return Promise.reject('requestParam is null');
      const inventoryValue = await checkFreshnessAndUpdate({...requestParam, forceUpdate});
      return inventoryValue;
    },
    {
      refetchInterval: 10000,
      staleTime: 0,
      cacheTime: 0,
      useErrorBoundary: false,
      enabled: requestParam?.walletAddress !== ''
    },
  );
}