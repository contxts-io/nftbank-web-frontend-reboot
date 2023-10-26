'use client';
import Button from '@/components/buttons/Button';
import styles from './HistoricalTrendContainer.module.css';
import { useState } from 'react';
import HistoricalTrendChart from './HistoricalTrendChart';
import {
  useInventoryValue,
  useInventoryValuePolling,
} from '@/utils/hooks/queries/inventory';
import { useMe } from '@/utils/hooks/queries/auth';
import { useAtomValue } from 'jotai';
import { currencyAtom } from '@/store/currency';
import { formatCurrency } from '@/utils/common';
const PERIOD: { name: string; id: Period }[] = [
  {
    name: '1W',
    id: '1W',
  },
  {
    name: '1M',
    id: '1M',
  },
  {
    name: 'YTD',
    id: 'YTD',
  },
  {
    name: '1Y',
    id: '1Y',
  },
  {
    name: 'MAX',
    id: 'MAX',
  },
];
type Period = '1W' | '1M' | 'YTD' | '1Y' | 'MAX';
const HistoricalTrendContainer = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('1W');
  const { data: me } = useMe();
  const currency = useAtomValue(currencyAtom);
  const { data: inventoryValue, status: statusInventoryValue } =
    useInventoryValuePolling(me.walletAddress);
  const handleClickPeriod = (period: Period) => {
    setSelectedPeriod(period);
  };
  const total = formatCurrency(
    inventoryValue?.value[currency].amount || '0.00',
    currency
  );
  console.log('total', total);
  return (
    <section className={styles.container}>
      <div className={styles.summary}>
        <p className={`font-subtitle02-bold ${styles.title}`}>
          Historical trend
        </p>
        <div className={styles.periodButtons}>
          {PERIOD.map((item, index) => {
            return (
              <Button
                key={index}
                id={`/portfolio/overview/historicalTrend/${item.name}`}
                onClick={() => handleClickPeriod(item.id)}
                className={`${selectedPeriod === item.name && styles.selected}`}
              >
                {item.name}
              </Button>
            );
          })}
        </div>
      </div>
      <div className={styles.rowEnd}>
        <div className='flex flex-col items-start h-full'>
          <div className='rounded-full animateBlink w-6 h-6 mr-4 bg-[var(--color-background-danger-bold)]' />
        </div>
        <p className='font-header03-bold mr-12'>
          <span className='!important:text-[var(--color-subtlest)]'></span>
          <span className='text-[var(--color-text-main)]'>
            {total.split('.')[0]}
          </span>
          <span className='!important:text-[var(--color-subtlest)]'>
            {`.${total.split('.')[1] || '00'}`}
          </span>
        </p>
        {inventoryValue?.value[currency].difference && (
          <p
            className={`font-body01-medium ${styles.minus}`}
          >{`${inventoryValue?.value[currency].difference.amount} (${inventoryValue?.value[currency].difference.percentage})`}</p>
        )}
      </div>
      <HistoricalTrendChart />
    </section>
  );
};
export default HistoricalTrendContainer;
