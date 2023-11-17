'use client';
import styles from './ActivityCollection.module.css';
import CaretDown from '@/public/icon/CaretDown';
import { useState } from 'react';

const ActivityValueFilter = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  return (
    <div className='font-caption-medium mt-16'>
      <div className={`${styles.row} mb-12`} onClick={() => setIsOpen(!isOpen)}>
        <p className='font-button03-medium text-[var(--color-text-subtle)]'>
          Value
        </p>
        <div className={`${isOpen ? 'rotate-180' : ''} ml-auto`}>
          <CaretDown />
        </div>
      </div>
      {isOpen && (
        <div className={`font-caption-regular ${styles.content}`}>
          <p>MIN</p>
          <input type='text' className={styles.inputText} placeholder='0' />

          <p>MAX</p>
          <input type='text' className={styles.inputText} placeholder='100' />
        </div>
      )}
    </div>
  );
};
export default ActivityValueFilter;
