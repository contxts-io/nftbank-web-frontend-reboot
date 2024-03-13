'use client';

import { portfolioUserAtom } from '@/store/portfolio';
import { useMe } from '@/utils/hooks/queries/auth';
import { useWalletList } from '@/utils/hooks/queries/wallet';
import { useAtom } from 'jotai';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect } from 'react';
import ProfileComponent from '../profile/ProfileComponent';
import PortfolioTabNavigation from './PortfolioTabNavigation';
import NoWallet from './NoWallet';

const PortfolioUserProvider = ({ children }: { children: React.ReactNode }) => {
  const { data: me } = useMe();
  const router = useRouter();
  const path = usePathname();
  const [portfolioUser, setPortfolioUser] = useAtom(portfolioUserAtom);
  const {
    data: walletList,
    status,
    error,
  } = useWalletList({ nickname: portfolioUser?.nickname || '' });
  useEffect(() => {
    console.log('path : ', path);
    console.log('me?.nickname : ', me?.nickname);
    if (path.split('/').length === 3) {
      me
        ? setPortfolioUser({
            nickname: me.nickname || 'Welcome',
            networkId: 'ethereum',
          })
        : router.push('/portfolio/overview/sample');
    } else {
      const paths = path.split('/');
      paths.length === 5 &&
        setPortfolioUser({
          [paths[3] as string]: paths[4],
          networkId: 'ethereum',
        });
      path.includes('/sample') &&
        setPortfolioUser((prev) => {
          return {
            nickname: 'sample',
            networkId: 'ethereum',
          };
        });
      console.log('path', path.includes('/sample'));
      console.log('porftoliouser ::: ', portfolioUser);
    }
  }, [path, me?.nickname]);
  useEffect(() => {
    console.log('changed : ', portfolioUser);
  }, [portfolioUser]);
  return (
    <>
      <ProfileComponent />
      {/* <PortfolioTabNavigation /> */}
      {portfolioUser?.walletAddress && (
        <>
          <PortfolioTabNavigation />
          {children}
        </>
      )}
      {status === 'success' && (
        <>
          {walletList?.data.length > 0 ? (
            <>
              <PortfolioTabNavigation />
              {children}
            </>
          ) : (
            <div className='w-full h-[calc(100vh-197px)] flex items-center justify-center'>
              {me?.nickname === portfolioUser?.nickname ? (
                <NoWallet />
              ) : (
                <p className='font-body02-regular text-[var(--color-text-subtle)]'>
                  This user has no wallets.
                </p>
              )}
            </div>
          )}
        </>
      )}
    </>
  );
};

export default PortfolioUserProvider;
