'use client';
import { useRouter, useSearchParams } from 'next/navigation';
import Button from '../buttons/Button';
import styles from './ResetPassword.module.css';
import InputEMail from './InputEmail';
import { useEffect, useState } from 'react';
import { useAtomValue } from 'jotai';
import { emailAtom } from '@/store/account';
import SubmitButton from '../buttons/SubmitButton';
import CaretDown from '@/public/icon/CaretDown';
import { sendPasswordReset, updatePassword } from '@/apis/firebase';
import { validationEmail } from '@/utils/common';
import InputPassword from './InputPassword';
import { showToastMessage } from '@/utils/toastify';
import { useTheme } from 'next-themes';
type Props = {
  oobCode?: string;
};
const ResetPassword = (props: Props) => {
  const router = useRouter();
  const { theme } = useTheme();
  const emailAtomValue = useAtomValue(emailAtom);
  const email = useState<string>(emailAtomValue);
  const password = useState<string>('');
  const [step, setStep] = useState<
    'INSERT_EMAIL' | 'MAIL_SEND_SUCCESS' | 'EDIT_PASSWORD'
  >('INSERT_EMAIL');
  const [isVerifiedPassword, setIsVerifiedPassword] = useState<boolean>(false); //verifyCode[0] !== '' && verifyCode[0].length === 6
  const handleRequestReset = async () => {
    try {
      email[0] &&
        sendPasswordReset(email[0]).then((data) => {
          data === true && setStep('MAIL_SEND_SUCCESS');
        });
    } catch (error) {
      throw error;
    }
  };
  const handleBackToSignIn = () => {
    router.push('/auth/signin');
  };
  const handleSubmitChangePassword = async () => {
    try {
      props.oobCode &&
        updatePassword(props.oobCode, password[0]).then((data) => {
          data === true &&
            (showToastMessage({
              message: 'Password has been changed successfully!',
              code: 'success',
              toastId: 'reset-password',
              theme: theme === 'light' ? 'light' : 'dark',
              position: 'top-center',
            }),
            router.push('/auth/signin'));
        });
    } catch (error) {
      throw error;
    }
  };
  useEffect(() => {
    console.log('useEffect props.oobCode', props.oobCode);
    props.oobCode && setStep('EDIT_PASSWORD');
  }, [props.oobCode]);
  return (
    <section className={styles.container}>
      <div className='w-full flex items-center justify-center relative mb-40'>
        {step !== 'EDIT_PASSWORD' && (
          <Button id='' className={styles.button} onClick={() => router.back()}>
            <CaretDown />
          </Button>
        )}
        <p className='font-body01-regular text-[var(--color-text-main)]'>
          Reset Password
        </p>
      </div>
      {step == 'INSERT_EMAIL' && (
        <>
          <InputEMail email={email} isVerifiedEmail={false} />
          <SubmitButton
            id=''
            className={styles.submitButton}
            onClick={() => handleRequestReset()}
            disabled={!validationEmail(email[0])}
          >
            Request Reset
          </SubmitButton>
        </>
      )}
      {step == 'MAIL_SEND_SUCCESS' && (
        <>
          <p
            className={`font-body02-regular text-[var(--color-text-subtle)] text-center`}
          >
            {`An email for password reset has been sent.
            If you haven't received it, please verify your
            email address.`}
          </p>
          <div className='w-full bg-[var(--color-elevation-sunken)] text-center py-12 mt-24'>
            <p className='font-body02-regular text-[var(--color-text-main)]'>
              {email[0]}
            </p>
          </div>
          <SubmitButton
            id=''
            className={styles.submitButton}
            onClick={() => handleBackToSignIn()}
          >
            Back to Sign in
          </SubmitButton>
        </>
      )}
      {step == 'EDIT_PASSWORD' && (
        <>
          <InputPassword
            password={password}
            setIsVerifiedPassword={setIsVerifiedPassword}
          />
          <SubmitButton
            id=''
            className={styles.submitButton}
            onClick={() => handleSubmitChangePassword()}
            disabled={!isVerifiedPassword}
          >
            Reset Password
          </SubmitButton>
        </>
      )}
    </section>
  );
};
export default ResetPassword;
