'use client';
import { Token } from '@/interfaces/collection';
import styles from './InventoryItemDetail.module.css';
import Image from 'next/image';
import { useMetadata } from '@/utils/hooks/queries/metadata';
import { useState } from 'react';
import InventoryItemActivity from './InventoryItemActivity';
type Props = {
  token: Token;
};
const InventoryItemDetail = ({ token }: Props) => {
  const { data: inventoryItem, status } = useMetadata({
    networkId: token.collection.chain.name,
    assetContract: token.collection.assetContract,
    tokenId: token.token.tokenId,
  });
  const [viewType, setViewType] = useState<'overview' | 'activity'>('overview');
  const handleToggleViewType = (type: 'overview' | 'activity') => {
    setViewType(type);
  };
  return (
    <section className={styles.container}>
      <div className='mb-10 w-full flex justify-end'>
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

      <div className='w-full ml-10 flex flex-col'>
        {viewType === 'overview' && (
          <article className='flex justify-between'>
            <div className={styles.metadata}>
              <Image
                src={token.token.imageUrl}
                width={250}
                height={250}
                alt={`${token.token.name}-${token.token.tokenId}`}
              />
              {inventoryItem && (
                <article className='w-full rounded border-1 border-gray-300 mt-10'>
                  <ul className='w-full p-10'>
                    <li className='flex w-full justify-between'>
                      <p className='font-semibold text-14'>Rarity Rank</p>
                      <p className='text-gray-800'>
                        {inventoryItem?.rarityRank}
                      </p>
                    </li>
                    {inventoryItem?.traits.map((trait, index) => (
                      <li className='flex w-full justify-between' key={index}>
                        <p className='font-semibold text-14'>
                          {trait.traitType}
                        </p>
                        <p className='text-gray-800'>{trait.value}</p>
                      </li>
                    ))}
                  </ul>
                </article>
              )}
            </div>
            <div className='w-full h-full flex flex-col justify-between'>
              <div className='w-full h-[300px] px-10'>
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
                  {token.valuation.map((valuation, index) => (
                    <tr className={styles.tableRow} key={index}>
                      <td className={`${styles.tableCell2} flex justify-start`}>
                        {valuation.type}
                      </td>
                      <td className={`${styles.tableCell} flex justify-start`}>
                        {valuation.accuracy}
                      </td>
                      <td className={`${styles.tableCell3} flex justify-end`}>
                        {valuation.accuracy}%
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </article>
        )}
        {viewType === 'activity' && <InventoryItemActivity token={token} />}
      </div>
    </section>
  );
};
export default InventoryItemDetail;
