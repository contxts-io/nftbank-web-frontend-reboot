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
import { use } from 'chai';
import { useEffect } from 'react';
import { inventoryTypeAtom } from '@/store/settings';

const InventoryValue = () => {
  const searchParams = useSearchParams();
  const walletAddress = searchParams.get('walletAddress') || undefined;
  const { data: inventoryValue, isLoading } = useInventoryValue(walletAddress);
  const { data: collectionCount, isLoading: isLoadingCollectionCount } =
    useCollectionCount(walletAddress);
  const { data: itemCount, isLoading: isLoadingItemCount } =
    useItemCount(walletAddress);
  const currency = useAtomValue(currencyAtom);

  const toFixed = (value: string | null) => {
    return value && parseFloat(value).toFixed(2);
  };
  const inventoryType = useAtomValue(inventoryTypeAtom);
  useEffect(() => {
    console.log('InventoryValue collectionCount', collectionCount);
  }, [collectionCount]);
  useEffect(() => {
    console.log('InventoryValue ', inventoryValue);
  }, [inventoryValue]);
  return (
    <section className={styles.container}>
      <article>
        <p className={styles.pHeader}>InventoryValue</p>
        {isLoading && <div>Loading...</div>}
        {!isLoading && inventoryValue && (
          <div className={styles.valueRow}>
            <p className={styles.pValue}>
              {`${toFixed(inventoryValue.value[currency].amount)} ${
                inventoryValue.value[currency].currency
              }`}
            </p>
            <p className={styles.pDiff}>
              {`${inventoryValue.value[currency].difference.percentage.toFixed(
                2
              )}% (Ξ${inventoryValue.value[currency].difference.amount})`}
            </p>
          </div>
        )}
      </article>
      {inventoryType === 'collection' && (
        <article>
          <p className={styles.pHeader}>Valuable Collections</p>
          {isLoading && <div>Loading...</div>}
          {!isLoading && inventoryValue && (
            <div className={styles.valueRow}>
              <p className={styles.pValue}>{collectionCount?.count}</p>
            </div>
          )}
        </article>
      )}
      {inventoryType === 'item' && (
        <article>
          <p className={styles.pHeader}>Valuable Items</p>
          {isLoading && <div>Loading...</div>}
          {!isLoading && inventoryValue && (
            <div className={styles.valueRow}>
              <p className={styles.pValue}>{itemCount?.count}</p>
            </div>
          )}
        </article>
      )}
    </section>
  );
};
export default InventoryValue;
