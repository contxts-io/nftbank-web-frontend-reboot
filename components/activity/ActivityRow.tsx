'use client';
import { useState } from 'react';
import styles from './ActivityRow.module.css';
import Image from 'next/image';
import PencilSimple from '@/public/icon/PencilSimple';
import Copy from '@/public/icon/Copy';
import ArrowDownLeft from '@/public/icon/ArrowDownLeft';
import { twMerge } from 'tailwind-merge';
import ActivityIcon from './ActivityIcon';
import Info from '@/public/icon/Info';
import ActivityListRow from './ActivityListRow';
type ActivityRowProps = {};
const ActivityRow = (props: ActivityRowProps) => {
  const [isOpened, setIsOpened] = useState(false);
  const bundle = true;
  const relativeActivity = ['1', '2', '3', '4', '5'];
  return (
    <div
      className={`${styles.rowContainer} ${
        isOpened ? styles.selected : styles.nonSelected
      }`}
    >
      <li
        className={`${styles.listContent}`}
        onClick={() => setIsOpened((prev) => !prev)}
      >
        <ActivityListRow isOpened={isOpened} />

        <div
          className={twMerge(
            `${styles.row} ${
              isOpened ? styles.additionalContentOpen : styles.additionalContent
            } mt-18 gap-x-40 flex items-center px-16`
          )}
        >
          <div className='flex flex-col'>
            <span className='text-[var(--color-text-subtle)]'>
              Transaction Hash
            </span>
            <div className='flex items-center mt-4'>
              <span className='text-[var(--color-text-main)]'>
                0x9501...4004
              </span>
              <Copy className='ml-4 fill-[var(--color-icon-subtle)]' />
            </div>
          </div>
          <div className='flex flex-col  col-span-1'>
            <span className='text-[var(--color-text-subtle)]'>Gas Fee</span>
            <div className='flex items-center mt-4 font-caption-medium gap-x-8'>
              <span className='text-[var(--color-text-main)]'>-0.08 ETH</span>
              <span className='text-[var(--color-text-subtle)]'>$130.98</span>
            </div>
          </div>
          <PencilSimple className='ml-auto fill-[var(--color-icon-information)] cursor-pointer' />
        </div>
      </li>
      <div
        className={`${styles.row} ${styles.gridRow} ${
          isOpened ? '' : styles.additionalContent
        } my-`}
      >
        <div className='col-span-2' />
        <div className={`${styles.bulkList} relative`}>
          <div className='absolute top-0 left-0 h-full flex flex-col items-center'>
            <ArrowDownLeft className='fill-[var(--color-background-success-bold)]' />
            <div className={styles.borderDot} />
          </div>
          <div className='absolute top-0 left-[50%] h-full flex flex-col items-center'>
            <div className='rotate-180 w-16 h-16'>
              <ArrowDownLeft className='fill-[var(--color-icon-danger)]' />
            </div>
            <div className={styles.borderDot} />
          </div>
          <div className='h-full w-full flex max-h-[400px] overflow-y-scroll'>
            <ul className='w-full'>
              {Array(15)
                .fill(0)
                .map((_, index) => (
                  <li
                    className='flex w-full items-center h-32 mb-8'
                    key={index}
                  >
                    <div className='w-[50%] flex items-center pl-32'>
                      <Image
                        src={'/icon/nftbank_icon.svg'}
                        width={32}
                        height={32}
                        alt=''
                        className='mr-8'
                      />
                      <span className='font-caption-medium text-[var(--color-text-success)]'>
                        Bridge to Base 31451638
                      </span>
                    </div>
                    <div className='w-[50%] flex items-center pl-32'>
                      <Image
                        src={'/logo/ETHLogo.svg'}
                        width={32}
                        height={32}
                        alt=''
                        className='mr-8'
                      />
                      <div className='flex flex-col justify-start items-center'>
                        <span className='font-caption-medium text-[var(--color-text-main)]'>
                          -1 ETH
                        </span>
                        <span className='font-caption-regular text-[var(--color-text-subtle)]'>
                          $130.98
                        </span>
                      </div>
                    </div>
                  </li>
                ))}
            </ul>
          </div>
        </div>
        {bundle && (
          <Info className='ml-auto fill-[var(--color-icon-subtle)] cursor-pointer m-16' />
        )}
      </div>
      {isOpened && relativeActivity.length > 0 && (
        <div className='font-caption-regular'>
          <div className='flex items-center gap-8 ml-16'>
            <span className='text-[var(--color-text-main)]'>
              Related Activity
            </span>
            <div className='bg-[var(--color-elevation-surface-raised)] px-4 py-2 text-[var(--color-text-main)]'>
              5
            </div>
          </div>
          <ul>
            <li className={`${styles.listContent} `}>
              <ActivityListRow isOpened={true} />
            </li>
            <li className={`${styles.listContent}`}>
              <ActivityListRow isOpened={true} />
            </li>
            <li className={`${styles.listContent}`}>
              <ActivityListRow isOpened={true} />
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default ActivityRow;
