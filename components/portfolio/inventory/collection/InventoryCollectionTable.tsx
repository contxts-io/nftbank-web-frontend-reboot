'use client';
import {
  useInventoryCollectionList,
  useInventoryCollectionsInfinite,
} from '@/utils/hooks/queries/inventory';
import styles from './InventoryCollectionTable.module.css';
import { useAtom, useAtomValue, useSetAtom } from 'jotai';
import { currencyAtom, priceTypeAtom } from '@/store/currency';
import { TSort, inventoryCollectionAtom } from '@/store/requestParam';
import SkeletonLoader from '../../../SkeletonLoader';
import { Collection, TValuation } from '@/interfaces/collection';
import { inventoryTypeAtom } from '@/store/settings';
import { selectedCollectionInventoryAtom } from '@/store/portfolio';
import { useEffect, useMemo } from 'react';
import Ethereum from '@/public/icon/Ethereum';
import {
  formatCurrency,
  formatCurrencyOriginal,
  formatGasFee,
  formatPercent,
  isPlus,
  parseFloatPrice,
  shortenAddress,
} from '@/utils/common';
import { useInView } from 'react-intersection-observer';
import { ValuationTypes } from '@/utils/ValuationTypes';
import ImagePlaceholder from '@/public/icon/ImagePlaceholder';
import FailToLoad from '@/components/error/FailToLoad';
import NoData from '@/components/error/NoData';
import { Tooltip } from '@nextui-org/react';
import { UNABLE_TO_CALCULATE_ROI } from '@/utils/messages';
import Info from '@/public/icon/Info';
import { sendGTMEvent } from '@next/third-parties/google';

