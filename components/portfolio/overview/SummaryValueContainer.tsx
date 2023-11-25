'use client';
import styles from './SummaryValueContainer.module.css';
import { useEffect } from 'react';
import {
  useSummaryGasSpend,
  useSummaryRealized,
  useSummaryTotalSale,
  useSummaryTotalSpend,
  useSummaryUnrealized,
} from '@/utils/hooks/queries/summary';
import { useMe } from '@/utils/hooks/queries/auth';
import { useAtomValue } from 'jotai';
import { currencyAtom } from '@/store/currency';
import SkeletonLoader from '@/components/SkeletonLoader';
import {
  difference,
  formatCurrency,
  formatPercent,
  isPlus,
} from '@/utils/common';
import { useMyWalletList } from '@/utils/hooks/queries/wallet';
const SummaryValueContainer = () => {
  const { data: walletList } = useMyWalletList();
  const currency = useAtomValue(currencyAtom);
  const { data: totalSpend, status: statusTotalSpend } = useSummaryTotalSpend(
    walletList?.[0].walletAddress || ''
  );
  const { data: gasSpend, status: statusGasSpend } = useSummaryGasSpend(
    walletList?.[0].walletAddress || ''
  );
  const { data: totalSale, status: statusTotalSale } = useSummaryTotalSale(
    walletList?.[0].walletAddress || ''
  );
  const { data: unrealized, status: statusUnrealized } = useSummaryUnrealized(
    walletList?.[0].walletAddress || ''
  );
  const { data: realized, status: statusRealized } = useSummaryRealized(
    walletList?.[0].walletAddress || ''
  );
  useEffect(() => {
    totalSpend && console.log(totalSpend);
  }, [totalSpend]);
  return (
    <section className={`font-caption-medium ${styles.container}`}>
      <article className={styles.valueRect}>
        <div className={styles.subTitleWrapper}>
          <p className={styles.subTitle}>Total Spend</p>
        </div>
        {statusTotalSpend === 'loading' && (
          <SkeletonLoader className='w-80 h-20' />
        )}
        {statusTotalSpend === 'success' && (
          <p className={`font-subtitle02-bold ${styles.title}`}>
            {formatCurrency(totalSpend.totalSpend[currency], currency)}
          </p>
        )}
      </article>
      <article className={styles.valueRect}>
        <div className={styles.subTitleWrapper}>
          <p className={styles.subTitle}>Gas Spend</p>
        </div>
        {statusGasSpend === 'loading' && (
          <SkeletonLoader className='w-80 h-20' />
        )}
        {statusGasSpend === 'success' && (
          <p className={`font-subtitle02-bold ${styles.title}`}>
            {formatCurrency(gasSpend.gasSpend[currency], currency)}
          </p>
        )}
      </article>
      <article className={styles.valueRect}>
        <div className={styles.subTitleWrapper}>
          <p className={styles.subTitle}>Total Sales</p>
        </div>
        {statusTotalSale === 'loading' && (
          <SkeletonLoader className='w-80 h-20' />
        )}
        {statusTotalSale === 'success' && (
          <p className={`font-subtitle02-bold ${styles.title}`}>
            {formatCurrency(totalSale.totalSale[currency], currency)}
          </p>
        )}
      </article>
      <article className={styles.valueRect}>
        <div className={styles.subTitleWrapper}>
          <p className={styles.subTitle}>Unrealized Gain&Loss</p>
        </div>
        <div className={styles.row}>
          {statusUnrealized === 'loading' && (
            <SkeletonLoader className='w-80 h-20' />
          )}
          {statusUnrealized === 'success' && (
            <p className={`font-subtitle02-bold ${styles.title}`}>
              {formatCurrency(
                unrealized.gainLoss[currency].amount || '0',
                currency
              )}
            </p>
          )}
          {statusUnrealized === 'success' && (
            <article className={styles.valueSubRect}>
              <div
                className={`${styles.diffBox} ${
                  isPlus(
                    unrealized.gainLoss[currency].difference?.amount || '0'
                  ) === '-'
                    ? styles.zero
                    : isPlus(
                        unrealized.gainLoss[currency].difference?.amount || '0'
                      )
                    ? styles.plus
                    : styles.minus
                }`}
              >
                <p>{`${difference(
                  unrealized.gainLoss[currency].difference?.amount || '0',
                  currency
                )} (${formatPercent(
                  unrealized.gainLoss[currency].difference?.percentage || '0'
                )})`}</p>
              </div>
              <div className={`${styles.diffBox}`}>
                <p>24h</p>
              </div>
            </article>
          )}
        </div>
      </article>
      <article className={styles.valueRect}>
        <div className={styles.subTitleWrapper}>
          <p className={styles.subTitle}>Realized Gain&Loss</p>
        </div>
        {statusRealized === 'loading' && (
          <SkeletonLoader className='w-80 h-20' />
        )}
        {statusRealized === 'success' && (
          <p className={`font-subtitle02-bold ${styles.title}`}>
            {formatCurrency(realized.gainLoss[currency], currency)}
          </p>
        )}
      </article>
    </section>
  );
};
export default SummaryValueContainer;
