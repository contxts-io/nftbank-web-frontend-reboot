import { getSearchUser } from "@/apis/search";
import { SearchParam, TWalletList, getMyWalletList } from "@/apis/wallet";
import { TWallet } from "@/interfaces/inventory";
import { SearchUserResponse } from "@/interfaces/user";
import { validationWalletAddress } from "@/utils/common";
import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";

export function useSearchUserList(q: string) {
  return useQuery<SearchUserResponse,AxiosError>(
    ['searchUserList',q],
    async () => {
      const result = await getSearchUser(q);
  return result;
    },
    {
      staleTime: Infinity,
      cacheTime: Infinity,
      useErrorBoundary: false,
      enabled: q !== undefined && q !== '' && !q.startsWith('0x') || (q.startsWith('0x') && validationWalletAddress(q)),
    },
  );
}