'use client';
import { getMe, signIn } from '@/apis/auth';
import ReactQueryClient from '@/utils/ReactQueryClient';
import instance from '@/utils/axiosInterceptor';
import { Hydrate, dehydrate } from '@tanstack/react-query';
import { getCookies } from 'cookies-next';
import { RequestCookie } from 'next/dist/compiled/@edge-runtime/cookies';

const checkMe = async (token: RequestCookie) => {
  try {
    const cookie = `${token.name}=${token.value}`;
    const options = {
      withCredentials: true,
      headers: { Cookie: cookie },
    };
    const URL = process.env.NEXT_PUBLIC_API_URL;
    const result = await instance
      .get(`${URL}/v1/user`, options)
      .then((data) => {
        // console.log('AuthContext @@@getMe: ', data.data);
      })
      .catch((error) => {
        // console.log('AuthContext @@@error: ', error);
      });
    // console.log('AuthContext @@@result: ', result);
    return {
      name: 'Jay',
      walletAddress: '0xf060917ad197a9a72ea8ac4e65048eed02e99d5f',
    };
  } catch (error) {
    console.log('AuthContext @@@error: ', error);
    // throw new Error('Failed to fetch data');
    return { name: 'fail' };
  }
};

export const AuthProvider = async ({ children }: any) => {
  const cookieStore = getCookies();
  const TOKEN = {
    name: 'nb_session',
    value: cookieStore['nb_session'] || '',
  };

  const reactQueryClient = ReactQueryClient;
  if (TOKEN?.value !== '') {
    const me = await reactQueryClient.prefetchQuery(['me'], () =>
      checkMe(TOKEN)
    );
  }
  const dehydratedState = dehydrate(reactQueryClient);
  return <Hydrate state={dehydratedState}>{children}</Hydrate>;
};
