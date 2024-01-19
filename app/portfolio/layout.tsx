'use client';
import NoWallet from '@/components/portfolio/NoWallet';
import PortfolioTabNavigation from '@/components/portfolio/PortfolioTabNavigation';
import ProfileComponent from '@/components/profile/ProfileComponent';
import { portfolioNicknameAtom, portfolioUserAtom } from '@/store/portfolio';
import { useMe } from '@/utils/hooks/queries/auth';
import { useUser } from '@/utils/hooks/queries/user';
import { useWalletList } from '@/utils/hooks/queries/wallet';
import { useAtom } from 'jotai';
import { usePathname, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

const PortfolioLayout = ({ children }: { children: React.ReactNode }) => {
  //** sprint 1 */
  // const { data: me } = useMe();
  // const [portfolioUser, setPortfolioUser] = useAtom(portfolioUserAtom);
  // const {
  //   data: walletList,
  //   status,
  //   error,
  // } = useWalletList({ nickname: portfolioUser?.nickname || '' });

  return (
    <section className='w-full h-full'>
      <ProfileComponent />
      <PortfolioTabNavigation />
      {children}
      {/**
       * 
       * 
       * 
       *  //sprint 1
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
      )} */}
    </section>
  );
};
export default PortfolioLayout;
