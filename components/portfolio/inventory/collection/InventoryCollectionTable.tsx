'use client';
import { useInventoryCollectionsInfinite } from '@/utils/hooks/queries/inventory';
import styles from './InventoryCollectionTable.module.css';
import { useAtom, useAtomValue, useSetAtom } from 'jotai';
import { currencyAtom, priceTypeAtom } from '@/store/currency';
import Image from 'next/image';
import { TSort, inventoryCollectionAtom } from '@/store/requestParam';
import SkeletonLoader from '../../../SkeletonLoader';
import { Collection } from '@/interfaces/collection';
import { inventoryTypeAtom } from '@/store/settings';
import { selectedCollectionInventoryAtom } from '@/store/portfolio';
import { ChangeEvent, useCallback, useEffect, useMemo, useRef } from 'react';
import Ethereum from '@/public/icon/Ethereum';
import useIntersection from '@/utils/hooks/useIntersaction';
import DotsThree from '@/public/icon/DotsThree';
import { formatCurrency, formatPercent, shortenAddress } from '@/utils/common';
import { useInView } from 'react-intersection-observer';
const T_HEADER = [
  {
    name: 'Chain',
  },
  {
    name: 'Collection',
  },
  {
    name: 'Amount',
    key: 'amount',
    sort: 'amount',
  },
  {
    name: 'Cost basis',
    key: 'costBasis',
    sort: 'acquisitionPrice',
  },
  {
    name: 'Valuation Type',
  },
  {
    name: 'Realtime NAV',
  },
  {
    name: 'Unrealized G&L',
  },
  {
    name: 'Unrealized ROI',
  },
];
const InventoryCollectionTable = () => {
  const currency = useAtomValue(currencyAtom);
  const priceType = useAtomValue(priceTypeAtom);
  const { ref, inView } = useInView();
  const [inventoryType, setInventoryType] = useAtom(inventoryTypeAtom);
  const setSelectedCollection = useSetAtom(selectedCollectionInventoryAtom);
  const [inventoryCollectionRequestParam, setInventoryCollectionRequestParam] =
    useAtom(inventoryCollectionAtom);

  const { fetchNextPage, data, status } = useInventoryCollectionsInfinite(
    inventoryCollectionRequestParam
  );
  const mergePosts = useMemo(
    () => data?.pages.flatMap((page) => page.collections),
    [data?.pages]
  );

  useEffect(() => {
    inView && console.log('inView,', inView);
    inView && fetchNextPage();
  }, [fetchNextPage, inView]);

  const handleClickSortButton = (sort: TSort) => {
    const order =
      inventoryCollectionRequestParam.sort !== sort
        ? 'desc'
        : inventoryCollectionRequestParam.order === 'desc'
        ? 'asc'
        : 'desc';
    setInventoryCollectionRequestParam({
      ...inventoryCollectionRequestParam,
      sort: sort,
      order: order,
    });
  };
  const handleClickCollection = (collection: Collection) => {
    setSelectedCollection([collection]);
    setInventoryType('item');
  };

  if (status === 'error') return <div>error</div>;
  if (status === 'loading')
    return <SkeletonLoader className='w-full h-[200px]' />;
  return (
    <section className={styles.container}>
      <table
        className={`${styles.table} dark:border-border-main-dark h-full relative`}
      >
        <thead className='sticky top-0 border-b-1 border-border-main dark:border-border-main-dark'>
          <tr>
            {T_HEADER.map((item, index) => (
              <th
                key={index}
                className={`font-caption-medium text-text-subtle dark:text-text-subtle-dark py-12
                ${
                  index == 0
                    ? 'text-center'
                    : index > 1
                    ? 'text-right'
                    : 'text-left'
                }
                ${item.sort && 'cursor-pointer'}
                `}
                onClick={() =>
                  item.sort && handleClickSortButton(item.sort as TSort)
                }
              >
                <p>{item.name}</p>
              </th>
            ))}
            <th />
          </tr>
        </thead>
        <tbody className='h-full'>
          {/* {inventoryCollection?.collections.map((row, index) => { */}
          {mergePosts?.map((row, index) => {
            return (
              <tr
                key={index}
                className={`font-caption-medium cursor-pointer ${styles.tableRow} dark:border-border-disabled-dark`}
                onClick={() => handleClickCollection(row)}
              >
                <td className='flex justify-center py-10'>
                  <Ethereum width={32} height={32} />
                </td>
                <td>
                  <article className='flex items-center'>
                    {row.collection.imageUrl && (
                      <Image
                        width={32}
                        height={32}
                        src={row.collection.imageUrl}
                        className='rounded-full mr-12'
                        alt={row.collection.name}
                      />
                    )}
                    <p className='dark:text-text-main-dark'>
                      {row.collection.name ||
                        shortenAddress(row.collection.assetContract)}
                    </p>
                  </article>
                </td>
                <td className='text-right'>
                  <p className='dark:text-text-main-dark'>{row.amount}</p>
                </td>
                <td className='text-right'>
                  <p className='dark:text-text-main-dark'>
                    {formatCurrency(
                      row[priceType]?.[currency].amount || null,
                      currency
                    )}
                  </p>
                  {priceType === 'costBasis' && (
                    <p className='text-text-brand dark:text-text-brand-dark'>
                      {row.gasFee?.[currency]?.amount
                        ? `GAS +${parseFloat(
                            row.gasFee[currency].amount || ''
                          ).toFixed(3)} `
                        : ''}
                    </p>
                  )}
                </td>
                <td className='text-right'>
                  <p className='dark:text-text-main-dark'>
                    {row.valuation.find((item) => item.selected)?.type ||
                      row.valuation.find((item) => item.default)?.type}
                  </p>
                </td>
                <td className='text-right'>
                  <p className='dark:text-text-main-dark'>
                    {formatCurrency(
                      row.nav[currency].amount || null,
                      currency
                    ) || '-'}
                  </p>
                  <p
                    className={
                      row.nav[currency].difference.percentage?.toFixed(2) ||
                      0 > 0
                        ? 'text-green-500'
                        : 'text-red-500'
                    }
                  >{`${row.nav[currency].difference.amount} (${formatPercent(
                    row.nav[currency].difference.percentage
                  )})`}</p>
                </td>
                <td className='text-right'>
                  <p className='dark:text-text-main-dark'>1</p>
                </td>
                <td className='text-right'>
                  <p className='dark:text-text-main-dark'>1</p>
                </td>
                <td className='text-center'>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      console.log('spam');
                    }}
                    className={`${styles.spamButton} dark:border-border-bold-dark`}
                  >
                    <DotsThree className='dark:fill-icon-subtle-dark' />
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <div ref={ref}>more</div>
    </section>
  );
};
export default InventoryCollectionTable;
