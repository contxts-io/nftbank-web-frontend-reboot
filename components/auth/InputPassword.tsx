'use client';
import Eye from '@/public/icon/Eye';
import { twMerge } from 'tailwind-merge';
import styles from './InputPassword.module.css';
import { useState } from 'react';
import EyeSlash from '@/public/icon/EyeSlash';

type InputPasswordProps = {
  className?: string;
  placeholder?: string;
  password: [string, React.Dispatch<React.SetStateAction<string>>];
};
const InputPassword = (props: InputPasswordProps) => {
  // const [inputText, setInputText] = useState<string>('');
  const inputText = props.password[0];
  const setInputText = props.password[1];
  const [textType, setTextType] = useState<'text' | 'password'>('password');
  const handleInputText = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setInputText(value);
  };
  return (
    <div className={`font-caption-regular w-full mt-24`}>
      <span className='text-[var(--color-text-subtle)]'>Password</span>
      <div
        className={twMerge(
          `${styles.inputContainer} ${props.className ? props.className : ''}`
        )}
      >
        <input
          type={textType}
          placeholder={'Password'}
          className={`${styles.textInput} font-caption-regular`}
          onChange={handleInputText}
          value={inputText}
        />
        <div
          className='cursor-pointer'
          onClick={() =>
            setTextType((prev) => (prev === 'password' ? 'text' : 'password'))
          }
        >
          {textType === 'text' ? (
            <EyeSlash
              width={16}
              height={16}
              className='fill-[var(--color-icon-main)]'
            />
          ) : (
            <Eye
              width={16}
              height={16}
              className='fill-[var(--color-icon-main)]'
            />
          )}
        </div>
      </div>
    </div>
  );
};
export default InputPassword;
