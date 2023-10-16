'use client';
import FloppyDisk from '@/public/icon/FloppyDisk';
import styles from './CustomValuationSaveToast.module.css';
import Button from '@/components/buttons/Button';
import React, { useEffect } from 'react';
import { useAtom } from 'jotai';
import { customValuationAtom } from '@/store/portfolio';
import { useMutationCustomValuations } from '@/utils/hooks/mutations/valuation';
import { showToastMessage } from '@/utils/toastify';
import { useInventoryItemInfinitePerformance } from '@/utils/hooks/queries/performance';
import { inventoryItemListAtom } from '@/store/requestParam';
import { useInventoryItemInfinite } from '@/utils/hooks/queries/inventory';
type Props = {};
const CustomValuationSaveToast = (props: Props) => {
  const [customValuations, setCustomValuations] = useAtom(customValuationAtom);
  const [requestParam, setRequestParam] = useAtom(inventoryItemListAtom);
  const { mutate, status } = useMutationCustomValuations();
  const { data, refetch: refetchInventoryItemPerformance } =
    useInventoryItemInfinitePerformance(requestParam);
  const { refetch: refetchInventoryItem } = useInventoryItemInfinite({
    ...requestParam,
    page: 0,
  });
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
      setRequestParam((prev) => ({
        ...prev,
        page: 1,
      }));
      refetchInventoryItemPerformance();
      refetchInventoryItem();
    }
  }, [status]);

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
