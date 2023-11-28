'use client';
import Eye from '@/public/icon/Eye';
import { twMerge } from 'tailwind-merge';
import styles from './InputPassword.module.css';
import { useEffect, useState } from 'react';
import EyeSlash from '@/public/icon/EyeSlash';
import { passwordValidation } from '@/utils/common';

type InputPasswordProps = {
  className?: string;
  password: [string, React.Dispatch<React.SetStateAction<string>>];
  setIsVerifiedPassword: React.Dispatch<React.SetStateAction<boolean>>;
};
const InputPassword = (props: InputPasswordProps) => {
  // const [inputText, setInputText] = useState<string>('');
  const inputText = props.password[0];
  const setInputText = props.password[1];
  const [textType, setTextType] = useState<'text' | 'password'>('password');
  const [isPasswordValid, setIsPasswordValid] = useState<boolean>(false);
  const handleInputText = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setInputText(value);
  };
  useEffect(() => {
    setIsPasswordValid(passwordValidation(inputText));
  }, [inputText]);
  useEffect(() => {
    props.setIsVerifiedPassword(isPasswordValid);
  }, [isPasswordValid]);
  return (
    <div className={`font-caption-regular w-full mt-24`}>
      <span className='text-[var(--color-text-subtle)]'>Password</span>
      <div
        className={twMerge(
          `${styles.inputContainer} ${props.className ? props.className : ''} ${
            inputText.length == 0 || isPasswordValid ? '' : styles.invalid
          }`
        )}
      >
        <input
          type={textType}
          name='password'
          placeholder={'Password'}
          className={`${styles.textInput} font-caption-regular`}
          onChange={handleInputText}
          value={inputText}
          autoComplete={'off'}
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
      {inputText.length > 0 && !isPasswordValid && (
        <p className='font-caption-regular text-[var(--color-text-danger)]'>
          Must have at least 6 to 20 characters.
        </p>
      )}
    </div>
  );
};
export default InputPassword;
