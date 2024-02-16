import NoWallet from '@/components/portfolio/NoWallet';
import PortfolioTabNavigation from '@/components/portfolio/PortfolioTabNavigation';
import ProfileComponent from '@/components/profile/ProfileComponent';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'NFTBank.ai reboot - Portfolio',
  description: 'NFTBank.ai - Portfolio',
};

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
