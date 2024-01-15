import Image from 'next/image';
import LandingButton from './LandingButton';
import ChartBar from '@/public/icon/ChartBar';

const ManageMetaverse = () => {
  return (
    <article className='w-full flex justify-between gap-x-56'>
      <div className='w-[524px]'>
        <div className='w-40 h-40 bg-[var(--color-background-brand-bold)] mb-24 flex items-center justify-center text-[var(--color-text-main)]'>
          <ChartBar />
        </div>
        <p
          className={`font-header01-medium text-[var(--color-text-main)] mb-30`}
        >
          Manage Metaverse Assets in{' '}
          <span className='text-[var(--color-text-brand)]'>One place</span>
        </p>
        <p className='font-subtitle02-regular text-[var(--color-text-subtle)]'>
          NFTBank is the easiest way to build and manage your entire NFT
          portfolio from one place. Discover the world of decentralized finance
          today.
        </p>
        <LandingButton className='mt-60'>Manage with NFTBank</LandingButton>
      </div>
      <div className='w-[590px]'>
        <Image
          alt='metaverse'
          width={590}
          height={373}
          src={'/image/metaverse.svg'}
        />
      </div>
    </article>
  );
};
export default ManageMetaverse;
