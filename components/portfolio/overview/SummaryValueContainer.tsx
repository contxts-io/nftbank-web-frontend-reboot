'use client';
import styles from './SummaryValueContainer.module.css';
import { useEffect, useState } from 'react';
import {
  useSummaryGasSpend,
  useSummaryRealized,
  useSummaryTotalSale,
  useSummaryTotalSpend,
  useSummaryUnrealized,
} from '@/utils/hooks/queries/summary';
import { useAtomValue } from 'jotai';
import { currencyAtom } from '@/store/currency';
import SkeletonLoader from '@/components/SkeletonLoader';
import {
  difference,
  formatCurrency,
  formatPercent,
  isPlus,
} from '@/utils/common';
import { portfolioUserAtom } from '@/store/portfolio';
import { BasicParam } from '@/interfaces/request';
type Props = {
  portfolioUser?: BasicParam;
};
const SummaryValueContainer = (props: Props) => {
  const currency = useAtomValue(currencyAtom);
  const portfolioUser = useAtomValue(portfolioUserAtom);
  // const [portfolioUser, setPortfolioUser] = useState(
  //   props.portfolioUser || _portfolioUser
  // );
  const { data: totalSpend, status: statusTotalSpend } =
    useSummaryTotalSpend(portfolioUser);
  const { data: gasSpend, status: statusGasSpend } =
    useSummaryGasSpend(portfolioUser);
  const { data: totalSale, status: statusTotalSale } =
    useSummaryTotalSale(portfolioUser);
  const { data: unrealized, status: statusUnrealized } =
    useSummaryUnrealized(portfolioUser);
  const { data: realized, status: statusRealized } =
    useSummaryRealized(portfolioUser);
  // useEffect(() => {
  //   setPortfolioUser(_portfolioUser);
  // }, [_portfolioUser]);
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
            {formatCurrency(totalSpend?.totalSpend[currency], currency)}
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
            {formatCurrency(gasSpend?.gasSpend[currency], currency)}
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
            {formatCurrency(totalSale?.totalSale[currency], currency)}
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
            <p
              className={`font-subtitle02-bold ${
                isPlus(unrealized?.gainLoss[currency].amount || '0') === '-'
                  ? 'text-[var(--color-text-main)]'
                  : isPlus(unrealized?.gainLoss[currency].amount || '0')
                  ? 'text-[var(--color-text-success)]'
                  : 'text-[var(--color-text-danger)]'
              }`}
            >
              {formatCurrency(
                unrealized?.gainLoss[currency].amount || '0',
                currency
              )}
            </p>
          )}
          {/* {statusUnrealized === 'success' && (
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
          )} */}
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
          <p
            className={`font-subtitle02-bold ${
              isPlus(realized.gainLoss[currency] || '0') === '-'
                ? 'text-[var(--color-text-main)]'
                : isPlus(realized.gainLoss[currency] || '0')
                ? 'text-[var(--color-text-success)]'
                : 'text-[var(--color-text-danger)]'
            }`}
          >
            {formatCurrency(realized.gainLoss[currency], currency)}
          </p>
        )}
      </article>
      {/* <article className={styles.valueRect}>
        <div className={styles.subTitleWrapper}>
          <p className={styles.subTitle}>Total Gain&Loss</p>
        </div>
        {statusUnrealized === 'loading' && (
          <SkeletonLoader className='w-80 h-20' />
        )}
        {statusUnrealized === 'success' && (
          <p
            className={`font-subtitle02-bold ${
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
            {formatCurrency(unrealized?.gainLoss[currency].amount, currency)}
          </p>
        )}
      </article> */}
    </section>
  );
};
export default SummaryValueContainer;
