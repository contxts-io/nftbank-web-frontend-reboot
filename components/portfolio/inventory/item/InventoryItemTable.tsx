'use client';
import { useInventoryItemInfinite } from '@/utils/hooks/queries/inventory';
import styles from './InventoryItemTable.module.css';
import { useAtom, useAtomValue } from 'jotai';
import { inventoryItemListAtom } from '@/store/requestParam';
import Image from 'next/image';
import { TValuation, Token } from '@/interfaces/collection';
import { currencyAtom, priceTypeAtom } from '@/store/currency';
import React, { useEffect, useMemo, useState } from 'react';
import CaretDown from '@/public/icon/CaretDown';
import {
  formatCurrency,
  formatDate,
  formatPercent,
  isPlus,
  shortenAddress,
} from '@/utils/common';
import { useInView } from 'react-intersection-observer';
import { useInventoryItemPerformance } from '@/utils/hooks/queries/performance';
import ReactQueryClient from '@/utils/ReactQueryClient';
import { twMerge } from 'tailwind-merge';
import { TValuationType } from '@/interfaces/constants';
import { selectedTokenAtom } from '@/store/portfolio';
import ValuationDropdown from './ValuationDropdown';
const HEADER = [
  {
    type: 'Item',
    name: 'Item',
  },
  {
    type: 'amount',
    name: 'Amount',
    sort: true,
  },
  {
    type: 'costBasis',
    name: 'Cost basis',
  },
  {
    type: 'nav',
    name: 'Realtime NAV',
    sort: true,
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
type Props = {
  onClick: (valuationType: TValuationType) => void;
  valuations: TValuation[];
  selectedValuation: TValuation | undefined;
};

const InventoryItemTable = () => {
  const [requestParam, setRequestParam] = useAtom(inventoryItemListAtom);
  const [openedItem, setOpenedItem] = useState<string[]>([]);
  const currency = useAtomValue(currencyAtom);
  const priceType = useAtomValue(priceTypeAtom);
  const { ref, inView } = useInView();
  const [view, setView] = useState<{ key: string; open: boolean }>({
    key: '',
    open: false,
  });
  const {
    fetchNextPage,
    data: inventoryItemList,
    status,
  } = useInventoryItemInfinite({ ...requestParam, page: 0 });
  const { data: inventoryItemListPerformance, status: statusPerformance } =
    useInventoryItemPerformance(requestParam);
  const [selectedToken, setSelectedToken] = useAtom(selectedTokenAtom);
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
    [inventoryItemList?.pages, requestParam]
  );

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
              (page.page === inventoryItemListPerformance?.paging?.page && {
                ...page,
                tokens: inventoryItemListPerformance.tokens,
              }) ||
              page
          ),
        }
      );
  }, [inventoryItemList, inventoryItemListPerformance, requestParam]);
  const handleOpenDetail = (target: Token) => {
    // setOpenedItem((prev) => {
    //   if (prev.includes(target)) {
    //     return prev.filter((item) => item !== target);
    //   } else {
    //     return [...prev, target];
    //   }
    // });
    setSelectedToken(target);
  };

  const selectedValueType = (
    valuations: TValuation[]
  ): TValuation | undefined => {
    const result =
      valuations.find((val) => val.selected) ||
      valuations.find((val) => val.default);
    return result;
  };
  const handleSort = (type: string) => {
    setRequestParam((prev) => ({
      ...prev,
      sort: type as 'amount' | 'nav',
      order: prev.order === 'desc' ? 'asc' : 'desc',
    }));
  };
  return (
    <React.Fragment>
      <table className={`${styles.table}`}>
        <thead className={styles.tableHead}>
          <tr className={`${styles.tableHeadRow}`}>
            <th />
            {HEADER.map((item, index) => (
              <th
                key={index}
                className={`font-caption-medium ${
                  index == 0 ? 'text-left' : 'text-right'
                } ${item.sort ? 'cursor-pointer' : ''}`}
                onClick={() => item.sort && handleSort(item.type)}
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
                      onClick={() => handleOpenDetail(data)}
                    >
                      <td />
                      <td className='text-left p-0'>
                        <div className={`flex items-center my-8`}>
                          <div className={twMerge(`${styles.tokenImage} w-32`)}>
                            <Image
                              src={
                                data?.token.imageUrl || '/icon/nftbank_icon.svg'
                              }
                              width={32}
                              height={32}
                              placeholder='data:image/icon/nftbank_icon.svg'
                              alt={`${data.collection.name}-${data.token.name}-${data.token.tokenId}`}
                            />
                          </div>
                          <div className='font-caption-medium max-w-[230px]  white-space-nowrap overflow-hidden text-ellipsis'>
                            <p className={`${styles.pMain}`}>
                              {data.token.tokenId}
                            </p>
                            <p className={`${styles.pSub}`}>
                              {data.token.name ||
                                shortenAddress(data.collection.assetContract)}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className='text-right'>{data.amount}</td>
                      <td className='text-right'>
                        {priceType === 'acquisitionPrice'
                          ? formatCurrency(
                              data.acquisitionPrice?.[currency].amount || null,
                              currency
                            )
                          : data.costBasis?.[currency] &&
                            formatCurrency(
                              data.costBasis[currency].amount,
                              currency
                            )}
                      </td>
                      <td className='text-right'>
                        {formatCurrency(data.nav[currency].amount, currency)}
                      </td>
                      <td className='text-right'>
                        <p
                          className={`${
                            isPlus(data.nav[currency].difference?.amount || 0)
                              ? 'text-[var(--color-text-success)]'
                              : 'text-[var(--color-text-danger)]'
                          }`}
                        >
                          {formatCurrency(
                            data.nav[currency].difference?.amount || null,
                            currency
                          )}
                        </p>
                      </td>
                      <td className='text-right'>
                        <p
                          className={`mr-8 ${
                            isPlus(
                              data.nav[currency].difference?.percentage || 0
                            )
                              ? 'text-[var(--color-text-success)]'
                              : 'text-[var(--color-text-danger)]'
                          }`}
                        >
                          {formatPercent(
                            data.nav[currency].difference?.percentage || null
                          )}
                        </p>
                      </td>
                      <td className='text-right cursor-pointer'>
                        {data.valuation.length > 1 ? (
                          <ValuationDropdown
                            token={data}
                            valuations={data.valuation}
                          />
                        ) : (
                          <p>no available price</p>
                        )}
                      </td>
                      <td className='text-right'>
                        {formatPercent(valuationType?.accuracy || null)}
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
                  </React.Fragment>
                );
              });
            })}
        </tbody>
        <div ref={ref} className='h-43' />
      </table>
    </React.Fragment>
  );
};
export default InventoryItemTable;
