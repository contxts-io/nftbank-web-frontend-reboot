import SummaryValueContainer from '@/components/portfolio/overview/SummaryValueContainer';
import HistoricalTrendContainer from '@/components/portfolio/overview/HistoricalTrendContainer';
import RecentActivityContainer from '@/components/portfolio/overview/RecentActivityContainer';
import PerformanceContainer from '@/components/portfolio/overview/PerformanceContainer';
import TotalInventoryValue from '@/components/portfolio/overview/TotalInventoryValue';

const OverviewPage = () => {
  return (
    <section className='pt-20 px-24 pb-40'>
      <SummaryValueContainer />

      <div className='w-full grid grid-cols-2 gap-x-[20px]'>
        <HistoricalTrendContainer />
        <PerformanceContainer />
        <TotalInventoryValue />
        <RecentActivityContainer />
      </div>
    </section>
  );
};
export default OverviewPage;
