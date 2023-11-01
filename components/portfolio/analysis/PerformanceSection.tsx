'use client';
import Button from '@/components/buttons/Button';
import styles from './PerformanceSection.module.css';
import PerformanceChart from './PerformanceChart';
import { useAtomValue } from 'jotai';
import { currencyAtom } from '@/store/currency';
import { useMe } from '@/utils/hooks/queries/auth';
import { usePerformanceChart } from '@/utils/hooks/queries/performance';
import { formatCurrency, formatPercent, isPlus } from '@/utils/common';
import { useEffect, useState } from 'react';
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
const PerformanceSection = () => {
  const currency = useAtomValue(currencyAtom);
  const { data: me } = useMe();
  const { data: performanceChart, status: statusPerformanceChart } =
    usePerformanceChart(me.walletAddress);
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
        <Button id=''>Overall</Button>
        <Button id=''>2023</Button>
      </div>

      <section className={styles.dataWrapper}>
        <div className={styles.chartWrapper}>
          <div className={styles.chartLabel}>
            <p>{formatCurrency(total.toString(), currency)}</p>
            <p>0</p>
            <p>-6.4</p>
          </div>
          <PerformanceChart />
        </div>
        <div className={styles.tableWrapper}>
          {performanceChart?.data && (
            <table className={`font-caption-regular ${styles.table}`}>
              <thead>
                <tr>
                  <th className='w-40'>
                    <p>2023</p>
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
                        performanceChart.data[index].roi?.[currency] || '0'
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
                            {performanceChart.data[index].roi?.[currency] &&
                              formatPercent(
                                performanceChart.data[index].roi?.[currency] ||
                                  '0'
                              )}
                          </p>
                        </td>
                      );
                    })}
                  <td>
                    <p className='text-[var(--color-text-main)]'>
                      {formatPercent(total.toString())}
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
                        performanceChart.data[index].gainLoss?.[currency] || '0'
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
                            {performanceChart.data[index].gainLoss?.[
                              currency
                            ] &&
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
                    <p className='text-[var(--color-text-main)]'>
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
