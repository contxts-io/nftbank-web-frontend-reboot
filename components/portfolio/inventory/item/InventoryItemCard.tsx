import Image from 'next/image';
import styles from './InventoryItemCard.module.css';
import { Token } from '@/interfaces/collection';
import { useAtomValue } from 'jotai';
import { currencyAtom } from '@/store/currency';
import { formatCurrency, formatPercent } from '@/utils/common';
import SkeletonLoader from '@/components/SkeletonLoader';

const InventoryItemCard = ({ token }: { token: Token }) => {
  const currency = useAtomValue(currencyAtom);
  const isPlus = parseFloat(token.nav[currency].difference?.amount || '0') > 0;
  const isMinus = parseFloat(token.nav[currency].difference?.amount || '0') < 0;
  const isZero =
    parseFloat(token.nav[currency].difference?.amount || '0') === 0;
  return (
    <article
      className={`font-caption-medium ${styles.cardWrapper} dark:border-border-main-dark`}
    >
      <div className='w-full pb-[100%] overflow-hidden relative'>
        <Image
          src={token.token.imageUrl || '/icon/nftbank_icon.svg'}
          fill={true}
          alt={`${token.collection.name}-${token.token.name}`}
          // objectFit='contain' // 이미지를 가운데 기준으로 크롭
          // objectPosition='center center'
          style={{ objectFit: 'cover' }}
        />
      </div>
      <div className='w-full flex flex-col justify-start my-12 px-12'>
        <p className={`${styles.tokenName} dark:text-text-subtle-dark mb-8`}>
          {token.token.name}
        </p>
        <div className='flex justify-between items-center mb-8'>
          <p className='text-text-subtle dark:text-text-subtle-dark'>
            Cost basis
          </p>
          {token.costBasis ? (
            <p className='text-text-main dark:text-text-main-dark'>
              {formatCurrency(token.costBasis[currency].amount, currency)}
            </p>
          ) : (
            <SkeletonLoader className='h-16 w-50' />
          )}
        </div>
        <div className='flex justify-between items-center mb-8'>
          <p className='text-text-subtle dark:text-text-subtle-dark'>
            Realtime NAV
          </p>
          <p className='text-text-main dark:text-text-main-dark'>
            {formatCurrency(token.nav[currency].amount, currency)}
          </p>
        </div>
        <div className='flex justify-between items-center mb-8'>
          <p className='text-text-subtle dark:text-text-subtle-dark'>
            Unrealized G&L
          </p>
          {token.nav[currency].difference?.amount ? (
            <p
              className={`${
                isPlus && 'text-text-success dark:text-text-success-dark'
              } 
            ${isMinus && 'text-text-danger dark:text-text-danger-dark'} 
            ${isZero && 'text-text-main dark:text-text-main-dark'}`}
            >
              {formatCurrency(token.nav[currency].difference?.amount, currency)}
            </p>
          ) : (
            <SkeletonLoader className='h-16 w-50' />
          )}
        </div>
        <div className='flex justify-between items-center mb-8'>
          <p className='text-text-subtle dark:text-text-subtle-dark'>
            Unrealized ROI
          </p>
          {token.nav[currency].difference?.amount ? (
            <p
              className={`${
                isPlus && 'text-text-success dark:text-text-success-dark'
              } 
            ${isMinus && 'text-text-danger dark:text-text-danger-dark'} 
            ${isZero && 'text-text-main dark:text-text-main-dark'}`}
            >
              {formatPercent(token.nav[currency].difference?.percentage)}
            </p>
          ) : (
            <SkeletonLoader className='h-16 w-50' />
          )}
        </div>
      </div>
    </article>
  );
};
export default InventoryItemCard;
