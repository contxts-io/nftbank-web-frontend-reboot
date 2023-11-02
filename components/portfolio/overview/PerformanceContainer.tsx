'use client';
import Button from '@/components/buttons/Button';
import styles from './PerformanceContainer.module.css';
import CaretDown from '@/public/icon/CaretDown';
import PerformanceChart from './PerformanceChart';
import { usePerformanceChartAnnual } from '@/utils/hooks/queries/performance';
import { useMe } from '@/utils/hooks/queries/auth';
import { useAtomValue } from 'jotai';
import { currencyAtom } from '@/store/currency';
import { formatPercent } from '@/utils/common';
const PerformanceContainer = () => {
  const currency = useAtomValue(currencyAtom);
  const { data: me } = useMe();
  const { data: performanceAnnualAll, status: statusPerformanceAnnualAll } =
    usePerformanceChartAnnual({
      walletAddress: me.walletAddress,
      window: 'all',
    });
  const { data: performanceAnnualYTD, status: statusPerformanceAnnualYTD } =
    usePerformanceChartAnnual({ walletAddress: me.walletAddress });
  return (
    <section className={styles.container}>
      <div className={styles.row}>
        <p className={`font-subtitle02-bold ${styles.title}`}>Performance</p>
        <Button id={'/portfolio/overview/activity/showmore'}>
          2023 <CaretDown />
        </Button>
      </div>
      <PerformanceChart />
      <div className={`font-button03-regular ${styles.bottom}`}>
        <div className='w-[50%] flex justify-between items-center'>
          <p className='text-[var(--color-text-subtle)]'>YTD Performance</p>
          {statusPerformanceAnnualAll === 'success' && (
            <p className='text-[var(--color-text-success)] mr-20'>
              {formatPercent(performanceAnnualYTD?.roi?.[currency] || '0')}
            </p>
          )}
        </div>
        <div className='w-[50%] ml-20 flex justify-between items-center'>
          <p className='text-[var(--color-text-subtle)]'>
            All time Performance
          </p>
          {statusPerformanceAnnualYTD === 'success' && (
            <p className='text-[var(--color-text-success)]'>
              {formatPercent(performanceAnnualAll?.roi?.[currency] || '0')}
            </p>
          )}
        </div>
      </div>
    </section>
  );
};
export default PerformanceContainer;
