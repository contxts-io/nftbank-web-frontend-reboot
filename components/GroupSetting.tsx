'use client';
import { useMemo, useState } from 'react';
import styles from './GroupSetting.module.css';
import SearchInput from './searchInput/SearchInput';
import { useMyWalletList } from '@/utils/hooks/queries/wallet';
import { useAtomValue } from 'jotai';
import { currencyAtom } from '@/store/currency';
import { formatCurrency } from '@/utils/common';
import Dropdown from './dropdown/Dropdown';
import { useMyWalletGroupList } from '@/utils/hooks/queries/walletGroup';
import { TGroups, TWallet } from '@/interfaces/inventory';
import CheckCircle from '@/public/icon/CheckCircle';
import FloppyDisk from '@/public/icon/FloppyDisk';
import Button from './buttons/Button';
import { useMutationWalletBulk } from '@/utils/hooks/mutations/wallet';
const GroupSetting = () => {
  const [editList, setEditList] = useState<TWallet[]>([]);
  const { data: _walletList } = useMyWalletList();
  const { data: _groupList } = useMyWalletGroupList();
  const { mutate: updateWalletBulk } = useMutationWalletBulk();
  const currency = useAtomValue(currencyAtom);
  const walletList: TWallet[] = useMemo(() => {
    return (
      _walletList?.data?.map((wallet) => {
        const group = editList.find(
          (list) => list.walletAddress === wallet.walletAddress
        )?.groups[0];
        return {
          ...wallet,
          walletAddress: wallet.walletAddress,
          groups: group ? [group] : wallet.groups,
        };
      }) || []
    );
  }, [_walletList, editList]);
  const groupList: TGroups[] | undefined = useMemo(() => {
    return (
      _groupList?.data?.map((group) => {
        return {
          id: '',
          name: group.name,
        };
      }) || []
    );
  }, [_groupList]);
  const handleClickList = (name: string, wallet: TWallet) => {
    const group = groupList?.find((item) => item.name === name);
    setEditList((prev) =>
      prev
        .filter((item) => item.walletAddress !== wallet.walletAddress)
        .concat([
          {
            ...wallet,
            groups: group ? [group] : wallet.groups,
          },
        ])
    );
  };
  const handleClickCancel = () => {
    setEditList([]);
  };
  const handleClickSave = () => {
    console.log('editList', editList);
    updateWalletBulk(editList);
  };
  return (
    <section className={styles.container}>
      <div className='flex items-center px-16 mb-16'>
        <p className={`font-subtitle02-medium ${styles.pHeader}`}>
          Group Setting
        </p>
      </div>
      <div className='px-16 w-full'>
        <SearchInput placeholder='Wallet Address, Wallet Name' />
      </div>
      {editList.length > 0 && (
        <div className='mt-16 w-full h-50 bg-[var(--color-elevation-sunken)] flex items-center px-16 text-[var(--color-text-main)]'>
          <FloppyDisk />
          <p className='ml-8'>
            <span className='text-[var(--color-text-success)]'>{`${editList.length} status `}</span>
            correction has occurred. Do you want to save it?
          </p>
          <div className='ml-auto flex items-center gap-12'>
            <Button
              id={``}
              className={`${styles.button}`}
              onClick={() => handleClickCancel()}
            >
              Cancel
            </Button>
            <Button
              id={``}
              className={`${styles.button} ${styles.save}`}
              onClick={() => handleClickSave()}
            >
              Save
            </Button>
          </div>
        </div>
      )}
      <section className={`${styles.tableWrapper}`}>
        <table className={styles.table}>
          <thead>
            <tr>
              <td className='pl-16'>Wallet</td>
              <td>Balance</td>
              <td>Group</td>
            </tr>
          </thead>
          <tbody>
            {walletList &&
              walletList.map((wallet, i) => (
                <tr key={i}>
                  <td className='pl-16'>
                    <div className='flex items-center mr-77'>
                      <p>{wallet.walletAddress}</p>
                      <div className='ml-4 text-[var(--color-border-brand)]'>
                        <CheckCircle />
                      </div>
                    </div>
                  </td>
                  <td>
                    <p className='mr-100'>
                      {formatCurrency(wallet.value[currency], currency)}
                    </p>
                  </td>
                  <td className='pr-16'>
                    {groupList && (
                      <Dropdown
                        id=''
                        className={`font-caption-medium ${styles.dropdown}`}
                        list={groupList.map((item) => item.name)}
                        listStyle={styles.dropdownListItem}
                        selected={wallet.groups[0]?.name || 'none Group'}
                        onClick={(name) => handleClickList(name, wallet)}
                      />
                    )}
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </section>
    </section>
  );
};
export default GroupSetting;
