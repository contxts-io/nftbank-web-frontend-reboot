'use client';
import { ThemeSwitcher } from '@/components/buttons/ThemeSwitcher';
import { InjectedConnector } from 'wagmi/connectors/injected';
import { useAccount, useConnect } from 'wagmi';
import { useAtom } from 'jotai';
import { testAtom } from '@/store/test';
import { getIdTokenByGoogle } from '@/apis/firebase';
import { getMe, signIn } from '@/apis/auth';
import { setCookie } from 'cookies-next';

const Page = () => {
  // const { address, isConnected } = useAccount();
  // const [test, setTest] = useAtom(testAtom);
  // const { connect } = useConnect({
  //   connector: new InjectedConnector(),
  // });
  // const handleChangeAtom = (e: any) => {
  //   setTest('changed');
  // };
  // const onClickSignInGoogle = async () => {
  //   const token = await getIdTokenByGoogle();
  //   if (token) {
  //     setCookie('accessToken', token);
  //     const user = token ? await signIn(token) : null;
  //     console.log('user: ', user);
  //   } else {
  //     console.log('token is null');
  //   }
  // };
  // const checkMe = async () => {
  //   const result = await getMe();
  //   console.log('result: ', result);
  // };
  // if (!isConnected)
  //   return <button onClick={() => connect()}>Connect Wallet</button>;
  return (
    <div className='bg-primary'>
      <p className='dark:text-red-300'>about</p>
      {/* <p>{address}</p>
      <p>{test}</p>
      <button onClick={handleChangeAtom}>change test</button>
      <button onClick={() => onClickSignInGoogle()}>Sign in Google</button>
      <button onClick={() => checkMe()}>get Me</button> */}
      <ThemeSwitcher />
    </div>
  );
};
export default Page;
