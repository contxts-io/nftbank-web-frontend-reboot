'use client';
import dynamic from 'next/dynamic';
import styles from './AcquisitionTypePieChart.module.css';
import { renderToString } from 'react-dom/server';
import { twMerge } from 'tailwind-merge';
import { useEffect } from 'react';
const ApexCharts = dynamic(() => import('react-apexcharts'), { ssr: false });
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
type Props = {
  data: {
    type: string;
    name: string;
    color: string;
    amount: number;
    costBasis: number;
  }[];
};
const AcquisitionTypePieChart = (props: Props) => {
  const series = props.data.map((item) => item.amount);
  const colors = props.data.map((item) => item.color);
  const labels = props.data.map((item) => item.name);
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
    colors: colors,
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
        size: 262,
        donut: {
          size: '65%',
          labels: {
            show: false,
            name: {
              show: true,
              fontSize: '22px',
              fontWeight: 600,
              color: undefined,
              offsetY: -10,
              formatter: function (val: any) {
                return '$173,398.02';
              },
            },
            total: {
              show: true,
              showAlways: true,
              label: 'Total',
              fontSize: '22px',
              fontWeight: 600,
              color: '#373d3f',
              formatter: function (w: any) {
                return w.globals.seriesTotals.reduce((a: any, b: any) => {
                  return 'total';
                }, 0);
              },
            },
          },
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
        height={300}
        width={300}
      />
    </section>
  );
};
export default AcquisitionTypePieChart;
