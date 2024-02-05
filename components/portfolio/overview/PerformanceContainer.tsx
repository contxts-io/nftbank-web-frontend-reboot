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
import { useEffect, useState } from 'react';
import Dropdown from '@/components/dropdown/Dropdown';
import { networkIdAtom, portfolioUserAtom } from '@/store/portfolio';
import { useDispatchPerformance } from '@/utils/hooks/queries/dispatch';
const YEARS: number[] = [2024, 2023];
const PerformanceContainer = () => {
  const currency = useAtomValue(currencyAtom);
  const networkId = useAtomValue(networkIdAtom);
  const portfolioUser = { ...useAtomValue(portfolioUserAtom), networkId };
  const [isPolling, setIsPolling] = useState<boolean>(true);
  const { data: dispatchPerformance } = useDispatchPerformance(
    portfolioUser?.walletAddress || ''
  );
  const [requestParam, setRequestParam] = useState<{
    year: number;
    gnlChartType: 'overall' | 'realized' | 'unrealized';
  }>({
    year: 2023,
    gnlChartType: 'overall',
  });
  const { data: performanceAnnualAll, status: statusPerformanceAnnualAll } =
    usePerformanceChartAnnual(
      {
        ...requestParam,
        ...portfolioUser,
        taskId: dispatchPerformance?.taskId,
        networkId: 'ethereum',
        year: 'all',
      },
      isPolling
    );
  const { data: performanceAnnualYTD, status: statusPerformanceAnnualYTD } =
    usePerformanceChartAnnual(
      {
        ...requestParam,
        ...portfolioUser,
        taskId: dispatchPerformance?.taskId,
        year: 2024,
      },
      isPolling
    );
  useEffect(() => {
    setIsPolling(true);
  }, []);
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
          {statusPerformanceAnnualYTD === 'success' && (
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
          {statusPerformanceAnnualYTD === 'error' && <p>-</p>}
        </div>
        <div className='w-[50%] ml-20 flex justify-between items-center'>
          <p className='text-[var(--color-text-subtle)]'>
            All time Performance
          </p>
          {statusPerformanceAnnualAll === 'success' && (
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
          {statusPerformanceAnnualAll === 'error' && <p>-</p>}
        </div>
      </div>
    </section>
  );
};
export default PerformanceContainer;
