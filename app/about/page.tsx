'use client';
import { ThemeSwitcher } from '@/components/buttons/ThemeSwitcher';
import { InjectedConnector } from 'wagmi/connectors/injected';
import { useAccount, useConnect } from 'wagmi';
import { useAtom } from 'jotai';
import { testAtom } from '@/store/test';
import { getIdTokenByGoogle } from '@/apis/firebase';
import { getMe, signIn, signUp } from '@/apis/auth';
import { setCookie } from 'cookies-next';
import Button from '@/components/buttons/Button';

const Page = () => {
  // const { address, isConnected } = useAccount();
  // const [test, setTest] = useAtom(testAtom);
  // const { connect } = useConnect({
  //   connector: new InjectedConnector(),
  // });
  // const handleChangeAtom = (e: any) => {
  //   setTest('changed');
  // };
  const onClickSignInGoogle = async () => {
    try {
      const token = await getIdTokenByGoogle();
      if (token) {
        setCookie('accessToken', token);
        const user = token ? await signIn(token) : null;
        console.log('user: ', user);
      } else {
        console.log('token is null');
      }
    } catch (error) {
      console.log('error: ', error);
      throw error;
    }
  };
  const onClickSignUpGoogle = async () => {
    try {
      const token = await getIdTokenByGoogle();
      if (token) {
        setCookie('accessToken', token);
        const user = token ? await signUp({ token, nickname: 'julian' }) : null;
        console.log('user: ', user);
      } else {
        console.log('token is null');
      }
    } catch (error) {
      console.log('error: ', error);
      throw error;
    }
  };
  const checkMe = async () => {
    const result = await getMe();
    console.log('result: ', result);
  };
  // if (!isConnected)
  //   return <button onClick={() => connect()}>Connect Wallet</button>;
  return (
    <div className='bg-primary'>
      {/* <p>{address}</p>
      <p>{test}</p>
      <button onClick={handleChangeAtom}>change test</button>*/}
      <div className='flex gap-6'>
        <Button id='' onClick={() => onClickSignInGoogle()}>
          Sign in Google
        </Button>
        <Button id='' onClick={() => onClickSignUpGoogle()}>
          Sign Up Google
        </Button>
        <Button id='' onClick={() => checkMe()}>
          get Me
        </Button>

        <ThemeSwitcher />
      </div>
    </div>
  );
};
export default Page;
