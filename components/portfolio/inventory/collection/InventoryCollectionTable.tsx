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
import { useEffect, useMemo, useState } from 'react';
import Ethereum from '@/public/icon/Ethereum';
import DotsThree from '@/public/icon/DotsThree';
import {
  difference,
  formatCurrency,
  formatPercent,
  isPlus,
  selectedValueType,
  shortenAddress,
} from '@/utils/common';
import { useInView } from 'react-intersection-observer';
import { useInventoryCollectionListPerformance } from '@/utils/hooks/queries/performance';
import ReactQueryClient from '@/utils/ReactQueryClient';
import SpamInsertDropdown from './SpamInsertDropdown';
import { ValuationTypes } from '@/utils/ValuationTypes';
import ImagePlaceholder from '@/public/icon/ImagePlaceholder';
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
  // const {
  //   fetchNextPage: fetchNextPagePerformance,
  //   data: dataPerformance,
  //   status: statusPerformance,
  // } = useInventoryCollectionsInfinitePerformance({
  //   ...inventoryCollectionRequestParam,
  //   page: 0,
  // });
  const { data: collectionsPerformance, status: statusListPerformance } =
    useInventoryCollectionListPerformance(inventoryCollectionRequestParam);
  const [mergedCollections, setMergedCollections] = useState<Collection[]>([]);
  type TPage = {
    page: number;
    collections: Collection[];
  };
  const [performanceCollections, setPerformanceCollections] = useState<TPage[]>(
    []
  );

  // useEffect(() => {
  //   const mergedCollections = dataPerformance?.pages.flatMap(
  //     (page) => page.collections
  //   );
  //   data?.pages &&
  //     setMergedCollections(data?.pages.flatMap((page) => page.collections));
  //   setMergedCollections((prev) =>
  //     prev.map((row) => {
  //       return (
  //         mergedCollections?.find(
  //           (item) =>
  //             item.collection.assetContract === row.collection.assetContract
  //         ) || row
  //       );
  //     })
  //   );
  // }, [data?.pages, dataPerformance]);
  const collections = useMemo(() => data?.pages, [data?.pages]);
  useEffect(() => {
    collectionsPerformance &&
      data?.pages &&
      ReactQueryClient.setQueryData(
        [
          'inventoryCollectionList',
          { ...inventoryCollectionRequestParam, page: 0 },
        ],
        {
          ...data,
          pages: data.pages.map(
            (page) =>
              (page.page === collectionsPerformance?.paging.page && {
                ...page,
                data: collectionsPerformance?.data,
              }) ||
              page
          ),
        }
      );
  }, [collectionsPerformance, data]);
  useEffect(() => {
    const isLastPage = data?.pages?.[data.pages.length - 1].isLast;
    !isLastPage &&
      inView &&
      status !== 'loading' &&
      statusListPerformance !== 'loading' &&
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
                <p className={index > 1 ? 'ml-40' : ''}>{item.name}</p>
              </th>
            ))}
            <th className='text-right'>
              <p className='ml-40'> </p>
            </th>
          </tr>
        </thead>
        <tbody className='h-full z-0'>
          {/* {mergedCollections?.map((row, index) => { */}
          {collections?.map((page, pageIndex) => {
            return page.data?.map((row, index) => {
              return (
                <tr
                  key={`${pageIndex}-${index}}`}
                  className={`font-caption-regular cursor-pointer ${styles.tableRow}`}
                  onClick={() => handleClickCollection(row)}
                >
                  <td className='flex justify-center py-6'>
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
                          alt={row.collection.name}
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
                    <p>{row.amount}</p>
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
                      <p>
                        {formatCurrency(
                          row[priceType]?.[currency] || null,
                          currency
                        )}
                      </p>
                      {priceType === 'costBasis' && (
                        <p className='text-[var(--color-text-brand)]'>
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
                  <td className='text-right'>
                    <p>{ValuationTypes(row.valuation)}</p>
                  </td>
                  {/* realtime nav */}
                  <td className='text-right'>
                    <p>
                      {formatCurrency(
                        row.nav[currency].amount || null,
                        currency
                      ) || '-'}
                    </p>
                  </td>
                  <td className='text-right'>
                    {row.nav[currency].difference?.amount && (
                      <p
                        className={`${
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
                      className={`${
                        isPlus(row.nav[currency].difference?.percentage || 0)
                          ? 'text-[var(--color-text-success)]'
                          : 'text-[var(--color-text-danger)]'
                      }`}
                    >
                      {`${difference(
                        row.nav[currency].difference?.percentage || '0',
                        'percent'
                      )}`}
                      {/* {difference('-123123.000001', currency)} */}
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
