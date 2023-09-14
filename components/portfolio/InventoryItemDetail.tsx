'use client';
import { Item } from '@/interfaces/collection';
import styles from './InventoryItemDetail.module.css';
import Image from 'next/image';
import { useMetadata } from '@/utils/hooks/queries/metadata';
import { useState } from 'react';
type Props = {
  item: Item;
};
const InventoryItemDetail = ({ item }: Props) => {
  const { data: inventoryItem, status } = useMetadata({
    networkId: item.collection.chain.name,
    assetContract: item.collection.contractAddress,
    tokenId: item.item.tokenId,
  });
  const [viewType, setViewType] = useState<'overview' | 'activity'>('overview');
  const handleToggleViewType = (type: 'overview' | 'activity') => {
    setViewType(type);
  };
  return (
    <section className={styles.container}>
      <div className={styles.metadata}>
        <Image
          src={item.item.imageUrl}
          width={250}
          height={250}
          alt={`${item.item.name}-${item.item.tokenId}`}
        />
        {inventoryItem && (
          <article className='w-full rounded border-1 border-gray-300 mt-10'>
            <ul className='w-full p-10'>
              <li className='flex w-full justify-between'>
                <p className='font-semibold text-14'>Rarity Rank</p>
                <p className='text-gray-800'>{inventoryItem?.rarityRank}</p>
              </li>
              {inventoryItem?.traits.map((trait, index) => (
                <li className='flex w-full justify-between' key={index}>
                  <p className='font-semibold text-14'>{trait.traitType}</p>
                  <p className='text-gray-800'>{trait.value}</p>
                </li>
              ))}
            </ul>
          </article>
        )}
      </div>

      <div className='w-full ml-10 flex flex-col'>
        <div className='mb-10'>
          <button
            onClick={() => handleToggleViewType('overview')}
            className={
              viewType === 'overview' ? 'text-blue-500 font-semibold' : ''
            }
          >
            overview
          </button>
          <button
            onClick={() => handleToggleViewType('activity')}
            className={
              viewType === 'activity' ? 'text-blue-500 font-semibold' : ''
            }
          >
            activity
          </button>
        </div>
        {viewType === 'overview' && (
          <div className='w-full h-full flex flex-col justify-between'>
            <div>
              <p>historical</p>
            </div>
            <table className={styles.table}>
              <thead>
                <tr className={styles.tableHeader}>
                  <th className={`${styles.tableCell2} flex justify-start`}>
                    Valuation type
                  </th>
                  <th className={`${styles.tableCell} flex justify-start`}>
                    Price
                  </th>
                  <th className={`${styles.tableCell3} flex justify-end`}>
                    Accuracy
                  </th>
                </tr>
              </thead>
              <tbody>
                {Object.keys(item.valuation).map((key) => (
                  <tr className={styles.tableRow} key={key}>
                    <td className={`${styles.tableCell2} flex justify-start`}>
                      {key}
                    </td>
                    <td className={`${styles.tableCell} flex justify-start`}>
                      0.0000 ETH
                    </td>
                    <td className={`${styles.tableCell3} flex justify-end`}>
                      {item.valuation[key].accuracy}%
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </section>
  );
};
export default InventoryItemDetail;
