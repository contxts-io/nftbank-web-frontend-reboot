'use client';
import { useInventoryItemInfinite } from '@/utils/hooks/queries/inventory';
import styles from './InventoryItemTable.module.css';
import { useAtom, useAtomValue } from 'jotai';
import { inventoryItemListAtom } from '@/store/requestParam';
import Image from 'next/image';
import { TValuation } from '@/interfaces/collection';
import { currencyAtom } from '@/store/currency';
import React, { useEffect, useMemo, useState } from 'react';
import InventoryItemDetail from './InventoryItemDetail';
import CaretDown from '@/public/icon/CaretDown';
import { formatCurrency, formatDate } from '@/utils/common';
import { useInView } from 'react-intersection-observer';
const HEADER = [
  {
    type: 'Item',
    name: 'Item',
  },
  {
    type: 'amount',
    name: 'Amount',
  },
  {
    type: 'costBasis',
    name: 'Cost basis',
  },
  {
    type: 'realtimeNAV',
    name: 'Realtime NAV',
  },
  {
    type: 'unrealizedG&L',
    name: 'Unrealized G&L',
  },
  {
    type: 'unrealizedROI',
    name: 'Unrealized ROI',
  },
  {
    type: 'valuationType',
    name: 'Valuation Type',
  },
  {
    type: 'accuracy',
    name: 'Accuracy',
  },
  {
    type: 'acquisitionDate',
    name: 'Acq. date',
  },
];
const InventoryItemTable = () => {
  const [requestParam, setRequestParam] = useAtom(inventoryItemListAtom);
  const [openedItem, setOpenedItem] = useState<string[]>([]);
  const currency = useAtomValue(currencyAtom);
  const { ref, inView } = useInView();
  const {
    fetchNextPage,
    data: inventoryItemList,
    status,
  } = useInventoryItemInfinite(requestParam);
  useEffect(() => {
    inView && fetchNextPage();
  }, [fetchNextPage, inView]);
  const mergePosts = useMemo(
    () => inventoryItemList?.pages.flatMap((page) => page.tokens),
    [inventoryItemList?.pages]
  );
  const handleOpenDetail = (target: string) => {
    setOpenedItem((prev) => {
      if (prev.includes(target)) {
        return prev.filter((item) => item !== target);
      } else {
        return [...prev, target];
      }
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
  return (
    <table className={`${styles.table} dark:border-border-main-dark`}>
      <thead>
        <tr
          className={`${styles.tableHeadRow} text-text-subtle dark:text-text-subtle-dark dark:border-border-main-dark`}
        >
          {HEADER.map((item, index) => (
            <th
              key={index}
              className={`font-caption-medium ${
                index == 0 ? 'text-left' : 'text-right'
              }`}
            >
              {item.name}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {status === 'success' &&
          mergePosts?.map((data, index) => {
            const valuationType = selectedValueType(data.valuation);
            const itemKey = `${data.collection.assetContract}-${data.token.tokenId}-${index}`;

            return (
              <React.Fragment key={index}>
                <tr
                  key={index}
                  className='font-caption-medium cursor-pointer text-text-main dark:text-text-main-dark
                   border-b-1 border-border-disabled dark:border-border-disabled-dark hover:bg-elevation-sunken dark:hover:bg-elevation-sunken-dark'
                  onClick={() => handleOpenDetail(itemKey)}
                >
                  <td className='text-left p-0 '>
                    <div className='flex items-center my-8'>
                      <div className='w-32 h-32 border-1 flex items-center overflow-hidden justify-center border-border-main dark:border-border-main-dark mr-8'>
                        <Image
                          src={data.token.imageUrl || '/icon/nftbank_icon.svg'}
                          width={32}
                          height={32}
                          alt={`${data.collection.name}-${data.token.name}-${data.token.tokenId}`}
                        />
                      </div>
                      <div>
                        <p
                          className={`${styles.pMain} dark:text-text-main-dark`}
                        >
                          {data.token.tokenId}
                        </p>
                        <p
                          className={`${styles.pSub} dark:text-text-subtle-dark`}
                        >
                          {data.token.name}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className='text-right'>{data.amount}</td>
                  <td className='text-right'>
                    {formatCurrency(data.costBasis[currency].amount, currency)}
                  </td>
                  <td className='text-right'>
                    {data.nav[currency].amount &&
                      formatCurrency(data.nav[currency].amount, currency)}
                  </td>
                  <td className='text-right'>{data.nav[currency].amount}</td>
                  <td className='text-right'>{data.nav[currency].amount}</td>
                  <td className='text-right'>{valuationType?.type}</td>
                  <td className='text-right'>{valuationType?.accuracy}</td>
                  <td className='text-right'>
                    {formatDate(new Date(data.acquisitionDate))}
                  </td>
                  <td className='text-right'>
                    <button
                      className={`${styles.expandButton} dark:border-border-bold-dark`}
                    >
                      <CaretDown />
                    </button>
                  </td>
                </tr>
                {openedItem.find((item) => item === itemKey) && (
                  <tr>
                    <td colSpan={HEADER.length + 1}>
                      <InventoryItemDetail token={data} />
                    </td>
                  </tr>
                )}
              </React.Fragment>
            );
          })}
      </tbody>
      <div ref={ref} />
    </table>
  );
};
export default InventoryItemTable;
