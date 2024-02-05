import Image from 'next/image';
import styles from './InventoryItemCard.module.css';
import { Token } from '@/interfaces/token';
import { useAtom, useAtomValue } from 'jotai';
import { currencyAtom, priceTypeAtom } from '@/store/currency';
import {
  formatCurrency,
  formatDate,
  formatPercent,
  mappingConstants,
  parseFloatPrice,
  shortenAddress,
} from '@/utils/common';
import SkeletonLoader from '@/components/SkeletonLoader';
import { selectedTokenAtom } from '@/store/portfolio';
import ValuationDropdown from './ValuationDropdown';
import ImagePlaceholder from '@/public/icon/ImagePlaceholder';

const InventoryItemCard = ({ token }: { token: Token }) => {
  const currency = useAtomValue(currencyAtom);
  const priceType = useAtomValue(priceTypeAtom);
  const acquisitionPrice = parseFloatPrice(token.acquisitionPrice?.[currency]);
  const costBasis =
    acquisitionPrice + parseFloatPrice(token.gasFee?.[currency]);
  const unrealizedGL =
    parseFloatPrice(token.nav[currency].amount) -
    parseFloatPrice(acquisitionPrice);
  const isPlus = unrealizedGL > 0;
  const isMinus = unrealizedGL < 0;
  const isZero = unrealizedGL === 0;
  const [selectedToken, setSelectedToken] = useAtom(selectedTokenAtom);
  const handleClickToken = (token: Token) => {
    setSelectedToken(token);
  };
  return (
    <article
      className={`font-caption-medium ${styles.cardWrapper}`}
      onClick={() => handleClickToken(token)}
    >
      {token.token.imageUrl ? (
        <div className='flex w-full pb-[100%] overflow-hidden relative'>
          <img
            src={token.token.imageUrl}
            alt={`${token.collection.name}-${token.token.name}`}
            // objectFit='contain' // 이미지를 가운데 기준으로 크롭
            // objectPosition='center center'
            className='w-full h-full absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]'
          />
        </div>
      ) : (
        <div className='w-full pb-[100%] flex items-center justify-center relative bg-[var(--color-elevation-surface-raised)]'>
          <div className='absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]'>
            <ImagePlaceholder className='w-40 h-40 fill-[var(--color-background-neutral-bold)]' />
          </div>
        </div>
      )}

      <div className='w-full flex flex-col justify-start my-12 px-12 gap-y-8'>
        <p className={`${styles.pTitle}`}>
          {token.token.name || shortenAddress(token.collection.assetContract)}
        </p>
        <div className='flex justify-between items-center'>
          <p className={styles.pName}>
            {token.valuation.length > 0
              ? mappingConstants(token.valuation[0].type)
              : 'no valuation type'}
          </p>
          <p className={styles.pValue}>
            {formatCurrency(token.nav[currency].amount, currency)}
          </p>
        </div>
        <div className='flex justify-between items-center'>
          <p className={styles.pName}>Cost basis</p>

          <p className={styles.pValue}>
            {priceType === 'acquisitionPrice'
              ? formatCurrency(acquisitionPrice.toString(), currency)
              : formatCurrency(costBasis.toString(), currency)}
          </p>
        </div>
        {priceType === 'costBasis' && (
          <div className='flex justify-between items-center'>
            <p className={styles.pName}>Gas fee</p>

            <p className='text-[var(--color-text-brand)]'>
              {formatCurrency(
                parseFloatPrice(token.gasFee?.[currency]).toString(),
                currency
              )}
            </p>
          </div>
        )}
        <div className='flex justify-between items-center'>
          <p className={styles.pName}>Unrealized G&L</p>
          {unrealizedGL ? (
            <p
              className={`${
                isPlus
                  ? 'text-[var(--color-text-success)]'
                  : isMinus
                  ? 'text-[var(--color-text-danger)]'
                  : 'text-[var(--color-text-main)]'
              }`}
            >
              {priceType === 'acquisitionPrice'
                ? formatCurrency(
                    (
                      parseFloatPrice(token.nav[currency].amount) -
                      acquisitionPrice
                    ).toString(),
                    currency
                  )
                : formatCurrency(
                    (
                      parseFloatPrice(token.nav[currency].amount) - costBasis
                    ).toString(),
                    currency
                  )}
            </p>
          ) : (
            <SkeletonLoader className='h-16 w-50' />
          )}
        </div>
        <div className='flex justify-between items-center'>
          <p className={styles.pName}>Unrealized ROI</p>
          {unrealizedGL ? (
            <p
              className={`${
                isPlus
                  ? 'text-[var(--color-text-success)]'
                  : isMinus
                  ? 'text-[var(--color-text-danger)]'
                  : 'text-[var(--color-text-main)]'
              }`}
            >
              {priceType === 'acquisitionPrice'
                ? formatPercent(
                    (
                      ((parseFloatPrice(token.nav[currency].amount) -
                        acquisitionPrice) /
                        acquisitionPrice) *
                      100
                    ).toString()
                  )
                : formatPercent(
                    (
                      ((parseFloatPrice(token.nav[currency].amount) -
                        costBasis) /
                        costBasis) *
                      100
                    ).toString()
                  )}
            </p>
          ) : (
            <SkeletonLoader className='h-16 w-50' />
          )}
        </div>
        {/**
         * 
         * 
         * sprint 1
         * 
         <div className='flex justify-between items-center'>
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
        <div className='flex justify-between items-center'>
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
        </div> */}
        <div className='flex justify-between items-center'>
          <p className={styles.pName}>Acq. date</p>
          <p className={styles.pValue}>
            {token.acquisitionDate &&
              formatDate(new Date(token.acquisitionDate))}
          </p>
        </div>
        {/* <div className='flex items-center'>
          <p className={styles.pValueType}>
            {token.valuation.length > 0
              ? mappingConstants(token.valuation[0].type)
              : 'no valuation type'}
          </p>
        </div> */}
      </div>
    </article>
  );
};
export default InventoryItemCard;
