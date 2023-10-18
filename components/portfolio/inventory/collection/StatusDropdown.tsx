'use client';
import Button from '@/components/buttons/Button';
import styles from './StatusDropdown.module.css';
import { useEffect, useState } from 'react';
import CaretDown from '@/public/icon/CaretDown';
import { inventorySpamCollectionAtom } from '@/store/requestParam';
import { useAtom } from 'jotai';
const statusList = [
  {
    key: 'allStatus',
    value: 'All Status',
    param: {
      includeSpam: true,
      includeCustomSpam: true,
      includeNonSpam: true,
    },
  },
  {
    key: 'spam',
    value: 'Spam',
    param: {
      includeSpam: true,
      includeCustomSpam: true,
      includeNonSpam: false,
    },
  },
  {
    key: 'nonSpam',
    value: 'Non Spam',
    param: {
      includeSpam: false,
      includeCustomSpam: false,
      includeNonSpam: true,
    },
  },
];
type Status = {
  key: string;
  value: string;
  param: {
    includeSpam: boolean;
    includeCustomSpam: boolean;
    includeNonSpam: boolean;
  };
};
type Props = {};
const StatusDropdown = (props: Props) => {
  const [isPopoverOpen, setIsPopoverOpen] = useState<boolean>(false);
  const [inventoryCollectionRequestParam, setInventoryCollectionRequestParam] =
    useAtom(inventorySpamCollectionAtom);
  const [status, setStatus] = useState<Status | null>({
    key: 'allStatus',
    value: 'All Status',
    param: {
      includeSpam: true,
      includeCustomSpam: true,
      includeNonSpam: true,
    },
  });
  const handleClickList = (value: { key: string; value: string }) => {
    setStatus(statusList.find((item) => item.key === value.key) || null);
  };
  useEffect(() => {
    status &&
      setInventoryCollectionRequestParam({
        ...inventoryCollectionRequestParam,
        ...status.param,
      });
  }, [status]);
  return (
    <Button
      className={`relative cursor-pointer `}
      id={`/portfolio/collection/spam/status`}
      onClick={(e) => (e.stopPropagation(), setIsPopoverOpen((prev) => !prev))}
    >
      <div className='flex items-center justify-between min-w-[150px]'>
        <p>{status?.value}</p>
        <div className={`${isPopoverOpen ? 'rotate-180' : 'rotate-0'}`}>
          <CaretDown />
        </div>
      </div>
      {isPopoverOpen && (
        <ul className={`${styles.dropdown} z-50`}>
          {statusList.map((item, index) => {
            return (
              <li key={index} onClick={() => handleClickList(item)}>
                {item.value}
              </li>
            );
          })}
        </ul>
      )}
    </Button>
  );
};
export default StatusDropdown;
