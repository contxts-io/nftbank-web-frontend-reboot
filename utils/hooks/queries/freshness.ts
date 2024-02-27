import { checkFreshnessAndUpdate } from "@/apis/freshness";
import { BasicParam } from "@/interfaces/request";
import { DataFreshness } from "@/interfaces/utils";
import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";

export const useFreshnessAndUpdatePolling = (searchParam:BasicParam, forceUpdate: boolean = true) => {
  return useQuery<DataFreshness,AxiosError>(
    ['freshness',searchParam],
    async () => {
      const inventoryValue = await checkFreshnessAndUpdate({...searchParam, forceUpdate});
      return inventoryValue;
    },
    {
      refetchInterval: 10000,
      staleTime: 0,
      cacheTime: 0,
      useErrorBoundary: false,
    },
  );
}