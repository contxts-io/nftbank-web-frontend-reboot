'use client';
import SummaryValueContainer from '@/components/portfolio/overview/SummaryValueContainer';
import HistoricalTrendContainer from '@/components/portfolio/overview/HistoricalTrendContainer';
import RecentActivityContainer from '@/components/portfolio/overview/RecentActivityContainer';
import PerformanceContainer from '@/components/portfolio/overview/PerformanceContainer';
import TotalInventoryValue from '@/components/portfolio/overview/TotalInventoryValue';
import { useEffect } from 'react';
import { BasicParam } from '@/interfaces/request';
import { useAtom, useSetAtom } from 'jotai';
import { portfolioNicknameAtom, portfolioUserAtom } from '@/store/portfolio';

const SampleOverviewPage = ({ params }: { params: { slug: string[] } }) => {
  const { slug } = params;
  const [portfolioUser, setPortfolioUser] = useAtom(portfolioUserAtom);
  const setPortfolioNicknameAtom = useSetAtom(portfolioNicknameAtom);
  // useEffect(() => {
  //   if (slug && Array.isArray(slug) && slug.length === 2) {
  //     const queryParam: BasicParam = {
  //       [slug[0]]: slug[1],
  //       networkId: 'ethereum',
  //     };
  //     slug[0] === 'walletAddress' && setPortfolioUser(queryParam);
  //     slug[0] === 'nickname' && setPortfolioNicknameAtom(slug[1]);
  //   } else {
  //     console.log('else');
  //   }
  // }, [slug]);
  return (
    <section className='pt-20 px-24 pb-40'>
      <SummaryValueContainer
        portfolioUser={{
          nickname: 'nftbank',
          networkId: 'ethereum',
        }}
      />

      {/* <div className='w-full grid grid-cols-2 gap-x-[20px]'>
        <HistoricalTrendContainer />
        <PerformanceContainer />
        <TotalInventoryValue />
        <RecentActivityContainer />
      </div> */}
      <div className='w-full'>
        <HistoricalTrendContainer />
        {/* <div className='w-full grid grid-cols-1 lg:grid-cols-2 gap-x-[20px]'> */}
        <div className='w-full grid gap-x-[20px] grid-cols-1 md:grid-cols-2'>
          <TotalInventoryValue />
          <PerformanceContainer />
        </div>
        {/* <RecentActivityContainer /> */}
      </div>
    </section>
  );
};
export default SampleOverviewPage;
