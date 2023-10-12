import ValueRectContainer from '@/components/portfolio/overview/ValueRectContainer';
import HistoricalTrendContainer from '@/components/portfolio/overview/HistoricalTrendContainer';
import RecentActivityContainer from '@/components/portfolio/overview/RecentActivityContainer';
import PerformanceContainer from '@/components/portfolio/overview/PerformanceContainer';

const OverviewPage = () => {
  return (
    <section className='pt-20 px-24 pb-40'>
      <ValueRectContainer />
      <HistoricalTrendContainer />
      <div className='w-full grid grid-cols-2 gap-x-[20px]'>
        <PerformanceContainer />
        <RecentActivityContainer />
      </div>
    </section>
  );
};
export default OverviewPage;
