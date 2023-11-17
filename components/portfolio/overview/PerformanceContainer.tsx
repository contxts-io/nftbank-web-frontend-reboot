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
const YEARS: number[] = [2023, 2022, 2021, 2020, 2019, 2018, 2017, 2016, 2015];
const PerformanceContainer = () => {
  const currency = useAtomValue(currencyAtom);
  const { data: me } = useMe();
  const [requestParam, setRequestParam] = useState<{
    year: number;
    gnlChartType: 'overall' | 'realized' | 'unrealized';
  }>({
    year: 2023,
    gnlChartType: 'overall',
  });
  const { data: performanceAnnualAll, status: statusPerformanceAnnualAll } =
    usePerformanceChartAnnual({
      walletAddress: me?.walletAddress,
      window: 'all',
      ...requestParam,
    });
  const { data: performanceAnnualYTD, status: statusPerformanceAnnualYTD } =
    usePerformanceChartAnnual({
      walletAddress: me?.walletAddress,
      ...requestParam,
      window: 'ytd',
    });

  return (
    <section className={styles.container}>
      <div className={styles.row}>
        <p className={`font-subtitle02-bold ${styles.title}`}>Performance</p>
        <Dropdown
          id='performanceChartYear'
          className='w-80 h-36 flex justify-between items-center mb-12'
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
          walletAddress: me?.walletAddress,
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
