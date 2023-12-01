'use client';
import { useState } from 'react';
import styles from './NicknameSetting.module.css';
import SubmitButton from './buttons/SubmitButton';
import { useMutationWalletGroup } from '@/utils/hooks/mutations/walletGroup';
import { showToastMessage } from '@/utils/toastify';
import { useTheme } from 'next-themes';
const AddGroup = (props: {
  onClose: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const { theme } = useTheme();
  const [inputText, setInputText] = useState<string>('');
  const { mutate: insertWalletGroup, status: insertStatus } =
    useMutationWalletGroup();
  const handleInputText = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setInputText(value);
  };
  const handleSubmit = () => {
    insertWalletGroup(
      { name: inputText },
      {
        onSuccess: () => {
          props.onClose(false);
          showToastMessage({
            message: 'Group Added',
            code: 'success',
            toastId: 'group-add',
            theme: theme === 'light' ? 'light' : 'dark',
            position: 'bottom-right',
          });
        },
      }
    );
  };
  return (
    <section className={styles.container}>
      <p className='font-subtitle02-medium text-[var(--color-text-main)]'>
        Add Group
      </p>
      <input
        type='text'
        className={styles.inputText}
        placeholder='Group Name'
        value={inputText}
        onChange={handleInputText}
      />
      <SubmitButton
        id=''
        className={styles.button}
        disabled={inputText.length == 0}
        onClick={handleSubmit}
        loading={insertStatus === 'loading'}
      >
        <p>Done</p>
      </SubmitButton>
    </section>
  );
};
export default AddGroup;
