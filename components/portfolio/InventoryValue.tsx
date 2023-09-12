'use client';
import { useInventoryValue } from '@/utils/hooks/queries/inventory';
import styles from './InventoryValue.module.css';
import { useAtomValue } from 'jotai';
import { currencyAtom } from '@/store/currency';
import { useSearchParams } from 'next/navigation';

const InventoryValue = () => {
  const searchParams = useSearchParams();
  const walletAddress = searchParams.get('walletAddress') || null;
  const { data: inventoryValue, isLoading } = useInventoryValue(walletAddress);
  const currency = useAtomValue(currencyAtom);

  const toFixed = (value: string | null) => {
    return value && parseFloat(value).toFixed(2);
  };

  return (
    <div className={styles.container}>
      <p className={styles.pHeader}>InventoryValue</p>
      {isLoading && <div>Loading...</div>}
      {!isLoading && inventoryValue && (
        <div className={styles.valueRow}>
          <p className={styles.pValue}>
            {`${toFixed(inventoryValue.value[currency].amount)} ETH`}
          </p>
          <p className={styles.pDiff}>
            {`${inventoryValue.value.difference.percentage.toFixed(2)}% (Ξ${
              inventoryValue.value.difference[currency].amount
            })`}
          </p>
        </div>
      )}
    </div>
  );
};
export default InventoryValue;
