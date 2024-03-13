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
import DropdownMobile from '@/components/dropdown/DropdownMobile';
import { BasicParam } from '@/interfaces/request';
const YEARS: number[] = [2024, 2023];
type Props = {
  portfolioUser?: BasicParam;
};
const PerformanceContainer = (props: Props) => {
  const currency = useAtomValue(currencyAtom);
  const networkId = useAtomValue(networkIdAtom);
  const _portfolioUser = { ...useAtomValue(portfolioUserAtom), networkId };
  const [portfolioUser, setPortfolioUser] = useState(
    props.portfolioUser || _portfolioUser
  );
  const [isPolling, setIsPolling] = useState<boolean>(true);

  const [requestParam, setRequestParam] = useState<{
    year: number;
    gnlChartType: 'overall' | 'realized' | 'unrealized';
  }>({
    year: 2023,
    gnlChartType: 'overall',
  });
  const [isOpen, setIsOpen] = useState(false);
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
      year: 2024,
    });
  useEffect(() => {
    setIsPolling(true);
  }, []);
  return (
    <section className={styles.container}>
      <div className={styles.row}>
        <p className={`font-subtitle02-bold ${styles.title}`}>Performance</p>
        <Dropdown
          id='summarized_performance_chart_filter'
          className='w-80 h-36 justify-between items-center hidden md:flex'
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
        <div className='flex md:hidden'>
          <DropdownMobile
            open={isOpen}
            setOpen={setIsOpen}
            list={YEARS.map((item) => {
              return {
                name: item.toString(),
                value: item.toString(),
              };
            })}
            value={
              YEARS.find((item) => item === requestParam.year)?.toString() ||
              '2023'
            }
            handleClickItem={(item) =>
              setRequestParam({
                ...requestParam,
                year: parseInt(item.value),
              })
            }
          />
        </div>
      </div>
      <PerformanceChart
        requestParam={{
          ...portfolioUser,
          ...requestParam,
        }}
      />
      <div className={`font-button03-regular ${styles.bottom}`}>
        <div className='w-full flex justify-between items-center'>
          <p className='text-[var(--color-text-subtle)]'>YTD Performance</p>
          {statusPerformanceAnnualYTD === 'success' && (
            <p
              className={
                isPlus(performanceAnnualYTD?.roi?.[currency] || '0')
                  ? 'text-[var(--color-text-success)] md:mr-20'
                  : 'text-[var(--color-text-danger)]  md:mr-20'
              }
            >
              {formatPercent(performanceAnnualYTD?.roi?.[currency] || '0')}
            </p>
          )}
          {statusPerformanceAnnualYTD === 'error' && <p>-</p>}
        </div>
        <div className='w-full flex justify-between items-center'>
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
