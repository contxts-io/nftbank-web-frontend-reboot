'use client';
import CaretDown from '@/public/icon/CaretDown';
import styles from './ManualAddWallet.module.css';
import Cancel from '@/public/icon/Cancel';
import Button from '../buttons/Button';
import Plus from '@/public/icon/Plus';
import { useEffect, useState } from 'react';
import { useMyWalletList } from '@/utils/hooks/queries/wallet';
import Check from '@/public/icon/Check';
import Spinner from '@/public/icon/Spinner';
import { validationWalletAddress } from '@/utils/common';
import { useMutationInsertWalletBulk } from '@/utils/hooks/mutations/wallet';
import { sendGTMEvent } from '@next/third-parties/google';
import { useQueryClient } from '@tanstack/react-query';
import { useMe } from '@/utils/hooks/queries/auth';
import { getAddress } from 'ethers/lib/utils';
type InputTextProps = {
  wallet: {
    walletAddress: string;
    isValid: boolean | undefined;
    index: number;
  };
  addWallet: (wallet: {
    walletAddress: string;
    isValid: boolean | undefined;
    index: number;
  }) => void;
};
const InputText = (props: InputTextProps) => {
  const [value, setValue] = useState<string>('');
  const [valid, setValid] = useState<boolean | undefined>(undefined);
  const { data: walletList, status } = useMyWalletList();
  const handleChangeInput = async (value: string) => {
    setValue(value);
  };
  useEffect(() => {
    console.log('my wallet list : ', walletList);
    if (!walletList) {
      console.log('no wallet list');
      setValid(undefined);
      return;
    }
    value !== '' &&
      (walletList.data.find(
        (wallet) => wallet.walletAddress === props.wallet.walletAddress
      )
        ? setValid(false)
        : setValid(true));
  }, [walletList]);
  useEffect(() => {
    console.log(
      'walletList',
      Boolean(
        !walletList?.data.find(
          (wallet) => wallet.walletAddress === props.wallet.walletAddress
        )
      )
    );
    try {
      Boolean(
        value !== '' &&
          !walletList?.data.find(
            (wallet) => wallet.walletAddress === props.wallet.walletAddress
          )
      ) && getAddress(value);
      if (value !== '') {
        setValid(true);
        props.addWallet({
          ...props.wallet,
          walletAddress: value,
          isValid: true,
        });
      } else {
        props.addWallet({
          ...props.wallet,
          walletAddress: value,
          isValid: false,
        });
        setValid(false);
      }
    } catch (e) {
      console.error(e);
      props.addWallet({
        ...props.wallet,
        walletAddress: value,
        isValid: false,
      });
      setValid(false);
    }
  }, [value]);
  return (
    <div className='w-full flex flex-col'>
      <div className='w-full relative flex items-center'>
        <input
          className={`font-caption-regular ${styles.textInput} ${
            Boolean(valid === false) ? styles.invalid : ''
          }`}
          placeholder='Wallet Address'
          value={value}
          onChange={(e) => handleChangeInput(e.target.value)}
        />
        {status === 'success' && valid === true && (
          <div className='absolute right-12'>
            <Check className='fill-[var(--color-icon-success)]' />
          </div>
        )}
        {status === 'loading' && (
          <div className='absolute right-12 text-[var(--color-icon-main)]'>
            <Spinner />
          </div>
        )}
      </div>
      {/* {value !== '' && valid === false && (
        <p className='text-[var(--color-text-danger)]'>invalid</p>
      )} */}
    </div>
  );
};

type Props = {
  goBack: () => void;
  onClose: () => void;
};
const ManualWalletAdd = (props: Props) => {
  const queryClient = useQueryClient();
  const { data: me } = useMe();
  const { data: walletListData, refetch } = useMyWalletList();
  const { mutate: insertMyWalletBulk } = useMutationInsertWalletBulk();
  const [walletList, setWalletList] = useState<
    { walletAddress: string; isValid: boolean | undefined; index: number }[]
  >([]);

  const handleClickAddButton = () => {
    if (walletList.length >= 10) return;
    setWalletList((prev) => [
      ...prev,
      { index: prev.length, walletAddress: '', isValid: undefined },
    ]);
  };
  const onSubmit = () => {
    const validWalletList = walletList.filter(
      (wallet) => wallet.isValid === true
    );
    insertMyWalletBulk(
      validWalletList.map((wallet) => {
        return {
          name: wallet.walletAddress,
          networkName: 'ethereum',
          walletAddress: wallet.walletAddress,
          provider: 'manual',
        };
      }),
      {
        onSuccess: () => {
          sendGTMEvent({
            event: 'buttonClicked',
            name: 'manual_wallet_add_success',
          });
          queryClient.invalidateQueries({
            queryKey: ['myWalletList'],
          });
          queryClient.invalidateQueries({
            queryKey: ['walletList'],
          });
          me &&
            queryClient.invalidateQueries({
              queryKey: [me.nickname],
            });
          refetch();
          props.onClose();
        },
      }
    );
  };
  const addWallet = (wallet: {
    index: number;
    walletAddress: string;
    isValid: boolean | undefined;
  }) => {
    setWalletList((prev) => {
      const newList = [...prev];
      newList[wallet.index] = wallet;
      return newList;
    });
  };
  useEffect(() => {
    console.log('walletList', walletList);
  }, [walletList]);
  return (
    <section className={styles.container}>
      <div className={styles.title}>
        <Button
          id=''
          className={styles.backButton}
          onClick={() => props.goBack()}
        >
          <CaretDown className='w-16 h-16' />
        </Button>
        <span className='font-body01-regular text-[var(--color-text-main)]'>
          Register as Wallet Address
        </span>
        <Button
          id=''
          className={styles.cancelButton}
          onClick={() => props.onClose()}
        >
          <Cancel />
        </Button>
      </div>
      <div className={styles.body}>
        {walletList.map((wallet, index) => {
          return (
            <div key={index} className='w-full '>
              <InputText addWallet={addWallet} wallet={wallet} />
            </div>
          );
        })}

        <Button
          id=''
          className={styles.addRowButton}
          onClick={() => handleClickAddButton()}
          disabled={
            walletList.find((wallet) => wallet.walletAddress === '') !==
              undefined ||
            walletList.find((wallet) => wallet.isValid === false) !== undefined
          }
        >
          <Plus className='w-16 h-16 fill-[var(--color-icon-selected)]' />
        </Button>
      </div>
      <Button
        id=''
        className={styles.registerButton}
        disabled={Boolean(walletList.find((wallet) => wallet.isValid !== true))}
        onClick={() => onSubmit()}
      >
        <p>Register</p>
      </Button>
    </section>
  );
};
export default ManualWalletAdd;
