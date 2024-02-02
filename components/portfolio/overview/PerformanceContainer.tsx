'use client';
import Button from '@/components/buttons/Button';
import styles from './PerformanceContainer.module.css';
import CaretDown from '@/public/icon/CaretDown';
import PerformanceChart from './PerformanceChart';
import { usePerformanceChartAnnual } from '@/utils/hooks/queries/performance';
import { useMe } from '@/utils/hooks/queries/auth';
import { useAtomValue } from 'jotai';
import { currencyAtom } from '@/store/currency';
import { formatPercent, isPlus } from '@/utils/common';
import { useState } from 'react';
import Dropdown from '@/components/dropdown/Dropdown';
import { networkIdAtom, portfolioUserAtom } from '@/store/portfolio';
const YEARS: number[] = [2024, 2023];
const PerformanceContainer = () => {
  const currency = useAtomValue(currencyAtom);
  const networkId = useAtomValue(networkIdAtom);
  const portfolioUser = { ...useAtomValue(portfolioUserAtom), networkId };
  const [requestParam, setRequestParam] = useState<{
    year: number;
    gnlChartType: 'overall' | 'realized' | 'unrealized';
  }>({
    year: 2024,
    gnlChartType: 'overall',
  });
  const { data: performanceAnnualAll, status: statusPerformanceAnnualAll } =
    usePerformanceChartAnnual({
      ...requestParam,
      ...portfolioUser,
      networkId: 'ethereum',
      year: 'all',
    });
  const { data: performanceAnnualYTD, status: statusPerformanceAnnualYTD } =
    usePerformanceChartAnnual({
      ...requestParam,
      ...portfolioUser,
      year: 2023,
    });

  return (
    <section className={styles.container}>
      <div className={styles.row}>
        <p className={`font-subtitle02-bold ${styles.title}`}>Performance</p>
        <Dropdown
          id='performanceChartYear'
          className='w-80 h-36 flex justify-between items-center'
          list={YEARS.map((item) => item.toString())}
          listStyle='w-full'
          selected={
            YEARS.find((item) => item === requestParam.year)?.toString() ||
            '2023'
          }
          onClick={(name: string) =>
            setRequestParam({
              ...requestParam,
              year: parseInt(name),
            })
          }
        />
      </div>
      <PerformanceChart
        requestParam={{
          ...portfolioUser,
          ...requestParam,
        }}
      />
      <div className={`font-button03-regular ${styles.bottom}`}>
        <div className='w-[50%] flex justify-between items-center'>
          <p className='text-[var(--color-text-subtle)]'>YTD Performance</p>
          {statusPerformanceAnnualAll === 'success' && (
            <p
              className={
                isPlus(performanceAnnualYTD?.roi?.[currency] || '0')
                  ? 'text-[var(--color-text-success)]  mr-20'
                  : 'text-[var(--color-text-danger)]  mr-20'
              }
            >
              {formatPercent(performanceAnnualYTD?.roi?.[currency] || '0')}
            </p>
          )}
        </div>
        <div className='w-[50%] ml-20 flex justify-between items-center'>
          <p className='text-[var(--color-text-subtle)]'>
            All time Performance
          </p>
          {statusPerformanceAnnualYTD === 'success' && (
            <p
              className={
                isPlus(performanceAnnualAll?.roi?.[currency] || '0')
                  ? `text-[var(--color-text-success)]`
                  : 'text-[var(--color-text-danger)]'
              }
            >
              {formatPercent(performanceAnnualAll?.roi?.[currency] || '0')}
            </p>
          )}
        </div>
      </div>
    </section>
  );
};
export default PerformanceContainer;
