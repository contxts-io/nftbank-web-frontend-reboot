'use client';
import dynamic from 'next/dynamic';
import { renderToString } from 'react-dom/server';
import styles from './PerformanceChart.module.css';
import { useEffect, useMemo, useState } from 'react';
import { useMe } from '@/utils/hooks/queries/auth';
import { usePerformanceChart } from '@/utils/hooks/queries/performance';
import { useAtomValue } from 'jotai';
import { currencyAtom } from '@/store/currency';
import { formatPercent, mathSqrt } from '@/utils/common';
import SkeletonLoader from '@/components/SkeletonLoader';
import { useMyWalletList } from '@/utils/hooks/queries/wallet';
import { BasicParam } from '@/interfaces/request';
const ApexCharts = dynamic(() => import('react-apexcharts'), { ssr: false });
const tooltip = ({ series, seriesIndex, dataPointIndex, w, year }: any) => {
  // const roi = series[seriesIndex][dataPointIndex];
  const roi = series[seriesIndex].data[dataPointIndex] || 0;
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
        {`${year} ${w.globals.labels[dataPointIndex]}`}
      </p>
    </div>
  );
};
type Props = {
  requestParam: BasicParam & {
    year: number;
    gnlChartType: 'Overall' | 'Realized' | 'Unrealized';
  };
};
const PerformanceChart = (props: Props) => {
  const currency = useAtomValue(currencyAtom);
  const { data: performanceChart, status: statusPerformanceChart } =
    usePerformanceChart({
      ...props.requestParam,
      gnlChartType: props.requestParam.gnlChartType.toLowerCase() as
        | 'overall'
        | 'realized'
        | 'unrealized',
    });
  const [maxAbs, setMaxAbs] = useState(0);
  const barBackground = 'var(--color-elevation-surface-raised)';
  const labelColor = 'var(--color-text-subtle)';

  let seriesData = useMemo(() => {
    if (!performanceChart || performanceChart.data.length == 0) return [];
    return [
      {
        name: 'positive',
        data: Array(13)
          .fill(0)
          .map((_, index) => {
            const value = parseFloat(
              performanceChart.data[index]?.roi?.[currency] || '0'
            );
            return value >= 0 ? value : 0;
          }),
      },
      {
        name: 'negative',
        data: Array(13)
          .fill(0)
          .map((_, index) => {
            const value = parseFloat(
              performanceChart.data[index]?.roi?.[currency] || '0'
            );
            return value <= 0 ? value : 0;
          }),
      },
    ];
  }, [performanceChart, currency, props.requestParam]);
  useEffect(() => {
    console.log('series', seriesData);
    if (
      !seriesData ||
      seriesData.length == 0 ||
      seriesData[0].data.length === 0 ||
      seriesData[1].data.length === 0
    )
      return;
    const maxAbs = Math.max(
      ...[
        ...seriesData[0].data.map((value) => Math.abs(value)),
        ...seriesData[1].data.map((value) => Math.abs(value)),
      ]
    );
    console.log('maxAbs', maxAbs);
    setMaxAbs(maxAbs);
    console.log('seriesData', seriesData);
  }, [seriesData]);
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
        columnWidth: '95%',
        barHeight: '100%',
        colors: {
          backgroundBarColors: [
            barBackground,
            barBackground,
            barBackground,
            barBackground,
            barBackground,
            barBackground,
            barBackground,
            barBackground,
            barBackground,
            barBackground,
            barBackground,
            barBackground,
            'transparent',
          ],
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
        show: false,
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
      opposite: false,
      maxWidth: 160,
      minWidth: 160,
      min: mathSqrt(-maxAbs),
      max: mathSqrt(maxAbs),
      labels: {
        show: false,
        style: {
          colors: labelColor,
          cssClass: 'font-caption-regular',
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
          tooltip({
            series: seriesData,
            seriesIndex,
            dataPointIndex,
            w,
            year: props.requestParam.year,
          })
        );
      },
    },
  };

  return (
    <section className={styles.container}>
      <div className={styles.chartLabel}>
        <p>{formatPercent(maxAbs.toString())}</p>
        <p>0.00%</p>
        <p>{formatPercent((-maxAbs).toString())}</p>
      </div>
      <div className='w-full ml-20 h-200'>
        {statusPerformanceChart === 'success' && (
          <ApexCharts
            options={{
              ...options,
              chart: {
                ...options.chart,
                type: 'bar',
              },
            }}
            type='bar'
            // series={_series}
            series={[
              ...seriesData.map((series) => {
                return {
                  name: series.name,
                  data: series.data.map((item) => {
                    console.log('item', item, mathSqrt(item));
                    return item && mathSqrt(item);
                  }),
                };
              }),
            ]}
            height={200}
            width='100%'
          />
        )}
      </div>
    </section>
  );
};
export default PerformanceChart;
