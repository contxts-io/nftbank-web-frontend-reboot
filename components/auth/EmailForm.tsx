'use client';
import CaretDown from '@/public/icon/CaretDown';
import styles from './EmailForm.module.css';
import Button from '../buttons/Button';
import InputPassword from './InputPassword';
import { useRouter } from 'next/navigation';
import InputEMail from './InputEmail';
import { useState } from 'react';

const EmailForm = () => {
  const email = useState<string>('');
  const password = useState<string>('');
  const router = useRouter();
  const [step, setSTep] = useState<
    'SIGN_IN' | 'SIGN_IN_INPUT_PASSWORD' | 'SIGN_UP'
  >('SIGN_IN');
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <Button
          className='rotate-90 border-0'
          id='back'
          onClick={() => router.back()}
        >
          <CaretDown />
        </Button>
        <span className='font-body01-regular text-[var(--color-text-main)]'>
          Continue with Email
        </span>
        <div />
      </div>
      {step === 'SIGN_IN' && (
        <>
          <div className={`font-caption-regular ${styles.body}`}>
            <InputEMail email={email} />
          </div>
          <div className={`font-body02-medium ${styles.footer}`}>
            <Button
              id=''
              className={styles.submitButton}
              disabled={email[0].length == 0}
              onClick={() => setSTep('SIGN_IN_INPUT_PASSWORD')}
            >
              <span className='text-[var(--color-text-main)]'>
                Continue with Email
              </span>
            </Button>
          </div>
        </>
      )}
      {step === 'SIGN_IN_INPUT_PASSWORD' && (
        <>
          <div className={`font-caption-regular ${styles.body}`}>
            <InputPassword password={password} />
          </div>
          <div className={`w-full flex flex-col items-center ${styles.footer}`}>
            <Button
              id=''
              className={styles.submitButton}
              disabled={password[0].length == 0}
              onClick={() => setSTep('SIGN_IN_INPUT_PASSWORD')}
            >
              <span className='text-[var(--color-text-main)]'>Sign in</span>
            </Button>
            <p className='font-caption-regular text-[var(--color-text-brand)] mt-16 cursor-pointer'>
              Forgot password?
            </p>
          </div>
        </>
      )}{' '}
    </div>
  );
};
export default EmailForm;
