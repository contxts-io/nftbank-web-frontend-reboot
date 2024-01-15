import Image from 'next/image';
import LandingButton from './LandingButton';
import ChartBar from '@/public/icon/ChartBar';
import BracketsAngle from '@/public/icon/BracketsAngle';
import CodeBlock from './CodeBlock';

const EstimateApi = () => {
  return (
    <article className='w-full flex justify-between gap-x-56'>
      <div className='w-[524px]'>
        <div className='w-40 h-40 bg-[var(--color-background-brand-bold)] mb-24 flex items-center justify-center text-[var(--color-text-main)]'>
          <BracketsAngle />
        </div>
        <p
          className={`font-header01-medium text-[var(--color-text-main)] mb-30`}
        >
          Build with our
          <span className='text-[var(--color-text-brand)]'>Estimate API</span>
        </p>
        <p className='font-subtitle02-regular text-[var(--color-text-subtle)]'>
          Already trusted and supported by 15+ partners, NFTBank’s API has
          become an indispensable piece for building NFT finance-related
          services.
        </p>
        <LandingButton className='mt-60'>Explore the NFTBank API</LandingButton>
      </div>
      <div className='w-[590px]'>
        <CodeBlock />
      </div>
    </article>
  );
};
export default EstimateApi;
