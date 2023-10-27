'use client';
import { Token } from '@/interfaces/collection';
import styles from './InventoryItemDetail.module.css';
import Image from 'next/image';
import { useMetadata } from '@/utils/hooks/queries/metadata';
import { useEffect, useState } from 'react';
import InventoryItemActivity from './InventoryItemActivity';
import Tag from '@/public/icon/Tag';
import InventoryItemDetailChart from './InventoryItemDetailChart';
import { useValuationTokenHistory } from '@/utils/hooks/queries/valuation';
import SkeletonLoader from '@/components/SkeletonLoader';
import { useAtom } from 'jotai';
import { selectedTokenAtom } from '@/store/portfolio';
type Props = {
  token: Token;
};
const InventoryItemDetail = ({ token }: Props) => {
  const [selectedToken, setSelectedToken] = useAtom(selectedTokenAtom);
  const { data: inventoryItem, status } = useMetadata({
    networkId: token.collection.chain.name,
    assetContract: token.collection.assetContract,
    tokenId: token.token.tokenId,
  });
  const { data: historicalData, status: historicalStatus } =
    useValuationTokenHistory({
      networkId: token.collection.chain.name,
      assetContract: token.collection.assetContract,
      tokenId: token.token.tokenId,
    });
  const [viewType, setViewType] = useState<'overview' | 'activity'>('overview');
  const handleToggleViewType = (type: 'overview' | 'activity') => {
    setViewType(type);
  };
  useEffect(() => {
    document.body.style.cssText = `
      position: fixed; 
      top: -${window.scrollY}px;
      overflow-y: scroll;
      width: 100%;`;
    return () => {
      const scrollY = document.body.style.top;
      document.body.style.cssText = '';
      window.scrollTo(0, parseInt(scrollY || '0', 10) * -1);
      setSelectedToken(null);
    };
  }, []);
  return (
    <section className={`${styles.container} scrollbar-show scrollbar-default`}>
      <div className='w-full flex items-center font-caption-medium px-24'>
        <div className='w-[300px]'>
          <h2 className={`font-body01-medium text-[var(--color-text-main)]`}>
            {token.token.name}
          </h2>
          <div className='flex items-center mt-8'>
            <Image
              src={token.collection.imageUrl || '/icon/nftbank_icon.svg'}
              width={16}
              height={16}
              className='rounded-full mr-8'
              alt={`${token.collection.name}-${token.collection.assetContract}`}
            />
            <p className='font-caption-medium text-[var(--color-text-main)]'>
              {token.collection.name ||
                `${token.collection.assetContract.substring(
                  0,
                  4
                )}...${token.collection.assetContract.substring(-1, 4)}`}
            </p>
          </div>
        </div>
        <div className='mr-40'>
          <p className={`${styles.pSub}`}>Owner</p>
          <p className={`text-[var(--color-text-brand)]`}>You</p>
        </div>
        <div className='mr-40'>
          <p className={`${styles.pSub}`}>Rarity Rank</p>
          <p className={`${styles.pMain}`}>
            {inventoryItem?.rarityRank || '-'}
          </p>
        </div>
        <div className='mr-40'>
          <p className={`${styles.pSub}`}>Rarity</p>
          <p className={`${styles.pMain}`}>{inventoryItem?.rarity || '-'}</p>
        </div>
        <div className=' ml-auto flex items-center p-7 font-caption-medium border-1 border-[var(--color-border-main)]'>
          <button
            onClick={() => handleToggleViewType('overview')}
            className={`${styles.typeButton}
            ${
              viewType === 'overview'
                ? `bg-background-brand-bold text-[var(--color-text-main)]`
                : 'text-[var(--color-text-subtle)]'
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
                  ? `bg-[var(--color-background-brand-bold)] text-[var(--color-text-main)]`
                  : 'text-[var(--color-text-subtle)]'
              }
            `}
          >
            Activity
          </button>
        </div>
      </div>

      <div className='w-full flex flex-col'>
        {viewType === 'overview' && (
          <article className='flex flex-col items-center'>
            <div className={`${styles.tokenImage} relative`}>
              <Image
                src={token.token.imageUrl || '/icon/nftbank_icon.svg'}
                fill
                alt={`${token.token.name}-${token.token.tokenId}`}
              />
            </div>
            <div className='w-full'>
              {historicalStatus === 'loading' && (
                <div className='w-full h-[280px] mt-20'>
                  <SkeletonLoader className='w-full h-full' />
                </div>
              )}
              {historicalData && (
                <InventoryItemDetailChart historicalData={historicalData} />
              )}
            </div>
            {(inventoryItem?.traits?.length || 0) > 0 && (
              //traits section
              <section className={`font-caption-medium ${styles.traitSection}`}>
                <span className='flex items-center text-[var(--color-text-subtle)]'>
                  <Tag />
                  <p
                    className={`font-body01-medium text-[var(--color-text-main)] ml-8`}
                  >
                    Traits
                  </p>
                </span>
                <div className={styles.traitContainer}>
                  {inventoryItem?.traits.map((trait, index) => (
                    <div
                      key={`item-${inventoryItem.collection.assetContract}-${trait.traitType}-${index} `}
                      className={`${styles.traitItem}`}
                    >
                      <p className={`text-[var(--color-text-subtle)]`}>
                        {trait.traitType}
                      </p>
                      <div className='flex mt-8 items-center justify-between'>
                        <p className='text-[var(--color-text-brand)]'>
                          {trait.value}
                        </p>
                        <p className='text-[var(--color-text-main)]'>
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
