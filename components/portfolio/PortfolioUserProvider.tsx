'use client';

import { portfolioProfileAtom, portfolioUserAtom } from '@/store/portfolio';
import { useMe } from '@/utils/hooks/queries/auth';
import { useWalletList } from '@/utils/hooks/queries/wallet';
import { useAtom, useAtomValue, useSetAtom } from 'jotai';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import ProfileComponent from '../profile/ProfileComponent';
import PortfolioTabNavigation from './PortfolioTabNavigation';
import NoWallet from './NoWallet';
import { useUser } from '@/utils/hooks/queries/user';
import { myDefaultPortfolioAtom } from '@/store/settings';
import { useQueryClient } from '@tanstack/react-query';
import { keepPreviousDataAtom } from '@/store/freshness';

const PortfolioUserProvider = ({ children }: { children: React.ReactNode }) => {
  const { data: me } = useMe();
  const queryClient = useQueryClient();
  const router = useRouter();
  const path = usePathname();
  const [nickname, setNickname] = useState('');
  const [portfolioUser, setPortfolioUser] = useAtom(portfolioUserAtom);
  const [portfolioProfile, setPortfolioProfile] = useAtom(portfolioProfileAtom);
  const setKeepPreviousData = useSetAtom(keepPreviousDataAtom);
  const {
    data: walletList,
    status,
    error,
  } = useWalletList({
    nickname: portfolioProfile?.nickname || '',
    networkId: 'ethereum',
  });
  const myDefaultPortfolio = useAtomValue(myDefaultPortfolioAtom);
  const { data: user, status: userStatus } = useUser(nickname);
  useEffect(() => {
    return () => {
      setPortfolioProfile(null);
      setPortfolioUser(null);
    };
  }, []);
  useEffect(() => {
    if (path.split('/').length === 3) {
      // portfolioProfile?.nickname !== me?.nickname &&
      me &&
        portfolioProfile?.nickname !== myDefaultPortfolio?.nickname &&
        (setPortfolioProfile(me),
        myDefaultPortfolio && setPortfolioUser(myDefaultPortfolio));
      !me && router.push('/portfolio/overview/sample');
    } else if (path.includes('/sample')) {
      // setNickname('Welcome to NFTBank.ai');
      portfolioProfile?.id !== 'sample' &&
        (setPortfolioProfile({
          id: 'sample',
          nickname: 'Welcome to NFTBank.ai',
          image: '',
          config: {
            ghostmode: false,
            currency: 'usd',
          },
        }),
        setPortfolioUser({
          nickname: 'Welcome to NFTBank.ai',
          networkId: 'ethereum',
        }));
    } else {
      const paths = path.split('/');
      console.log('portfolioUser provider', portfolioUser, paths.length);
      paths.length === 5 &&
        path.includes('/nickname') &&
        portfolioProfile?.nickname !== paths[4] &&
        (setNickname(paths[4]),
        portfolioUser?.nickname !== paths[4] &&
          portfolioProfile?.nickname !== paths[4] &&
          setPortfolioUser({
            nickname: paths[4],
            networkId: 'ethereum',
          }));
      paths.length === 5 &&
        path.includes('/walletAddress') &&
        portfolioUser?.walletAddress !== paths[4] &&
        setPortfolioUser({
          walletAddress: paths[4],
          networkId: 'ethereum',
        });
    }
  }, [path, myDefaultPortfolio, me]);
  useEffect(() => {
    console.log('changed portfolioUser ::', portfolioUser);
    console.log('changed userStatus :', userStatus);
    console.log('changed user :: ', user);
    user && setPortfolioProfile(user);
  }, [user]);
  useEffect(() => {
    console.log('status', status);
  }, [status]);
  useEffect(() => {
    console.log('portfolioUser @@@ 222', portfolioUser);
    setKeepPreviousData(false);
    queryClient.invalidateQueries({
      queryKey: ['summary'],
    });
    queryClient.invalidateQueries({
      queryKey: ['portfolio'],
    });
  }, [portfolioUser]);
  return (
    <>
      <ProfileComponent />
      {/* <PortfolioTabNavigation /> */}
      {portfolioUser?.walletAddress ? (
        <>
          <PortfolioTabNavigation />
          {children}
        </>
      ) : (
        (status === 'success' || status === 'error') && (
          <>
            {walletList?.data.length && walletList.data.length > 0 ? (
              <>
                <PortfolioTabNavigation />
                {children}
              </>
            ) : (
              <div className='w-full h-[calc(100vh-197px)] flex items-center justify-center'>
                {me?.nickname === portfolioProfile?.nickname ? (
                  <NoWallet />
                ) : (
                  <p className='font-body02-regular text-[var(--color-text-subtle)]'>
                    This user has no wallets.
                  </p>
                )}
              </div>
            )}
          </>
        )
      )}
    </>
  );
};

export default PortfolioUserProvider;
