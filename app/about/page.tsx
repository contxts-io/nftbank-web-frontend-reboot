'use client';
import { ThemeSwitcher } from '@/components/buttons/ThemeSwitcher';
import { InjectedConnector } from 'wagmi/connectors/injected';
import { useAccount, useConnect, useEnsName } from 'wagmi';
import { useAtom, useAtomValue } from 'jotai';
import { testAtom } from '@/store/test';
import { getIdTokenByGoogle } from '@/apis/firebase';
import { signin } from '@/apis/auth';

const Page = () => {
  const { address, isConnected } = useAccount();
  const [test, setTest] = useAtom(testAtom);
  const { connect } = useConnect({
    connector: new InjectedConnector(),
  });
  const handleChangeAtom = (e: any) => {
    setTest('changed');
  };
  const onClickSignInGoogle = async () => {
    const token = await getIdTokenByGoogle();
    const user = token ? await signin(token) : null;
    console.log('user: ', user);
    return user;
  };
  if (!isConnected)
    return <button onClick={() => connect()}>Connect Wallet</button>;
  return (
    <div className='bg-primary'>
      <p className='dark:text-red-300'>about</p>
      <p>{address}</p>
      <p>{test}</p>
      <button onClick={handleChangeAtom}>change test</button>
      <button onClick={() => onClickSignInGoogle()}>Sign in Google</button>
      <ThemeSwitcher />
    </div>
  );
};
export default Page;