const InventoryCollectionTable = () => {
  const priceType = useAtomValue(priceTypeAtom);
  const T_HEADER = [
    // {
    //   name: 'Chain',
    // },
    {
      name: 'Collection',
    },
    {
      name: 'Amount',
      key: 'amount',
      sort: 'amount',
    },
    {
      name: priceType === 'costBasis' ? 'Cost basis' : 'Acq. price',
      key: 'costBasis',
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
  const currency = useAtomValue(currencyAtom);
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
  const { data: collectionListFresh } = useInventoryCollectionList(
    inventoryCollectionRequestParam
  );
  const collections = useMemo(
    () =>
      data?.pages
        .flatMap((page) => page.data)
        .map((item) => {
          const collection = collectionListFresh?.data.find(
            (collection) =>
              collection.collection.assetContract ===
              item.collection.assetContract
          );
          return { ...item, ...collection };
        }),
    [data?.pages, collectionListFresh]
  );
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
    sendGTMEvent({
      event: 'buttonClicked',
      name: 'collection_detail',
      parameter: collection.collection.name,
    });
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
  useEffect(() => {
    console.log('collections', collections);
    console.log('collectionListFresh', collectionListFresh);
  }, [collections, collectionListFresh]);
  if (status === 'loading')
    return <SkeletonLoader className='w-full h-[200px]' />;
  return (
    <section className={styles.container}>
      {status === 'error' && (
        <div className='mt-40'>
          <FailToLoad />
        </div>
      )}
      {status === 'success' && collections?.length === 0 && (
        <div>
          <NoData />
        </div>
      )}
      {status === 'success' && collections && collections.length > 0 && (
        <div className='w-full'>
          <table className={`${styles.table} relative`}>
            <thead className='sticky md:top-118 bg-[var(--color-elevation-surface)] h-fit border-b-1 border-[var(--color-border-main)] z-20'>
              <tr className='h-fit'>
                {T_HEADER.map((item, index) => (
                  <th
                    key={index}
                    className={`font-caption-medium text-[var(--color-text-subtle)] py-12
                ${index > 0 ? 'text-right' : 'text-left'}
                ${item.sort && 'cursor-pointer'}
                ${index === 0 && 'pl-16'}
                ${index === T_HEADER.length - 1 && 'pr-16'}
                `}
                    onClick={() =>
                      item.sort && handleClickSortButton(item.sort as TSort)
                    }
                  >
                    <p className={index > 1 ? styles.pTd : ''}>{item.name}</p>
                  </th>
                ))}
                {/* <th className='text-right'>
              <p className='ml-40'> </p>
            </th> */}
              </tr>
            </thead>
            <tbody className='h-full z-0'>
              {collections?.map((row, index) => {
                const valuationType = selectedValueType(row.valuation);
                const acquisitionPrice = parseFloatPrice(
                  row.acquisitionPrice?.[currency]
                );
                const costBasis =
                  parseFloatPrice(row.acquisitionPrice?.[currency]) +
                  parseFloatPrice(row.gasFee?.[currency]);
                const unrealizedGL =
                  parseFloatPrice(row.nav[currency].amount) -
                  parseFloatPrice(row.acquisitionPrice?.[currency]);
                return (
                  <tr
                    key={`${index}`}
                    className={`font-caption-regular cursor-pointer ${styles.tableRow}`}
                    onClick={() => handleClickCollection(row)}
                  >
                    {/* <td className='flex items-center h-full'>
                      <Ethereum
                        width={24}
                        height={24}
                        className='ml-16 w-24 h-24 rounded-full flex items-center justify-center border-1 border-[var(--color-border-main)]'
                      />
                    </td> */}
                    <td className='pl-16'>
                      <article className='flex items-center'>
                        {row.collection.imageUrl ? (
                          <div className='w-24 h-24 rounded-full overflow-hidden border-1 border-[var(--color-border-main)] mr-12 '>
                            <img
                              src={row.collection.imageUrl}
                              className='rounded-full w-full object-center'
                              alt={
                                row.collection.name ||
                                row.collection.assetContract
                              }
                            />
                          </div>
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
                      <p className={styles.pTd}>{parseInt(row.amount)}</p>
                    </td>
                    <td className='text-right'>
                      <p className={styles.pTd}>
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
                            row.gasFee?.[currency] || '0',
                            currency
                          )}
                          placement='bottom-end'
                          className='font-caption-regular text-[var(--color-text-main)] bg-[var(--color-elevation-surface)] border-1 border-[var(--color-border-bold)] p-6'
                        >
                          <p
                            className={`${styles.pTd} text-[var(--color-text-brand)]`}
                          >
                            {`${formatGasFee(
                              row.gasFee?.[currency] || null,
                              currency
                            )} `}
                          </p>
                        </Tooltip>
                      )}
                    </td>
                    {/* coast basis */}
                    {/**
                   * 
                   * sprint 1
                   * 
                   * 
                   *  {!row[priceType] ? (
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
                            ? `+${parseFloat(
                                row.gasFee[currency] || ''
                              ).toFixed(3)} `
                            : ''}
                        </p>
                      )}
                    </td>
                  )} */}
                    {/* valuation type */}
                    <td className='text-right'>
                      {/**
                     * 
                     * sprint 1
                     * 
                     * 
                     *  {row.valuation.length > 1 ? (
                      <ValuationDropdown
                        collection={row}
                        valuations={row.valuation}
                      />
                    ) : (
                      <p>no available price</p>
                    )} */}
                      <p>{ValuationTypes(row.valuation)}</p>
                    </td>

                    {/* realtime nav */}
                    <td className='text-right'>
                      <p className={`${styles.pTd}`}>
                        {formatCurrency(
                          row.nav[currency].amount || null,
                          currency
                        ) || '-'}
                      </p>
                    </td>
                    {/* unrealized G&L */}
                    <td className='text-right'>
                      <p
                        className={`${styles.pTd} ${
                          isPlus(unrealizedGL)
                            ? 'text-[var(--color-text-success)]'
                            : 'text-[var(--color-text-danger)]'
                        }`}
                      >
                        {priceType === 'costBasis'
                          ? formatCurrency(
                              (
                                unrealizedGL -
                                parseFloatPrice(row.gasFee?.[currency])
                              ).toString(),
                              currency
                            )
                          : formatCurrency(unrealizedGL.toString(), currency)}
                      </p>
                    </td>
                    {/* unrealized ROI */}
                    <td className='text-right'>
                      {acquisitionPrice == 0 ? (
                        <Tooltip
                          content={UNABLE_TO_CALCULATE_ROI}
                          className='max-w-[220px] font-caption-regular text-[var(--color-text-main)] bg-[var(--color-elevation-surface)] border-1 border-[var(--color-border-bold)] p-6'
                        >
                          <div className='w-full flex justify-end text-[var(--color-icon-subtle)] pr-16'>
                            <Info />
                          </div>
                        </Tooltip>
                      ) : (
                        <p
                          className={`${styles.pTd} ${
                            isPlus(unrealizedGL)
                              ? 'text-[var(--color-text-success)]'
                              : 'text-[var(--color-text-danger)]'
                          } pr-16`}
                        >
                          {priceType === 'costBasis'
                            ? formatPercent(
                                (
                                  ((unrealizedGL -
                                    parseFloatPrice(row.gasFee?.[currency])) *
                                    100) /
                                  costBasis
                                ).toString()
                              )
                            : formatPercent(
                                (
                                  (unrealizedGL * 100) /
                                  (costBasis -
                                    parseFloatPrice(row.gasFee?.[currency]))
                                ).toString()
                              )}
                        </p>
                      )}
                    </td>
                    {/**
                   * 
                   * sprint 1
                   * 
                   * 
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
                      {`${formatPercent(
                        row.nav[currency].difference?.percentage || '0'
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
                  */}
                  </tr>
                );
              })}
            </tbody>
          </table>
          <div ref={ref} />
        </div>
      )}
    </section>
  );
};
export default InventoryCollectionTable;
