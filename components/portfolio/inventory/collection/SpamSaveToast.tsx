'use client';
import FloppyDisk from '@/public/icon/FloppyDisk';
import styles from './SpamSaveToast.module.css';
import Button from '@/components/buttons/Button';
import { useMutationSpamList } from '@/utils/hooks/mutations/spam';
import { useAtom } from 'jotai';
import { addedSpamListAtom } from '@/store/portfolio';
import { set } from 'cypress/types/lodash';
import { useEffect } from 'react';
import { showToastMessage } from '@/utils/toastify';

const SpamSaveToast = () => {
  const [spamList, setSpamList] = useAtom(addedSpamListAtom); // [TSpam, (TSpam) => void
  const { mutate, status } = useMutationSpamList();
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
    }
  }, [status]);
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
