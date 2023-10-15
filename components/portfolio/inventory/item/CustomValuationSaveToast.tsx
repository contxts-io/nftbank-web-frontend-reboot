'use client';
import FloppyDisk from '@/public/icon/FloppyDisk';
import styles from './CustomValuationSaveToast.module.css';
import Button from '@/components/buttons/Button';
import React from 'react';
import { useAtom } from 'jotai';
import { customValuationAtom } from '@/store/portfolio';
import { set } from 'cypress/types/lodash';
type Props = {};
const CustomValuationSaveToast = (props: Props) => {
  const [customValuations, setCustomValuations] = useAtom(customValuationAtom);
  const handleClickCancel = () => {
    setCustomValuations([]);
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
        <Button id={`/valuation/change/save`} className={styles.save}>
          Save
        </Button>
      </div>
    </div>
  );
};
export default CustomValuationSaveToast;
