import Image from 'next/image';
import Link from 'next/link';

export default function NotFound() {
  return (
    <div className='w-full h-full flex flex-col items-center justify-center'>
      <Image
        src={'/image/PageNotFound.svg'}
        alt='404'
        className='w-[230px] h-[140px]'
        width={230}
        height={140}
      />
      <p className='font-subtitle02-regular text-[var(--color-text-main)] mt-27 mb-40'>
        Page not found
      </p>
      <Link href='/'>Go to Home</Link>
    </div>
  );
}
