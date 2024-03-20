import Button from '../buttons/Button';

const MakeYourPortfolio = () => {
  return (
    <article className='w-[320px] rounded-[12px] py-30 px-20 border-[var(--color-border-bold)] bg-[var(--color-elevation-surface-overlay)] flex flex-col'>
      <div className='w-full flex flex-col gap-y-16'>
        <p className='font-button02-medium text-[var(--color-text-main)]'>
          📊 Make your portfolio in NFTBank!
        </p>
        <p className='font-caption-medium text-[var(--color-text-subtle)]'>
          {`Connect all your wallets to create the most accurate NFT portfolio : )`}
        </p>
      </div>
      <Button className='w-full bg-[var(--color-background-brand-bold)] rounded-[4px]'>
        Get Started
      </Button>
    </article>
  );
};
export default MakeYourPortfolio;
