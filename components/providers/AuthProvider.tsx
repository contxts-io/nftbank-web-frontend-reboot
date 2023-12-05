import { TWalletList } from '@/apis/wallet';
import { TMe } from '@/interfaces/user';
import ReactQueryClient from '@/utils/ReactQueryClient';
import instance from '@/utils/axiosInterceptor';
import { Hydrate, dehydrate } from '@tanstack/react-query';
import { RequestCookie } from 'next/dist/compiled/@edge-runtime/cookies';
import { cookies } from 'next/headers';
const WALLET_ADDRESS = [
  '0x7e0de483a33bd04d2efe38686be5cb25cfd3e533',
  // '0xcfb3ee49c46ab8a5665aad3c03c4b3aef743e80c',
  // '0x878e874bb80bf5fe90b6a66624769f8d543a724c',
  // '0xde3edc100a526fb8a25943794d7d6c4990eef8ef',
  // '0xb4083e91b794208478ac6a13c21ace04fd3faafe',
  // '0x5987cad5f0bddd4d069a50a2427dff0186a07f8f',
];
const checkMe = async (token: RequestCookie) => {
  try {
    const cookie = `${token.name}=${token.value}`;
    const options = {
      withCredentials: true,
      headers: { Cookie: cookie },
    };
    const URL = process.env.API_URL_SSR;
    const { data } = await instance.get<{ data: TMe }>(
      `${URL}/v1/auth/me`,
      options
    );
    return data.data;
  } catch (error) {
    // throw new Error('Failed to fetch data');
    return null;
  }
};
const checkWallet = async (token: RequestCookie) => {
  try {
    const cookie = `${token.name}=${token.value}`;
    const options = {
      withCredentials: true,
      headers: { Cookie: cookie },
    };
    const URL = process.env.API_URL_SSR;
    const { data } = await instance.get<{ data: TWalletList }>(
      `${URL}/v1/wallet`,
      options
    );
    return data.data;
  } catch (error) {
    // throw new Error('Failed to fetch data');
    return null;
  }
};

export const AuthProvider = async ({ children }: any) => {
  // const cookieStore = getCookies();
  const cookieStore = cookies();
  const TOKEN = cookieStore.get('nb_session');
  const reactQueryClient = ReactQueryClient;
  // if (SIGN_IN === 'SIGN_IN' && TOKEN && TOKEN?.value !== '') {
  if (TOKEN && TOKEN?.value !== '') {
    console.log('여기로 온것인가');
    try {
      const user = await checkMe(TOKEN);
      if (user) {
        reactQueryClient.setQueryData(['me', TOKEN.value], user);
        const wallet = await checkWallet(TOKEN);
        reactQueryClient.setQueryData([{ userId: user.id }, 'walletList'], {
          ...wallet,
        });
      }
    } catch (err) {
      console.log('ssr sign-in err', err);
    }
  }
  const dehydratedState = dehydrate(reactQueryClient);
  return <Hydrate state={dehydratedState}>{children}</Hydrate>;
};
