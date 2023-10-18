'use client';
import {
  useCollectionCount,
  useInventoryValue,
  useItemCount,
} from '@/utils/hooks/queries/inventory';
import styles from './InventoryValue.module.css';
import { useAtomValue } from 'jotai';
import { currencyAtom } from '@/store/currency';
import { useSearchParams } from 'next/navigation';
import { inventoryTypeAtom } from '@/store/settings';
import { formatCurrency, formatPercent } from '@/utils/common';
import {
  useInventoryUnrealizedPerformance,
  useInventoryValuePerformance,
} from '@/utils/hooks/queries/performance';
import SkeletonLoader from '../SkeletonLoader';
import { useMe } from '@/utils/hooks/queries/auth';
import { useEffect, useState } from 'react';

const InventoryValue = () => {
  const searchParams = useSearchParams();
  const { data: me } = useMe();
  const [values, setValues] = useState<any[]>([]);
  const walletAddress =
    searchParams.get('walletAddress') || me.walletAddress || undefined;

  const { data: inventoryValue, status: statusInventoryValue } =
    useInventoryValue(walletAddress);
  const { data: inventoryValuePerformance, status: statusPerformance } =
    useInventoryValuePerformance(walletAddress);
  const { data: inventoryUnrealized, status: statusInventoryUnrealized } =
    useInventoryUnrealizedPerformance(walletAddress);
  const { data: collectionCount, isLoading: isLoadingCollectionCount } =
    useCollectionCount(walletAddress);
  const { data: itemCount, isLoading: isLoadingItemCount } =
    useItemCount(walletAddress);
  const currency = useAtomValue(currencyAtom);

  const inventoryType = useAtomValue(inventoryTypeAtom);
  useEffect(() => {
    setValues([
      {
        type: 'inventoryValue',
        name: 'InventoryValue',
        status: statusInventoryValue,
        value: formatCurrency(
          inventoryValue?.value[currency].amount || '-',
          currency
        ),
        diff: formatCurrency(
          inventoryValuePerformance?.value[currency].difference.amount || '-',
          currency
        ),
        diffPercent: formatPercent(
          inventoryValuePerformance?.value[currency].difference.percentage || 0
        ),
        isPlus:
          inventoryValuePerformance &&
          parseFloat(
            inventoryValuePerformance.value[currency].difference.amount
          ) > 0,
      },
      {
        type: 'unrealizedValue',
        name: 'Unrealized Gain&Loss',
        value: formatCurrency(
          inventoryUnrealized?.gainLoss[currency] || '-',
          currency
        ),
        diff: formatCurrency(
          inventoryUnrealized?.gainLoss[currency] || '-',
          currency
        ),
        diffPercent: formatPercent(inventoryUnrealized?.roi[currency] || 0),
        isPlus: parseFloat(inventoryUnrealized?.gainLoss[currency] || '0') > 0,
        status: statusInventoryUnrealized,
      },
      {
        type: 'unrealizedRoi',
        name: 'Unrealized ROI',
        value: formatPercent(inventoryUnrealized?.roi[currency] || 0),
        diff: formatPercent(inventoryUnrealized?.roi[currency] || 0),
        diffPercent: formatPercent(inventoryUnrealized?.roi[currency] || 0),
        isPlus: (inventoryUnrealized?.roi[currency] || 0) > 0,
        status: statusInventoryUnrealized,
      },
    ]);
  }, [
    inventoryValue,
    statusInventoryValue,
    inventoryValuePerformance,
    inventoryUnrealized,
  ]);
  return (
    <section className={`${styles.container} dark:border-border-main-dark`}>
      {statusInventoryValue === 'loading' && <div>Loading...</div>}
      {statusInventoryValue === 'success' &&
        inventoryValue &&
        values.map((item, index) => {
          return (
            <article key={index} className={`${styles.articleBox}`}>
              <div className='w-fit'>
                <p
                  className={`font-caption-medium mb-4 text-[var(--color-text-subtle)] w-fit`}
                >
                  {item.name}
                </p>
                <div className='border-t-1 border-dashed border-[var(--color-border-accent-gray)]' />
              </div>
              <div className={styles.valueRow}>
                {item.status === 'loading' && (
                  <SkeletonLoader className='h-22 w-100' />
                )}
                {item.status === 'success' && (
                  <div className='mr-8 items-end'>
                    <p
                      className={`font-subtitle01-bold ${
                        item.type == `inventoryValue`
                          ? styles.pMain
                          : item.plus
                          ? styles.plus
                          : styles.minus
                      }`}
                    >
                      {item.value && item.value}
                    </p>
                  </div>
                )}
                {item.type === 'inventoryValue' &&
                  item.value &&
                  statusPerformance !== 'success' && (
                    <SkeletonLoader className='h-22 w-100' />
                  )}
                {item.type === 'inventoryValue' &&
                  item.value &&
                  statusPerformance === 'success' &&
                  inventoryValuePerformance && (
                    <>
                      <div
                        className={
                          item.isPlus
                            ? `${styles.diffBox} ${styles.plus}`
                            : `${styles.diffBox} ${styles.minus}`
                        }
                      >
                        <p className='font-caption-medium'>
                          {`${item.diff} (${item.diffPercent})`}
                        </p>
                      </div>
                      <div
                        className={`${styles.diffBox} bg-[var(--color-elevation-surface-raised)]`}
                      >
                        <p className='font-caption-medium text-[var(--color-text-main)]'>
                          24H
                        </p>
                      </div>
                    </>
                  )}
              </div>
            </article>
          );
        })}

      <article className='ml-16 py-16'>
        <div className='w-fit'>
          <p
            className={`font-caption-medium mb-4 text-[var(--color-text-subtle)] w-fit`}
          >
            {inventoryType === 'collection'
              ? 'Valuable Collections'
              : 'Valuable Items'}
          </p>
          <div className='border-t-1 border-dashed border-[var(--color-border-accent-gray)]' />
        </div>
        <p
          className={`font-subtitle01-bold mt-16 text-[var(--color-text-main)]`}
        >
          {inventoryType === 'collection'
            ? collectionCount?.totalCount
            : itemCount?.totalCount}
        </p>
      </article>
    </section>
  );
};
export default InventoryValue;
