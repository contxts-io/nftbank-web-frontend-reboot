import ActivityFilter from '@/components/activity/ActivityFilter';

const ActivityPage = () => {
  return (
    <section>
      <div className='py-24 border-b-1 border-[var(--color-border-main)]'>
        <h2 className='font-subtitle02-bold text-[var(--color-text-main)]'>
          Activitys
        </h2>
      </div>
      <div className='flex '>
        <ActivityFilter />
        <div>page</div>
      </div>
    </section>
  );
};
export default ActivityPage;
