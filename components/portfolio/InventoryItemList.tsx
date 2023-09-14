'use client';
import { useInventoryItemList } from '@/utils/hooks/queries/inventory';
import styles from './InventoryItemList.module.css';
import { useAtom, useAtomValue } from 'jotai';
import { inventoryItemListAtom } from '@/store/requestParam';
import Image from 'next/image';
import { currencyAtom } from '@/store/currency';
import { Valuation, ValuationItem } from '@/interfaces/collection';
import React, { useState } from 'react';
import InventoryItemDetail from './InventoryItemDetail';

const InventoryItemList = () => {
  const [requestParam, setRequestParam] = useAtom(inventoryItemListAtom);
  const [openedItem, setOpenedItem] = useState<string[]>([]);
  const { data: inventoryItemList, status } =
    useInventoryItemList(requestParam);
  const handleClickSortButton = (
    sort: 'costBasis' | 'acq_price_eth' | 'nav' | 'date'
  ) => {};
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
    console.log('handleChangeSelect @@@e: ', e);
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
            <th className={`${styles.tableCell2} flex justify-start`}>
              Cost Basis
            </th>
            <th
              className={`${styles.tableCell2} flex justify-start cursor-pointer`}
            >
              valuation type
            </th>
            <th
              className={`${styles.tableCell} flex justify-end cursor-pointer`}
              onClick={() => handleClickSortButton('acq_price_eth')}
            >
              accuracy
            </th>
            <th
              className={`${styles.tableCell2} flex justify-start`}
              onClick={() => handleClickSortButton('nav')}
            >
              NAV
            </th>
            <th
              className={`${styles.tableCell2} flex justify-end`}
              onClick={() => handleClickSortButton('date')}
            >
              Acquisition date
            </th>
          </tr>
        </thead>
        <tbody>
          {inventoryItemList?.items.map((data, index) => {
            const valuationType = selectedValueType(data.valuation);
            const itemKey = `${data.collection.contractAddress}-${data.item.tokenId}`;
            // const itemKey = `${data.item.tokenId}`;
            console.log('valuationType', valuationType);
            return (
              <React.Fragment key={index}>
                <tr
                  className={`${styles.tableRow} ${
                    openedItem.find((item) => item === itemKey) && styles.opened
                  }`}
                  onClick={() => handleOpenDetail(itemKey)}
                >
                  <td
                    className={`${styles.tableCell3} flex justify-start items-center`}
                  >
                    <div className='flex items-center justify-center rounded bg-white border-gray-200 border-1 w-50 h-50  mr-8'>
                      <Image
                        width={50}
                        height={50}
                        src={data.item.imageUrl}
                        alt={`${data.item.name}-${data.item.tokenId}`}
                        className='rounded'
                      />
                    </div>
                    {data.item.name}
                  </td>
                  <td className={styles.tableCell2}>
                    <p>{`${parseFloat(data.costBasis[currency].amount).toFixed(
                      2
                    )} ${data.costBasis[currency].currency}`}</p>
                  </td>
                  <td className={`${styles.tableCell2} flex justify-start`}>
                    <select
                      defaultValue={valuationType?.type}
                      onChange={handleChangeSelect}
                    >
                      <option value='floor'>Floor</option>
                      <option value='estimated'>Estimated</option>
                      <option value='traitsFloor'>Traits Floor</option>
                    </select>
                    {valuationType?.value.isSelected && <button>reset</button>}
                  </td>
                  <td className={`${styles.tableCell} flex justify-end`}>
                    <p>{data.valuation.floor.accuracy}%</p>
                  </td>
                  <td
                    className={`${styles.tableCell2} flex flex-col justify-start`}
                  >
                    <p>{data.nav[currency].amount}</p>
                    <p className='text-green-500'>
                      {data.nav[currency].difference?.amount || 0}{' '}
                      {`(${data.nav[currency].difference?.percentage || 0}%)`}
                    </p>
                  </td>
                  <td className={`${styles.tableCell2} flex justify-end`}>
                    <p>{data.nav.base}</p>
                  </td>
                </tr>
                {openedItem.find((item) => item === itemKey) && (
                  <InventoryItemDetail item={data} />
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
