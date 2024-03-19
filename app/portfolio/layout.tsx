import NoWallet from '@/components/portfolio/NoWallet';
import PortfolioTabNavigation from '@/components/portfolio/PortfolioTabNavigation';
import PortfolioUserProvider from '@/components/portfolio/PortfolioUserProvider';
import PortfolioUserSelector from '@/components/portfolio/PortfolioUserProvider';
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
  return (
    <section className='w-full h-full'>
      <PortfolioUserProvider>{children}</PortfolioUserProvider>
    </section>
  );
};
export default PortfolioLayout;
