'use client';
import { useMe } from '@/utils/hooks/queries/auth';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  const { data: me } = useMe();
  const router = useRouter();
  useEffect(() => {
    me && router.push('/portfolio/overview');
  }, [me]);
  return (
    <section className='w-full h-full flex flex-col items-center pt-80'>
      {children}
      <div className='w-[448px] mt-16 text-left'>
        <p className={`font-caption-regular text-[--color-text-subtlest]`}>
          By signing up, you agree to our{' '}
          <span className='underline underline-offset-4 cursor-pointer'>
            Terms of use
          </span>{' '}
          and{' '}
          <span className='underline underline-offset-4 cursor-pointer'>
            Privacy Policy
          </span>
        </p>
      </div>
    </section>
  );
};
export default AuthLayout;
