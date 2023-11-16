import Image from 'next/image';
import styles from './InventoryItemCard.module.css';
import { Token } from '@/interfaces/token';
import { useAtom, useAtomValue } from 'jotai';
import { currencyAtom, priceTypeAtom } from '@/store/currency';
import {
  formatCurrency,
  formatPercent,
  mappingConstants,
} from '@/utils/common';
import SkeletonLoader from '@/components/SkeletonLoader';
import { selectedTokenAtom } from '@/store/portfolio';
import ValuationDropdown from './ValuationDropdown';

const InventoryItemCard = ({ token }: { token: Token }) => {
  const currency = useAtomValue(currencyAtom);
  const priceType = useAtomValue(priceTypeAtom);
  const isPlus = parseFloat(token.nav[currency].difference?.amount || '0') > 0;
  const isMinus = parseFloat(token.nav[currency].difference?.amount || '0') < 0;
  const [selectedToken, setSelectedToken] = useAtom(selectedTokenAtom);
  const isZero =
    parseFloat(token.nav[currency].difference?.amount || '0') === 0;
  const handleClickToken = (token: Token) => {
    setSelectedToken(token);
  };
  return (
    <article
      className={`font-caption-medium ${styles.cardWrapper}`}
      onClick={() => handleClickToken(token)}
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
        <p className={`${styles.pTitle} mb-8`}>{token.token.name}</p>
        <div className='flex justify-between items-center mb-8'>
          <p className={styles.pName}>Cost basis</p>
          {token.costBasis ? (
            <p className={styles.pValue}>
              {priceType === 'acquisitionPrice'
                ? formatCurrency(
                    token.acquisitionPrice?.[currency] || null,
                    currency
                  )
                : token.costBasis?.[currency] &&
                  formatCurrency(token.costBasis[currency], currency)}
            </p>
          ) : (
            <SkeletonLoader className='h-16 w-50' />
          )}
        </div>
        <div className='flex justify-between items-center mb-8'>
          <p className={styles.pName}>Realtime NAV</p>
          <p className={styles.pValue}>
            {formatCurrency(token.nav[currency].amount, currency)}
          </p>
        </div>
        <div className='flex justify-between items-center mb-8'>
          <p className={styles.pName}>Unrealized G&L</p>
          {token.nav[currency].difference?.amount ? (
            <p
              className={`${
                isPlus
                  ? 'text-[var(--color-text-success)]'
                  : isMinus
                  ? 'text-[var(--color-text-danger)]'
                  : 'text-[var(--color-text-main)]'
              }`}
            >
              {formatCurrency(token.nav[currency].difference?.amount, currency)}
            </p>
          ) : (
            <SkeletonLoader className='h-16 w-50' />
          )}
        </div>
        <div className='flex justify-between items-center mb-8'>
          <p className={styles.pName}>Unrealized ROI</p>
          {token.nav[currency].difference?.amount ? (
            <p
              className={`${
                isPlus
                  ? 'text-[var(--color-text-success)]'
                  : isMinus
                  ? 'text-[var(--color-text-danger)]'
                  : 'text-[var(--color-text-main)]'
              }`}
            >
              {formatPercent(token.nav[currency].difference?.percentage)}
            </p>
          ) : (
            <SkeletonLoader className='h-16 w-50' />
          )}
        </div>
        <div className='flex items-center mb-8'>
          <p className={styles.pTitle}>
            {token.valuation.length > 0
              ? mappingConstants(token.valuation[0].type)
              : 'no valuation type'}
          </p>
        </div>
      </div>
    </article>
  );
};
export default InventoryItemCard;
