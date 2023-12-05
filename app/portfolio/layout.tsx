'use client';
import { getMyWalletList } from '@/apis/wallet';
import NoWallet from '@/components/portfolio/NoWallet';
import PortfolioTabNavigation from '@/components/portfolio/PortfolioTabNavigation';
import ProfileComponent from '@/components/profile/ProfileComponent';
import { BasicParam } from '@/interfaces/request';
import { portfolioUserAtom } from '@/store/portfolio';
import { useMe } from '@/utils/hooks/queries/auth';
import { useMyWalletList } from '@/utils/hooks/queries/wallet';
import { useAtom } from 'jotai';
import { useSearchParams } from 'next/navigation';
import { useEffect } from 'react';

const PortfolioLayout = ({ children }: { children: React.ReactNode }) => {
  const { data: walletList, status, error } = useMyWalletList();
  const [portfolioUser, setPortfolioUser] = useAtom(portfolioUserAtom);
  const searchParam = useSearchParams();
  const { data: me } = useMe();
  function createJSONFromQueryString(queryString: URLSearchParams): BasicParam {
    const params = new URLSearchParams(queryString);
    let jsonResult = {} as BasicParam;
    if (typeof params.has('userId') === 'string') {
      // jsonResult.userId = params.get('userId');
      jsonResult.userId = params.get('userId') as string;
    } else if (params.has('walletGroupId')) {
      jsonResult.walletGroupId = params.get('walletGroupId') as string;
    } else if (params.has('walletAddress')) {
      jsonResult.walletAddress = params.get('walletAddress') as string;
    }

    return jsonResult;
  }
  useEffect(() => {
    console.log('portfolio layout', me);
    console.log(
      'walletList?.data[0].walletAddress',
      walletList?.data[0].walletAddress
    );
    console.log('searchParam', searchParam);
    searchParam?.size > 0
      ? setPortfolioUser({
          ...createJSONFromQueryString(searchParam),
          networkId: 'ethereum',
        })
      : walletList?.data &&
        walletList.data.length > 0 &&
        setPortfolioUser({
          networkId: 'ethereum',
          walletAddress: walletList?.data[0].walletAddress,
        });
    // if (me) {
    //   setPortfolioUser({
    //     userId: me.id,
    //     networkId: 'ethereum',
    //   });
    // }
  }, [me, walletList?.data, searchParam]);
  return (
    <section className='w-full h-full'>
      <ProfileComponent />
      {status === 'success' && (
        <>
          {walletList?.data.length > 0 ? (
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
