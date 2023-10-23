'use client';
import { getSummaryTotalSpend } from '@/apis/inventory';
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
const SummaryValueContainer = () => {
  const { data: me } = useMe();
  const currency = useAtomValue(currencyAtom);
  const { data: totalSpend, status: statusTotalSpend } = useSummaryTotalSpend(
    me.walletAddress
  );
  const { data: gasSpend, status: statusGasSpend } = useSummaryGasSpend(
    me.walletAddress
  );
  const { data: totalSale, status: statusTotalSale } = useSummaryTotalSale(
    me.walletAddress
  );
  const { data: unrealized, status: statusUnrealized } = useSummaryUnrealized(
    me.walletAddress
  );
  const { data: realized, status: statusRealized } = useSummaryRealized(
    me.walletAddress
  );
  useEffect(() => {
    totalSpend && console.log(totalSpend);
  }, [totalSpend]);
  return (
    <section className={`font-caption-medium ${styles.container}`}>
      <article className={styles.valueRect}>
        <p className={styles.subTitle}>Total Spend</p>
        {statusTotalSpend === 'loading' && (
          <SkeletonLoader className='w-80 h-20' />
        )}
        {statusTotalSpend === 'success' && (
          <p className={`font-subtitle02-bold ${styles.title}`}>
            {totalSpend.totalSpend[currency].amount}
          </p>
        )}
      </article>
      <article className={styles.valueRect}>
        <p className={styles.subTitle}>Gas Spend</p>
        {statusGasSpend === 'loading' && (
          <SkeletonLoader className='w-80 h-20' />
        )}
        {statusGasSpend === 'success' && (
          <p className={`font-subtitle02-bold ${styles.title}`}>
            {gasSpend.gasSpend[currency].amount}
          </p>
        )}
      </article>
      <article className={styles.valueRect}>
        <p className={styles.subTitle}>Total Sales</p>
        {statusTotalSale === 'loading' && (
          <SkeletonLoader className='w-80 h-20' />
        )}
        {statusTotalSale === 'success' && (
          <p className={`font-subtitle02-bold ${styles.title}`}>
            {totalSale.totalSale[currency].amount}
          </p>
        )}
      </article>
      <article className={styles.valueRect}>
        <p className={styles.subTitle}>Unrealized Gain&Loss</p>
        <div className={styles.row}>
          {statusUnrealized === 'loading' && (
            <SkeletonLoader className='w-80 h-20' />
          )}
          {statusUnrealized === 'success' && (
            <p className={`font-subtitle02-bold ${styles.title}`}>
              {unrealized.gainLoss[currency].amount}
            </p>
          )}
          {statusUnrealized === 'success' && (
            <article className={styles.valueSubRect}>
              <div className={`${styles.diffBox} ${styles.plus}`}>
                <p>{`${unrealized.gainLoss[currency].difference?.amount} (${unrealized.gainLoss[currency].difference?.percentage})`}</p>
              </div>
              <div className={`${styles.diffBox}`}>
                <p>24h</p>
              </div>
            </article>
          )}
        </div>
      </article>
      <article className={styles.valueRect}>
        <p className={styles.subTitle}>Realized Gain&Loss</p>
        {statusRealized === 'loading' && (
          <SkeletonLoader className='w-80 h-20' />
        )}
        {statusRealized === 'success' && (
          <p className={`font-subtitle02-bold ${styles.title}`}>
            {realized.gainLoss[currency].amount}
          </p>
        )}
      </article>
    </section>
  );
};
export default SummaryValueContainer;
