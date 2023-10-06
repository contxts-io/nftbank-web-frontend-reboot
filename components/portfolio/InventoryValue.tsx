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
import { useInventoryValuePerformance } from '@/utils/hooks/queries/performance';
import SkeletonLoader from '../SkeletonLoader';
const VALUE = [
  {
    type: 'inventoryValue',
    name: 'InventoryValue',
  },
  {
    type: 'Unrealized Gain&Loss',
    name: 'Unrealized Gain&Loss',
  },
  {
    type: '',
    name: 'Unrealized ROI',
  },
];
const InventoryValue = () => {
  const searchParams = useSearchParams();
  const walletAddress = searchParams.get('walletAddress') || undefined;
  const { data: inventoryValue, isLoading } = useInventoryValue(walletAddress);
  const { data: inventoryValuePerformance, status: statusPerformance } =
    useInventoryValuePerformance(walletAddress);
  const { data: collectionCount, isLoading: isLoadingCollectionCount } =
    useCollectionCount(walletAddress);
  const { data: itemCount, isLoading: isLoadingItemCount } =
    useItemCount(walletAddress);
  const currency = useAtomValue(currencyAtom);

  const toFixed = (value: string | null) => {
    return value && parseFloat(value).toFixed(2);
  };
  const inventoryType = useAtomValue(inventoryTypeAtom);

  return (
    <section className={`${styles.container} dark:border-border-main-dark`}>
      {isLoading && <div>Loading...</div>}
      {!isLoading &&
        inventoryValue &&
        VALUE.map((item, index) => {
          const isPlus =
            inventoryValuePerformance &&
            parseFloat(
              inventoryValuePerformance.value[currency].difference.amount
            ) > 0;
          const value =
            item.type === 'inventoryValue'
              ? inventoryValue.value[currency].amount
              : null;
          return (
            <article
              key={index}
              className={`${styles.articleBox} dark:border-border-main-dark`}
            >
              <div className='w-fit'>
                <p
                  className={`font-caption-medium mb-4 text-text-subtle dark:text-text-subtle-dark w-fit`}
                >
                  {item.name}
                </p>
                <div className='border-t-1 border-dashed border-border-accent-gray dark:border-border-accent-gray-dark' />
              </div>
              <div className={styles.valueRow}>
                <div className='mr-8 items-end'>
                  <p
                    className={`font-subtitle01-bold text-text-main dark:text-text-main-dark`}
                  >
                    {value && formatCurrency(value, currency)}
                  </p>
                </div>
                {value && statusPerformance !== 'success' && (
                  <SkeletonLoader className='h-22 w-100' />
                )}
                {value &&
                  statusPerformance === 'success' &&
                  inventoryValuePerformance && (
                    <>
                      <div
                        className={
                          isPlus
                            ? `${styles.diffBox} ${styles.plus} dark:text-text-success-dark  dark:bg-background-success-dark`
                            : `${styles.diffBox} ${styles.minus} dark:text-text-danger-dark dark:bg-background-danger-dark`
                        }
                      >
                        <p className='font-caption-medium'>
                          {`${formatCurrency(
                            inventoryValuePerformance.value[currency].difference
                              .amount,
                            currency
                          )} (${formatPercent(
                            inventoryValuePerformance.value[currency].difference
                              .percentage
                          )})`}
                        </p>
                      </div>
                      <div
                        className={`${styles.diffBox} bg-elevation-surface-raised dark:bg-elevation-surface-raised-dark`}
                      >
                        <p className='font-caption-medium text-text-main dark:text-text-main-dark'>
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
            className={`font-caption-medium mb-4 text-text-subtle dark:text-text-subtle-dark w-fit`}
          >
            {inventoryType === 'collection'
              ? 'Valuable Collections'
              : 'Valuable Items'}
          </p>
          <div className='border-t-1 border-dashed border-border-accent-gray dark:border-border-accent-gray-dark' />
        </div>
        <p
          className={`font-subtitle01-bold mt-16 text-text-main dark:text-text-main-dark`}
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
