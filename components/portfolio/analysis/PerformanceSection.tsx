'use client';
import styles from './PerformanceSection.module.css';
import PerformanceChart from './PerformanceChart';
import { useAtomValue } from 'jotai';
import { currencyAtom } from '@/store/currency';
import { useMe } from '@/utils/hooks/queries/auth';
import {
  usePerformanceChart,
  usePerformanceChartAnnual,
} from '@/utils/hooks/queries/performance';
import { formatCurrency, formatPercent, isPlus } from '@/utils/common';
import { useEffect, useState } from 'react';
import Dropdown from '@/components/dropdown/Dropdown';
import SkeletonLoader from '@/components/SkeletonLoader';
import { networkIdAtom, portfolioUserAtom } from '@/store/portfolio';
const THEAD = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
];
const YEARS: number[] = [2023, 2022, 2021, 2020, 2019, 2018, 2017, 2016, 2015];
const GNL_CHART_TYPE: ('Overall' | 'Realized' | 'Unrealized')[] = [
  'Overall',
  'Realized',
  'Unrealized',
];
const PerformanceSection = () => {
  const currency = useAtomValue(currencyAtom);
  const networkId = useAtomValue(networkIdAtom);
  const portfolioUser = { ...useAtomValue(portfolioUserAtom), networkId };
  const [requestParam, setRequestParam] = useState<{
    year: number;
    gnlChartType: 'Overall' | 'Realized' | 'Unrealized';
  }>({
    year: 2023,
    gnlChartType: 'Overall',
  });
  const { data: performanceChart, status: statusPerformanceChart } =
    usePerformanceChart({
      ...portfolioUser,
      ...requestParam,
      gnlChartType: requestParam.gnlChartType.toLowerCase() as
        | 'overall'
        | 'realized'
        | 'unrealized',
    });
  const { data: performanceAnnual, status: statusPerformanceAnnual } =
    usePerformanceChartAnnual({
      ...portfolioUser,
      ...requestParam,
      gnlChartType: requestParam.gnlChartType.toLowerCase() as
        | 'overall'
        | 'realized'
        | 'unrealized',
    });
  const [total, setTotal] = useState(0);
  useEffect(() => {
    let _total = 0;
    performanceChart &&
      performanceChart.data.map(
        (item) => (_total += parseFloat(item.gainLoss?.[currency] || '0'))
      );
    setTotal(_total);
  }, [performanceChart, currency]);
  return (
    <section className={styles.container}>
      <div className={styles.title}>
        <p className='font-subtitle02-bold text-[var(--color-text-main)]'>
          Performance
        </p>

        <Dropdown
          id=''
          className={styles.dropdown}
          list={GNL_CHART_TYPE.map((item) => item)}
          listStyle='w-full'
          selected={
            GNL_CHART_TYPE.find((item) => item === requestParam.gnlChartType) ||
            'overall'
          }
          onClick={(name) =>
            setRequestParam({
              ...requestParam,
              gnlChartType: name as 'Overall' | 'Realized' | 'Unrealized',
            })
          }
        />
        <Dropdown
          id=''
          className='w-80 h-36 flex justify-between items-center'
          list={YEARS.map((item) => item.toString())}
          listStyle='w-full'
          selected={
            YEARS.find((item) => item === requestParam.year)?.toString() ||
            '2023'
          }
          onClick={(name) =>
            setRequestParam({
              ...requestParam,
              year: parseInt(name),
            })
          }
        />
      </div>

      <section className={styles.dataWrapper}>
        <PerformanceChart
          requestParam={{
            ...portfolioUser,
            ...requestParam,
          }}
        />
        <div className={styles.tableWrapper}>
          {statusPerformanceChart === 'loading' && (
            <SkeletonLoader className='w-full h-115' />
          )}
          {performanceChart?.data && (
            <table className={`font-caption-regular ${styles.table}`}>
              <thead>
                <tr>
                  <th className='w-70'>
                    <p>{requestParam.year}</p>
                  </th>
                  {THEAD.map((item, index) => {
                    return (
                      <th key={index} className={styles.tableHeader}>
                        <p>{item}</p>
                      </th>
                    );
                  })}
                  <th>
                    <p>total</p>
                  </th>
                </tr>
              </thead>

              <tbody>
                <tr>
                  <td>
                    <p className='text-[var(--color-text-subtle)]'>ROI</p>
                  </td>
                  {Array(12)
                    .fill(0)
                    .map((_, index) => {
                      const plus = isPlus(
                        performanceChart.data[index]?.roi?.[currency] || '0'
                      );
                      return (
                        <td key={index}>
                          <p
                            className={
                              plus === '-'
                                ? 'text-[var(--color-text-main)]'
                                : plus === true
                                ? 'text-[var(--color-text-success)]'
                                : 'text-[var(--color-text-danger)]'
                            }
                          >
                            {performanceChart.data[index]?.roi &&
                              formatPercent(
                                performanceChart.data[index].roi?.[currency] ||
                                  '0'
                              )}
                          </p>
                        </td>
                      );
                    })}
                  <td>
                    <p
                      className={
                        isPlus(performanceAnnual?.roi?.[currency] || '0') ===
                        '-'
                          ? 'text-[var(--color-text-main)]'
                          : isPlus(
                              performanceAnnual?.roi?.[currency] || '0'
                            ) === true
                          ? 'text-[var(--color-text-success)]'
                          : 'text-[var(--color-text-danger)]'
                      }
                    >
                      {formatPercent(performanceAnnual?.roi?.[currency] || '0')}
                    </p>
                  </td>
                </tr>
                <tr>
                  <td>
                    <p className='text-[var(--color-text-subtle)]'>G&L</p>
                  </td>
                  {Array(12)
                    .fill(0)
                    .map((_, index) => {
                      const plus = isPlus(
                        performanceChart.data[index]?.gainLoss?.[currency] ||
                          '0'
                      );
                      return (
                        <td key={index}>
                          <p
                            className={
                              plus === '-'
                                ? 'text-[var(--color-text-main)]'
                                : plus === true
                                ? 'text-[var(--color-text-success)]'
                                : 'text-[var(--color-text-danger)]'
                            }
                          >
                            {performanceChart.data[index]?.gainLoss &&
                              formatCurrency(
                                performanceChart.data[index].gainLoss?.[
                                  currency
                                ] || '0',
                                currency
                              )}
                          </p>
                        </td>
                      );
                    })}
                  <td>
                    <p
                      className={`text-ellipsis ${
                        isPlus(total || '0') === '-'
                          ? 'text-[var(--color-text-main)]'
                          : isPlus(total || '0') === true
                          ? 'text-[var(--color-text-success)]'
                          : 'text-[var(--color-text-danger)]'
                      }`}
                    >
                      {formatCurrency(total.toString(), currency)}
                    </p>
                  </td>
                </tr>
              </tbody>
            </table>
          )}
        </div>
      </section>
    </section>
  );
};
export default PerformanceSection;
