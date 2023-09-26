'use client';
import { useInventoryItemList } from '@/utils/hooks/queries/inventory';
import styles from './InventoryItemTable.module.css';
import { useAtom, useAtomValue } from 'jotai';
import { inventoryItemListAtom } from '@/store/requestParam';
import Image from 'next/image';
import { TValuation } from '@/interfaces/collection';
import { currencyAtom } from '@/store/currency';
import React, { useState } from 'react';
import InventoryItemDetail from './InventoryItemDetail';
import CaretDown from '@/public/icon/CaretDown';
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
  const { data: inventoryItemList, status } =
    useInventoryItemList(requestParam);
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
    <table className={`${styles.table} dark:border-border-main-dark`}>
      <thead>
        <tr className={`${styles.tableHeadRow} dark:border-border-main-dark`}>
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
        </tr>
      </thead>
      <tbody>
        {status === 'success' &&
          inventoryItemList?.tokens.map((data, index) => {
            const valuationType = selectedValueType(data.valuation);
            const itemKey = `${data.collection.assetContract}-${data.token.tokenId}-${index}`;

            return (
              <React.Fragment key={index}>
                <tr
                  key={index}
                  className='font-caption-medium cursor-pointer border-b-1 border-border-disabled dark:border-border-disabled-dark hover:bg-elevation-sunken dark:hover:bg-elevation-sunken-dark'
                  onClick={() => handleOpenDetail(itemKey)}
                >
                  <td className='text-left p-0 '>
                    <div className='flex items-center my-8'>
                      <div className='w-32 h-32 border-1 flex items-center overflow-hidden justify-center border-border-main dark:border-border-main-dark mr-8'>
                        <Image
                          src={data.token.imageUrl || '/icon/nftbank_icon.svg'}
                          width={32}
                          height={32}
                          alt={`${data.collection.name}-${data.token.name}-${data.token.tokenId}`}
                        />
                      </div>
                      <div>
                        <p
                          className={`${styles.pMain} dark:text-text-main-dark`}
                        >
                          {data.token.tokenId}
                        </p>
                        <p
                          className={`${styles.pSub} dark:text-text-subtle-dark`}
                        >
                          {data.token.name}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className='text-right'>{data.amount}</td>
                  <td className='text-right'>
                    {data.costBasis[currency].amount}
                  </td>
                  <td className='text-right'>{data.nav[currency].amount}</td>
                  <td className='text-right'>{data.nav[currency].amount}</td>
                  <td className='text-right'>{data.nav[currency].amount}</td>
                  <td className='text-right'>{valuationType?.type}</td>
                  <td className='text-right'>{valuationType?.accuracy}</td>
                  <td className='text-right'>
                    {data.acquisitionDate.substring(0, 10)}
                  </td>
                  <td className='text-right'>
                    <button
                      className={`${styles.expandButton} dark:border-border-bold-dark`}
                    >
                      <CaretDown />
                    </button>
                  </td>
                </tr>
                {openedItem.find((item) => item === itemKey) && (
                  <tr>
                    <td colSpan={HEADER.length + 1}>
                      <InventoryItemDetail token={data} />
                    </td>
                  </tr>
                )}
              </React.Fragment>
              // <React.Fragment key={index}>
              //   <tr
              //     className={`${styles.tableRow} ${
              //       openedItem.find((item) => item === itemKey) &&
              //       styles.opened
              //     }`}
              //     onClick={() => handleOpenDetail(itemKey)}
              //   >
              //     <td
              //       className={`${styles.tableCell3} flex justify-start items-center`}
              //     >
              //       <div className='flex items-center justify-center rounded bg-white border-gray-200 border-1 w-50 h-50  mr-8'>
              //         {data.token.imageUrl && (
              //           <Image
              //             width={50}
              //             height={50}
              //             src={data.token.imageUrl}
              //             alt={`${data.token.name}-${data.token.tokenId}`}
              //             className='rounded'
              //           />
              //         )}
              //       </div>
              //       {data.token.name ||
              //         `${data.collection.name}-${data.token.tokenId}`}
              //     </td>
              //     <td className={styles.tableCell2}>
              //       <p>{`${parseFloat(
              //         data[priceType]?.[currency]?.amount || '0'
              //       ).toFixed(2)} ${
              //         data[priceType]?.[currency].currency
              //       }`}</p>
              //       {priceType === 'costBasis' && (
              //         <p className='text-blue-500'>
              //           {`GAS +${parseFloat(
              //             data.gasFee?.[currency].amount || '0'
              //           ).toFixed(3)}`}
              //         </p>
              //       )}
              //     </td>
              //     <td className={`${styles.tableCell2} flex justify-start`}>
              //       <select
              //         defaultValue={valuationType?.type}
              //         onChange={handleChangeSelect}
              //         onClick={(e) => e.stopPropagation()}
              //       >
              //         <option value='floor'>Floor</option>
              //         <option value='estimated'>Estimated</option>
              //         <option value='traitsFloor'>Traits Floor</option>
              //       </select>
              //       {valuationType?.value.isSelected && (
              //         <button>reset</button>
              //       )}
              //     </td>
              //     <td className={`${styles.tableCell} flex justify-end`}>
              //       <p>{data.valuation?.floor?.accuracy || 0}%</p>
              //     </td>
              //     <td
              //       className={`${styles.tableCell2} flex flex-col justify-start`}
              //     >
              //       <p>
              //         {parseFloat(data.nav[currency]?.amount || '0').toFixed(
              //           2
              //         )}{' '}
              //         {data.nav[currency].currency}
              //       </p>
              //       <p className='text-green-500'>
              //         {parseFloat(
              //           data.nav[currency].difference?.amount || '0'
              //         ).toFixed(2)}
              //         {`(${
              //           data.nav[currency].difference?.percentage?.toFixed(
              //             2
              //           ) || 0
              //         }%)`}
              //       </p>
              //     </td>
              //     <td className={`${styles.tableCell2} flex justify-end`}>
              //       <p>{data.nav.base}</p>
              //     </td>
              //   </tr>
              //   {openedItem.find((item) => item === itemKey) && (
              //     <InventoryItemDetail token={data} />
              //   )}
              // </React.Fragment>
            );
          })}
      </tbody>
    </table>
  );
};
export default InventoryItemTable;
