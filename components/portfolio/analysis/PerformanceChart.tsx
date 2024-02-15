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
import { BasicParam } from '@/interfaces/request';
import { useDispatchPerformance } from '@/utils/hooks/queries/dispatch';
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
  const { data: dispatchPerformance } = useDispatchPerformance(
    props.requestParam?.walletAddress || ''
  );
  const [isPolling, setIsPolling] = useState<boolean>(true);
  const { data: performanceChart, status: statusPerformanceChart } =
    usePerformanceChart(
      {
        ...props.requestParam,
        taskId: dispatchPerformance?.taskId,
        gnlChartType: props.requestParam.gnlChartType.toLowerCase() as
          | 'overall'
          | 'realized'
          | 'unrealized',
      },
      isPolling
    );
  const [maxAbs, setMaxAbs] = useState(0);
  const barBackground = 'var(--color-elevation-surface-raised)';
  const labelColor = 'var(--color-text-subtle)';
  useEffect(() => {
    setIsPolling(true);
  }, [props.requestParam?.walletAddress]);
  useEffect(() => {
    statusPerformanceChart === 'error' && setIsPolling(false);
    statusPerformanceChart === 'success' && performanceChart?.data
      ? setIsPolling(false)
      : setIsPolling(true);
  }, [statusPerformanceChart, isPolling, performanceChart?.data]);

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
        data: Array(13)
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
        data: Array(13)
          .fill(0)
          .map((_, index) => {
            // const value = parseFloat(
            //   performanceChart.data[index]?.roi?.[currency] || '0'
            // );
            // return value <= 0 ? value : 0;
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
  }, [performanceChart, currency, props.requestParam]);
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
      <div className={`font-caption-regular ${styles.chartLabel}`}>
        <p>{formatPercent(maxAbs.toString())}</p>
        <p>0.00%</p>
        <p>{formatPercent((-maxAbs).toString())}</p>
      </div>
      <div className={styles.chart}>
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
                min: maxAbs === 0 ? -1 : -mathSqrt(-maxAbs),
                max: maxAbs === 0 ? 1 : mathSqrt(maxAbs),
              },
            }}
            type='bar'
            // series={_series}
            series={[
              ...seriesData.map((series) => {
                return {
                  name: series.name,
                  data: series.data.map((item) => {
                    // return item && mathSqrt(item);
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
      </div>
    </section>
  );
};
export default PerformanceChart;
