import { getActivityItem } from "@/apis/activity";
import { insertSpamList } from "@/apis/spam";
import { insertCustomValuations } from "@/apis/valuation";
import { ActivityItem } from "@/interfaces/activity";
import { TSpam } from "@/interfaces/spam";
import { ValuationEdit } from "@/interfaces/valuation";
import { useMutation, useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";

export function useMutationSpamList() {
  return useMutation<any,AxiosError,TSpam[]>(
    (spams) => insertSpamList(spams),
    {
      useErrorBoundary: false,
    },
  );
}