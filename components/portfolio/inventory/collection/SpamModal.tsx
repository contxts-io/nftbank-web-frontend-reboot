'use client';
import { useAtom, useAtomValue } from 'jotai';
import styles from './SpamModal.module.css';
import {
  inventoryCollectionAtom,
  inventorySpamCollectionAtom,
} from '@/store/requestParam';
import { useEffect, useState } from 'react';
import {
  useCollectionCount,
  useInventoryCollectionList,
  useInventoryCollectionsInfinite,
  useInventoryValue,
} from '@/utils/hooks/queries/inventory';
import MagnifyingGlass from '@/public/icon/MagnifyingGlass';
import ToggleButton from '@/components/buttons/ToggleButton';
import Button from '@/components/buttons/Button';
import ClockClockwise from '@/public/icon/ClockClockwise';
import SpamCollectionTable from './SpamCollectionTable';
import CaretDown from '@/public/icon/CaretDown';
import { Popover } from 'react-tiny-popover';
import SpamSaveToast from './SpamSaveToast';
import { addedSpamListAtom } from '@/store/portfolio';
import { useInventorySpamListInfinite } from '@/utils/hooks/queries/spam';
import { resetSpamList } from '@/apis/spam';
import ReactQueryClient from '@/utils/ReactQueryClient';
import { useMe } from '@/utils/hooks/queries/auth';
import { useSearchParams } from 'next/navigation';
import StatusDropdown from './StatusDropdown';
const SpamModal = () => {
  const { data: me } = useMe();
  const searchParams = useSearchParams();
  const walletAddress =
    searchParams.get('walletAddress') || me.walletAddress || undefined;

  const [inventorySpamCollectionParam, setInventorySpamCollectionParam] =
    useAtom(inventorySpamCollectionAtom);
  const [inventoryCollectionRequestParam, setInventoryCollectionRequestParam] =
    useAtom(inventoryCollectionAtom);
  const { data: inventoryCount } = useCollectionCount(walletAddress);
  const [isEditOnly, setIsEditOnly] = useState<boolean>(false);
  const [searchText, setSearchText] = useState<string>('');
  const spamList = useAtomValue(addedSpamListAtom);
  const { fetchNextPage, data, status } = useInventorySpamListInfinite({
    ...inventorySpamCollectionParam,
    page: 0,
  });
  // const { refetch } = useInventoryCollectionsInfinite({
  //   ...inventoryCollectionRequestParam,
  //   page: 0,
  // });
  const { refetch: refetchInventoryValue } = useInventoryValue(walletAddress);
  // const { refetch: refetchInventoryCollection } = useInventoryCollectionList(
  //   inventoryCollectionRequestParam
  // );
  const handleInputText = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setSearchText(value);
    (value.length >= 3 || value.length == 0) &&
      setInventorySpamCollectionParam((prev) => {
        return {
          ...prev,
          searchCollection: value,
          page: 1,
        };
      });
  };
  const toggleEditOnly = () => {
    setIsEditOnly((prev) => !prev);
  };
  useEffect(() => {
    document.body.style.cssText = `
      position: fixed; 
      top: -${window.scrollY}px;
      overflow-y: scroll;
      width: 100%;`;
    return () => {
      const scrollY = document.body.style.top;
      document.body.style.cssText = '';
      window.scrollTo(0, parseInt(scrollY || '0', 10) * -1);
    };
  }, []);

  useEffect(() => {
    setInventorySpamCollectionParam((prev) => {
      return {
        ...prev,
        page: 1,
        includeSpam: !isEditOnly,
        includeCustomSpam: true,
        includeNonSpam: !isEditOnly,
      };
    });
  }, [isEditOnly]);
  const handleClickResetSpam = async () => {
    await resetSpamList().then(() => {
      ReactQueryClient.removeQueries(['inventorySpamList']);
      ReactQueryClient.removeQueries(['inventoryValuePerformance']);
      ReactQueryClient.removeQueries(['collectionCount']);
      ReactQueryClient.removeQueries(['itemCount']);
      ReactQueryClient.removeQueries(['inventoryCollectionList']);
      ReactQueryClient.removeQueries(['inventoryCollectionListPerformance']);
      ReactQueryClient.removeQueries(['inventoryItemListPerformance']);
    });
    setInventorySpamCollectionParam((prev) => {
      return {
        ...prev,
        page: 1,
      };
    });
    setInventoryCollectionRequestParam((prev) => {
      return {
        ...prev,
        page: 1,
      };
    });
    refetchInventoryValue();
    // refetchInventoryCollection();
    // refetch();
  };
  return (
    <section className={styles.container}>
      <div className='flex items-center'>
        <p className={`font-subtitle01-bold ${styles.pHeader}`}>
          NFT Spam Settings
        </p>
        <div
          className={`font-caption-regular ${styles.box}`}
        >{`Spam Collections: ${inventoryCount?.spamCount || 0}`}</div>
      </div>
      <div className={`font-body02-regular ${styles.inputContainer}`}>
        <MagnifyingGlass width={16} height={16} />
        <input
          type='text'
          placeholder={'Search by collection'}
          className={`${styles.textInput} font-caption-regular`}
          onChange={handleInputText}
          value={searchText}
        />
      </div>
      {spamList.length > 0 && <SpamSaveToast />}
      <div className={styles.row}>
        <StatusDropdown />
        <div className='flex items-center'>
          <div className='flex items-center mr-8'>
            <p className={`${styles.textSub} mr-8`}>Edit only</p>
            <ToggleButton
              onClick={toggleEditOnly}
              checked={isEditOnly}
              id={'/portfolio/inventory/collection/SpamModal'}
            />
          </div>
          <Button id={'/spam/reset'} onClick={() => handleClickResetSpam()}>
            <ClockClockwise className='mr-4' />
            All Reset
          </Button>
        </div>
      </div>
      <section className={`${styles.tableWrapper}`}>
        <SpamCollectionTable />
      </section>
    </section>
  );
};
export default SpamModal;
