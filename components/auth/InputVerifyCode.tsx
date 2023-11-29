import Button from '../buttons/Button';
import styles from './InputVerifyCode.module.css';
import { useEffect, useState } from 'react';
import {
  useMutationSendVerificationCode,
  useMutationVerificationEmail,
} from '@/utils/hooks/mutations/auth';
import { validationEmail } from '@/utils/common';
import { showToastMessage } from '@/utils/toastify';
import { useTheme } from 'next-themes';
type Props = {
  verifyCode: [string, React.Dispatch<React.SetStateAction<string>>];
  email: string;
  setIsVerified: React.Dispatch<React.SetStateAction<boolean>>;
};
const InputVerifyCode = (props: Props) => {
  const REMAIN_INPUT_CODE_SEC = 300;
  const RESEND_CODE_SEC = 10;
  const [verifyCode, setVerifyCode] = props.verifyCode;
  const [resendTimer, setResendTimer] = useState<number>(-1);
  const [sendMailTimer, setSendMailTimer] = useState<number>(-1);
  const [timeUp, setTimeUp] = useState<boolean>(false);
  const [isSendCodeLoading, setIsSendCodeLoading] = useState<boolean>(false);
  const { theme } = useTheme();
  const { mutate: sendVerificationCode } = useMutationSendVerificationCode();
  const { mutate: verifyEmail, status: verifyEmailStatus } =
    useMutationVerificationEmail();

  useEffect(() => {
    console.log(
      'validationVerificationCode',
      validationVerificationCode(verifyCode)
    );
    //6자리 숫자인지 확인해서 맞으면 handleVerifyEmail() 호출
    validationVerificationCode(verifyCode) && handleVerifyEmail();
  }, [verifyCode]);

  //60초 카운트다운. 0이 되면 카운트다운 멈춤
  useEffect(() => {
    const countdown = setInterval(() => {
      if (resendTimer > 0) {
        setResendTimer(resendTimer - 1);
      }
      resendTimer === 0 &&
        (clearInterval(countdown), setIsSendCodeLoading(false));
    }, 1000);
    return () => clearInterval(countdown);
  }, [resendTimer]);
  useEffect(() => {
    const countdown = setInterval(() => {
      if (sendMailTimer > 0) {
        setSendMailTimer(sendMailTimer - 1);
      }
      sendMailTimer === 0 && (clearInterval(countdown), setTimeUp(true));
    }, 1000);
    return () => clearInterval(countdown);
  }, [sendMailTimer]);

  const formatSeconds = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;

    const formattedMinutes = String(minutes).padStart(2, '0');
    const formattedSeconds = String(remainingSeconds).padStart(2, '0');

    return `${formattedMinutes}:${formattedSeconds}`;
  };

  const validationVerificationCode = (code: string | number) => {
    //code is 6 digit number
    const regex = /^[0-9]{6}$/;
    return regex.test(code.toString());
  };
  const handleVerifyEmail = () => {
    verifyEmail(
      { email: props.email as `${string}@${string}`, code: verifyCode },
      {
        onSuccess: (data) => {
          data.statusText === 'OK'
            ? (setIsSendCodeLoading(false),
              props.setIsVerified(true),
              showToastMessage({
                message: 'Verification completed!',
                code: 'success',
                toastId: 'custom-valuation',
                theme: theme === 'light' ? 'light' : 'dark',
                position: 'top-center',
              }))
            : showToastMessage({
                message: 'Invalid code',
                code: 'error',
                toastId: 'custom-valuation',
                theme: theme === 'light' ? 'light' : 'dark',
                position: 'top-center',
              });
        },
        onError: (error) => {
          console.log('error', error);
          showToastMessage({
            message: 'Invalid code',
            code: 'error',
            toastId: 'custom-valuation',
            theme: theme === 'light' ? 'light' : 'dark',
            position: 'top-center',
          });
        },
      }
    );
  };
  const handleClickSendVerificationCode = () => {
    sendVerificationCode(
      { email: props.email as `${string}@${string}` },
      {
        onSuccess: () => {
          showToastMessage({
            message: 'Verification code sent successfully',
            code: 'success',
            toastId: 'custom-valuation',
            theme: theme === 'light' ? 'light' : 'dark',
            position: 'top-center',
          });
          setIsSendCodeLoading(true);
          setTimeUp(false);
          setResendTimer(RESEND_CODE_SEC);
          setSendMailTimer(REMAIN_INPUT_CODE_SEC);
        },
      }
    );
  };
  return (
    <div className='flex gap-x-8 mt-24'>
      <div className='flex-1'>
        <div className={styles.container}>
          <span className='font-caption-regular text-[var(--color-text-subtle)]'>
            Email Verification code
          </span>
          <input
            disabled={sendMailTimer <= 0}
            type='number'
            placeholder='Verification code'
            className={styles.inputText}
            value={verifyCode}
            onChange={(e) =>
              setVerifyCode(e.target.value.toString().substring(0, 6))
            }
            name='verifyCode'
            maxLength={6}
          />
          {sendMailTimer > 0 && (
            <p className='font-caption-regular text-[var(--color-text-brand)] mt-4'>{`Time remaining: ${formatSeconds(
              sendMailTimer
            )}`}</p>
          )}
          {timeUp == true && (
            <p className={styles.error}>
              Verification expired. please try again.
            </p>
          )}
        </div>
      </div>
      <Button
        id=''
        onClick={() =>
          !isSendCodeLoading &&
          resendTimer <= 0 &&
          handleClickSendVerificationCode()
        }
        className={`${styles.sendVerifyCodeButton} mt-20`}
        isLoading={isSendCodeLoading}
        disabled={!validationEmail(props.email)}
      >
        {sendMailTimer > 0 ? 'Resend' : 'Get code'}
      </Button>
    </div>
  );
};
export default InputVerifyCode;
