'use client';
import { useInventoryItemInfinite } from '@/utils/hooks/queries/inventory';
import styles from './InventoryItemTable.module.css';
import { useAtom, useAtomValue } from 'jotai';
import { inventoryItemListAtom } from '@/store/requestParam';
import { TValuation } from '@/interfaces/collection';
import { Token } from '@/interfaces/token';
import { currencyAtom, priceTypeAtom } from '@/store/currency';
import React, { useEffect, useMemo, useState } from 'react';
import {
  defaultImg,
  formatCurrency,
  formatDate,
  formatPercent,
  isPlus,
  mappingConstants,
  parseFloatPrice,
  shortenAddress,
} from '@/utils/common';
import { useInView } from 'react-intersection-observer';
import { TValuationType } from '@/interfaces/constants';
import { selectedTokenAtom } from '@/store/portfolio';
import ImagePlaceholder from '@/public/icon/ImagePlaceholder';
import FailToLoad from '@/components/error/FailToLoad';
import NoData from '@/components/error/NoData';
import { LATEST_ACQUISITION_DATE } from '@/utils/messages';
import Info from '@/public/icon/Info';
import { Tooltip } from '@nextui-org/react';
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
    type: 'valuationType',
    name: 'Valuation Type',
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
  // {
  //   type: 'accuracy',
  //   name: 'Accuracy',
  // },
  {
    type: 'acquisitionDate',
    name: 'Acq. date',
    tooltip: LATEST_ACQUISITION_DATE,
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
      {status === 'error' && (
        <div>
          <FailToLoad />
        </div>
      )}
      {status === 'success' && mergePosts?.[0].data.length === 0 && (
        <div>
          <NoData />
        </div>
      )}
      {status === 'success' &&
        mergePosts?.[0].data &&
        mergePosts?.[0].data.length > 0 && (
          <table className={`${styles.table}`}>
            <thead
              className={`${styles.tableHead} ${
                props.sticky ? styles.stickyBar : ''
              }`}
            >
              <tr className={`${styles.tableHeadRow}`}>
                {HEADER.map((item, index) => (
                  <th
                    key={index}
                    className={`font-caption-medium 
                ${index == 0 ? 'text-left' : 'text-right'} 
                ${item.sort ? 'cursor-pointer' : ''}`}
                    onClick={() => item.sort && handleSort(item.type)}
                  >
                    {item.tooltip ? (
                      <div className='w-full flex items-center justify-end text-[var(--color-icon-subtle)]'>
                        <Tooltip
                          content={LATEST_ACQUISITION_DATE}
                          className='cursor-pointer w-[230px] font-caption-regular text-[var(--color-text-main)] bg-[var(--color-elevation-surface)] border-1 border-[var(--color-border-bold)] p-6'
                        >
                          <div className='flex justify-center text-[var(--color-icon-subtle)] mr-4'>
                            <Info />
                          </div>
                        </Tooltip>
                        <span>{item.name}</span>
                      </div>
                    ) : (
                      <p>{item.name}</p>
                    )}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {mergePosts?.map((page, pageIndex) => {
                return page.data.map((data, index) => {
                  const valuationType = selectedValueType(data.valuation);
                  const itemKey = `${data.collection.assetContract}-${data.token.tokenId}-${index}`;
                  const isOpen = openedItem.find((item) => item === itemKey)
                    ? true
                    : false;
                  const acquisitionPrice = parseFloatPrice(
                    data.acquisitionPrice?.[currency]
                  );
                  const costBasis =
                    acquisitionPrice + parseFloatPrice(data.gasFee?.[currency]);
                  const unrealizedGL =
                    parseFloatPrice(data.nav[currency].amount) -
                    parseFloatPrice(acquisitionPrice);
                  const isPlus = unrealizedGL > 0;
                  const isMinus = unrealizedGL < 0;
                  const isZero = unrealizedGL === 0;

                  return (
                    <React.Fragment key={index}>
                      <tr
                        key={index}
                        className={`font-caption-regular ${
                          styles.tableBodyRow
                        } ${isOpen && styles.isOpen}`}
                        onClick={() => handleOpenDetail(data)}
                      >
                        <td className='text-left p-0'>
                          <div className={`flex items-center my-8`}>
                            <div
                              className={`${styles.tokenImage} bg-[--color-elevation-surface-raised] `}
                            >
                              {data?.token.imageUrl ? (
                                <img
                                  src={data?.token.imageUrl}
                                  width={32}
                                  height={32}
                                  alt={`${data.collection.name}-${data.token.name}-${data.token.tokenId}`}
                                  onError={defaultImg}
                                />
                              ) : (
                                <div className='w-32 h-32 bg-[--color-elevation-surface-raised] border-[var(--color-border-main)] flex items-center justify-center border-1'>
                                  <ImagePlaceholder className='w-12 h-12 fill-[var(--color-background-neutral-bold)] ' />
                                </div>
                              )}
                            </div>
                            <div className='font-caption-medium max-w-[230px]  white-space-nowrap overflow-hidden text-ellipsis'>
                              <p className={`${styles.pMain} mr-0`}>
                                {data.token.tokenId}
                              </p>
                              <p className={`${styles.pSub} truncate mr-0`}>
                                {data.collection.name ||
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
                            {priceType === 'costBasis'
                              ? formatCurrency(costBasis.toString(), currency)
                              : formatCurrency(
                                  acquisitionPrice.toString(),
                                  currency
                                )}
                          </p>
                          {priceType === 'costBasis' && (
                            <p
                              className={`${styles.pTd} text-[var(--color-text-brand)]`}
                            >
                              {data.gasFee?.[currency]
                                ? `GAS +${parseFloatPrice(
                                    data.gasFee[currency] || ''
                                  ).toFixed(3)} `
                                : ''}
                            </p>
                          )}
                        </td>
                        <td className='text-right'>
                          <span>
                            {/* {data.valuation.length > 0
                            ? mappingConstants(data.valuation[0].type)
                            : 'no valuation type'} */}
                            {valuationType
                              ? mappingConstants(valuationType.type)
                              : 'no valuation type'}
                          </span>
                        </td>
                        {/** realtime nav **/}
                        <td className='text-right'>
                          <p className='text-[var(--color-text-main)]'>
                            {formatCurrency(
                              data.nav[currency].amount || null,
                              currency
                            )}
                          </p>
                        </td>
                        <td className='text-right'>
                          <p
                            className={`${
                              isPlus
                                ? 'text-[var(--color-text-success)]'
                                : isMinus
                                ? 'text-[var(--color-text-danger)]'
                                : 'text-[var(--color-text-main)]'
                            }`}
                          >
                            {priceType === 'acquisitionPrice'
                              ? formatCurrency(
                                  (
                                    parseFloatPrice(data.nav[currency].amount) -
                                    acquisitionPrice
                                  ).toString(),
                                  currency
                                )
                              : formatCurrency(
                                  (
                                    parseFloatPrice(data.nav[currency].amount) -
                                    costBasis
                                  ).toString(),
                                  currency
                                )}
                          </p>
                        </td>
                        <td className='text-right'>
                          <p
                            className={`${
                              isZero
                                ? 'text-[var(--color-text-main)]'
                                : isPlus
                                ? 'text-[var(--color-text-success)]'
                                : isMinus
                                ? 'text-[var(--color-text-danger)]'
                                : 'text-[var(--color-text-main)]'
                            }`}
                          >
                            {priceType === 'acquisitionPrice'
                              ? formatPercent(
                                  (
                                    ((parseFloatPrice(
                                      data.nav[currency].amount
                                    ) -
                                      acquisitionPrice) /
                                      acquisitionPrice) *
                                    100
                                  ).toString()
                                )
                              : formatPercent(
                                  (
                                    ((parseFloatPrice(
                                      data.nav[currency].amount
                                    ) -
                                      costBasis) /
                                      costBasis) *
                                    100
                                  ).toString()
                                )}
                          </p>
                        </td>
                        <td className='text-right'>
                          <span>
                            {data.acquisitionDate &&
                              formatDate(new Date(data.acquisitionDate))}
                          </span>
                        </td>
                      </tr>
                    </React.Fragment>
                  );
                });
              })}
            </tbody>
          </table>
        )}
      <div ref={ref} className='h-43' />
    </React.Fragment>
  );
};
export default InventoryItemTable;
