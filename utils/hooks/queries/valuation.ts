import { getActivityItem } from "@/apis/activity";
import { TokenParam, getValuationTokenHistory } from "@/apis/valuation";
import { ActivityItem } from "@/interfaces/activity";
import { TokenHistory } from "@/interfaces/valuation";
import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";

export function useValuationTokenHistory(props: TokenParam) {
  return useQuery<TokenHistory,AxiosError>(
    ['token-history',props],
    async () => {
      const result = await getValuationTokenHistory(props);
      return result;
    },
    {
      staleTime: Infinity,
      cacheTime: Infinity,
      useErrorBoundary: false,
    },
  );
}