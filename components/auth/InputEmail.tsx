'use client';
import Check from '@/public/icon/Check';
import styles from './InputEmail.module.css';
import { useEffect } from 'react';
import { validationEmail } from '@/utils/common';
import { useProviders } from '@/utils/hooks/queries/auth';
import Link from 'next/link';
type Props = {
  email: [string, React.Dispatch<React.SetStateAction<string>>];
  isVerifiedEmail: boolean;
};
const InputEMail = (props: Props) => {
  const [email, setEmail] = props.email;
  const { data: providers, refetch: getProviders } = useProviders(
    email as `${string}@${string}`
  );
  useEffect(() => {
    validationEmail(email) && getProviders();
  }, [email]);
  return (
    <div className={`font-caption-regular ${styles.container}`}>
      <span className='text-[var(--color-text-subtle)]'>Email</span>
      <div className='relative w-full flex items-center'>
        <input
          type='email'
          placeholder='Email Address'
          className={`${styles.inputText} ${
            email.length > 0 && !validationEmail(email) ? styles.invalid : ''
          }`}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={props.isVerifiedEmail}
        />
        {props.isVerifiedEmail && (
          <Check className='absolute right-12 fill-[var(--color-background-success-bold)]' />
        )}
      </div>
      {email.length > 0 && !validationEmail(email) && (
        <p className='text-[var(--color-text-danger)] mt-4'>
          Only letters, numbers, periods, and @ are allowed.
        </p>
      )}
      {providers?.includes('google.com') && (
        <p className='text-[var(--color-text-subtle)] mt-4'>
          Looks like you already have an account.{' '}
          <Link
            href='/auth/signin'
            className='text-[var(--color-text-brand)] cursor-pointer'
          >
            Please Continue with Google.
          </Link>
        </p>
      )}
    </div>
  );
};
export default InputEMail;
