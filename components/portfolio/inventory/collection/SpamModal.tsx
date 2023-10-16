'use client';
import { useAtom, useAtomValue } from 'jotai';
import styles from './SpamModal.module.css';
import { inventorySpamCollectionAtom } from '@/store/requestParam';
import { useEffect, useState } from 'react';
import { useInventoryCollectionsInfinite } from '@/utils/hooks/queries/inventory';
import MagnifyingGlass from '@/public/icon/MagnifyingGlass';
import ToggleButton from '@/components/buttons/ToggleButton';
import Button from '@/components/buttons/Button';
import ClockClockwise from '@/public/icon/ClockClockwise';
import SpamCollectionTable from './SpamCollectionTable';
import CaretDown from '@/public/icon/CaretDown';
import { Popover } from 'react-tiny-popover';
import SpamSaveToast from './SpamSaveToast';
import { addedSpamListAtom } from '@/store/portfolio';
const SpamModal = () => {
  const [inventoryCollectionRequestParam, setInventoryCollectionRequestParam] =
    useAtom(inventorySpamCollectionAtom);
  const [isEditOnly, setIsEditOnly] = useState<boolean>(false);
  const [searchText, setSearchText] = useState<string>('');
  const [isPopoverOpen, setIsPopoverOpen] = useState<boolean>(false);
  const spamList = useAtomValue(addedSpamListAtom);
  const { fetchNextPage, data, status } = useInventoryCollectionsInfinite({
    ...inventoryCollectionRequestParam,
    page: 0,
  });
  const handleInputText = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setSearchText(value);
    (value.length >= 3 || value.length == 0) &&
      setInventoryCollectionRequestParam((prev) => {
        return {
          ...prev,
          searchCollection: value,
          page: 1,
        };
      });
  };
  const toggleEditOnly = () => {
    setIsEditOnly((prev) => !prev);
  };
  useEffect(() => {
    document.body.style.cssText = `
      position: fixed; 
      top: -${window.scrollY}px;
      overflow-y: scroll;
      width: 100%;`;
    return () => {
      const scrollY = document.body.style.top;
      document.body.style.cssText = '';
      window.scrollTo(0, parseInt(scrollY || '0', 10) * -1);
    };
  }, []);

  useEffect(() => {
    setInventoryCollectionRequestParam((prev) => {
      return {
        ...prev,
        page: 1,
        includeSpam: !isEditOnly,
        includeCustomSpam: true,
        includeNonSpam: false,
      };
    });
  }, [isEditOnly]);
  const handleOpenPopover = () => {
    setIsPopoverOpen((prev) => !prev);
  };
  return (
    <section className={styles.container}>
      <div className='flex items-center'>
        <p className={`font-subtitle01-bold ${styles.pHeader}`}>
          NFT Spam Settings
        </p>
        <div
          className={`font-caption-regular ${styles.box}`}
        >{`Spam Collections: ${false || 2273}`}</div>
      </div>
      <div className={`font-body02-regular ${styles.inputContainer}`}>
        <MagnifyingGlass width={16} height={16} />
        <input
          type='text'
          placeholder={'Search by collection'}
          className={`${styles.textInput} font-caption-regular`}
          onChange={handleInputText}
          value={searchText}
        />
      </div>
      {spamList.length > 0 && <SpamSaveToast />}
      <div className={styles.row}>
        <Popover
          isOpen={isPopoverOpen}
          positions={['bottom']} // preferred positions by priority
          content={() => (
            <div className='bg-red-500 h-200 w-100 z-50'>
              {`Hi! I'm popover content.`}
            </div>
          )}
          align='start'
          padding={0}
          onClickOutside={() => setIsPopoverOpen(false)}
        >
          <Button
            id={'/spam/filter/status'}
            onClick={() => handleOpenPopover()}
          >
            All Status
            <CaretDown className='ml-4' />
          </Button>
        </Popover>
        <div className='flex items-center'>
          <div className='flex items-center mr-8'>
            <p className={`${styles.textSub} mr-8`}>Edit only</p>
            <ToggleButton
              onClick={toggleEditOnly}
              checked={isEditOnly}
              id={'/portfolio/inventory/collection/SpamModal'}
            />
          </div>
          <Button id={'/spam/reset'}>
            <ClockClockwise className='mr-4' />
            All Reset
          </Button>
        </div>
      </div>
      <section className={`${styles.tableWrapper}`}>
        <SpamCollectionTable />
      </section>
    </section>
  );
};
export default SpamModal;
