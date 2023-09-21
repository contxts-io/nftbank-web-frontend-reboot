'use client';
import { useInventoryItemList } from '@/utils/hooks/queries/inventory';
import styles from './InventoryItemList.module.css';
import { useAtom, useAtomValue } from 'jotai';
import { TSort, inventoryItemListAtom } from '@/store/requestParam';
import Image from 'next/image';
import { currencyAtom, priceTypeAtom } from '@/store/currency';
import { Valuation, ValuationItem } from '@/interfaces/collection';
import React, { useState } from 'react';
import InventoryItemDetail from './InventoryItemDetail';
import SkeletonLoader from '@/components/SkeletonLoader';

const InventoryItemList = () => {
  const [requestParam, setRequestParam] = useAtom(inventoryItemListAtom);
  const [openedItem, setOpenedItem] = useState<string[]>([]);
  const priceType = useAtomValue(priceTypeAtom);
  const { data: inventoryItemList, status } =
    useInventoryItemList(requestParam);
  const handleClickSortButton = (sort: TSort) => {
    const order =
      requestParam.sort !== sort
        ? 'desc'
        : requestParam.order === 'desc'
        ? 'asc'
        : 'desc';
    setRequestParam({
      ...requestParam,
      sort: sort,
      order: order,
    });
  };
  const currency = useAtomValue(currencyAtom);
  const handleClickPaging = (option: 'prev' | 'next') => {
    if (option === 'prev' && requestParam.page === 1) return;
    setRequestParam({
      ...requestParam,
      page: option === 'prev' ? requestParam.page - 1 : requestParam.page + 1,
    });
  };
  const selectedValueType = (
    valuations: Valuation
  ): { type: string; value: ValuationItem } | undefined => {
    for (const key in valuations) {
      if (valuations[key].isSelected === true) {
        return { type: key, value: valuations[key] };
      }
      if (valuations[key].isDefault === true) {
        return { type: key, value: valuations[key] };
      }
    }
  };
  const handleChangeSelect = (e: React.FormEvent) => {
    e.stopPropagation();
  };
  const handleOpenDetail = (target: string) => {
    setOpenedItem((prev) => {
      if (prev.includes(target)) {
        return prev.filter((item) => item !== target);
      } else {
        return [...prev, target];
      }
    });
  };
  return (
    <section className={styles.container}>
      <table className={styles.table}>
        <thead>
          <tr className={styles.tableHeader}>
            <th className={`${styles.tableCell3} flex justify-start`}>Item</th>
            <th
              className={`${styles.tableCell2} flex justify-start cursor-pointer`}
              onClick={() => handleClickSortButton('acquisitionPrice')}
            >
              {priceType === 'costBasis'
                ? 'Total Cost basis'
                : 'Acquisition Price'}
            </th>
            <th
              className={`${styles.tableCell2} flex justify-start cursor-pointer`}
            >
              valuation type
            </th>
            <th
              className={`${styles.tableCell} flex justify-end cursor-pointer`}
              // onClick={() => handleClickSortButton('acq_price_eth')}
            >
              accuracy
            </th>
            <th
              className={`${styles.tableCell2} flex justify-start`}
              // onClick={() => handleClickSortButton('nav')}
            >
              NAV
            </th>
            <th
              className={`${styles.tableCell2} flex justify-end`}
              // onClick={() => handleClickSortButton('date')}
            >
              Acquisition date
            </th>
          </tr>
        </thead>
        <tbody>
          {status === 'loading' && (
            <tr>
              <SkeletonLoader className='w-full h-[200px]' />
            </tr>
          )}
          {status === 'success' &&
            inventoryItemList?.tokens.map((data, index) => {
              const valuationType = selectedValueType(data.valuation);
              const itemKey = `${data.collection.assetContract}-${data.token.tokenId}-${index}`;
              // const itemKey = `${data.item.tokenId}`;
              console.log('valuationType', valuationType);
              return (
                <React.Fragment key={index}>
                  <tr
                    className={`${styles.tableRow} ${
                      openedItem.find((item) => item === itemKey) &&
                      styles.opened
                    }`}
                    onClick={() => handleOpenDetail(itemKey)}
                  >
                    <td
                      className={`${styles.tableCell3} flex justify-start items-center`}
                    >
                      <div className='flex items-center justify-center rounded bg-white border-gray-200 border-1 w-50 h-50  mr-8'>
                        {data.token.imageUrl && (
                          <Image
                            width={50}
                            height={50}
                            src={data.token.imageUrl}
                            alt={`${data.token.name}-${data.token.tokenId}`}
                            className='rounded'
                          />
                        )}
                      </div>
                      {data.token.name ||
                        `${data.collection.name}-${data.token.tokenId}`}
                    </td>
                    <td className={styles.tableCell2}>
                      <p>{`${parseFloat(
                        data[priceType]?.[currency]?.amount || '0'
                      ).toFixed(2)} ${
                        data[priceType]?.[currency].currency
                      }`}</p>
                      {priceType === 'costBasis' && (
                        <p className='text-blue-500'>
                          {`GAS +${parseFloat(
                            data.gasFee?.[currency].amount || '0'
                          ).toFixed(3)}`}
                        </p>
                      )}
                    </td>
                    <td className={`${styles.tableCell2} flex justify-start`}>
                      <select
                        defaultValue={valuationType?.type}
                        onChange={handleChangeSelect}
                        onClick={(e) => e.stopPropagation()}
                      >
                        <option value='floor'>Floor</option>
                        <option value='estimated'>Estimated</option>
                        <option value='traitsFloor'>Traits Floor</option>
                      </select>
                      {valuationType?.value.isSelected && (
                        <button>reset</button>
                      )}
                    </td>
                    <td className={`${styles.tableCell} flex justify-end`}>
                      <p>{data.valuation?.floor?.accuracy || 0}%</p>
                    </td>
                    <td
                      className={`${styles.tableCell2} flex flex-col justify-start`}
                    >
                      <p>
                        {parseFloat(data.nav[currency]?.amount || '0').toFixed(
                          2
                        )}{' '}
                        {data.nav[currency].currency}
                      </p>
                      <p className='text-green-500'>
                        {parseFloat(
                          data.nav[currency].difference?.amount || '0'
                        ).toFixed(2)}
                        {`(${data.nav[currency].difference?.percentage || 0}%)`}
                      </p>
                    </td>
                    <td className={`${styles.tableCell2} flex justify-end`}>
                      <p>{data.nav.base}</p>
                    </td>
                  </tr>
                  {openedItem.find((item) => item === itemKey) && (
                    <InventoryItemDetail token={data} />
                  )}
                </React.Fragment>
              );
            })}
        </tbody>
      </table>
      <div className='flex w-full justify-center items-center mt-16'>
        <button onClick={() => handleClickPaging('prev')}>PREV</button>
        {inventoryItemList && (
          <p className='mx-10'>
            current : {inventoryItemList.paging.page} / total :
            {Math.ceil(
              inventoryItemList.paging.total / inventoryItemList.paging.limit
            )}
          </p>
        )}
        <button onClick={() => handleClickPaging('next')}>NEXT</button>
      </div>
    </section>
  );
};
export default InventoryItemList;
