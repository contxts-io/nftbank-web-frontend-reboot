'use client';
import { useInventoryItemList } from '@/utils/hooks/queries/inventory';
import styles from './InventoryItemList.module.css';
import { useAtom, useAtomValue } from 'jotai';
import { TSort, inventoryItemListAtom } from '@/store/requestParam';
import Image from 'next/image';
import { TPriceType, currencyAtom, priceTypeAtom } from '@/store/currency';
import { TValuation, ValuationItem } from '@/interfaces/collection';
import React, { useState } from 'react';
import InventoryItemDetail from './InventoryItemDetail';
import SkeletonLoader from '@/components/SkeletonLoader';
import InventoryItemTable from './InventoryItemTable';
import DotsNine from '@/public/icon/DotsNine';
import Hamburger from '@/public/icon/Hamburger';
import { inventoryItemViewTypeAtom } from '@/store/settings';
import ToggleButton from '@/components/buttons/ToggleButton';

const InventoryItemList = () => {
  const [requestParam, setRequestParam] = useAtom(inventoryItemListAtom);
  const [itemViewType, setItemViewType] = useAtom(inventoryItemViewTypeAtom);
  const [openedItem, setOpenedItem] = useState<string[]>([]);
  const [priceType, setPriceType] = useAtom(priceTypeAtom);
  const { data: inventoryItemList, status } =
    useInventoryItemList(requestParam);
  const currency = useAtomValue(currencyAtom);
  const handleClickSortButton = (sort: TSort) => {
    const order =
      requestParam.sort !== sort
        ? 'desc'
        : requestParam.order === 'desc'
        ? 'asc'
        : 'desc';
    setRequestParam({
      ...requestParam,
      sort: sort,
      order: order,
    });
  };

  const handleClickPaging = (option: 'prev' | 'next') => {
    if (option === 'prev' && requestParam.page === 1) return;
    setRequestParam({
      ...requestParam,
      page: option === 'prev' ? requestParam.page - 1 : requestParam.page + 1,
    });
  };
  const selectedValueType = (
    valuations: TValuation[]
  ): TValuation | undefined => {
    const result =
      valuations.find((val) => val.selected) ||
      valuations.find((val) => val.default);
    return result;
  };
  const handleChangeSelect = (e: React.FormEvent) => {
    e.stopPropagation();
  };
  const handleChangePriceType = () => {
    setPriceType((prev) =>
      prev === 'costBasis' ? 'acquisitionPrice' : 'costBasis'
    );
  };
  const handleOpenDetail = (target: string) => {
    setOpenedItem((prev) => {
      if (prev.includes(target)) {
        return prev.filter((item) => item !== target);
      } else {
        return [...prev, target];
      }
    });
  };
  return (
    <section className={styles.container}>
      <div className='flex py-12 items-center justify-end'>
        <div className='flex px-12 mr-8'>
          <span className='text-text-subtle dark:text-text-subtle-dark mr-8'>
            Include Gas fee
          </span>
          <ToggleButton
            onClick={() => handleChangePriceType()}
            checked={false}
            id={''}
          />
        </div>
        <div className='flex justify-between p-3 items-center border-1 w-72 border-border-main dark:border-border-main-dark'>
          <div
            className={`${styles.viewType} ${
              itemViewType === 'cardView' && styles.checked
            }`}
          >
            <button
              className={`${styles.viewTypeButton}`}
              onClick={() => setItemViewType('cardView')}
            >
              <DotsNine
                width={16}
                height={16}
                className={`${styles.viewTypeButtonIcon} dark:fill-icon-main-dark`}
              />
            </button>
          </div>
          <div
            className={`${styles.viewType} ${
              itemViewType === 'listView' && styles.checked
            }`}
          >
            <button
              className={`${styles.viewTypeButton}`}
              onClick={() => setItemViewType('listView')}
            >
              <Hamburger
                width={16}
                height={16}
                className={`${styles.viewTypeButtonIcon} dark:fill-icon-main-dark`}
              />
            </button>
          </div>
        </div>
      </div>
      <InventoryItemTable />
    </section>
  );
};
export default InventoryItemList;
