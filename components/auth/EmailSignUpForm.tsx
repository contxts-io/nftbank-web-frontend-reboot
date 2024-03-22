'use client';
import { useRouter } from 'next/navigation';
import Button from '../buttons/Button';
import styles from './EmailSignUpForm.module.css';
import InputEMail from './InputEmail';
import { useState } from 'react';
import InputPassword from './InputPassword';
import InputVerifyCode from './InputVerifyCode';
import { useMutationSignInUp } from '@/utils/hooks/mutations/auth';
import { createFirebaseWithEmail } from '@/apis/firebase';
import SubmitButton from '../buttons/SubmitButton';
import { useAtomValue } from 'jotai';
import { emailAtom } from '@/store/account';
import { useMe } from '@/utils/hooks/queries/auth';
import { send } from 'process';
import { sendGTMEvent } from '@next/third-parties/google';
const EmailSignUpForm = () => {
  const { data: me, refetch } = useMe();
  const emailAtomValue = useAtomValue(emailAtom);
  const { mutate: signInUp, status: signInUpStatus } = useMutationSignInUp();
  const router = useRouter();
  const email = useState<string>(emailAtomValue);
  const verifyCode = useState<string>('');
  const password = useState<string>('');
  const [isVerifiedEmail, setIsVerifiedEmail] = useState<boolean>(false);
  const [isVerifiedPassword, setIsVerifiedPassword] = useState<boolean>(false);
  // useEffect(() => {
  //   // 전역 이벤트 리스너 등록
  //   window.addEventListener('keydown', handleKeyPress);

  //   // 컴포넌트가 언마운트될 때 이벤트 리스너 제거
  //   return () => {
  //     window.removeEventListener('keydown', handleKeyPress);
  //   };
  // }, []);
  // const handleKeyPress = (event: KeyboardEvent) => {
  //   const keyboardEvent = event as KeyboardEvent;
  //   if (keyboardEvent.key === 'Enter') {
  //     event.preventDefault();
  //     // 엔터 키에 대한 추가 로직을 여기에 추가하거나 아무 작업도 하지 않도록 설정합니다.
  //   }
  // };

  const handleSignUpEmail = async () => {
    try {
      const idToken = await createFirebaseWithEmail(email[0], password[0]);
      signInUp(
        {
          token: idToken,
          provider: 'email',
        },
        {
          onSuccess: async () => {
            console.log('emailsignupform onSuccess');
            sendGTMEvent({
              event: 'buttonClicked',
              name: 'email_sign_up',
            });
            (await refetch()).data && router.push(`/portfolio/overview`);
          },
        }
      );
    } catch (error) {
      throw error;
    }
  };
  return (
    <form autoComplete='off'>
      <section className={styles.container}>
        <div className='w-full flex items-center justify-center my-40 relative'>
          <Button
            id=''
            className={`font-button03-medium ${styles.cancelButton} absolute left-0`}
            onClick={() => router.push('/auth/signin')}
          >
            Cancel
          </Button>
          <p className='font-body01-regular text-[var(--color-text-main)]'>
            Sign up
          </p>
        </div>
        <InputEMail email={email} isVerifiedEmail={isVerifiedEmail} />
        {!isVerifiedEmail && (
          <InputVerifyCode
            verifyCode={verifyCode}
            email={email[0]}
            setIsVerified={setIsVerifiedEmail}
          />
        )}
        <InputPassword
          password={password}
          setIsVerifiedPassword={setIsVerifiedPassword}
          isSignUp={true}
        />
        <SubmitButton
          id=''
          className='mt-auto w-full mb-24 flex justify-center'
          onClick={handleSignUpEmail}
          disabled={!isVerifiedEmail || !isVerifiedPassword}
        >
          Sign up
        </SubmitButton>
      </section>
    </form>
  );
};
export default EmailSignUpForm;
