import ReactQueryClient from '@/utils/ReactQueryClient';
import instance from '@/utils/axiosInterceptor';
import { Hydrate, dehydrate } from '@tanstack/react-query';
import { RequestCookie } from 'next/dist/compiled/@edge-runtime/cookies';
import { cookies } from 'next/headers';

const checkMe = async (token: RequestCookie) => {
  try {
    const cookie = `${token.name}=${token.value}`;
    const options = {
      withCredentials: true,
      headers: { Cookie: cookie },
    };
    // const URL = process.env.NEXT_PUBLIC_API_URL;
    const URL = 'https://web-api-reboot.dev.nftbank.tools/v1/user';
    const { data } = await instance.get(`${URL}`, options);
    return {
      ...data.data,
      walletAddress: '0xf060917ad197a9a72ea8ac4e65048eed02e99d5f',
    };
  } catch (error) {
    // throw new Error('Failed to fetch data');
    return { name: 'fail' };
  }
};

export const AuthProvider = async ({ children }: any) => {
  // const cookieStore = getCookies();
  const cookieStore = cookies();
  const TOKEN = cookieStore.get('nb_session');
  const reactQueryClient = ReactQueryClient;
  if (TOKEN && TOKEN?.value !== '') {
    await reactQueryClient.prefetchQuery(['me'], () => checkMe(TOKEN));
  }
  const dehydratedState = dehydrate(reactQueryClient);
  return <Hydrate state={dehydratedState}>{children}</Hydrate>;
};
