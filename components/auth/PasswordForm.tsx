'use client';
import CaretDown from '@/public/icon/CaretDown';
import styles from './EmailForm.module.css';
import Button from '../buttons/Button';
import InputPassword from './InputPassword';
import { useRouter } from 'next/navigation';

const EmailForm = () => {
  const router = useRouter();
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
      <div className={`font-caption-regular ${styles.body}`}>
        <InputPassword />
      </div>
      <div className={`font-body02-medium ${styles.footer}`}>
        <Button id='' className={styles.submitButton} disabled>
          <span className='text-[var(--color-text-main)]'>Sign in</span>
        </Button>
        <p>Forgot password?</p>
      </div>
    </div>
  );
};
export default EmailForm;
