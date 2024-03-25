import { useRouter } from 'next/navigation';
import Button from '../buttons/Button';
import CloseX from '@/public/icon/CloseX';
type Props = {
  onClose: () => void;
};
const MakeYourPortfolio = (props: Props) => {
  const router = useRouter();
  const handleClickButton = () => {
    router.push('/auth/signin');
    props.onClose();
  };
  return (
    <article className='md:w-[320px] w-full rounded-[12px] py-30 px-20 border-[var(--color-border-bold)] bg-[var(--color-elevation-surface-overlay)] flex flex-col'>
      <div className='w-full flex flex-col gap-y-16'>
        <div className='w-full flex items-start'>
          <p className='font-button02-medium text-[var(--color-text-main)] flex-1 whitespace-pre-line'>
            {`📊 Make your portfolio in 
            NFTBank!`}
          </p>
          <Button
            id=''
            onClick={() => props.onClose()}
            className='!border-0 ml-auto !p-0 !w-16 !h-16'
          >
            <CloseX />
          </Button>
        </div>
        <p className='font-caption-medium text-[var(--color-text-subtle)]'>
          {`Connect all your wallets to create the most accurate NFT portfolio : )`}
        </p>
      </div>
      <Button
        className='w-full bg-[var(--color-background-brand-bold)] rounded-[4px] mt-40 flex justify-center items-center'
        onClick={handleClickButton}
        id='get_started_toast'
      >
        <p className='font-caption-regular text-[var(--color-text-inverse)]'>
          Get Started
        </p>
      </Button>
    </article>
  );
};
export default MakeYourPortfolio;
