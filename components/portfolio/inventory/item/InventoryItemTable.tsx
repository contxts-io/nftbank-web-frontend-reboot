'use client';
import { useInventoryItemInfinite } from '@/utils/hooks/queries/inventory';
import styles from './InventoryItemTable.module.css';
import { useAtom, useAtomValue } from 'jotai';
import { inventoryItemListAtom } from '@/store/requestParam';
import Image from 'next/image';
import { TValuation, Token } from '@/interfaces/collection';
import { currencyAtom } from '@/store/currency';
import React, { useEffect, useMemo, useState } from 'react';
import InventoryItemDetail from './InventoryItemDetail';
import CaretDown from '@/public/icon/CaretDown';
import { formatCurrency, formatDate } from '@/utils/common';
import { useInView } from 'react-intersection-observer';
import {
  useInventoryItemInfinitePerformance,
  useInventoryItemPerformance,
} from '@/utils/hooks/queries/performance';
import ReactQueryClient from '@/utils/ReactQueryClient';
import { twMerge } from 'tailwind-merge';
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
  } = useInventoryItemInfinite({ ...requestParam, page: 0 });
  const { data: inventoryItemListPerformance, status: statusPerformance } =
    useInventoryItemPerformance(requestParam);
  useEffect(() => {
    const isLast =
      inventoryItemList?.pages?.[inventoryItemList?.pages.length - 1].isLast;
    !isLast &&
      inView &&
      status !== 'loading' &&
      statusPerformance !== 'loading' &&
      (fetchNextPage(),
      setRequestParam((prev) => ({ ...prev, page: prev.page + 1 })));
  }, [fetchNextPage, inView]);
  const mergePosts = useMemo(
    () => inventoryItemList?.pages,
    [inventoryItemList?.pages]
  );
  const [mergedTokens, setMergedTokens] = useState<Token[]>([]);
  type TPage = {
    page: number;
    tokens: Token[];
  };
  useEffect(() => {
    inventoryItemListPerformance &&
      inventoryItemList?.pages &&
      ReactQueryClient.setQueryData(
        ['inventoryItemList', { ...requestParam, page: 0 }],
        {
          ...inventoryItemList,
          pages: inventoryItemList.pages.map(
            (page) =>
              (page.page === inventoryItemListPerformance?.paging.page && {
                ...page,
                tokens: inventoryItemListPerformance.tokens,
              }) ||
              page
          ),
        }
      );
  }, [inventoryItemListPerformance]);
  const [performanceTokens, setPerformanceTokens] = useState<TPage[]>([]);
  // useEffect(() => {
  //   collectionsPerformance &&
  //     setPerformanceCollections((prev) =>
  //       prev.find((item) => item.page === inventoryCollectionRequestParam.page)
  //         ? prev.map((item) => {
  //             return item.page === inventoryCollectionRequestParam.page
  //               ? {
  //                   ...item,
  //                   collections: collectionsPerformance?.collections || [],
  //                 }
  //               : item;
  //           })
  //         : [
  //             ...prev,
  //             {
  //               page: inventoryCollectionRequestParam.page,
  //               collections: collectionsPerformance.collections || [],
  //             },
  //           ]
  //     );
  // }, [collectionsPerformance]);
  // useEffect(() => {
  //   const mergedTokens = inventoryItemListPerformance?.pages.flatMap(
  //     (page) => page.tokens
  //   );
  //   inventoryItemList?.pages &&
  //     setMergedTokens(inventoryItemList?.pages.flatMap((page) => page.tokens));
  //   setMergedTokens((prev) =>
  //     prev.map((row) => {
  //       return (
  //         mergedTokens?.find(
  //           (item) =>
  //             item.collection.assetContract === row.collection.assetContract &&
  //             item.token.tokenId === row.token.tokenId
  //         ) || row
  //       );
  //     })
  //   );
  // }, [inventoryItemList?.pages, inventoryItemListPerformance]);

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
    <table className={`${styles.table}`}>
      <thead className={styles.tableHead}>
        <tr className={`${styles.tableHeadRow}`}>
          <th />
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
          <th />
          <th />
        </tr>
      </thead>
      <tbody>
        {status === 'success' &&
          mergePosts?.map((page, pageIndex) => {
            return page.tokens.map((data, index) => {
              const valuationType = selectedValueType(data.valuation);
              const itemKey = `${data.collection.assetContract}-${data.token.tokenId}-${index}`;
              const isOpen = openedItem.find((item) => item === itemKey)
                ? true
                : false;

              return (
                <React.Fragment key={index}>
                  <tr
                    key={index}
                    className={`font-caption-regular ${styles.tableBodyRow} ${
                      isOpen && styles.isOpen
                    }`}
                    onClick={() => handleOpenDetail(itemKey)}
                  >
                    <td />
                    <td className='text-left p-0'>
                      <div className={`flex items-center my-8`}>
                        <div className={twMerge(`${styles.tokenImage}`)}>
                          <Image
                            src={
                              data?.token.imageUrl || '/icon/nftbank_icon.svg'
                            }
                            fill
                            alt={`${data.collection.name}-${data.token.name}-${data.token.tokenId}`}
                          />
                        </div>
                        <div className='font-caption-medium'>
                          <p className={`${styles.pMain}`}>
                            {data.token.tokenId}
                          </p>
                          <p className={`${styles.pSub}`}>{data.token.name}</p>
                        </div>
                      </div>
                    </td>
                    <td className='text-right'>{data.amount}</td>
                    <td className='text-right'>
                      {data.costBasis?.[currency] &&
                        formatCurrency(
                          data.costBasis[currency].amount,
                          currency
                        )}
                    </td>
                    <td className='text-right'>
                      {formatCurrency(data.nav[currency].amount, currency)}
                    </td>
                    <td className='text-right'>
                      {formatCurrency(data.nav[currency].amount, currency)}
                    </td>
                    <td className='text-right'>{data.nav[currency].amount}</td>
                    <td className='text-right'>{valuationType?.type}</td>
                    <td className='text-right'>
                      {valuationType?.accuracy.toFixed(2)}
                    </td>
                    <td className='text-right'>
                      {data.acquisitionDate &&
                        formatDate(new Date(data.acquisitionDate))}
                    </td>
                    <td className='text-right'>
                      <button className={`${styles.expandButton}`}>
                        <CaretDown />
                      </button>
                    </td>
                    <td />
                  </tr>
                  {isOpen && (
                    <tr>
                      <td />
                      <td colSpan={HEADER.length + 1}>
                        <InventoryItemDetail token={data} />
                      </td>
                      <td />
                    </tr>
                  )}
                </React.Fragment>
              );
            });
          })}
      </tbody>
      <div ref={ref} className='h-43' />
    </table>
  );
};
export default InventoryItemTable;
