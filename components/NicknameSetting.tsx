'use client';
import { useState } from 'react';
import styles from './NicknameSetting.module.css';
import SubmitButton from './buttons/SubmitButton';
import { useMutationUpdateMe } from '@/utils/hooks/mutations/auth';
import ReactQueryClient from '@/utils/ReactQueryClient';
import { useMeManual } from '@/utils/hooks/queries/auth';
const NicknameSetting = () => {
  const [inputText, setInputText] = useState<string>('');
  const { data: me, refetch } = useMeManual();
  const { mutate: updateNickname, status: updateStatus } =
    useMutationUpdateMe();
  const handleInputText = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setInputText(value);
  };
  const handleSubmit = () => {
    updateNickname(
      { nickname: inputText },
      {
        onSuccess: () => {
          refetch();
        },
      }
    );
  };
  return (
    <section className={styles.container}>
      <p className='font-subtitle02-medium text-[var(--color-text-main)]'>
        Nickname Setting
      </p>
      <input
        type='text'
        className={styles.inputText}
        placeholder='Nickname'
        value={inputText}
        onChange={handleInputText}
      />
      <SubmitButton
        id=''
        className={styles.button}
        disabled={inputText.length == 0}
        onClick={handleSubmit}
        loading={updateStatus === 'loading'}
      >
        <p>Done</p>
      </SubmitButton>
    </section>
  );
};
export default NicknameSetting;
