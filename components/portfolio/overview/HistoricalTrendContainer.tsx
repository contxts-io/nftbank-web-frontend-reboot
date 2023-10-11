'use client';
import Button from '@/components/buttons/Button';
import styles from './HistoricalTrendContainer.module.css';
import { useState } from 'react';
import HistoricalTrendChart from './HistoricalTrendChart';
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
  const handleClickPeriod = (period: Period) => {
    setSelectedPeriod(period);
  };
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
        <p className='font-header03-bold mr-12'>$173,398.02</p>
        <p className={`font-body01-medium ${styles.minus}`}>-2,177(2.3%)</p>
      </div>
      <HistoricalTrendChart />
    </section>
  );
};
export default HistoricalTrendContainer;
