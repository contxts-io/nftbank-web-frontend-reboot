import Image from 'next/image';
import LandingButton from './LandingButton';
import ChartBar from '@/public/icon/ChartBar';
import BracketsAngle from '@/public/icon/BracketsAngle';
import PushPin from '@/public/icon/PushPin';

const Taxfiling = () => {
  return (
    <article className='w-full flex justify-between'>
      <div className='w-[549px]'>
        <div className='w-40 h-40 bg-[var(--color-background-brand-bold)] mb-24 flex items-center justify-center text-[var(--color-text-main)]'>
          <PushPin />
        </div>
        <p
          className={`font-header01-medium text-[var(--color-text-main)] mb-30`}
        >
          Easy and convenient{' '}
          <span className='text-[var(--color-text-brand)]'>Tax filing</span>
        </p>
        <p className='font-subtitle02-regular text-[var(--color-text-subtle)]'>
          NFTBank is the easiest way to build and manage your entire NFT
          portfolio from one place. Discover the world of decentralized finance
          today.
        </p>
        <LandingButton className='mt-60'>Explore the NFTBank API</LandingButton>
      </div>
      <div className='w-[480px]'>
        <Image
          alt='tax filing'
          width={480}
          height={450}
          src={'/image/Taxfiling.svg'}
        />
      </div>
    </article>
  );
};
export default Taxfiling;
