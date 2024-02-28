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
import { number } from 'zod';
import Warning from '@/public/icon/Warning';
import { Tooltip } from '@nextui-org/react';
import { UNABLE_TO_CALCULATE_ROI } from '@/utils/messages';
import Info from '@/public/icon/Info';
import NoData from '@/components/error/NoData';
import FailToLoad from '@/components/error/FailToLoad';
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
const YEARS: number[] = [2024, 2023];
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
      performanceChart.data?.map((item) => {
        const value =
          item.gainLoss?.[currency] &&
          !isNaN(parseFloat(item.gainLoss?.[currency]))
            ? parseFloat(item.gainLoss?.[currency])
            : 0;
        _total += value;
      });
    setTotal(_total);
  }, [performanceChart, currency]);

  return (
    <section className={styles.container}>
      <div className={styles.title}>
        <p className='font-subtitle02-bold text-[var(--color-text-main)]'>
          Performance
        </p>

        <Dropdown
          id='performance_chart_type_filter'
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
          id='performance_chart_period_filter'
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
      {performanceChart?.data ? (
        performanceChart?.data.length === 0 ? (
          <section className={`w-full pb-150 flex justify-center mt-40`}>
            <NoData />
          </section>
        ) : (
          <section className={styles.dataWrapper}>
            <PerformanceChart
              requestParam={{
                ...portfolioUser,
                ...requestParam,
              }}
            />
            <div className={styles.tableWrapper}>
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
                        const month = index + 1;
                        const value =
                          performanceChart?.data?.find((item) => {
                            const date = new Date(item.processedAt);
                            const _value =
                              date.getMonth() + 1 === month && item;
                            return _value;
                          })?.roi?.[currency] || null;

                        const plus = isPlus(value || '0');
                        return (
                          <td key={index}>
                            {value ? (
                              isNaN(parseFloat(value)) ? (
                                <Tooltip
                                  content={UNABLE_TO_CALCULATE_ROI}
                                  className='max-w-[220px] font-caption-regular text-[var(--color-text-main)] bg-[var(--color-elevation-surface)] border-1 border-[var(--color-border-bold)] p-6'
                                >
                                  <div className='mt-20 w-full flex justify-center text-[var(--color-icon-subtle)]'>
                                    <Info />
                                  </div>
                                </Tooltip>
                              ) : (
                                <p
                                  className={`${
                                    plus === '-'
                                      ? 'text-[var(--color-text-main)]'
                                      : plus === true
                                      ? 'text-[var(--color-text-success)]'
                                      : 'text-[var(--color-text-danger)]'
                                  }`}
                                >
                                  {formatPercent(value)}
                                </p>
                              )
                            ) : (
                              <p className='text-[var(--color-text-main)]'>-</p>
                            )}
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
                        {formatPercent(
                          performanceAnnual?.roi?.[currency] || '0'
                        )}
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
                        const month = index + 1;
                        const value =
                          performanceChart?.data?.find((item) => {
                            const date = new Date(item.processedAt);
                            const _value =
                              date.getMonth() + 1 === month && item;
                            return _value;
                          })?.gainLoss?.[currency] || null;

                        const plus = isPlus(value || '0');
                        return (
                          <td key={index}>
                            {value ? (
                              isNaN(parseFloat(value)) ? (
                                <Tooltip
                                  content={UNABLE_TO_CALCULATE_ROI}
                                  className='max-w-[220px] font-caption-regular text-[var(--color-text-main)] bg-[var(--color-elevation-surface)] border-1 border-[var(--color-border-bold)] p-6'
                                >
                                  <div className='mt-20 w-full flex justify-center text-[var(--color-icon-subtle)]'>
                                    <Info />
                                  </div>
                                </Tooltip>
                              ) : (
                                <p
                                  className={
                                    plus === '-'
                                      ? 'text-[var(--color-text-main)]'
                                      : plus === true
                                      ? 'text-[var(--color-text-success)]'
                                      : 'text-[var(--color-text-danger)]'
                                  }
                                >
                                  {formatCurrency(value, currency)}
                                </p>
                              )
                            ) : (
                              <p className='text-[var(--color-text-main)]'>-</p>
                            )}
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
            </div>
          </section>
        )
      ) : (
        <section className={`w-full flex justify-center mt-40`}>
          <SkeletonLoader className='w-full h-[315px]' />
        </section>
      )}
    </section>
  );
};
export default PerformanceSection;
