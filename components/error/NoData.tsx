import DataError from '@/public/icon/DataError';

const NoData = () => {
  return (
    <div className='font-caption-regular flex flex-col items-center'>
      <DataError className='mb-12 fill-[var(--color-background-neutral-bold)]' />
      <p className='text-[var(--color-text-subtle)]'>No data found</p>
    </div>
  );
};
export default NoData;
