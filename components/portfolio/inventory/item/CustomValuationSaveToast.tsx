'use client';
import FloppyDisk from '@/public/icon/FloppyDisk';
import styles from './CustomValuationSaveToast.module.css';
import Button from '@/components/buttons/Button';
import React, { useEffect } from 'react';
import { useAtom } from 'jotai';
import { customValuationAtom } from '@/store/portfolio';
import { useMutationCustomValuations } from '@/utils/hooks/mutations/valuation';
import { showToastMessage } from '@/utils/toastify';
import { inventoryItemListAtom } from '@/store/requestParam';
import {
  useInventoryItemInfinite,
  useInventoryValue,
} from '@/utils/hooks/queries/inventory';
import ReactQueryClient from '@/utils/ReactQueryClient';
import { useMe } from '@/utils/hooks/queries/auth';
import { useMyWalletList } from '@/utils/hooks/queries/wallet';
type Props = {};
const CustomValuationSaveToast = (props: Props) => {
  const { data: walletList } = useMyWalletList();
  const [customValuations, setCustomValuations] = useAtom(customValuationAtom);
  const [requestParam, setRequestParam] = useAtom(inventoryItemListAtom);
  const { mutate, status } = useMutationCustomValuations();
  const { refetch: refetchInventoryItem } = useInventoryItemInfinite({
    ...requestParam,
    page: 0,
  });
  const { refetch: refetchInventoryValue } = useInventoryValue(
    walletList?.[0].walletAddress
  );
  const handleClickCancel = () => {
    setCustomValuations([]);
  };
  const handleClickSave = () => {
    mutate(customValuations);
  };
  useEffect(() => {
    console.log('status', status);
    if (status === 'success') {
      setCustomValuations([]);
      showToastMessage({
        message: 'Modifications have been saved.',
        code: 'success',
        toastId: 'custom-valuation',
      });
      handleClickResetSpam();
      setRequestParam((prev) => ({
        ...prev,
        page: 1,
      }));
      // refetchInventoryItemPerformance();
      // refetchInventoryItem();
    }
  }, [status]);
  const handleClickResetSpam = async () => {
    ReactQueryClient.removeQueries(['inventoryItemList']);
    ReactQueryClient.removeQueries(['inventoryItemListPerformance']);
    ReactQueryClient.removeQueries(['inventorySpamList']);
    ReactQueryClient.invalidateQueries(['inventoryValue']);
    ReactQueryClient.invalidateQueries(['inventoryValuePerformance']);
    ReactQueryClient.removeQueries(['collectionCount']);
    ReactQueryClient.removeQueries(['itemCount']);
    ReactQueryClient.removeQueries(['inventoryCollectionList']);
    ReactQueryClient.removeQueries(['inventoryCollectionListPerformance']);
    console.log('handleclickresetspam');
    refetchInventoryValue();
  };
  return (
    <div className={styles.toast}>
      <div className='flex'>
        <FloppyDisk />
        <p>
          <span>{`${customValuations.length} Valuation Type `}</span>
          modification has occurred. Do you want to save it?
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
export default CustomValuationSaveToast;
