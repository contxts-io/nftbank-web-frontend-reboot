'use client';
import { ThemeSwitcher } from '@/components/buttons/ThemeSwitcher';
import { InjectedConnector } from 'wagmi/connectors/injected';
import { useAccount, useConnect, useEnsName } from 'wagmi';
import { useAtom, useAtomValue } from 'jotai';
import { testAtom } from '@/store/test';

const Page = () => {
  const { address, isConnected } = useAccount();
  const [test, setTest] = useAtom(testAtom);
  const { connect } = useConnect({
    connector: new InjectedConnector(),
  });
  const handleChangeAtom = (e: any) => {
    setTest('changed');
  };
  if (!isConnected)
    return <button onClick={() => connect()}>Connect Wallet</button>;
  return (
    <div className='bg-primary'>
      <p className='dark:text-red-300'>about</p>
      <p>{address}</p>
      <p>{test}</p>
      <button onClick={handleChangeAtom}>change test</button>
      <ThemeSwitcher />
    </div>
  );
};
export default Page;
