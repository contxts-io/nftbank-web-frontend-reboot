'use client';
import Button from '@/components/buttons/Button';
import styles from './PerformanceSection.module.css';
import PerformanceChart from './PerformanceChart';
import { useAtomValue } from 'jotai';
import { currencyAtom } from '@/store/currency';
import { useMe } from '@/utils/hooks/queries/auth';
import { usePerformanceChart } from '@/utils/hooks/queries/performance';
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
  return (
    <section className={styles.container}>
      <div className={styles.title}>
        <p className='font-subtitle02-bold text-[var(--color-text-main)]'>
          Performance
        </p>
        <Button id=''>Overall</Button>
        <Button id=''>2023</Button>
      </div>
      <PerformanceChart />
      <section className={styles.tableWrapper}>
        {performanceChart?.data && (
          <table className={`font-caption-regular ${styles.table}`}>
            <thead>
              <tr>
                <th className='w-42'>
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
                  <p>ROI</p>
                </td>
                {Array(12)
                  .fill(0)
                  .map((_, index) => {
                    return (
                      <td key={index}>
                        <p>{performanceChart.data[index].roi?.[currency]}</p>
                      </td>
                    );
                  })}
              </tr>
              <tr>
                <td>
                  <p>G&L</p>
                </td>
                {Array(12)
                  .fill(0)
                  .map((_, index) => {
                    return (
                      <td key={index}>
                        <p>
                          {performanceChart.data[index].gainLoss?.[currency]}
                        </p>
                      </td>
                    );
                  })}
              </tr>
            </tbody>
          </table>
        )}
      </section>
    </section>
  );
};
export default PerformanceSection;
