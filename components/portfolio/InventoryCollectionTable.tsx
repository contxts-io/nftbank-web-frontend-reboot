'use client';
import { useInventoryCollectionList } from '@/utils/hooks/queries/inventory';
import styles from './InventoryCollectionTable.module.css';
import { useAtomValue } from 'jotai';
import { currencyAtom } from '@/store/currency';
import Image from 'next/image';
import { inventoryCollectionAtom } from '@/store/requestParam';
import { useEffect, useState } from 'react';
import { IInventoryCollectionList } from '@/interfaces/inventory';
const InventoryCollectionTable = () => {
  const currency = useAtomValue(currencyAtom);
  const inventoryCollectionRequestParam = useAtomValue(inventoryCollectionAtom);
  const { data, status } = useInventoryCollectionList(
    inventoryCollectionRequestParam
  );
  const [inventoryCollection, setInventoryCollection] =
    useState<IInventoryCollectionList | null>(null);
  useEffect(() => {
    data && setInventoryCollection(data);
  }, [data]);
  return (
    <div className={styles.container}>
      <table className={styles.table}>
        <thead>
          <tr className={styles.tableHeader}>
            <th className={styles.tableCell}>Chain</th>
            <th className={`${styles.tableCell3} flex justify-start`}>
              Collection
            </th>
            <th className={`${styles.tableCell} flex justify-end`}>Amount</th>
            <th className={`${styles.tableCell2} flex justify-end`}>
              Total Cost basis
            </th>
            <th className={`${styles.tableCell2} flex justify-end`}>
              Valuation Type
            </th>
            <th className={`${styles.tableCell2} flex justify-end`}>
              Current Realtime NAV
            </th>
            <th className={styles.tableCell} />
          </tr>
        </thead>

        <tbody>
          {inventoryCollection &&
            inventoryCollection.collections.map((row, index) => {
              return (
                <tr className={styles.tableRow} key={index}>
                  <td className={`${styles.tableCell} flex justify-center`}>
                    <div className='flex items-center justify-center rounded-full bg-white border-gray-200 border-1 w-50 h-50'>
                      <Image
                        width={25}
                        height={25}
                        src={row.collection.chain.imageUrl}
                        alt={row.collection.name}
                      />
                    </div>
                  </td>
                  <td className={styles.tableCell3}>
                    <div className='flex items-center'>
                      <Image
                        width={35}
                        height={35}
                        src={row.collection.imageUrl}
                        className='rounded-full mr-8'
                        alt={row.collection.name}
                      />
                      {row.collection.name}
                    </div>
                  </td>
                  <td className={`${styles.tableCell} flex justify-end`}>
                    <p>{row.amount}</p>
                  </td>
                  <td className={`${styles.tableCell2} flex justify-end`}>
                    <p>
                      {`${parseFloat(row.costBasis[currency].amount).toFixed(
                        2
                      )} ${row.costBasis[currency].currency} `}
                    </p>
                  </td>
                  <td className={`${styles.tableCell2} flex justify-end`}>
                    <p>{row.valuation.type}</p>
                  </td>
                  <td className={`${styles.tableCell2} flex justify-end`}>
                    <div className='flex flex-col w-full items-end'>
                      <p>{`${row.nav[currency].currency} ${parseFloat(
                        row.nav[currency].amount
                      ).toFixed(2)}`}</p>
                      <p
                        className={
                          row.nav.difference.percentage > 0
                            ? 'text-green-500'
                            : 'text-red-500'
                        }
                      >{`${row.nav.difference[currency].amount} (${row.nav.difference.percentage}%)`}</p>
                    </div>
                  </td>
                  <td className={`${styles.tableCell} flex justify-center `}>
                    <button>spam</button>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
};
export default InventoryCollectionTable;
