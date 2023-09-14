import { getMetadata } from "@/apis/metadata";
import { Metadata } from "@/interfaces/metadata";
import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";

export function useMetadata(props: {networkId: string, assetContract: string, tokenId: number}) {
  return useQuery<Metadata,AxiosError>(
    ['metadata',props],
    async () => {
      const metadata = await getMetadata(props);
      return metadata;
    },
    {
      staleTime: Infinity,
      cacheTime: Infinity,
      useErrorBoundary: false,
    },
  );
}