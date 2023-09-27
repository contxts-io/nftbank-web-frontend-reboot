'use client';
import { Token } from '@/interfaces/collection';
import styles from './InventoryItemDetail.module.css';
import Image from 'next/image';
import { useMetadata } from '@/utils/hooks/queries/metadata';
import { useState } from 'react';
import InventoryItemActivity from './InventoryItemActivity';
import Tag from '@/public/icon/Tag';
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
  console.log('TOKEN', token);
  return (
    <section className={styles.container}>
      <div className='my-26 w-full flex justify-between'>
        <div className='font-caption-medium flex items-center'>
          <div className='w-[300px]'>
            <h2
              className={`font-body01-medium text-text-main dark:text-text-main-dark`}
            >
              {token.token.name}
            </h2>
            <div className='flex items-center'>
              <p>
                {token.collection.name ||
                  `${token.collection.assetContract.substring(
                    0,
                    4
                  )}...${token.collection.assetContract.substring(-1, 4)}`}
              </p>
            </div>
          </div>
          <div className='mr-40'>
            <p className={`${styles.pSub} dark:text-text-subtle-dark`}>Owner</p>
            <p className={`${styles.pMain} dark:text-text-main-dark`}>You</p>
          </div>
          <div className='mr-40'>
            <p className={`${styles.pSub} dark:text-text-subtle-dark`}>
              Rarity Rank
            </p>
            <p className={`${styles.pMain} dark:text-text-main-dark`}>
              {inventoryItem?.rarityRank}
            </p>
          </div>
          <div className='mr-40'>
            <p className={`${styles.pSub} dark:text-text-subtle-dark`}>
              Rarity
            </p>
            <p className={`${styles.pMain} dark:text-text-main-dark`}>
              {inventoryItem?.rarity}
            </p>
          </div>
        </div>
        <div className='flex items-center p-7 font-caption-medium border-1 border-border-main dark:border-border-main-dark'>
          <button
            onClick={() => handleToggleViewType('overview')}
            className={`${styles.typeButton} dark:text-text-subtle-dark
              ${
                viewType === 'overview'
                  ? `${styles.active} dark:bg-background-brand-bold-dark dark:text-text-main-dark`
                  : ''
              }
            `}
          >
            Overview
          </button>
          <button
            onClick={() => handleToggleViewType('activity')}
            className={`${styles.typeButton} dark:text-text-subtle-dark
              ${
                viewType === 'activity'
                  ? `${styles.active} dark:bg-background-brand-bold-dark dark:text-text-main-dark`
                  : ''
              }
            `}
          >
            Activity
          </button>
        </div>
      </div>

      <div className='w-full flex flex-col'>
        {viewType === 'overview' && (
          <article className='flex flex-col'>
            <div className={styles.metadata}>
              <div
                className={`${styles.tokenImage} dark:border-border-main-dark`}
              >
                <Image
                  src={token.token.imageUrl}
                  width={300}
                  height={300}
                  alt={`${token.token.name}-${token.token.tokenId}`}
                />
              </div>
              <div>CHART</div>
              {/* {inventoryItem && (
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
              )} */}
            </div>
            {(inventoryItem?.traits?.length || 0) > 0 && (
              //traits section
              <section
                className={`font-caption-medium ${styles.traitSection} dark:border-border-main-dark`}
              >
                <span className='flex items-center'>
                  <Tag className='fill-icon-subtle dark:fill-icon-subtle-dark' />
                  <p
                    className={`font-body01-medium tex-text-main dark:text-text-main-dark ml-8`}
                  >
                    Top Traits
                  </p>
                </span>
                <div className={styles.traitContainer}>
                  {inventoryItem?.traits.map((trait, index) => (
                    <div
                      key={`item-${inventoryItem.collection.assetContract}-${trait.traitType}-${index} `}
                      className={`${styles.traitItem} dark:border-border-main-dark`}
                    >
                      <p
                        className={`text-text-subtle dark:text-text-subtle-dark`}
                      >
                        {trait.traitType}
                      </p>
                      <div className='flex mt-8 items-center justify-between'>
                        <p className='text-text-brand dark:text-text-brand-dark'>
                          {trait.value}
                        </p>
                        <p className='text-text-main dark:text-text-main-dark'>
                          {trait.tokenCount}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}
            {/* <div className='w-full h-full flex flex-col justify-between'>
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
            </div> */}
          </article>
        )}
        {viewType === 'activity' && <InventoryItemActivity token={token} />}
      </div>
    </section>
  );
};
export default InventoryItemDetail;
