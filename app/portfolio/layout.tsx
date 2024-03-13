'use client';
import NoWallet from '@/components/portfolio/NoWallet';
import PortfolioTabNavigation from '@/components/portfolio/PortfolioTabNavigation';
import ProfileComponent from '@/components/profile/ProfileComponent';
import { portfolioUserAtom } from '@/store/portfolio';
import { useMe } from '@/utils/hooks/queries/auth';
import { useWalletList } from '@/utils/hooks/queries/wallet';
import { useAtom } from 'jotai';
import { Metadata } from 'next';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect } from 'react';

const PortfolioLayout = ({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { slug: string[] };
}) => {
  //** sprint 1 */
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
    console.log('path layout :: ', path);
    !me &&
      path.split('/').length === 3 &&
      router.push('/portfolio/overview/sample');
  }, [path, me?.nickname]);

  return (
    <section className='w-full h-full'>
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
    </section>
  );
};
export default PortfolioLayout;
