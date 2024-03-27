'use client';
import SummaryValueContainer from '@/components/portfolio/overview/SummaryValueContainer';
import HistoricalTrendContainer from '@/components/portfolio/overview/HistoricalTrendContainer';
import RecentActivityContainer from '@/components/portfolio/overview/RecentActivityContainer';
import PerformanceContainer from '@/components/portfolio/overview/PerformanceContainer';
import TotalInventoryValue from '@/components/portfolio/overview/TotalInventoryValue';

const OverviewPage = ({ params }: { params: { slug: string[] } }) => {
  const { slug } = params;

  return (
    <section className='pt-20 px-24 pb-40'>
      <SummaryValueContainer
        portfolioUser={{
          [slug[0]]: slug[1],
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
        <HistoricalTrendContainer
          portfolioUser={{
            [slug[0]]: slug[1],
            networkId: 'ethereum',
          }}
        />
        {/* <div className='w-full grid grid-cols-1 lg:grid-cols-2 gap-x-[20px]'> */}
        <div className='w-full grid gap-x-[20px] grid-cols-1 md:grid-cols-2'>
          <TotalInventoryValue
            portfolioUser={{
              [slug[0]]: slug[1],
              networkId: 'ethereum',
            }}
          />
          <PerformanceContainer
            portfolioUser={{
              [slug[0]]: slug[1],
              networkId: 'ethereum',
            }}
          />
        </div>
        {/* <RecentActivityContainer /> */}
      </div>
    </section>
  );
};
export default OverviewPage;
