import { getMe, getProvider } from "@/apis/auth";
import { AxiosError } from "axios";
import { useQuery } from '@tanstack/react-query';
import { TMe } from "@/interfaces/user";
import { AuthProvider } from "@/interfaces/constants";
import { useCookies } from 'react-cookie';
export function useMe() {
  const [cookies, _] = useCookies(['nb_session']);
  return useQuery<TMe,AxiosError>(
    ['me',cookies.nb_session],
    async () => {
      const { data } = await getMe();
      return data.data;
    },
    {
      retry: 1,
      staleTime: Infinity,
      cacheTime: Infinity,
      useErrorBoundary: false,
      refetchOnWindowFocus: false, 
      enabled: cookies.nb_session ? true : false,
    },
  );
}
export function useMeManual() {
  const [cookies, _] = useCookies(['nb_session']);
  return useQuery<TMe,AxiosError>(
    ['me',cookies.nb_session],
    async () => {
      const { data } = await getMe();
      return data.data;
    },
    {
      staleTime: Infinity,
      cacheTime: Infinity,
      useErrorBoundary: false,
      enabled: false,
      refetchOnWindowFocus: false, 
    },
  );
}
export function useProviders(email:`${string}@${string}`) {
  return useQuery<AuthProvider[],AxiosError>(
    ['providers',email],
    async () => {
      const { data } = await getProvider({email});
      return data.provider;
    },
    {
      staleTime: Infinity,
      cacheTime: Infinity,
      useErrorBoundary: false,
      refetchOnWindowFocus: false, 
      enabled: false,
    },
  );
}