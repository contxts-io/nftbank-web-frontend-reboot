'use client';
import CaretDown from '@/public/icon/CaretDown';
import CheckBox from '../checkBox/CheckBox';
import styles from './ActivityCollection.module.css';
import { useEffect, useMemo, useState } from 'react';
import { useInventoryCollectionsInfinite } from '@/utils/hooks/queries/inventory';
import Image from 'next/image';
import { Collection } from '@/interfaces/collection';
import { useInView } from 'react-intersection-observer';
import { SortOrder, TCollectionParam } from '@/store/requestParam';
import { useMyWalletList } from '@/utils/hooks/queries/wallet';
import { BasicParam } from '@/interfaces/request';
const ActivityCollection = () => {
  const { ref, inView } = useInView();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [checkedItemList, setCheckedItemList] = useState<Collection[]>([]);
  const [inventoryCollectionRequestParam, setInventoryCollectionRequestParam] =
    useState<TCollectionParam & BasicParam>({
      searchCollection: '',
      page: 0,
      limit: 3,
      sortCol: 'nav',
      sortOrder: SortOrder.Desc,
      networkId: 'ethereum',
    });
  const { data, fetchNextPage, status } = useInventoryCollectionsInfinite(
    inventoryCollectionRequestParam
  );
  const collectionList = useMemo(
    () => data?.pages.flatMap((page) => page.data),
    [data?.pages]
  );

  useEffect(() => {
    const isLastPage = data?.pages?.[data.pages.length - 1].isLast;
    !isLastPage &&
      inView &&
      status !== 'loading' &&
      (fetchNextPage(),
      setInventoryCollectionRequestParam((prev) => ({
        ...prev,
        page: prev.page + 1,
      })));
  }, [fetchNextPage, inView]);
  const handleClickChecked = (item: Collection) => {
    setCheckedItemList((prev) => {
      if (prev.includes(item)) {
        return prev.filter((prevItem) => prevItem !== item);
      }
      return [...prev, item];
    });
  };
  const handleClickClear = () => {
    setCheckedItemList([]);
  };
  return (
    <div className='font-caption-medium mt-16'>
      <div className={`${styles.row} mb-12`} onClick={() => setIsOpen(!isOpen)}>
        <p className='font-button03-medium text-[var(--color-text-subtle)]'>
          Collection
        </p>
        <div className={`${isOpen ? 'rotate-180' : ''} ml-auto`}>
          <CaretDown />
        </div>
      </div>
      {isOpen && (
        <div className='w-full border-b-1 border-[var(--color-border-main)] pb-16'>
          {collectionList &&
            collectionList.map((item, index) => {
              return (
                <div key={index} className={styles.row}>
                  <CheckBox
                    checked={
                      checkedItemList.find(
                        (checkedItem) => checkedItem === item
                      )
                        ? true
                        : false
                    }
                    onClick={() => handleClickChecked(item)}
                    className='mr-8'
                  />
                  <Image
                    src={item.collection.imageUrl || '/icon/ethereum.svg'}
                    width={16}
                    height={16}
                    className='rounded-full mr-8 border-1 border-[var(--color-border-main)]'
                    alt={`${item.collection.name} image`}
                  />
                  {item.collection.name}
                </div>
              );
            })}
          {!data?.pages?.[data.pages.length - 1].isLast && <div ref={ref} />}
          {status === 'loading' && <div>Loading...</div>}
          {checkedItemList.length > 0 && (
            <div
              className='w-fit mt-16 ml-auto cursor-pointer'
              onClick={() => handleClickClear()}
            >
              <p className='text-[var(--color-text-brand)]'>Clear</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
export default ActivityCollection;
