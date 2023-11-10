'use client';
import ArrowDownLeft from '@/public/icon/ArrowDownLeft';
import styles from './ActivityTable.module.css';
import { useState } from 'react';
import ActivityRow from './ActivityRow';
const ActivityTable = () => {
  const [isSelected, setIsSelected] = useState(false);
  return (
    <ul className={`font-caption-regular ${styles.container} pb-42`}>
      <li className={styles.listHeader}>
        <span className='text-[var(--color-text-main)] col-span-2'>
          2023, Aut 23
        </span>
        <div className='col-span-2'>
          <ArrowDownLeft className='fill-[var(--color-background-success-bold)]' />
        </div>
        <div className='rotate-180 w-16 h-16'>
          <ArrowDownLeft className='fill-[var(--color-icon-danger)]' />
        </div>
      </li>
      <ActivityRow />
      <ActivityRow />
      <ActivityRow />
      <ActivityRow />
      <ActivityRow />
      <ActivityRow />
      <ActivityRow />
      <ActivityRow />
      <ActivityRow />
      <ActivityRow />
      <ActivityRow />
      <ActivityRow />
    </ul>
  );
};
export default ActivityTable;
