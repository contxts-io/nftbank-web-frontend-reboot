import { getActivityItem } from "@/apis/activity";
import { ActivityItem } from "@/interfaces/activity";
import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";

export function useActivityItem(props?: any) {
  return useQuery<ActivityItem,AxiosError>(
    ['activityItem',props],
    async () => {
      const activityItem = await getActivityItem(props);
      return activityItem;
    },
    {
      staleTime: Infinity,
      cacheTime: Infinity,
      useErrorBoundary: false,
    },
  );
}