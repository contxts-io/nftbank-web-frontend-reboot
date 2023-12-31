'use client';
import { useInventoryCollectionsInfinite } from '@/utils/hooks/queries/inventory';
import styles from './InventoryCollectionTable.module.css';
import { useAtom, useAtomValue, useSetAtom } from 'jotai';
import { currencyAtom, priceTypeAtom } from '@/store/currency';
import Image from 'next/image';
import { TSort, inventoryCollectionAtom } from '@/store/requestParam';
import SkeletonLoader from '../../../SkeletonLoader';
import { Collection, TValuation } from '@/interfaces/collection';
import { inventoryTypeAtom } from '@/store/settings';
import { selectedCollectionInventoryAtom } from '@/store/portfolio';
import { useEffect, useMemo } from 'react';
import Ethereum from '@/public/icon/Ethereum';
import {
  difference,
  formatCurrency,
  isPlus,
  shortenAddress,
} from '@/utils/common';
import { useInView } from 'react-intersection-observer';
import SpamInsertDropdown from './SpamInsertDropdown';
import { ValuationTypes } from '@/utils/ValuationTypes';
import ImagePlaceholder from '@/public/icon/ImagePlaceholder';
import ValuationDropdown from '../item/ValuationDropdown';
import { twMerge } from 'tailwind-merge';
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
    // sort: 'acquisitionPrice',
  },
  {
    name: 'Valuation Type',
  },
  {
    name: 'Realtime NAV',
    sort: 'nav',
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

  const { fetchNextPage, data, status } = useInventoryCollectionsInfinite({
    ...inventoryCollectionRequestParam,
    page: 0,
  });
  type TPage = {
    page: number;
    collections: Collection[];
  };
  const collections = useMemo(() => data?.pages, [data?.pages]);
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
  const selectedValueType = (
    valuations: TValuation[]
  ): TValuation | undefined => {
    const result =
      valuations.find((val) => val.selected) ||
      valuations.find((val) => val.default);
    return result;
  };
  if (status === 'error') return <div>error</div>;
  if (status === 'loading')
    return <SkeletonLoader className='w-full h-[200px]' />;
  return (
    <section className={styles.container}>
      <table className={`${styles.table} h-full relative`}>
        <thead className='sticky top-110 bg-[var(--color-elevation-surface)] h-fit border-b-1 border-[var(--color-border-main)] z-20'>
          <tr className='h-fit'>
            {T_HEADER.map((item, index) => (
              <th
                key={index}
                className={`font-caption-medium text-[var(--color-text-subtle)] py-12
                ${
                  index == 0
                    ? 'text-center'
                    : index > 1 && index !== 4
                    ? 'text-right'
                    : 'text-left'
                }
                ${item.sort && 'cursor-pointer'}
                `}
                onClick={() =>
                  item.sort && handleClickSortButton(item.sort as TSort)
                }
              >
                <p className={index > 1 ? styles.pTd : 'mr-40'}>{item.name}</p>
              </th>
            ))}
            <th className='text-right'>
              <p className='ml-40'> </p>
            </th>
          </tr>
        </thead>
        <tbody className='h-full z-0'>
          {collections?.map((page, pageIndex) => {
            return page.data?.map((row, index) => {
              const valuationType = selectedValueType(row.valuation);
              return (
                <tr
                  key={`${pageIndex}-${index}}`}
                  className={`font-caption-regular cursor-pointer ${styles.tableRow}`}
                  onClick={() => handleClickCollection(row)}
                >
                  <td className='flex justify-center items-center h-full mr-40'>
                    <Ethereum
                      width={24}
                      height={24}
                      className='w-24 h-24 rounded-full flex items-center justify-center border-1 border-[var(--color-border-main)]'
                    />
                  </td>
                  <td>
                    <article className='flex items-center'>
                      {row.collection.imageUrl ? (
                        <Image
                          width={24}
                          height={24}
                          src={row.collection.imageUrl}
                          className='rounded-full mr-12 border-1 border-[var(--color-border-main)]'
                          alt={
                            row.collection.name || row.collection.assetContract
                          }
                        />
                      ) : (
                        <div className='w-24 h-24 bg-[--color-elevation-surface-raised] border-[var(--color-border-main)] flex items-center justify-center rounded-full mr-12 border-1'>
                          <ImagePlaceholder className='w-12 h-12 fill-[var(--color-background-neutral-bold)] ' />
                        </div>
                      )}

                      <p className='font-caption-medium'>
                        {row.collection.name ||
                          shortenAddress(row.collection.assetContract)}
                      </p>
                    </article>
                  </td>
                  <td className='text-right'>
                    <p className={styles.pTd}>{row.amount}</p>
                  </td>
                  {/* coast basis */}
                  {!row[priceType] ? (
                    <td className='text-right'>
                      <div className='flex justify-end items-center w-full h-full'>
                        <SkeletonLoader className='w-1/2 h-1/2' />
                      </div>
                    </td>
                  ) : (
                    <td className='text-right'>
                      <p className={styles.pTd}>
                        {formatCurrency(
                          row[priceType]?.[currency] || null,
                          currency
                        )}
                      </p>
                      {priceType === 'costBasis' && (
                        <p
                          className={`${styles.pTd} text-[var(--color-text-brand)]`}
                        >
                          {row.gasFee?.[currency]
                            ? `GAS +${parseFloat(
                                row.gasFee[currency] || ''
                              ).toFixed(3)} `
                            : ''}
                        </p>
                      )}
                    </td>
                  )}
                  {/* valuation type */}
                  <td className='text-left'>
                    {/* <p>{ValuationTypes(row.valuation)}</p> */}
                    {row.valuation.length > 1 ? (
                      <ValuationDropdown
                        collection={row}
                        valuations={row.valuation}
                      />
                    ) : (
                      <p>no available price</p>
                    )}
                  </td>
                  {/* realtime nav */}
                  <td className='text-right'>
                    <p className={styles.pTd}>
                      {formatCurrency(
                        row.nav[currency].amount || null,
                        currency
                      ) || '-'}
                    </p>
                  </td>
                  <td className='text-right'>
                    {row.nav[currency].difference?.amount && (
                      <p
                        className={`${styles.pTd} ${
                          isPlus(row.nav[currency].difference?.amount || 0)
                            ? 'text-[var(--color-text-success)]'
                            : 'text-[var(--color-text-danger)]'
                        }`}
                      >{`${formatCurrency(
                        row.nav[currency].difference?.amount || null,
                        currency
                      )}`}</p>
                    )}
                  </td>
                  <td className='text-right'>
                    <p
                      className={`${styles.pTd} ${
                        isPlus(row.nav[currency].difference?.percentage || 0)
                          ? 'text-[var(--color-text-success)]'
                          : 'text-[var(--color-text-danger)]'
                      }`}
                    >
                      {`${difference(
                        row.nav[currency].difference?.percentage || '0',
                        'percent'
                      )}`}
                    </p>
                  </td>
                  <td className='text-right'>
                    <div
                      className='w-full flex justify-end items-center'
                      onClick={(e) => e.stopPropagation()}
                    >
                      <SpamInsertDropdown collection={row} icon={true} />
                    </div>
                  </td>
                </tr>
              );
            });
          })}
        </tbody>
      </table>
      <div ref={ref} className='h-43' />
    </section>
  );
};
export default InventoryCollectionTable;
