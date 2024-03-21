'use client';
import CaretDown from '@/public/icon/CaretDown';
import styles from './EmailForm.module.css';
import Button from '../buttons/Button';
import InputPassword from './InputPassword';
import { useRouter } from 'next/navigation';
import InputEMail from './InputEmail';
import { useEffect, useState } from 'react';
import { getIdTokenByEmail } from '@/apis/firebase';
import { sign } from '@/apis/auth';
import { useMeManual, useProviders } from '@/utils/hooks/queries/auth';
import { validationEmail } from '@/utils/common';
import { useSetAtom } from 'jotai';
import { emailAtom } from '@/store/account';
import SubmitButton from '../buttons/SubmitButton';
import Link from 'next/link';

const EmailForm = () => {
  const { data: me, refetch } = useMeManual();
  const setEmailAtom = useSetAtom(emailAtom);
  const email = useState<string>('');
  const password = useState<string>('');
  const { data: providers, status } = useProviders(
    email[0] as `${string}@${string}`
  );
  const [isVerifiedPassword, setIsVerifiedPassword] = useState<boolean>(false); //verifyCode[0] !== '' && verifyCode[0].length === 6
  const router = useRouter();
  const [step, setSTep] = useState<
    'SIGN_IN' | 'SIGN_IN_INPUT_PASSWORD' | 'SIGN_IN_GOOGLE_SSO'
  >('SIGN_IN');
  useEffect(() => {
    setEmailAtom('');
  }, []);
  useEffect(() => {
    console.log('email', validationEmail(email[0]));
  }, [email[0]]);
  const handleSignInEmail = async () => {
    try {
      const token = await getIdTokenByEmail(email[0], password[0]);
      if (token) {
        console.log('email token: ', token);
        await sign({ token, provider: 'email' }).then(async () => {
          console.log('email sign-up success  ');
          (await refetch()).data && router.push('/portfolio/overview');
        });
      } else {
        console.log('token is null');
      }
    } catch (error) {
      console.log('error: ', error);
      throw error;
    }
  };
  const handleCheckProvider = async () => {
    setEmailAtom(email[0]);
    providers?.includes('email') && setSTep('SIGN_IN_INPUT_PASSWORD');
    providers === null && router.push(`/auth/email/signup?email`);
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
            <InputEMail email={email} isVerifiedEmail={false} />
          </div>
          <div className={`font-body02-medium ${styles.footer}`}>
            <SubmitButton
              id='email_address_input'
              className={`w-full`}
              disabled={
                !validationEmail(email[0]) ||
                status !== 'success' ||
                providers?.includes('google.com')
              }
              onClick={() => handleCheckProvider()}
              // isLoading={status === 'loading'}
            >
              <span className='text-[var(--color-text-main)]'>
                Continue with Email
              </span>
            </SubmitButton>
          </div>
        </>
      )}
      {step === 'SIGN_IN_INPUT_PASSWORD' && (
        <>
          <div className={`font-caption-regular ${styles.body}`}>
            <InputPassword
              password={password}
              setIsVerifiedPassword={setIsVerifiedPassword}
            />
          </div>
          <div className={`w-full flex flex-col items-center ${styles.footer}`}>
            <Button
              id='email_sign_in'
              className={styles.submitButton}
              disabled={!isVerifiedPassword}
              onClick={() => handleSignInEmail()}
            >
              <span className='text-[var(--color-text-main)]'>Sign in</span>
            </Button>
            <Link href='/auth/email/resetPassword'>
              <p className='font-caption-regular text-[var(--color-text-brand)] mt-16 cursor-pointer'>
                Forgot password?
              </p>
            </Link>
          </div>
        </>
      )}
    </div>
  );
};
export default EmailForm;
