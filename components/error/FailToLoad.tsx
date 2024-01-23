import DataError from '@/public/icon/DataError';

const FailToLoad = () => {
  return (
    <div className='font-caption-regular flex flex-col items-center '>
      <DataError className='mb-12 fill-[var(--color-background-neutral-bold)]' />
      <p className='text-[var(--color-text-subtle)]'>Failed to load data.</p>
      <p className='text-[var(--color-text-subtle)]'>Please try refreshing!</p>
    </div>
  );
};
export default FailToLoad;
