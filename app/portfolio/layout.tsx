'use client';
import { getMyWalletList } from '@/apis/wallet';
import NoWallet from '@/components/portfolio/NoWallet';
import PortfolioTabNavigation from '@/components/portfolio/PortfolioTabNavigation';
import ProfileComponent from '@/components/profile/ProfileComponent';
import { useMyWalletList } from '@/utils/hooks/queries/wallet';
import { useEffect } from 'react';

const PortfolioLayout = ({ children }: { children: React.ReactNode }) => {
  const { data: walletList, status, error } = useMyWalletList();
  return (
    <section className='w-full h-full'>
      <ProfileComponent />
      {status === 'success' && (
        <>
          {walletList?.length > 0 ? (
            <>
              <PortfolioTabNavigation />
              {children}
            </>
          ) : (
            <div className='w-full h-[calc(100vh-197px)] flex items-center justify-center'>
              <NoWallet />
            </div>
          )}
        </>
      )}
    </section>
  );
};
export default PortfolioLayout;
