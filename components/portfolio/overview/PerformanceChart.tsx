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
import SkeletonLoader from '@/components/SkeletonLoader';
import { formatPercent, mathSqrt } from '@/utils/common';
import { BasicParam } from '@/interfaces/request';
import { ApexOptions } from 'apexcharts';
import { useDispatchPerformance } from '@/utils/hooks/queries/dispatch';
import FailToLoad from '@/components/error/FailToLoad';
const ApexCharts = dynamic(() => import('react-apexcharts'), { ssr: false });
const tooltip = ({ series, seriesIndex, dataPointIndex, w }: any) => {
  console.log('w.globals.', w.globals);
  const roi = series[seriesIndex].data[dataPointIndex] || 0;
  // const roi = series[seriesIndex][dataPointIndex];
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
  requestParam: BasicParam & {
    year: number;
    gnlChartType: 'overall' | 'realized' | 'unrealized';
  };
};
const PerformanceChart = (props: Props) => {
  const barBackground = 'var(--color-elevation-sunken)';
  const labelColor = 'var(--color-text-subtle)';
  const currency = useAtomValue(currencyAtom);
  const [maxAbs, setMaxAbs] = useState(0);
  const [isPolling, setIsPolling] = useState<boolean>(true);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { data: dispatchPerformance, status: statusDispatchPerformance } =
    useDispatchPerformance(props.requestParam?.walletAddress || '');

  const { data: performanceChart, status: statusPerformanceChart } =
    usePerformanceChart(
      {
        ...props.requestParam,
        taskId: dispatchPerformance?.taskId,
      },
      isPolling
    );
  useEffect(() => {
    setIsPolling(true);
  }, [props.requestParam?.walletAddress]);
  useEffect(() => {
    statusDispatchPerformance === 'loading' ||
    statusPerformanceChart === 'loading' ||
    isPolling === true
      ? setIsLoading(true)
      : setIsLoading(false);
  }, [statusDispatchPerformance, isPolling, statusPerformanceChart]);
  useEffect(() => {
    statusPerformanceChart === 'error' && setIsPolling(false);
    statusPerformanceChart === 'success' && performanceChart?.data
      ? setIsPolling(false)
      : setIsPolling(true);
  }, [statusPerformanceChart, performanceChart?.data]);
  useEffect(() => {
    setIsPolling(true);
  }, [props.requestParam]);
  const options: ApexOptions = {
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
      events: {
        mouseMove: function (event, chartContext, config) {
          // The last parameter config contains additional information like `seriesIndex` and `dataPointIndex` for cartesian charts.
          console.log('event : ', event);
          console.log('chartContext : ', chartContext);
          console.log('config : ', config);
        },
      },
    },
    plotOptions: {
      bar: {
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
      min: mathSqrt(-maxAbs),
      max: mathSqrt(maxAbs),
      labels: {
        show: true,
        style: {
          colors: labelColor,
          cssClass: 'font-caption-regular',
        },
        formatter: (value: number) => {
          if (value > 0) {
            return `${maxAbs.toFixed(2)}%`;
          }
          if (value < 0) {
            return `-${maxAbs.toFixed(2)}%`;
          }
          return '0%';
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
          tooltip({ series: seriesData, seriesIndex, dataPointIndex, w })
        );
      },
    },
  };
  let seriesData = useMemo(() => {
    if (
      !performanceChart ||
      !performanceChart.data ||
      performanceChart.data.length == 0
    )
      return [];
    return [
      {
        name: 'positive',
        // data: performanceChart.data.map((item) =>
        //   item.roi?.[currency] && parseFloat(item.roi[currency]) >= 0
        //     ? parseFloat(item.roi[currency])
        //     : 0
        // ),
        data: Array(12)
          .fill(0)
          .map((_, index) => {
            // const value = parseFloat(
            //   performanceChart.data[index]?.roi?.[currency] || '0'
            // );
            const month = index + 1;
            const value =
              performanceChart.data?.find((item) => {
                const date = new Date(item.processedAt);

                const _value = date.getMonth() + 1 === month ? item : null;
                return _value;
              })?.roi?.[currency] || '0';
            return typeof parseFloat(value) === 'number' &&
              parseFloat(value) > 0
              ? parseFloat(value)
              : null;
          }),
      },
      {
        name: 'negative',
        // data: performanceChart.data.map((item) =>
        //   item.roi?.[currency] && parseFloat(item.roi[currency]) <= 0
        //     ? parseFloat(item.roi[currency])
        //     : 0
        // ),
        data: Array(12)
          .fill(0)
          .map((_, index) => {
            // const value = parseFloat(
            //   performanceChart.data[index]?.roi?.[currency] || '0'
            // );
            const month = index + 1;
            const value =
              performanceChart.data?.find((item) => {
                const date = new Date(item.processedAt);
                const _value = date.getMonth() + 1 === month ? item : null;
                return _value;
              })?.roi?.[currency] || '0';
            return typeof parseFloat(value) === 'number' &&
              parseFloat(value) <= 0
              ? parseFloat(value)
              : null;
          }),
      },
    ];
  }, [performanceChart?.data, currency]);
  useEffect(() => {
    if (
      !seriesData ||
      seriesData.length == 0 ||
      seriesData[0].data.length === 0 ||
      seriesData[1].data.length === 0
    )
      return;
    const maxAbs = Math.max(
      ...[
        ...seriesData[0].data.map((value) => Math.abs(value || 0)),
        ...seriesData[1].data.map((value) => Math.abs(value || 0)),
      ]
    );
    setMaxAbs(maxAbs);
  }, [seriesData]);
  return (
    <section className={styles.container}>
      {statusPerformanceChart === 'error' && (
        <div className='w-full h-[200px] pt-60'>
          <FailToLoad />
        </div>
      )}
      {statusPerformanceChart !== 'error' && isLoading === true && (
        <SkeletonLoader className='w-full h-[200px]' />
      )}
      {statusPerformanceChart !== 'error' &&
        isLoading !== true &&
        statusPerformanceChart === 'success' && (
          <ApexCharts
            options={{
              ...options,
              chart: {
                ...options.chart,
                type: 'bar',
              },
              yaxis: {
                ...options.yaxis,
                min: maxAbs === 0 ? -1 : -mathSqrt(-maxAbs),
                max: maxAbs === 0 ? 1 : mathSqrt(maxAbs),
              },
            }}
            type='bar'
            series={[
              ...seriesData.map((series) => {
                return {
                  name: series.name,
                  data: series.data.map((item) => {
                    return item && typeof item == 'number'
                      ? item >= 0
                        ? mathSqrt(item)
                        : -mathSqrt(item)
                      : 0;
                  }),
                };
              }),
            ]}
            height={200}
            width='100%'
          />
        )}
    </section>
  );
};
export default PerformanceChart;
