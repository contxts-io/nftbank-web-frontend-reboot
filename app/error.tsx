'use client';
import Button from '@/components/buttons/Button';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function NotFound() {
  const router = useRouter();
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
      <Link href='/'>Go to Home</Link>
      <Button onClick={() => router.push('/')} id=''>
        Go to Home
      </Button>
    </div>
  );
}
