'use client';
import { useEffect, useState } from 'react';
import styles from './ManageGroup.module.css';
import SubmitButton from '../buttons/SubmitButton';
import { useMutationUpsertWalletGroup } from '@/utils/hooks/mutations/walletGroup';
import { showToastMessage } from '@/utils/toastify';
import { useTheme } from 'next-themes';
import SearchInput from '../searchInput/SearchInput';
import { useMyWalletList } from '@/utils/hooks/queries/wallet';
import CheckBox from '../checkBox/CheckBox';
import { shortenAddress } from '@/utils/common';
import { TWallet, TWalletGroup } from '@/interfaces/inventory';
import CheckCircle from '@/public/icon/CheckCircle';
import Button from '../buttons/Button';
import Cancel from '@/public/icon/Cancel';
import {
  useWalletGroup,
  useWalletGroupList,
} from '@/utils/hooks/queries/walletGroup';
import { useMe } from '@/utils/hooks/queries/auth';
import InputText from '../input/InputText';

const ManageGroup = (props: {
  group: TWalletGroup | null;
  onClose: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const { data: me } = useMe();
  const { theme } = useTheme();
  const [inputText, setInputText] = useState<string>(props.group?.name || '');
  const [invalidInput, setInvalidInput] = useState<boolean>(false);
  const [inputSearch, setInputSearch] = useState<string>('');
  const [isSubmitLoading, setIsSubmitLoading] = useState<boolean>(false);
  const { data: walletList, isLoading } = useMyWalletList({
    nickname: me?.nickname,
    networkId: 'ethereum',
  });
  const { data: walletGroupList, refetch } = useWalletGroupList(
    me?.nickname || ''
  );
  const { data: walletGroup, refetch: refetchWalletGroup } = useWalletGroup({
    id: props.group?.id || '',
    nickname: me?.nickname || '',
  });
  const [selectedWalletIds, setSelectedWalletIds] = useState<string[]>(
    props.group?.walletIds || []
  );
  const { mutate: upsertWalletGroup, status: insertStatus } =
    useMutationUpsertWalletGroup();
  const handleInputText = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setInputText(value);
  };
  const handleClickWallet = (wallet: TWallet) => {
    setSelectedWalletIds((prev) => {
      const index = prev.findIndex((walletId) => walletId === wallet.id);
      if (index === -1) {
        return [...prev, wallet.id];
      } else {
        const newArr = [...prev];
        newArr.splice(index, 1);
        return newArr;
      }
    });
  };
  const handleSubmit = () => {
    setIsSubmitLoading(true);
    upsertWalletGroup(
      {
        id: props.group?.id || undefined,
        name: inputText,
        walletIds: selectedWalletIds,
      },
      {
        onSuccess: () => {
          refetch();
          refetchWalletGroup();
          props.onClose(false);
          showToastMessage({
            message: 'Group Updated',
            code: 'success',
            toastId: 'group-add',
            theme: theme === 'light' ? 'light' : 'dark',
            position: 'bottom-right',
          });
          setIsSubmitLoading(false);
        },
        onError: () => {
          setIsSubmitLoading(false);
        },
      }
    );
  };
  const handleClickCancel = () => {
    setSelectedWalletIds([]);
    props.onClose(false);
  };
  return (
    <section className={styles.container}>
      <div className={styles.box}>
        <div className='w-full flex justify-between'>
          <p className='font-subtitle02-medium text-[var(--color-text-main)] mb-24'>
            Manage Group
          </p>
          <Button
            id=''
            className={styles.cancelButton}
            onClick={() => props.onClose(false)}
          >
            <Cancel className='w-16 h-16' />
          </Button>
        </div>
        <span className='font-caption-regular text-[var(--color-text-subtle)]'>
          Group Name
        </span>
        <InputText
          className={`${styles.inputText} ${
            invalidInput ? styles.invalid : ''
          }`}
          placeholder='Group Name'
          value={inputText}
          onChange={handleInputText}
        />
        {invalidInput && (
          <p className='text-[var(--color-text-danger)]'>
            The Wallet name is duplicated
          </p>
        )}
        {!props.group && selectedWalletIds.length > 0 && (
          <div className='mt-16 w-full font-caption-regular'>
            <span className='text-[var(--color-text-subtle)]'>{`Selected Wallets (${selectedWalletIds.length})`}</span>
            <div className={styles.scroll}>
              {walletList?.data
                .filter((wallet) =>
                  selectedWalletIds.find((id) => id === wallet.id)
                )
                .map((wallet, i) => {
                  return (
                    <div
                      key={i}
                      className='bg-[var(--color-elevation-sunken)] h-32 px-8 flex items-center gap-x-8'
                    >
                      <p className='text-[var(--color-text-main)]'>
                        {shortenAddress(wallet.walletAddress)}
                      </p>
                    </div>
                  );
                })}
            </div>
          </div>
        )}
      </div>
      <div className='w-full p-16'>
        <SearchInput
          placeholder='Wallet Address, Wallet Name'
          value={inputSearch}
          onChange={(text) => setInputSearch(text)}
          handleClose={() => setInputSearch('')}
        />
        <div className='w-full max-h-[352px] overflow-y-scroll'>
          <table className={`font-caption-regular ${styles.table}`}>
            <thead>
              <tr className='pb-12'>
                <th className='text-left'>
                  <p>Wallet</p>
                </th>
                <th className='text-left'>
                  <p>Balance</p>
                </th>
                <th className='text-right'>
                  <p>Group</p>
                </th>
              </tr>
            </thead>
            <tbody>
              {walletList?.data
                .filter((wallet) => {
                  return inputSearch && inputSearch.length > 0
                    ? wallet.walletAddress.includes(inputSearch) ||
                        wallet.name?.includes(inputSearch)
                    : wallet;
                })
                .map((wallet, i) => {
                  const isSelected = selectedWalletIds.some(
                    (id) => id === wallet.id
                  );
                  const walletName = wallet.name
                    ? wallet.name.startsWith('0x')
                      ? shortenAddress(wallet.name)
                      : wallet.name
                    : shortenAddress(wallet.walletAddress);
                  // if (inputSearch.length > 0) {
                  //   if (
                  //     !walletName
                  //       .toLowerCase()
                  //       .includes(inputSearch.toLowerCase())
                  //   )
                  //     return null;
                  //   if (
                  //     !walletName
                  //       .toLowerCase()
                  //       .includes(inputSearch.toLowerCase())
                  //   )
                  //     return null;
                  // }

                  return (
                    <tr key={i}>
                      <td className='text-left'>
                        <div className='flex items-center gap-x-4'>
                          <p>{walletName}</p>
                          {wallet.provider !== 'manual' && (
                            <CheckCircle className='fill-[var(--color-icon-brand)]' />
                          )}
                        </div>
                      </td>
                      <td className='text-left'>{/* <p>$11,134</p> */}</td>
                      <td className='text-right'>
                        <CheckBox
                          onClick={() => {
                            handleClickWallet(wallet);
                          }}
                          className={`ml-auto ${styles.checkbox} ${
                            isSelected ? styles.checked : ''
                          }`}
                          checked={isSelected}
                        />
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
          <div />
        </div>
        <div className='flex items-center gap-x-8 mt-18'>
          <Button
            id=''
            className={styles.button}
            onClick={() => handleClickCancel()}
          >
            Cancel
          </Button>
          <SubmitButton
            id=''
            className={`${styles.button} w-60`}
            onClick={() => handleSubmit()}
            disabled={inputText.length === 0 || selectedWalletIds.length === 0}
            isLoading={isSubmitLoading}
          >
            Save
          </SubmitButton>
        </div>
      </div>
    </section>
  );
};
export default ManageGroup;
