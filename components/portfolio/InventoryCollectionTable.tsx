'use client';
import { useInventoryCollectionList } from '@/utils/hooks/queries/inventory';
import styles from './InventoryCollectionTable.module.css';
import { useAtom, useAtomValue } from 'jotai';
import { currencyAtom, priceTypeAtom } from '@/store/currency';
import Image from 'next/image';
import { TSort, inventoryCollectionAtom } from '@/store/requestParam';
import { useEffect, useState } from 'react';
import { IInventoryCollectionList } from '@/interfaces/inventory';
import SkeletonLoader from '../SkeletonLoader';

const InventoryCollectionTable = () => {
  const currency = useAtomValue(currencyAtom);
  const priceType = useAtomValue(priceTypeAtom);
  const [inventoryCollectionRequestParam, setInventoryCollectionRequestParam] =
    useAtom(inventoryCollectionAtom);
  const { data: inventoryCollection, status } = useInventoryCollectionList(
    inventoryCollectionRequestParam
  );
  const handleClickSortButton = (sort: TSort) => {
    const order =
      inventoryCollectionRequestParam.sort !== sort
        ? 'desc'
        : inventoryCollectionRequestParam.order === 'desc'
        ? 'asc'
        : 'desc';
    console.log('handleClickSortButton @@@order: ', order);
    setInventoryCollectionRequestParam({
      ...inventoryCollectionRequestParam,
      sort: sort,
      order: order,
    });
  };

  return (
    <div className={styles.container}>
      <div className={styles.table}>
        <div className={styles.tableHeader}>
          <div className={`${styles.tableCell} flex justify-center`}>Chain</div>
          <div className={`${styles.tableCell3} flex justify-start`}>
            Collection
          </div>
          <div
            className={`${styles.tableCell} flex justify-end cursor-pointer`}
            onClick={() => handleClickSortButton('amount')}
          >
            Amount
          </div>
          <div
            className={`${styles.tableCell2} flex justify-end cursor-pointer`}
            onClick={() => handleClickSortButton('acq_price_eth')}
          >
            {priceType === 'costBasis'
              ? 'Total Cost basis'
              : 'Acquisition Price'}
          </div>
          <div className={`${styles.tableCell2} flex justify-end`}>
            Valuation Type
          </div>
          <div className={`${styles.tableCell2} flex justify-end`}>
            Current Realtime NAV
          </div>
          <div className={styles.tableCell} />
        </div>

        <div>
          {status === 'loading' && (
            <SkeletonLoader className='w-full h-[200px]' />
          )}
          {inventoryCollection &&
            inventoryCollection.collections.map((row, index) => {
              return (
                <tr className={styles.tableRow} key={index}>
                  <div className={`${styles.tableCell} flex justify-center`}>
                    <div className='flex items-center justify-center rounded-full bg-white border-gray-200 border-1 w-50 h-50'>
                      <Image
                        width={25}
                        height={25}
                        src={row.collection.chain.imageUrl}
                        alt={row.collection.name}
                      />
                    </div>
                  </div>
                  <div className={styles.tableCell3}>
                    <div className='flex items-center'>
                      {row.collection.imageUrl && (
                        <Image
                          width={50}
                          height={50}
                          src={row.collection.imageUrl}
                          className='rounded-full mr-8'
                          alt={row.collection.name}
                        />
                      )}
                      {row.collection.name}
                    </div>
                  </div>
                  <div className={`${styles.tableCell} flex justify-end`}>
                    <p>{row.amount}</p>
                  </div>
                  <div className={`${styles.tableCell2} flex justify-end`}>
                    <p>
                      {`${parseFloat(
                        row[priceType]?.[currency].amount || '0'
                      ).toFixed(2)} ${row[priceType]?.[currency].currency} `}
                    </p>
                  </div>
                  <div className={`${styles.tableCell2} flex justify-end`}>
                    <p>{row.valuation.type}</p>
                  </div>
                  <div className={`${styles.tableCell2} flex justify-end`}>
                    <div className='flex flex-col w-full items-end'>
                      <p>{`${row.nav[currency].currency} ${parseFloat(
                        row.nav[currency].amount
                      ).toFixed(2)}`}</p>
                      <p
                        className={
                          row.nav[currency].difference.percentage > 0
                            ? 'text-green-500'
                            : 'text-red-500'
                        }
                      >{`${row.nav[currency].difference.amount} (${row.nav[currency].difference.percentage}%)`}</p>
                    </div>
                  </div>
                  <div className={`${styles.tableCell} flex justify-center `}>
                    <button>spam</button>
                  </div>
                </tr>
              );
            })}
        </div>
      </div>
    </div>
  );
};
export default InventoryCollectionTable;
