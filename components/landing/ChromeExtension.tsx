import Image from 'next/image';
import LandingButton from './LandingButton';
import ChartBar from '@/public/icon/ChartBar';
import PuzzlePiece from '@/public/icon/PuzzlePiece';

const ChromeExtension = () => {
  return (
    <article className='w-full flex justify-between gap-x-56'>
      <div className='w-[524px]'>
        <div className='w-40 h-40 bg-[var(--color-background-brand-bold)] mb-24 flex items-center justify-center text-[var(--color-text-main)]'>
          <PuzzlePiece />
        </div>
        <p
          className={`font-header01-medium text-[var(--color-text-main)] mb-30`}
        >
          NFTBank Chrome
          <span className='text-[var(--color-text-brand)]'>Extension</span>
        </p>
        <p className='font-subtitle02-regular text-[var(--color-text-subtle)]'>
          Now you can access the most accurate NFT valuation directly from
          Opensea. Make your Opensea experience smooth-sailing for free!
        </p>
        <LandingButton className='mt-60'>Add to Chrome</LandingButton>
      </div>
      <div className='w-[564px]'>
        <Image
          alt='chrome extension'
          width={564}
          height={444}
          src={'/image/chrome_extension.svg'}
        />
      </div>
    </article>
  );
};
export default ChromeExtension;
