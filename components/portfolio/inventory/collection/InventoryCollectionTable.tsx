'use client';
import { useInventoryCollectionList } from '@/utils/hooks/queries/inventory';
import styles from './InventoryCollectionTable.module.css';
import { useAtom, useAtomValue, useSetAtom } from 'jotai';
import { currencyAtom, priceTypeAtom } from '@/store/currency';
import Image from 'next/image';
import { TSort, inventoryCollectionAtom } from '@/store/requestParam';
import SkeletonLoader from '../../../SkeletonLoader';
import { Collection } from '@/interfaces/collection';
import { inventoryTypeAtom } from '@/store/settings';
import { selectedCollectionInventoryAtom } from '@/store/portfolio';
import { ChangeEvent } from 'react';

const InventoryCollectionTable = () => {
  const currency = useAtomValue(currencyAtom);
  const priceType = useAtomValue(priceTypeAtom);
  const [inventoryType, setInventoryType] = useAtom(inventoryTypeAtom);
  const setSelectedCollection = useSetAtom(selectedCollectionInventoryAtom);
  const [inventoryCollectionRequestParam, setInventoryCollectionRequestParam] =
    useAtom(inventoryCollectionAtom);
  const { data: inventoryCollection, status } = useInventoryCollectionList(
    inventoryCollectionRequestParam
  );
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
    setSelectedCollection(collection);
    setInventoryType('item');
  };
  const handleClickPaging = (option: 'prev' | 'next') => {
    if (option === 'prev' && inventoryCollectionRequestParam.page === 1) return;
    setInventoryCollectionRequestParam({
      ...inventoryCollectionRequestParam,
      page:
        option === 'prev'
          ? inventoryCollectionRequestParam.page - 1
          : inventoryCollectionRequestParam.page + 1,
    });
  };
  const handleChangePage = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.value) return;
    const page = parseInt(e.target.value || '1') || 1;
    console.log('page ', page);
    if (
      inventoryCollection &&
      page >
        Math.ceil(
          inventoryCollection.paging.total / inventoryCollection.paging.limit
        )
    )
      return;
    setInventoryCollectionRequestParam({
      ...inventoryCollectionRequestParam,
      page: page,
    });
  };
  if (status === 'error') return <div>error</div>;
  return (
    <section className={styles.container}>
      <table className={styles.table}>
        <thead>
          <tr className={styles.tableHeader}>
            <th className={`${styles.tableCell} flex justify-center`}>Chain</th>
            <th className={`${styles.tableCell3} flex justify-start`}>
              Collection
            </th>
            <th
              className={`${styles.tableCell} flex justify-end cursor-pointer`}
              onClick={() => handleClickSortButton('amount')}
            >
              Amount
            </th>
            <th
              className={`${styles.tableCell2} flex justify-end cursor-pointer`}
              onClick={() => handleClickSortButton('acquisitionPrice')}
            >
              {priceType === 'costBasis'
                ? 'Total Cost basis'
                : 'Acquisition Price'}
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
          {status === 'loading' && (
            <tr>
              <SkeletonLoader className='w-full h-[200px]' />
            </tr>
          )}
          {inventoryCollection &&
            inventoryCollection.collections.map((row, index) => {
              return (
                <tr
                  className={styles.tableRow}
                  key={index}
                  onClick={() => handleClickCollection(row)}
                >
                  <td className={`${styles.tableCell} flex justify-center`}>
                    <div className='flex items-center justify-center rounded-full bg-white border-gray-200 border-1 w-50 h-50'>
                      <Image
                        width={25}
                        height={25}
                        src={row.collection.chain.imageUrl}
                        alt={
                          row.collection.name || row.collection.assetContract
                        }
                      />
                    </div>
                  </td>
                  <td className={styles.tableCell3}>
                    <div className='flex items-center'>
                      {row.collection.imageUrl && (
                        <Image
                          width={50}
                          height={50}
                          src={row.collection.imageUrl}
                          className='rounded-full mr-8'
                          alt={row.collection.name}
                        />
                      )}
                      {row.collection.name || row.collection.assetContract}
                    </div>
                  </td>
                  <td className={`${styles.tableCell} flex justify-end`}>
                    <p>{row.amount}</p>
                  </td>
                  <td
                    className={`${styles.tableCell2} flex flex-col justify-center items-end`}
                  >
                    <p>
                      {`${parseFloat(
                        row[priceType]?.[currency].amount || ''
                      ).toFixed(2)} ${row[priceType]?.[currency].currency} `}
                    </p>
                    {priceType === 'costBasis' && (
                      <p className='text-blue-500'>
                        {row.gasFee?.[currency]?.amount
                          ? `GAS +${parseFloat(
                              row.gasFee[currency].amount || ''
                            ).toFixed(3)} `
                          : ''}
                      </p>
                    )}
                  </td>
                  <td className={`${styles.tableCell2} flex justify-end`}>
                    <p>
                      {row.valuation.find((item) => item.selected)?.type ||
                        row.valuation.find((item) => item.default)?.type}
                    </p>
                  </td>
                  <td className={`${styles.tableCell2} flex justify-end`}>
                    <div className='flex flex-col w-full items-end'>
                      <p>{`${row.nav[currency].currency} ${parseFloat(
                        row.nav[currency].amount || '0'
                      ).toFixed(2)}`}</p>
                      <p
                        className={
                          row.nav[currency].difference.percentage || 0 > 0
                            ? 'text-green-500'
                            : 'text-red-500'
                        }
                      >{`${row.nav[currency].difference.amount} (${row.nav[currency].difference.percentage}%)`}</p>
                    </div>
                  </td>
                  <td className={`${styles.tableCell} flex justify-center `}>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        console.log('spam');
                      }}
                    >
                      spam
                    </button>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
      <div className='flex w-full justify-center items-center'>
        <button onClick={() => handleClickPaging('prev')}>PREV</button>
        {status === 'success' && inventoryCollection && (
          <div className='flex justify-center items-center'>
            {/* <input
              type='text'
              value={inventoryCollectionRequestParam.page}
              onChange={handleChangePage}
            /> */}
            <p className='mx-10'>
              current : {inventoryCollection.paging.page}/ total :
              {Math.ceil(
                inventoryCollection.paging.total /
                  inventoryCollection.paging.limit
              )}
            </p>
          </div>
        )}
        <button onClick={() => handleClickPaging('next')}>NEXT</button>

        <select
          defaultValue={inventoryCollection?.paging.limit}
          onChange={(e) => {
            setInventoryCollectionRequestParam({
              ...inventoryCollectionRequestParam,
              page: 1,
              limit: parseInt(e.target.value),
            });
          }}
        >
          <option value={10}>10</option>
          <option value={50}>50</option>
          <option value={100}>100</option>
        </select>
      </div>
    </section>
  );
};
export default InventoryCollectionTable;
