'use client';
import dynamic from 'next/dynamic';
import { renderToString } from 'react-dom/server';
import styles from './PerformanceChart.module.css';
import { useTheme } from 'next-themes';
import { useAtomValue } from 'jotai';
import { currencyAtom } from '@/store/currency';
import { useMe } from '@/utils/hooks/queries/auth';
import { usePerformanceChart } from '@/utils/hooks/queries/performance';
import { useEffect, useMemo, useState } from 'react';
import { set } from 'cypress/types/lodash';
import SkeletonLoader from '@/components/SkeletonLoader';
import { formatPercent } from '@/utils/common';
const ApexCharts = dynamic(() => import('react-apexcharts'), { ssr: false });
const tooltip = ({ series, seriesIndex, dataPointIndex, w }: any) => {
  console.log('w.globals.', w.globals);
  const roi = series[seriesIndex][dataPointIndex];
  return (
    <div className='font-caption-regular py-8 px-16 flex flex-col items-center border-1 border-[var(--color-border-bold)] bg-[var(--color-elevation-surface)]'>
      <p
        className={`${
          seriesIndex === 0
            ? 'text-[var(--color-text-success)]'
            : 'text-[var(--color-text-danger)]'
        }`}
      >
        {formatPercent(roi)}
      </p>
      <p className={`text-[var(--color-text-subtle)]`}>
        {w.globals.labels[dataPointIndex]}
      </p>
    </div>
  );
};
type Props = {
  requestParam: {
    walletAddress: string;
    year: number;
    gnlChartType: 'overall' | 'realized' | 'unrealized';
  };
};
const PerformanceChart = (props: Props) => {
  const barBackground = 'var(--color-elevation-sunken)';
  const labelColor = 'var(--color-text-subtle)';
  const currency = useAtomValue(currencyAtom);
  const [maxAbs, setMaxAbs] = useState(0);
  const { data: performanceChart, status: statusPerformanceChart } =
    usePerformanceChart(props.requestParam);
  const options = {
    chart: {
      type: 'bar',
      stacked: true,
      toolbar: {
        show: false,
      },
      animations: {
        dynamicAnimation: {
          enabled: false,
        },
      },
    },
    plotOptions: {
      bar: {
        vertical: true,
        barHeight: '100%',
        columnWidth: '90%',
        colors: {
          backgroundBarColors: [barBackground],
          backgroundBarOpacity: 0.6,
        },
      },
    },
    dataLabels: {
      enabled: false,
    },
    xaxis: {
      categories: [
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
      ],
      labels: {
        show: true,
        style: {
          colors: labelColor,
          cssClass: 'font-caption-regular',
        },
      },
      axisTicks: {
        show: false,
      },
      axisBorder: {
        show: false,
      },
      tooltip: {
        enabled: false,
      },
    },
    yaxis: {
      tickAmount: 2,
      opposite: true,
      labels: {
        show: true,
        style: {
          colors: labelColor,
          cssClass: 'font-caption-regular',
        },
        formatter: (value: number) => {
          return value.toFixed(2) + '%';
        },
      },
    },
    legend: {
      show: false,
    },
    colors: ['#14B8A6', '#EF4444'],
    grid: {
      show: false,
    },
    tooltip: {
      followCursor: false,
      custom: function ({ series, seriesIndex, dataPointIndex, w }: any) {
        return renderToString(
          tooltip({ series, seriesIndex, dataPointIndex, w })
        );
      },
    },
  };
  let series = useMemo(() => {
    if (!performanceChart || performanceChart.data.length == 0) return [];
    return [
      {
        name: 'positive',
        data: performanceChart.data.map((item) =>
          item.roi?.[currency] && parseFloat(item.roi[currency]) >= 0
            ? parseFloat(item.roi[currency])
            : 0
        ),
      },
      {
        name: 'negative',
        data: performanceChart.data.map((item) =>
          item.roi?.[currency] && parseFloat(item.roi[currency]) <= 0
            ? parseFloat(item.roi[currency])
            : 0
        ),
      },
    ];
  }, [performanceChart, currency]);
  useEffect(() => {
    console.log('series', series);
    if (
      !series ||
      series.length == 0 ||
      series[0].data.length === 0 ||
      series[1].data.length === 0
    )
      return;
    const maxAbs = Math.max(
      ...[
        ...series[0].data.map((value) => Math.abs(value)),
        ...series[1].data.map((value) => Math.abs(value)),
      ]
    );
    setMaxAbs(maxAbs);
  }, [series]);
  return (
    <section className={styles.container}>
      {statusPerformanceChart === 'loading' && (
        <SkeletonLoader className='w-full h-[200px]' />
      )}
      {statusPerformanceChart === 'success' && (
        <ApexCharts
          options={{
            ...options,
            chart: {
              ...options.chart,
              type: 'bar',
            },
            yaxis: {
              ...options.yaxis,
              min: -maxAbs,
              max: maxAbs,
            },
          }}
          type='bar'
          series={series}
          height={200}
          width='100%'
        />
      )}
    </section>
  );
};
export default PerformanceChart;
