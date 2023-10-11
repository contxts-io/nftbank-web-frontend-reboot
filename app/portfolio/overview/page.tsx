import ValueRectContainer from '@/components/portfolio/overview/ValueRectContainer';
import HistoricalTrendContainer from '@/components/portfolio/overview/HistoricalTrendContainer';

const OverviewPage = () => {
  return (
    <section className='px-24 py-22'>
      <ValueRectContainer />
      <HistoricalTrendContainer />
    </section>
  );
};
export default OverviewPage;
