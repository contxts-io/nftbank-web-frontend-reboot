'use client';
import FloppyDisk from '@/public/icon/FloppyDisk';
import styles from './SpamSaveToast.module.css';
import Button from '@/components/buttons/Button';
import { useMutationSpamList } from '@/utils/hooks/mutations/spam';
import { useAtom } from 'jotai';
import { addedSpamListAtom } from '@/store/portfolio';
import { useEffect } from 'react';
import { showToastMessage } from '@/utils/toastify';
import ReactQueryClient from '@/utils/ReactQueryClient';
import {
  inventoryCollectionAtom,
  inventorySpamCollectionAtom,
} from '@/store/requestParam';

const SpamSaveToast = () => {
  const [spamList, setSpamList] = useAtom(addedSpamListAtom); // [TSpam, (TSpam) => void
  const { mutate, status } = useMutationSpamList();

  const [inventorySpamCollectionParam, setInventorySpamCollectionParam] =
    useAtom(inventorySpamCollectionAtom);
  const [inventoryCollectionRequestParam, setInventoryCollectionRequestParam] =
    useAtom(inventoryCollectionAtom);
  const handleClickCancel = () => {
    setSpamList([]);
  };
  const handleClickSave = () => {
    mutate(spamList);
  };
  useEffect(() => {
    console.log('status', status);
    if (status === 'success') {
      setSpamList([]);
      showToastMessage({
        message: 'Modifications have been saved.',
        code: 'success',
        toastId: 'custom-valuation',
      });
      // ReactQueryClient.removeQueries(['inventorySpamList']);
      // ReactQueryClient.removeQueries(['inventoryValuePerformance']);
      // ReactQueryClient.removeQueries(['collectionCount']);
      // ReactQueryClient.removeQueries(['itemCount']);
      // ReactQueryClient.removeQueries(['inventoryCollectionList']);
      // ReactQueryClient.removeQueries(['inventoryCollectionListPerformance']);
      // ReactQueryClient.removeQueries(['inventoryItemListPerformance']);
      handleClickResetSpam();
    }
  }, [status]);
  const handleClickResetSpam = async () => {
    await ReactQueryClient.removeQueries(['inventorySpamList']);
    await ReactQueryClient.removeQueries(['inventoryValuePerformance']);
    await ReactQueryClient.removeQueries(['collectionCount']);
    await ReactQueryClient.removeQueries(['itemCount']);
    await ReactQueryClient.removeQueries(['inventoryCollectionList']);
    await ReactQueryClient.removeQueries([
      'inventoryCollectionListPerformance',
    ]);
    await ReactQueryClient.removeQueries(['inventoryItemListPerformance']);
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
  };
  return (
    <div className={`${styles.toast} `}>
      <div className='flex'>
        <FloppyDisk />
        <p>
          <span>{`${spamList.length} status `}</span>
          correction has occurred. Do you want to save it?
        </p>
      </div>
      <div className='flex items-center gap-12'>
        <Button
          id={`/valuation/change/reset`}
          onClick={() => handleClickCancel()}
        >
          Cancel
        </Button>
        <Button
          id={`/valuation/change/save`}
          className={styles.save}
          onClick={() => handleClickSave()}
        >
          Save
        </Button>
      </div>
    </div>
  );
};
export default SpamSaveToast;
