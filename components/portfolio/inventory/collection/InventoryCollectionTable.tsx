'use client';
import {
  useInventoryCollectionList,
  useInventoryCollectionsInfinite,
} from '@/utils/hooks/queries/inventory';
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
  const [inventoryType, setInventoryType] = useAtom(inventoryTypeAtom);
  const setSelectedCollection = useSetAtom(selectedCollectionInventoryAtom);
  const [inventoryCollectionRequestParam, setInventoryCollectionRequestParam] =
    useAtom(inventoryCollectionAtom);
  const { data: inventoryCollection, status } = useInventoryCollectionList(
    inventoryCollectionRequestParam
  );

  const { fetchNextPage, data } = useInventoryCollectionsInfinite(
    inventoryCollectionRequestParam
  );
  const mergePosts = useMemo(
    () => data?.pages.flatMap((page) => page.collections),
    [data?.pages]
  );
  useEffect(() => {
    data && console.log('infinity', data);
  }, [data]);
  const onIntersect = useCallback(
    async (
      entries: IntersectionObserverEntry[],
      observer: IntersectionObserver
    ) => {
      const entry = entries[0];
      if (entry.isIntersecting) {
        observer.unobserve(entry.target);
        await fetchNextPage();
        observer.observe(entry.target);
      }
    },
    [fetchNextPage]
  );

  const target = useIntersection(onIntersect);

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
    setSelectedCollection(collection);
    setInventoryType('item');
  };
  const handleClickPaging = (option: 'prev' | 'next') => {
    if (option === 'prev' && inventoryCollectionRequestParam.page === 1) return;
    setInventoryCollectionRequestParam({
      ...inventoryCollectionRequestParam,
      page:
        option === 'prev'
          ? inventoryCollectionRequestParam.page - 1
          : inventoryCollectionRequestParam.page + 1,
    });
  };
  const handleChangePage = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.value) return;
    const page = parseInt(e.target.value || '1') || 1;
    console.log('page ', page);
    if (
      inventoryCollection &&
      page >
        Math.ceil(
          inventoryCollection.paging.total / inventoryCollection.paging.limit
        )
    )
      return;
    setInventoryCollectionRequestParam({
      ...inventoryCollectionRequestParam,
      page: page,
    });
  };
  if (status === 'error') return <div>error</div>;
  if (status === 'loading')
    return <SkeletonLoader className='w-full h-[200px]' />;
  return (
    <section className={styles.container}>
      <table
        className={`${styles.table} dark:border-border-main-dark h-[300px]`}
      >
        <thead className='border-b-1 border-border-main dark:border-border-main-dark'>
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
        <tbody>
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
                  <div className='flex items-center'>
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
                      {row.collection.name || row.collection.assetContract}
                    </p>
                  </div>
                </td>
                <td className='text-right'>
                  <p className='dark:text-text-main-dark'>{row.amount}</p>
                </td>
                <td className='text-right'>
                  <p className='dark:text-text-main-dark'>
                    {`${parseFloat(
                      row[priceType]?.[currency].amount || ''
                    ).toFixed(2)} ${row[priceType]?.[currency].currency} `}
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
                  <p className='dark:text-text-main-dark'>{`${
                    row.nav[currency].currency
                  } ${parseFloat(row.nav[currency].amount || '0').toFixed(
                    2
                  )}`}</p>
                  <p
                    className={
                      row.nav[currency].difference.percentage?.toFixed(2) ||
                      0 > 0
                        ? 'text-green-500'
                        : 'text-red-500'
                    }
                  >{`${row.nav[currency].difference.amount} (${row.nav[currency].difference.percentage}%)`}</p>
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
                  >
                    spam
                  </button>
                </td>
              </tr>
            );
          })}
          <div ref={target}>more</div>
        </tbody>
      </table>
    </section>
  );
};
export default InventoryCollectionTable;
