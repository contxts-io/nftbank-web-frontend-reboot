import dynamic from 'next/dynamic';
import styles from './TotalInventoryChart.module.css';
import { renderToString } from 'react-dom/server';
import { twMerge } from 'tailwind-merge';
import { useInventoryCollectionPositionValue } from '@/utils/hooks/queries/inventory';
import { useMe } from '@/utils/hooks/queries/auth';
import { useEffect, useState } from 'react';
import { useAtomValue } from 'jotai';
import { currencyAtom } from '@/store/currency';
const ApexCharts = dynamic(() => import('react-apexcharts'), { ssr: false });
const COLORS = ['#2563EB', '#5EEAD4', '#A855F7', '#14B8A6', '#93C5FD'];
const tooltip = ({ series, seriesIndex, dataPointIndex, w }: any) => {
  const color = w.globals.colors[seriesIndex];
  const label = w.globals.labels[seriesIndex];
  return (
    <div className='font-caption-regular py-8 px-16 flex flex-col items-start border-1 border-[var(--color-border-bold)] bg-[var(--color-elevation-surface)]'>
      <div className='w-full flex items-center'>
        <div className={`${styles[`dot--${seriesIndex}`]} w-8 h-8 mr-8`} />
        <p className={`text-[var(--color-text-subtle)]`}>{label}</p>
      </div>
      <p className={`text-[var(--color-text-main)]`}>{series[seriesIndex]}</p>
    </div>
  );
};
const TotalInventoryChart = () => {
  const { data: me } = useMe();
  const currency = useAtomValue(currencyAtom);
  const { data: totalInventoryPositionValue, status } =
    useInventoryCollectionPositionValue(me.walletAddress);
  const [labels, setLabels] = useState<string[]>([]);
  const [series, setSeries] = useState<number[]>([]);
  useEffect(() => {
    totalInventoryPositionValue &&
      (setLabels(
        totalInventoryPositionValue?.map((item) => item.collection.name)
      ),
      setSeries(
        totalInventoryPositionValue.map((item) =>
          parseFloat(item.value[currency].amount || '0')
        )
      ));
  }, [totalInventoryPositionValue]);
  const options = {
    chart: {
      type: 'donut',
    },
    legend: {
      show: false,
    },
    dataLabels: {
      enabled: false,
    },
    responsive: [
      {
        breakpoint: 480,
        options: {},
      },
    ],
    stroke: {
      show: false,
    },
    colors: COLORS,
    tooltip: {
      followCursor: false,
      custom: function ({ series, seriesIndex, dataPointIndex, w }: any) {
        return renderToString(
          tooltip({ series, seriesIndex, dataPointIndex, w })
        );
      },
    },
    labels: labels,
    plotOptions: {
      customScale: 1,
      pie: {
        size: 280,
        donut: {
          size: '70%',
        },
      },
    },
  };

  return (
    <section className={styles.container}>
      <ApexCharts
        options={{ ...options, chart: { ...options.chart, type: 'donut' } }}
        type={'donut'}
        series={series}
        height={280}
        width={280}
      />
    </section>
  );
};
export default TotalInventoryChart;
