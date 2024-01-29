'use client';
import styles from './InventoryItemSection.module.css';
import InventoryItemFilter from './InventoryItemFilter';
import InventoryItemList from './InventoryItemList';
import InventoryItemSelectCollection from './InventoryItemSelectCollection';
import { useEffect, useRef, useState } from 'react';
import CustomValuationSaveToast from './CustomValuationSaveToast';
import { useAtom, useAtomValue, useSetAtom } from 'jotai';
import {
  customValuationAtom,
  selectedCollectionInventoryAtom,
} from '@/store/portfolio';
import { inventoryItemListAtom } from '@/store/requestParam';

const InventoryItemSection = () => {
  const [isFilterOpen, setIsFilterOpen] = useState<boolean>(true);
  const [customValuations, setCustomValuations] = useAtom(customValuationAtom);
  const collections = useAtomValue(selectedCollectionInventoryAtom);
  const setSelectedCollection = useSetAtom(selectedCollectionInventoryAtom);
  const setItemRequestParams = useSetAtom(inventoryItemListAtom);
  useEffect(() => {
    setCustomValuations([]);
  }, []);

  useEffect(() => {
    return () => {
      //페이지 이동시 selectedCollection 초기화
      setSelectedCollection([]);
      setItemRequestParams((prev) => ({
        ...prev,
        page: 1,
        assetContract: [],
      }));
    };
  }, []);

  const targetRef = useRef<HTMLDivElement>(null);
  // useEffect(() => {
  //   const handleScroll = () => {
  //     const targetElement = targetRef.current;

  //     if (targetElement) {
  //       const targetRect = targetElement.getBoundingClientRect();
  //       const isTargetVisible =
  //         targetRect.top >= 0 && targetRect.bottom <= window.innerHeight;

  //       if (isTargetVisible) {
  //         // Do something when the target element is visible
  //         console.log('Reached the target element');
  //         // You can add logic to stop scrolling here
  //         window.scrollTo(0, 235);
  //       }
  //     }
  //   };

  //   window.addEventListener('scroll', handleScroll);

  //   return () => {
  //     window.removeEventListener('scroll', handleScroll);
  //   };
  // }, []);
  return (
    <section className='transition-all duration-200'>
      <p className='font-subtitle01-medium text-[var(--color-text-main)]'>
        Items
      </p>
      <div
        className={`mt-24 ${
          collections.length > 0 ? `mb-16 ${styles.show}` : styles.hide
        }`}
      >
        <InventoryItemSelectCollection />
      </div>
      <section
        className={`${styles.container} h-[calc(100vh-250px)]`}
        ref={targetRef}
      >
        <div className='w-fit h-full'>
          {isFilterOpen && (
            <InventoryItemFilter handleFilterOpen={setIsFilterOpen} />
          )}
        </div>
        <div className='w-full'>
          <div className='overflow-hidden'>
            <InventoryItemList
              isFilterOpen={isFilterOpen}
              handleFilterOpen={setIsFilterOpen}
            />
          </div>
        </div>
      </section>
    </section>
  );
};
export default InventoryItemSection;
