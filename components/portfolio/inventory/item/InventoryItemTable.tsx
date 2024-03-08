'use client';
import {
  useInventoryItemInfinite,
  useInventoryItemList,
} from '@/utils/hooks/queries/inventory';
import styles from './InventoryItemTable.module.css';
import { useAtom, useAtomValue } from 'jotai';
import { SortOrder, TSort, inventoryItemListAtom } from '@/store/requestParam';
import { TValuation } from '@/interfaces/collection';
import { Token } from '@/interfaces/token';
import { currencyAtom, priceTypeAtom } from '@/store/currency';
import React, { useEffect, useMemo, useState } from 'react';
import {
  defaultImg,
  formatCurrency,
  formatCurrencyOriginal,
  formatDate,
  formatGasFee,
  formatPercent,
  mappingConstants,
  parseFloatPrice,
  shortenAddress,
} from '@/utils/common';
import { useInView } from 'react-intersection-observer';
import { selectedTokenAtom } from '@/store/portfolio';
import ImagePlaceholder from '@/public/icon/ImagePlaceholder';
import FailToLoad from '@/components/error/FailToLoad';
import NoData from '@/components/error/NoData';
import {
  LATEST_ACQUISITION_DATE,
  UNABLE_TO_CALCULATE_ROI,
} from '@/utils/messages';
import Info from '@/public/icon/Info';
import { Tooltip } from '@nextui-org/react';
import { send } from 'process';
import { sendGTMEvent } from '@next/third-parties/google';
import CaretDown from '@/public/icon/CaretDown';
import CaretUpDown from '@/public/icon/CaretUpDown';

type Props = {
  sticky?: boolean;
};

