import { getActivityItem } from "@/apis/activity";
import { insertCustomValuations } from "@/apis/valuation";
import { ActivityItem } from "@/interfaces/activity";
import { ValuationEdit } from "@/interfaces/valuation";
import { useMutation, useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";

export function useMutationCustomValuations() {
  return useMutation<any,AxiosError,ValuationEdit[]>(
    (valuations) => insertCustomValuations(valuations),
    {
      useErrorBoundary: false,
    },
  );
}