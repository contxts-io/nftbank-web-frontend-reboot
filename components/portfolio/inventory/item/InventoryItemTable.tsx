'use client';
import { useInventoryItemInfinite } from '@/utils/hooks/queries/inventory';
import styles from './InventoryItemTable.module.css';
import { useAtom, useAtomValue } from 'jotai';
import { inventoryItemListAtom } from '@/store/requestParam';
import Image from 'next/image';
import { TValuation } from '@/interfaces/collection';
import { Token } from '@/interfaces/token';
import { currencyAtom, priceTypeAtom } from '@/store/currency';
import React, { useEffect, useMemo, useState } from 'react';
import {
  formatCurrency,
  formatDate,
  formatPercent,
  isPlus,
  mappingConstants,
  shortenAddress,
} from '@/utils/common';
import { useInView } from 'react-intersection-observer';
import { TValuationType } from '@/interfaces/constants';
import { selectedTokenAtom } from '@/store/portfolio';
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
  sticky?: boolean;
};

const InventoryItemTable = (props: Props) => {
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
  const [selectedToken, setSelectedToken] = useAtom(selectedTokenAtom);
  useEffect(() => {
    const isLast =
      inventoryItemList?.pages?.[inventoryItemList?.pages.length - 1].isLast;
    !isLast &&
      inView &&
      requestParam.paging &&
      status !== 'loading' &&
      (fetchNextPage(),
      setRequestParam((prev) => ({ ...prev, page: prev.page + 1 })));
  }, [fetchNextPage, inView]);
  useEffect(() => {
    setRequestParam((prev) => ({
      ...prev,
      page: 0,
      includeGasUsed: priceType === 'costBasis' ? 'true' : 'false',
    }));
  }, [priceType]);
  const mergePosts = useMemo(
    () => inventoryItemList?.pages,
    [inventoryItemList?.pages, requestParam]
  );

  const handleOpenDetail = (target: Token) => {
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
        <thead
          className={`${styles.tableHead} ${
            props.sticky ? styles.stickyBar : ''
          }`}
        >
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
                {index === HEADER.length - 1 ? (
                  <span>{item.name}</span>
                ) : (
                  <p>{item.name}</p>
                )}
              </th>
            ))}
            <th />
          </tr>
        </thead>
        <tbody>
          {status === 'success' &&
            mergePosts?.map((page, pageIndex) => {
              return page.data.map((data, index) => {
                const valuationType = selectedValueType(data.valuation);
                const itemKey = `${data.collection.assetContract}-${data.token.tokenId}-${index}`;
                const isOpen = openedItem.find((item) => item === itemKey)
                  ? true
                  : false;
                const plus = isPlus(
                  data.nav[currency].difference?.amount || '0'
                );
                return (
                  <React.Fragment key={index}>
                    <tr
                      key={index}
                      className={`font-caption-regular ${styles.tableBodyRow} ${
                        isOpen && styles.isOpen
                      }`}
                      onClick={() => handleOpenDetail(data)}
                    >
                      <td className={styles.blanc} />
                      <td className='text-left p-0'>
                        <div className={`flex items-center my-8`}>
                          <div className={styles.tokenImage}>
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
                      <td className='text-right'>
                        <p>{data.amount}</p>
                      </td>
                      <td className='text-right'>
                        <p>
                          {formatCurrency(
                            data.acquisitionPrice?.[currency] || null,
                            currency
                          )}
                        </p>
                        {priceType === 'costBasis' && (
                          <p
                            className={`${styles.pTd} text-[var(--color-text-brand)]`}
                          >
                            {data.gasFee?.[currency]
                              ? `GAS +${parseFloat(
                                  data.gasFee[currency] || ''
                                ).toFixed(3)} `
                              : ''}
                          </p>
                        )}
                      </td>
                      <td className='text-right'>
                        <p>
                          {formatCurrency(data.nav[currency].amount, currency)}
                        </p>
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
                          className={`${
                            plus === '-'
                              ? 'text-[var(--color-text-main)]'
                              : plus === true
                              ? 'text-[var(--color-text-success)]'
                              : 'text-[var(--color-text-danger)]'
                          }`}
                        >
                          {formatPercent(
                            data.nav[currency].difference?.percentage || null
                          )}
                        </p>
                      </td>
                      <td className='text-right'>
                        <p>
                          {/* {data.valuation.length > 0
                            ? mappingConstants(data.valuation[0].type)
                            : 'no valuation type'} */}
                          {valuationType
                            ? mappingConstants(valuationType.type)
                            : 'no valuation type'}
                        </p>
                      </td>
                      <td className='text-right'>
                        <p>{formatPercent(valuationType?.accuracy || null)}</p>
                      </td>
                      <td className='text-right'>
                        <span>
                          {data.acquisitionDate &&
                            formatDate(new Date(data.acquisitionDate))}
                        </span>
                      </td>
                      <td className={styles.blanc} />
                    </tr>
                  </React.Fragment>
                );
              });
            })}
        </tbody>
      </table>
      <div ref={ref} className='h-43' />
    </React.Fragment>
  );
};
export default InventoryItemTable;
