'use client';
import Button from '@/components/buttons/Button';
import styles from './StatusDropdown.module.css';
import { useEffect, useState } from 'react';
import CaretDown from '@/public/icon/CaretDown';
import { inventorySpamCollectionAtom } from '@/store/requestParam';
import { useAtom } from 'jotai';
const statusList = [
  { key: 'allStatus', value: 'All Status' },
  { key: 'spam', value: 'Spam' },
  { key: 'nonSpam', value: 'Non Spam' },
];
type Props = {};
const StatusDropdown = (props: Props) => {
  const [isPopoverOpen, setIsPopoverOpen] = useState<boolean>(false);

  const [inventoryCollectionRequestParam, setInventoryCollectionRequestParam] =
    useAtom(inventorySpamCollectionAtom);
  const [status, setStatus] = useState<{ key: string; value: string } | null>({
    key: 'allStatus',
    value: 'All Status',
  });
  const handleClickList = (value: { key: string; value: string }) => {
    setStatus(statusList.find((item) => item.key === value.key) || null);
  };
  useEffect(() => {
    // status && {
    //   status.key === 'allStatus' &&
    //     setInventoryCollectionRequestParam({
    //       ...inventoryCollectionRequestParam,
    //       includeSpam: true,
    //       includeCustomSpam: true,
    //       includeNonSpam: true,
    //     });
    //   status.key === 'spam' &&
    //     setInventoryCollectionRequestParam({
    //       ...inventoryCollectionRequestParam,
    //       includeSpam: true,
    //       includeCustomSpam: true,
    //       includeNonSpam: false,
    //     });
    //   status.key === 'nonSpam' &&
    //     setInventoryCollectionRequestParam({
    //       ...inventoryCollectionRequestParam,
    //       includeSpam: false,
    //       includeCustomSpam: false,
    //       includeNonSpam: true,
    //     })
    // }
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
