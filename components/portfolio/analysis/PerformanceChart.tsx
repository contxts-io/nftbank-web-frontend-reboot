'use client';
import dynamic from 'next/dynamic';
import { renderToString } from 'react-dom/server';
import styles from './PerformanceChart.module.css';
import { useTheme } from 'next-themes';
import { forwardRef, useEffect, useRef } from 'react';
import { use } from 'chai';
const ApexCharts = dynamic(() => import('react-apexcharts'), { ssr: false });
const tooltip = ({ series, seriesIndex, dataPointIndex, w }: any) => {
  return (
    <div className='font-caption-regular py-8 px-16 flex flex-col items-center border-1 border-[var(--color-border-bold)] bg-[var(--color-elevation-surface)]'>
      <p className={`text-[var(--color-text-success)]`}>3.03%</p>
      <p className={`text-[var(--color-text-subtle)]`}>Aug 31</p>
    </div>
  );
};
const PerformanceChart = () => {
  const barBackground = 'var(--color-elevation-surface-raised)';
  const labelColor = 'var(--color-text-subtle)';
  const options = {
    chart: {
      type: 'bar',
      stacked: true,
      toolbar: {
        show: false,
      },
    },
    plotOptions: {
      bar: {
        vertical: true,
        barHeight: '100%',
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
  const series = [
    {
      name: 'positive',
      data: [0.4, 0, 3.76, 5.88, 0, 2.1, 0, 3.8, 0, 0, 8, 4.3],
    },
    {
      name: 'negative',
      data: [0, -1.5, 0, 0, -1.4, 0, -2.85, 0, -3.96, -4.22, 0, 0],
    },
  ];
  return (
    <section className={styles.container}>
      <ApexCharts
        options={{
          ...options,
          chart: {
            ...options.chart,
            type: 'bar',
          },
        }}
        type='bar'
        series={series}
        height={200}
        width='100%'
      />
    </section>
  );
};
export default PerformanceChart;
