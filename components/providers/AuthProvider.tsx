import { getMe, signIn } from '@/apis/auth';
import ReactQueryClient from '@/utils/ReactQueryClient';
import instance from '@/utils/axiosInterceptor';
import { Hydrate, dehydrate } from '@tanstack/react-query';
import axios from 'axios';
import { getAuth, User } from 'firebase/auth';
import { RequestCookie } from 'next/dist/compiled/@edge-runtime/cookies';
import { cookies } from 'next/headers';

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
        console.log('AuthContext @@@getMe: ', data.data);
      })
      .catch((error) => {
        console.log('AuthContext @@@error: ', error);
      });
    console.log('AuthContext @@@result: ', result);
    return { name: 'julian' };
  } catch (error) {
    console.log('AuthContext @@@error: ', error);
    // throw new Error('Failed to fetch data');
    return { name: 'fail' };
  }
};

export const AuthProvider = async ({ children }: any) => {
  const cookieStore = cookies();
  const TOKEN = cookieStore.get('nb_session');
  const reactQueryClient = ReactQueryClient;
  if (TOKEN?.value) {
    const me = await reactQueryClient.prefetchQuery(['me'], () =>
      checkMe(TOKEN)
    );
  }
  const dehydratedState = dehydrate(reactQueryClient);
  return <Hydrate state={dehydratedState}>{children}</Hydrate>;
};
