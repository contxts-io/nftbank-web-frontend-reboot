'use client';
import { useState } from 'react';
import Button from '../buttons/Button';

type Props = {};
const EmailVerificationCode = (props: Props) => {
  const [inputText, setInputText] = useState<string>('');
  const handleInputText = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setInputText(value);
  };
  return (
    <div className={`font-caption-regular w-full mt-24`}>
      <span className='text-[var(--color-text-subtle)]'>
        Email Verification code
      </span>
      <div>
        <input
          type='text'
          placeholder={'Verification'}
          className={`font-caption-regular mt-4`}
          onChange={handleInputText}
          value={inputText}
        />
        <Button id=''>Get Code</Button>
      </div>
    </div>
  );
};
export default EmailVerificationCode;
