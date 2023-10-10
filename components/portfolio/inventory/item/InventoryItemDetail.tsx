'use client';
import { Token } from '@/interfaces/collection';
import styles from './InventoryItemDetail.module.css';
import Image from 'next/image';
import { useMetadata } from '@/utils/hooks/queries/metadata';
import { useState } from 'react';
import InventoryItemActivity from './InventoryItemActivity';
import Tag from '@/public/icon/Tag';
import InventoryItemDetailChart from './InventoryItemDetailChart';
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
              {inventoryItem?.rarityRank || '-'}
            </p>
          </div>
          <div className='mr-40'>
            <p className={`${styles.pSub} dark:text-text-subtle-dark`}>
              Rarity
            </p>
            <p className={`${styles.pMain} dark:text-text-main-dark`}>
              {inventoryItem?.rarity || '-'}
            </p>
          </div>
        </div>
        <div className='flex items-center p-7 font-caption-medium border-1 border-border-main dark:border-border-main-dark'>
          <button
            onClick={() => handleToggleViewType('overview')}
            className={`${styles.typeButton}
            ${
              viewType === 'overview'
                ? `bg-background-brand-bold text-text-main dark:text-text-main-dark`
                : 'text-text-subtle dark:text-text-subtle-dark'
            }
            `}
          >
            Overview
          </button>
          <button
            onClick={() => handleToggleViewType('activity')}
            className={`${styles.typeButton} 
              ${
                viewType === 'activity'
                  ? `bg-background-brand-bold text-text-main dark:text-text-main-dark`
                  : 'text-text-subtle dark:text-text-subtle-dark'
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
                className={`${styles.tokenImage} dark:border-border-main-dark relative`}
              >
                <Image
                  src={token.token.imageUrl || '/icon/nftbank_icon.svg'}
                  fill
                  alt={`${token.token.name}-${token.token.tokenId}`}
                />
              </div>
              <div className='flex-grow'>
                <InventoryItemDetailChart />
              </div>
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
          </article>
        )}
        {viewType === 'activity' && <InventoryItemActivity token={token} />}
      </div>
    </section>
  );
};
export default InventoryItemDetail;
