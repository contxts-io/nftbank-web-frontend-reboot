'use client';

import { portfolioProfileAtom, portfolioUserAtom } from '@/store/portfolio';
import { useMe } from '@/utils/hooks/queries/auth';
import { useWalletList } from '@/utils/hooks/queries/wallet';
import { useAtom, useAtomValue } from 'jotai';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import ProfileComponent from '../profile/ProfileComponent';
import PortfolioTabNavigation from './PortfolioTabNavigation';
import NoWallet from './NoWallet';
import { useUser } from '@/utils/hooks/queries/user';
import { myDefaultPortfolioAtom } from '@/store/settings';

const PortfolioUserProvider = ({ children }: { children: React.ReactNode }) => {
  const { data: me } = useMe();
  const router = useRouter();
  const path = usePathname();
  const [nickname, setNickname] = useState('');
  const [portfolioUser, setPortfolioUser] = useAtom(portfolioUserAtom);
  const [portfolioProfile, setPortfolioProfile] = useAtom(portfolioProfileAtom);
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
  // useEffect(() => {
  //   console.log('path : ', path);
  //   console.log('me?.nickname : ', me?.nickname);
  //   if (path.split('/').length === 3) {
  //     me
  //       ? setPortfolioUser({
  //           nickname: me.nickname,
  //           networkId: 'ethereum',
  //         })
  //       : router.push('/portfolio/overview/sample');
  //   } else {
  //     const paths = path.split('/');
  //     paths.length === 5 &&
  //       setPortfolioUser({
  //         [paths[3] as string]: paths[4],
  //         networkId: 'ethereum',
  //       });
  //     path.includes('/sample') &&
  //       setPortfolioUser((prev) => {
  //         return {
  //           nickname: 'sample',
  //           networkId: 'ethereum',
  //         };
  //       });
  //     console.log('path', path.includes('/sample'));
  //     console.log('porftoliouser ::: ', portfolioUser);
  //   }
  // }, [path, me?.nickname]);
  useEffect(() => {
    if (path.split('/').length === 3) {
      // me
      //   ? (setPortfolioProfile(me),
      //     myDefaultPortfolio && setPortfolioUser(myDefaultPortfolio))
      //   : router.push('/portfolio/overview/sample');
      me && setPortfolioProfile(me);
      console.log(
        'PortfolioUserProvider myDefaultPortfolio',
        myDefaultPortfolio
      );
      myDefaultPortfolio && setPortfolioUser(myDefaultPortfolio);
    } else if (path.includes('/sample')) {
      setNickname('sample');
    } else {
      const paths = path.split('/');
      paths.length === 5 &&
        path.includes('/nickname') &&
        portfolioProfile?.nickname !== paths[4] &&
        (setNickname(paths[4]),
        setPortfolioUser({
          nickname: paths[4],
          networkId: 'ethereum',
        }));
      paths.length === 5 &&
        path.includes('/walletAddress') &&
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
