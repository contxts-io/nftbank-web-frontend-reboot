'use client';
import { useState } from 'react';
import styles from './NicknameSetting.module.css';
import SubmitButton from './buttons/SubmitButton';
import { useMutationUpdateMe } from '@/utils/hooks/mutations/auth';
import ReactQueryClient from '@/utils/ReactQueryClient';
import { useMeManual } from '@/utils/hooks/queries/auth';
import InputText from './input/InputText';
type Props = {
  onClose: () => void;
};
const NicknameSetting = (props: Props) => {
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
          props.onClose();
        },
      }
    );
  };
  return (
    <section className={styles.container}>
      <p className='font-subtitle02-medium text-[var(--color-text-main)]'>
        Nickname Setting
      </p>
      <p className='text-[var(--color-text-subtle)] mt-8 mb-20'>
        {`We've come up with some cool nicknames for you! You can change your
        nickname anytime😀`}
      </p>
      <InputText
        placeholder='Nickname'
        value={inputText}
        onChange={handleInputText}
        className='mb-20'
      />
      <SubmitButton
        id=''
        className={styles.button}
        disabled={inputText.length == 0}
        onClick={handleSubmit}
        isLoading={updateStatus === 'loading' ? true : false}
      >
        <p>Done</p>
      </SubmitButton>
    </section>
  );
};
export default NicknameSetting;
