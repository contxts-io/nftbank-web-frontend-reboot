'use client';
import SummaryValueContainer from '@/components/portfolio/overview/SummaryValueContainer';
import HistoricalTrendContainer from '@/components/portfolio/overview/HistoricalTrendContainer';
import RecentActivityContainer from '@/components/portfolio/overview/RecentActivityContainer';
import PerformanceContainer from '@/components/portfolio/overview/PerformanceContainer';
import TotalInventoryValue from '@/components/portfolio/overview/TotalInventoryValue';
import { useAtom, useAtomValue, useSetAtom } from 'jotai';
import { myDefaultPortfolioAtom } from '@/store/settings';
import { useEffect } from 'react';
import { portfolioNicknameAtom, portfolioUserAtom } from '@/store/portfolio';
import { useMe } from '@/utils/hooks/queries/auth';
import ChainList from '@/components/portfolio/ChainList';
import { useRouter } from 'next/navigation';

const OverviewPage = () => {
  // const myPortfolio = useAtomValue(myDefaultPortfolioAtom);
  const { data: me } = useMe();
  const myPortfolio = useAtomValue(myDefaultPortfolioAtom);
  const setPortfolioNicknameAtom = useSetAtom(portfolioNicknameAtom);
  const setPortfolioUserAtom = useSetAtom(portfolioUserAtom);
  const router = useRouter();
  useEffect(() => {
    me?.nickname && setPortfolioNicknameAtom(me.nickname);
  }, [me]);
  // useEffect(() => {
  //   console.log('~~~~ myPortfolio ~~~~~', myPortfolio);
  //   myPortfolio &&
  //     setPortfolioUserAtom({
  //       ...myPortfolio,
  //     });
  // }, [myPortfolio]);

  if (true) {
    router.push('/');
  }
  return (
    <section className='pt-24 px-24 pb-40'>
      {/* <ChainList />
      <SummaryValueContainer />
      <div className='w-full grid grid-cols-2 gap-x-[20px]'>
        <HistoricalTrendContainer />
        <PerformanceContainer />
        <TotalInventoryValue />
        <RecentActivityContainer />
      </div>
      <div className='w-full'>
        <HistoricalTrendContainer />
        <PerformanceContainer />
        <TotalInventoryValue />
        <RecentActivityContainer />
      </div> */}
    </section>
  );
};
export default OverviewPage;
