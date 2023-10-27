import dynamic from 'next/dynamic';
import styles from './TotalInventoryChart.module.css';
import { renderToString } from 'react-dom/server';
<<<<<<< HEAD
=======
import { twMerge } from 'tailwind-merge';
>>>>>>> bca634e7cbf174f04fa8dd1a944ea7a06e1fd533
import {
  useInventoryCollectionPositionAmount,
  useInventoryCollectionPositionValue,
} from '@/utils/hooks/queries/inventory';
import { useMe } from '@/utils/hooks/queries/auth';
import { useEffect, useState } from 'react';
import { useAtomValue } from 'jotai';
import { currencyAtom } from '@/store/currency';
import { formatPercent, shortenAddress } from '@/utils/common';
const ApexCharts = dynamic(() => import('react-apexcharts'), { ssr: false });
<<<<<<< HEAD
const COLORS = [
  'var(--color-chart-information)',
  'var(--color-chart-accent-teal-boldest)',
  'var(--color-chart-accent-purple-bold)',
  'var(--color-chart-accent-teal-bold)',
  'var(--color-chart-accent-blue-boldest)',
  'var(--color-chart-accent-gray-bolder)',
];
const tooltip = ({ series, seriesIndex, dataPointIndex, w, selected }: any) => {
  const color = w.globals.colors[seriesIndex];
  const label = w.globals.labels[seriesIndex];
  return (
    <div className='font-caption-regular py-8 px-16 flex flex-col items-start border-1 border-[var(--color-border-bold)] bg-[var(--color-elevation-surface)]'>
      <div className='w-full flex items-center'>
        <div
          className={`${
            styles[`dot--${seriesIndex % series.length}`]
          } w-8 h-8 mr-8`}
        />
        <p className={`text-[var(--color-text-subtle)]`}>{label}</p>
      </div>
      {selected === 'amount' && (
        <p className={`text-[var(--color-text-main)]`}>
          {formatPercent(series[seriesIndex])}
        </p>
      )}
      {selected === 'value' && (
        <p className={`text-[var(--color-text-main)]`}>{series[seriesIndex]}</p>
      )}
    </div>
  );
};
const TotalInventoryChart = (props: {
  selected: 'value' | 'amount';
  totalAmount: number;
}) => {
  const { selected, totalAmount } = props;
  const { data: me } = useMe();
  const currency = useAtomValue(currencyAtom);
  const { data: totalInventoryPositionValue, status } =
    useInventoryCollectionPositionValue(me.walletAddress);
  const { data: totalInventoryPositionAmount, status: statusAmount } =
    useInventoryCollectionPositionAmount(me.walletAddress);
  const [labels, setLabels] = useState<string[]>([]);
  const [series, setSeries] = useState<number[]>([]);
  useEffect(() => {
    selected === 'value' &&
      totalInventoryPositionValue &&
      (setLabels(
        totalInventoryPositionValue?.map((item) => item.collection.name || '')
      ),
      setSeries(
        totalInventoryPositionValue.map((item) =>
          parseFloat(item.value[currency].amount || '0')
        )
      ));
    selected === 'amount' &&
      totalInventoryPositionAmount &&
      (setLabels(
        totalInventoryPositionAmount?.map((item, index) => {
          return (
            item.collection.name ||
            shortenAddress(item.collection.assetContract)
          );
        })
      ),
      setSeries(
        totalInventoryPositionAmount.map(
          (item) => (item.amount / totalAmount) * 100 || 0
        )
      ));
  }, [selected, totalInventoryPositionValue, totalInventoryPositionAmount]);
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
          tooltip({ series, seriesIndex, dataPointIndex, w, selected })
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
