'use client';
import { useInventoryItemInfinite } from '@/utils/hooks/queries/inventory';
import styles from './InventoryItemTable.module.css';
import { useAtom, useAtomValue } from 'jotai';
import { inventoryItemListAtom } from '@/store/requestParam';
import Image from 'next/image';
import { TValuation, Token } from '@/interfaces/collection';
import { currencyAtom, priceTypeAtom } from '@/store/currency';
import React, { useEffect, useMemo, useState } from 'react';
import InventoryItemDetail from './InventoryItemDetail';
import CaretDown from '@/public/icon/CaretDown';
import {
  formatCurrency,
  formatDate,
  formatPercent,
  isPlus,
  mappingConstants,
  shortenAddress,
} from '@/utils/common';
import { useInView } from 'react-intersection-observer';
import { useInventoryItemPerformance } from '@/utils/hooks/queries/performance';
import ReactQueryClient from '@/utils/ReactQueryClient';
import { twMerge } from 'tailwind-merge';
import Check from '@/public/icon/Check';
import { ValuationEdit } from '@/interfaces/valuation';
import { TValuationType } from '@/interfaces/constants';
import CustomValuationSaveToast from './CustomValuationSaveToast';
import { customValuationAtom } from '@/store/portfolio';
import ClockClockwise from '@/public/icon/ClockClockwise';
import ValuationDropdown from './ValuationDropdown';
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
type Props = {
  onClick: (valuationType: TValuationType) => void;
  valuations: TValuation[];
  selectedValuation: TValuation | undefined;
};
const Dropdown = ({ onClick, valuations, selectedValuation }: Props) => {
  return (
    <div className={`font-caption-medium ${styles.dropdown}`}>
      {valuations.map((valuation, index) => {
        return (
          <li
            className={styles.dropdownRow}
            key={index}
            onClick={() => onClick(valuation.type)}
          >
            <p>{`${mappingConstants(valuation.type)} (${formatPercent(
              valuation.accuracy
            )})`}</p>
            {selectedValuation?.type === valuation.type && (
              <div className={styles.icon}>
                <Check />
              </div>
            )}
          </li>
        );
      })}
    </div>
  );
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
                        {data.costBasis?.[currency] &&
                          formatCurrency(
                            data.costBasis[currency].amount,
                            currency
                          )}
                        {priceType === 'acquisitionPrice' && (
                          <p className='text-[var(--color-text-brand)]'>
                            {data.gasFee?.[currency]?.amount
                              ? `GAS +${parseFloat(
                                  data.gasFee[currency].amount || ''
                                ).toFixed(3)} `
                              : ''}
                          </p>
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
                          className={`${
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
                      <td
                        className='text-right cursor-pointer'
                        // onClick={(e) => {
                        //   e.stopPropagation();
                        //   setView({
                        //     key: `${pageIndex}-${index}`,
                        //     open: !view.open,
                        //   });
                        // }}
                      >
                        <ValuationDropdown
                          token={data}
                          valuations={data.valuation}
                        />
                        {/* <ul className='relative ml-8'>
                          {valuationType?.type && (
                            <div className='flex items-center justify-end'>
                              <p className='mr-8'>{`${mappingConstants(
                                valuationType.type
                              )}`}</p>
                              <div
                                className={`${
                                  view.open &&
                                  view.key === `${pageIndex}-${index}` &&
                                  'rotate-180'
                                }`}
                              >
                                <CaretDown />
                              </div>
                              {valuationType.selected && (
                                <div
                                  className={`text-[var(--color-icon-brand)]`}
                                >
                                  <ClockClockwise />
                                </div>
                              )}
                            </div>
                          )}
                          {view.open &&
                            view.key === `${pageIndex}-${index}` && (
                              <Dropdown
                                onClick={(valuationType: TValuationType) =>
                                  handleSelectValuation({
                                    assetContract:
                                      data.collection.assetContract,
                                    tokenId: data.token.tokenId,
                                    networkId: 'ethereum',
                                    valuationType: valuationType,
                                  })
                                }
                                selectedValuation={valuationType}
                                valuations={data.valuation}
                              />
                            )}
                        </ul> */}
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
    </React.Fragment>
  );
};
export default InventoryItemTable;
