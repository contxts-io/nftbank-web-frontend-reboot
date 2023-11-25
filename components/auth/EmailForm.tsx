'use client';
import CaretDown from '@/public/icon/CaretDown';
import styles from './EmailForm.module.css';
import Button from '../buttons/Button';
import InputPassword from './InputPassword';
import { useRouter } from 'next/navigation';
import InputEMail from './InputEmail';
import { useState } from 'react';
import { createFirebaseWithEmail, getIdTokenByEmail } from '@/apis/firebase';
import { sign } from '@/apis/auth';
import { useMeManual } from '@/utils/hooks/queries/auth';

const EmailForm = () => {
  const { data: me, refetch } = useMeManual();
  const email = useState<string>('');
  const password = useState<string>('');
  const router = useRouter();
  const [step, setSTep] = useState<
    'SIGN_IN' | 'SIGN_IN_INPUT_PASSWORD' | 'SIGN_UP'
  >('SIGN_IN');
  const handleSignInEmail = async () => {
    try {
      const token = await getIdTokenByEmail(email[0], password[0]);
      if (token) {
        console.log('email token: ', token);
        await sign({ token, provider: 'email' }).then(async () => {
          // const me = await checkMe();
          // me && router.push('/portfolio');
          console.log('email sign-up success  ');
          (await refetch()).data && router.push('/portfolio');
        });
      } else {
        console.log('token is null');
      }
    } catch (error) {
      console.log('error: ', error);
      throw error;
    }
  };
  const handleSignUpEmail = async () => {
    try {
      const token = await createFirebaseWithEmail(email[0], password[0]);
      if (token) {
        // setCookie('accessToken', token);
        console.log('email token: ', token);
        await sign({ token, provider: 'email' }).then(async () => {
          // const me = await checkMe();
          // me && router.push('/portfolio');
          console.log('email sign-in success  ');
          (await refetch()).data && router.push('/portfolio');
        });
      } else {
        console.log('token is null');
      }
    } catch (error) {
      console.log('error: ', error);
      throw error;
    }
  };
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
              onClick={() => handleSignInEmail()}
            >
              <span className='text-[var(--color-text-main)]'>Sign in</span>
            </Button>
            <Button
              id=''
              className={`${styles.submitButton} mt-8`}
              disabled={password[0].length == 0}
              onClick={() => handleSignUpEmail()}
            >
              <span className='text-[var(--color-text-main)]'>Sign up</span>
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
