'use client';
import Button from '@/components/buttons/Button';
import siteMetadata from '@/utils/siteMetadata';
import { useRouter } from 'next/navigation';
import styles from './error.module.css';
export default function NotFound() {
  const router = useRouter();
  const onClickContactUs = () => {
    window.open(`mailto:${siteMetadata.contactEmail}`, '_blank');
  };
  return (
    <div className='w-full h-full flex flex-col items-center justify-center'>
      <img
        src={'/image/InternalServerError.svg'}
        alt='500'
        className='w-[230px] h-[140px]'
        width={230}
        height={140}
      />
      <p className='font-subtitle02-regular text-[var(--color-text-main)] mt-27 mb-40'>
        Sorry, unexpected error
      </p>
      <div className='flex gap-x-8'>
        <Button onClick={() => location.reload()} id=''>
          Try again
        </Button>
        <Button
          id=''
          className={styles.contactButton}
          onClick={onClickContactUs}
        >
          Contact Us
        </Button>
      </div>
    </div>
  );
}
