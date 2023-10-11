import ValueRectContainer from '@/components/portfolio/overview/ValueRectContainer';
import HistoricalTrendContainer from '@/components/portfolio/overview/HistoricalTrendContainer';
import RecentActivityContainer from '@/components/portfolio/overview/RecentActivityContainer';

const OverviewPage = () => {
  return (
    <section className='px-24 py-22'>
      <ValueRectContainer />
      <HistoricalTrendContainer />
      <div className='w-full grid grid-cols-2 gap-x-[20px]'>
        <RecentActivityContainer />
        <RecentActivityContainer />
      </div>
    </section>
  );
};
export default OverviewPage;
