'use client';
import Cancel from '@/public/icon/Cancel';
import styles from './EditWallet.module.css';
import Button from '../buttons/Button';
import SubmitButton from '../buttons/SubmitButton';
import { TWallet } from '@/interfaces/inventory';
import { useEffect, useState } from 'react';
import { SearchParam } from '@/apis/wallet';
import { useMutationUpdateWallet } from '@/utils/hooks/mutations/wallet';
import InputText from '../input/InputText';
import { useQueryClient } from '@tanstack/react-query';
type Props = {
  wallet: TWallet;
  onClose: () => void;
};
const EditWallet = (props: Props) => {
  const queryClient = useQueryClient();
  const [wallet, setWallet] = useState<TWallet>(props.wallet);

  const { mutate: updateWalletName, status } = useMutationUpdateWallet();
  const handleInputText = (value: string) => {
    setWallet((prev) => {
      return {
        ...prev,
        name: value,
      };
    });
  };
  const handleSubmit = () => {
    updateWalletName(
      {
        walletId: wallet.id,
        name: wallet.name || '',
      },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({
            queryKey: ['myWalletList'],
          });
          props.onClose();
        },
      }
    );
  };

  return (
    <div className={styles.container}>
      <div className='w-full flex justify-between'>
        <p className='font-subtitle02-medium text-[var(--color-text-main)]'>
          Edit Wallet Name
        </p>
        <Button id='' className={styles.button} onClick={() => props.onClose()}>
          <Cancel className='w-16 h-16' />
        </Button>
      </div>
      <InputText
        className='w-full mt-16'
        placeholder='Wallet Name'
        value={wallet.name}
        onChange={(e) => handleInputText(e.target.value)}
      />
      <div className='mt-auto flex'>
        <SubmitButton
          id=''
          className='ml-auto'
          onClick={() => handleSubmit()}
          isLoading={status === 'loading'}
        >
          <p>Done</p>
        </SubmitButton>
      </div>
    </div>
  );
};
export default EditWallet;