const InventoryItemTable = (props: Props) => {
  const currency = useAtomValue(currencyAtom);
  const priceType = useAtomValue(priceTypeAtom);

  const [requestParam, setRequestParam] = useAtom(inventoryItemListAtom);
  const [openedItem, setOpenedItem] = useState<string[]>([]);
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
  const { data: itemListFresh } = useInventoryItemList(requestParam);
  const [selectedToken, setSelectedToken] = useAtom(selectedTokenAtom);
  const HEADER = [
    {
      type: 'Item',
      name: 'Item',
    },
    {
      sortCol: 'amount',
      name: 'Amount',
      sort: true,
    },
    {
      sortCol: 'acquisitionPrice',
      name: priceType === 'costBasis' ? 'Cost basis' : 'Acq. price',
      sort: true,
    },
    {
      sortCol: 'valuationType',
      name: 'Valuation Type',
      sort: true,
    },
    {
      sortCol: 'nav',
      name: 'Realtime NAV',
      sort: true,
    },
    {
      sortCol: 'unrealizedG&L',
      name: 'Unrealized G&L',
      sort: false,
    },
    {
      sortCol: 'unrealizedROI',
      name: 'Unrealized ROI',
      sort: false,
    },
    // {
    //   sortCol: 'accuracy',
    //   name: 'Accuracy',
    // },
    {
      sortCol: 'acquisitionDate',
      name: 'Acq. date',
      tooltip: LATEST_ACQUISITION_DATE,
      sort: true,
    },
  ];
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
    () =>
      inventoryItemList?.pages
        .flatMap((page) => page.data)
        .map((item) => {
          const _item = itemListFresh?.data.find(
            (itemFresh) =>
              itemFresh.collection.assetContract ===
                item.collection.assetContract &&
              itemFresh.token.tokenId === item.token.tokenId
          );
          return { ...item, ..._item };
        }),
    [inventoryItemList?.pages, requestParam, itemListFresh]
  );

  const handleOpenDetail = (target: Token) => {
    setSelectedToken(target);
    sendGTMEvent({
      event: 'buttonClicked',
      name: 'item_detail',
      parameter: `${
        target.collection.name || target.collection.assetContract
      }-${target.token.tokenId}`,
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
  const handleSort = (type: TSort) => {
    setRequestParam((prev) => ({
      ...prev,
      sortCol: type,
      // order: prev.order === 'desc' ? 'asc' : 'desc',
      sortOrder:
        prev.sortCol !== type
          ? SortOrder.Desc
          : prev.sortOrder === SortOrder.Desc
          ? SortOrder.Asc
          : SortOrder.Desc,
    }));
  };
  return (
    <React.Fragment>
      {status === 'error' && (
        <div>
          <FailToLoad />
        </div>
      )}
      {status === 'success' && mergePosts?.length === 0 && (
        <div>
          <NoData />
        </div>
      )}
      {status === 'success' && mergePosts && mergePosts.length > 0 && (
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
                  onClick={() => item.sort && handleSort(item.sortCol as TSort)}
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
                      {item.sort && (
                        <div
                          className={`inline-block align-middle ml-4 ${
                            requestParam.sortOrder === SortOrder.Asc
                              ? 'rotate-180'
                              : ''
                          }`}
                        >
                          {requestParam.sortCol === item.sortCol ? (
                            <CaretDown />
                          ) : (
                            <CaretUpDown />
                          )}
                        </div>
                      )}
                    </div>
                  ) : (
                    <div
                      className={`flex items-center ${
                        item.sort ? 'hover:text-[var(--color-text-main)]' : ''
                      } ${index !== 0 ? 'justify-end ' : ''} ${
                        requestParam.sortCol === item.sortCol
                          ? 'text-[var(--color-text-main)]'
                          : ''
                      }`}
                    >
                      <p>{item.name}</p>
                      {item.sort && (
                        <div
                          className={`inline-block align-middle ml-4 ${
                            requestParam.sortOrder === SortOrder.Asc
                              ? 'rotate-180'
                              : ''
                          }`}
                        >
                          {requestParam.sortCol === item.sortCol ? (
                            <CaretDown />
                          ) : (
                            <CaretUpDown />
                          )}
                        </div>
                      )}
                    </div>
                  )}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {mergePosts?.map((data, index) => {
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
                    className={`font-caption-regular ${styles.tableBodyRow} ${
                      isOpen && styles.isOpen
                    }`}
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
                              onError={(e) => defaultImg(e, 12)}
                            />
                          ) : (
                            <div className='w-32 h-32 bg-[--color-elevation-surface-raised] border-[var(--color-border-main)] flex items-center justify-center border-1'>
                              <ImagePlaceholder className='w-12 h-12 fill-[var(--color-background-neutral-bold)] ' />
                            </div>
                          )}
                        </div>
                        <div className='font-caption-medium max-w-[230px]  white-space-nowrap overflow-hidden text-ellipsis'>
                          <p className={`${styles.pMain} mr-0`}>
                            {data.token.name}
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
                        <Tooltip
                          content={formatCurrencyOriginal(
                            data.gasFee?.[currency] || '0',
                            currency
                          )}
                          placement='bottom-end'
                          className='font-caption-regular text-[var(--color-text-main)] bg-[var(--color-elevation-surface)] border-1 border-[var(--color-border-bold)] p-6'
                        >
                          <p
                            className={`${styles.pTd} text-[var(--color-text-brand)]`}
                          >
                            {formatGasFee(
                              data.gasFee?.[currency] || '',
                              currency
                            )}
                          </p>
                        </Tooltip>
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
                      {acquisitionPrice == 0 ? (
                        <Tooltip
                          content={UNABLE_TO_CALCULATE_ROI}
                          className='max-w-[220px] font-caption-regular text-[var(--color-text-main)] bg-[var(--color-elevation-surface)] border-1 border-[var(--color-border-bold)] p-6'
                        >
                          <div className='w-full flex justify-end text-[var(--color-icon-subtle)]'>
                            <Info />
                          </div>
                        </Tooltip>
                      ) : (
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
                                  ((parseFloatPrice(data.nav[currency].amount) -
                                    acquisitionPrice) /
                                    acquisitionPrice) *
                                  100
                                ).toString()
                              )
                            : formatPercent(
                                (
                                  ((parseFloatPrice(data.nav[currency].amount) -
                                    costBasis) /
                                    costBasis) *
                                  100
                                ).toString()
                              )}
                        </p>
                      )}
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
            })}
          </tbody>
        </table>
      )}
      <div ref={ref} />
    </React.Fragment>
  );
};
export default InventoryItemTable;
