'use client';
import styles from './InventoryItemFilter.module.css';
import {
  TCollectionParam,
  inventoryItemFilterCollectionAtom,
  inventoryItemListAtom,
} from '@/store/requestParam';
import Image from 'next/image';
import React, { Fragment, useEffect, useMemo, useRef, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { useAtom } from 'jotai';
import { selectedCollectionInventoryAtom } from '@/store/portfolio';
import { Collection } from '@/interfaces/collection';
import MagnifyingGlass from '@/public/icon/MagnifyingGlass';
import Filter from '@/public/icon/Filter';
import { shortenAddress } from '@/utils/common';
import { useInventoryCollectionsInfinite } from '@/utils/hooks/queries/inventory';
import { useTheme } from 'next-themes';
import Button from '@/components/buttons/Button';
type Props = {
  handleFilterOpen: (state: boolean) => void;
};
const InventoryItemFilter = (props: Props) => {
  const { handleFilterOpen } = props;
  const [selectedCollection, setSelectedCollection] = useAtom(
    selectedCollectionInventoryAtom
  );
  const [inventoryCollectionRequestParam, setInventoryCollectionRequestParam] =
    useAtom(inventoryItemFilterCollectionAtom);
  const [checkedCollection, setCheckedCollection] = useState<string[]>(
    selectedCollection
      ? selectedCollection.map((item) => item.collection.assetContract)
      : []
  );
  const [itemRequestParams, setItemRequestParams] = useAtom(
    inventoryItemListAtom
  );
  const { fetchNextPage, data, status, isFetchingNextPage, isFetching } =
    useInventoryCollectionsInfinite(inventoryCollectionRequestParam);
  const { ref, inView } = useInView();
  const { theme } = useTheme();
  const mergePosts = useMemo(
    () => data?.pages.flatMap((page) => page.collections),
    [data?.pages]
  );
  useEffect(() => {
    inView && fetchNextPage();
  }, [fetchNextPage, inView]);

  const [searchText, setSearchText] = useState<string>('');

  useEffect(() => {
    setItemRequestParams((prev) => ({
      ...prev,
      page: 1,
      assetContract: selectedCollection.map(
        (item) => item.collection.assetContract
      ),
    }));
  }, [selectedCollection]);

  const handleClickCheckBox = (collection: Collection) => {
    setSelectedCollection((prev) => {
      if (
        prev.find(
          (item) =>
            item.collection.assetContract ===
            collection.collection.assetContract
        )
      ) {
        return prev.filter(
          (item) =>
            item.collection.assetContract !==
            collection.collection.assetContract
        );
      } else {
        return [...prev, collection];
      }
    });
  };
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
  if (status === 'error') return <div>error</div>;
  return (
    <aside className={`${styles.container} dark:border-border-main-dark`}>
      <div className='flex justify-between items-center my-12'>
        <h2 className='font-subtitle02-bold text-text-main dark:text-text-main-dark'>
          Collection
        </h2>
        <Button onClick={() => handleFilterOpen(false)} id={'filterButton'}>
          <Filter />
        </Button>
      </div>
      <div className={`${styles.inputContainer}  dark:border-border-main-dark`}>
        <MagnifyingGlass
          className={`${styles.icon} dark:fill-icon-main-dark`}
          width={16}
          height={16}
        />
        <input
          type='text'
          placeholder={'Search by collections'}
          className={`${styles.textInput} font-caption-regular placeholder:dark:text-text-subtlest-dark dark:text-text-main-dark`}
          onChange={handleInputText}
          value={searchText}
        />
      </div>

      <ul className='mt-12 w-full h-full overflow-y-scroll flex flex-col'>
        {mergePosts?.map((item, index) => (
          <Fragment key={`${item.collection.assetContract}-${index}`}>
            <li className='h-26 flex mb-12 items-center'>
              <input
                type='checkbox'
                name={item.collection.name}
                className={`${styles.checkbox} dark:border-border-bold-dark dark:bg-elevation-sunken-dark`}
                checked={
                  selectedCollection?.find((collection) => {
                    return (
                      collection.collection.assetContract ===
                      item.collection.assetContract
                    );
                  })
                    ? true
                    : false
                }
                onChange={() => handleClickCheckBox(item)}
              />
              <Image
                src={item.collection.imageUrl || '/icon/ethereum.svg'}
                width={20}
                height={20}
                className='rounded-full mr-8 border-1 border-border-main dark:border-border-main-dark'
                alt={`${
                  item.collection.name || item.collection.assetContract
                } image`}
              />
              <p
                className={`font-caption-medium ${styles.pCollectionName} dark:text-text-main-dark`}
              >
                {item.collection.name ||
                  shortenAddress(item.collection.assetContract)}
              </p>
            </li>
          </Fragment>
        ))}
        {!data?.pages?.[data?.pages.length - 1].isLast && (
          <li ref={ref} className='h-43 '>
            more
          </li>
        )}
      </ul>
      <div>
        {isFetching && !isFetchingNextPage ? 'Background Updating...' : null}
      </div>
    </aside>
  );
};
export default InventoryItemFilter;
