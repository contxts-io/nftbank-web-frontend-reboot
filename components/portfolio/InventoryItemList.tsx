'use client';
import { useInventoryItemList } from '@/utils/hooks/queries/inventory';
import styles from './InventoryItemList.module.css';
import { useAtom, useAtomValue } from 'jotai';
import { inventoryItemListAtom } from '@/store/requestParam';
import Image from 'next/image';
import { currencyAtom } from '@/store/currency';
import Pagination from '../pagination';
const InventoryItemList = () => {
  const [requestParam, setRequestParam] = useAtom(inventoryItemListAtom);
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
  return (
    <section className={styles.container}>
      <table className={styles.table}>
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
        <tbody>
          {inventoryItemList?.items.map((data, index) => {
            return (
              <tr key={index} className={styles.tableRow}>
                <td
                  className={`${styles.tableCell3} flex justify-start items-center`}
                >
                  <div className='flex items-center justify-center rounded-full bg-white border-gray-200 border-1 w-50 h-50'>
                    <Image
                      width={25}
                      height={25}
                      src={data.item.imageUrl}
                      alt={`${data.item.name}-${data.item.tokenId}`}
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
                  <select>
                    <option value=''>Select</option>
                  </select>
                </td>
                <td className={`${styles.tableCell} flex justify-end`}>
                  <p>{data.valuation.floor.accuracy}%</p>
                </td>
                <td className={`${styles.tableCell2} flex justify-start`}>
                  <p>{data.nav[currency].amount}</p>
                </td>
                <td className={`${styles.tableCell2} flex justify-end`}>
                  <p>{data.nav.base}</p>
                </td>
              </tr>
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
