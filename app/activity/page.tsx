import ActivityFilter from '@/components/activity/ActivityFilter';
import ActivityTable from '@/components/activity/ActivityTable';

const ActivityPage = () => {
  return (
    <section className='flex'>
      <ActivityFilter />
      <ActivityTable />
    </section>
  );
};
export default ActivityPage;
