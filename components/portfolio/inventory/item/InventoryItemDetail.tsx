'use client';
import { Token } from '@/interfaces/token';
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
import ImagePlaceholder from '@/public/icon/ImagePlaceholder';
import Info from '@/public/icon/Info';
import { Tooltip } from '@nextui-org/react';
import EtherscanLogo from '@/public/icon/EtherscanLogo';
import FailToLoad from '@/components/error/FailToLoad';
import NoData from '@/components/error/NoData';
import { customToFixed, shortenAddress } from '@/utils/common';

const TextInfo = ({
  title,
  value,
  tooltip,
  href,
}: {
  title: string;
  value: string;
  tooltip?: string;
  href: string;
}) => {
  const handleClickLink = () => {
    console.log('click link');
    window.open(href, '_blank');
  };
  return (
    <div className='flex flex-col gap-y-4'>
      {tooltip ? (
        <div className='flex items-center gap-x-8'>
          <p className='text-[var(--color-text-subtle)]'>{title}</p>
          <Tooltip
            content={tooltip}
            className='font-caption-regular text-[var(--color-text-main)] bg-[var(--color-elevation-surface)] border-1 border-[var(--color-border-bold)] p-6'
          >
            <div>
              <Info className='fill-[var(--color-icon-subtle)]' />
            </div>
          </Tooltip>
        </div>
      ) : (
        <p className='text-[var(--color-text-subtle)]'>{title}</p>
      )}
      <div className='flex items-center gap-x-8 '>
        <EtherscanLogo className='fill-[var(--color-icon-subtle)]' />
        <p
          className='text-[var(--color-text-brand)] cursor-pointer'
          onClick={handleClickLink}
        >
          {shortenAddress(value)}
        </p>
      </div>
    </div>
  );
};

type Props = {
  token: Token;
  walletAddress?: string;
};
const InventoryItemDetail = ({ token, walletAddress }: Props) => {
  const [selectedToken, setSelectedToken] = useAtom(selectedTokenAtom);
  const { data: inventoryItem, status: itemMetadataStatus } = useMetadata({
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
        <div className='w-[500px]'>
          <h2 className={`font-body01-medium text-[var(--color-text-main)]`}>
            {token.token.name}
          </h2>
          <div className='flex items-center mt-8'>
            {token.collection.imageUrl ? (
              <img
                src={token.collection.imageUrl}
                width={16}
                height={16}
                className='rounded-full mr-8'
                alt={`${token.collection.name}-${token.collection.assetContract}`}
              />
            ) : (
              <div></div>
            )}
            <p className='font-caption-medium text-[var(--color-text-main)]'>
              {token.collection.name ||
                `${token.collection.assetContract.substring(
                  0,
                  4
                )}...${token.collection.assetContract.substring(-1, 4)}`}
            </p>
          </div>
        </div>
        {inventoryItem && (
          <div className='font-caption-medium flex items-center gap-x-40 h-40'>
            <TextInfo
              title='Owner'
              value={inventoryItem.owner ? '' : walletAddress || '-'}
              href=''
            />
            <TextInfo
              title='Contract Address'
              value={inventoryItem.assetContract}
              href={`https://etherscan.io/address/${inventoryItem.assetContract}`}
            />
            <TextInfo
              title='Acq. tx hash'
              value={inventoryItem.assetContract}
              tooltip='Based on latest acquisition date'
              href={`https://etherscan.io/address/${inventoryItem.assetContract}`}
            />
          </div>
        )}
        {/**
         * 
         * 
         * sprint 1
         * 
         * 
         * <div className=' ml-auto flex items-center p-7 font-caption-medium border-1 border-[var(--color-border-main)]'>
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
        </div> */}
      </div>

      <div className='w-full flex flex-col'>
        {viewType === 'overview' && (
          <article className='flex flex-col items-center w-full'>
            <div className='flex items-center gap-x-20 my-40'>
              <div className={`${styles.tokenImage} relative`}>
                {token.token.imageUrl ? (
                  <img
                    src={token.token.imageUrl}
                    alt={`${token.token.name}-${token.token.tokenId}`}
                    className='w-full h-full absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]'
                  />
                ) : (
                  <div className='w-full pb-[100%] flex items-center justify-center relative bg-[var(--color-elevation-surface-raised)]'>
                    <div className='absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]'>
                      <ImagePlaceholder className='w-40 h-40 fill-[var(--color-background-neutral-bold)]' />
                    </div>
                  </div>
                )}
              </div>
              <div className='w-[468px] h-[500px] flex flex-col overflow-scroll relative'>
                <div className='flex items-center bg-[var(--color-elevation-surface)] gap-x-8 pb-16 sticky top-0 z-10'>
                  <Tag className='fill-[var(--color-icon-subtle)]' />
                  <p className='font-body01-medium text-[var(--color-text-main)]'>
                    Top Traits
                  </p>
                </div>
                <div className='flex-1 w-full gap-y-8'>
                  {itemMetadataStatus === 'error' && (
                    <div className='w-full h-full flex flex-col items-center'>
                      <FailToLoad />
                    </div>
                  )}
                  {itemMetadataStatus === 'success' &&
                    (inventoryItem?.rarityTraits === null ||
                    inventoryItem?.rarityTraits.length === 0 ? (
                      <div className='w-full h-full flex flex-col items-center mb-40'>
                        <p className='text-[var(--color-text-subtle)]'>
                          <NoData />
                        </p>
                      </div>
                    ) : (
                      inventoryItem?.rarityTraits?.map((trait, index) => {
                        return (
                          <div
                            key={index}
                            className='font-caption-medium w-full h-52 py-8 px-16 border-1 border-[var(--color-border-main)]'
                          >
                            <p className='text-[var(--color-text-main)]'>
                              {trait.traitType.replace(/(?:^|\s)\S/g, (match) =>
                                match.toUpperCase()
                              )}
                            </p>
                            <div className='w-full flex items-center justify-between'>
                              <p className='text-[var(--color-text-brand)]'>
                                {trait.traitType.replace(
                                  /(?:^|\s)\S/g,
                                  (match) => match.toUpperCase()
                                )}
                              </p>
                              <p className='text-[var(--color-text-main)]'>
                                {customToFixed(trait.rarityScore, 3)}
                              </p>
                            </div>
                          </div>
                        );
                      })
                    ))}
                </div>
              </div>
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
          </article>
        )}
        {viewType === 'activity' && <InventoryItemActivity token={token} />}
      </div>
    </section>
  );
};
export default InventoryItemDetail;
