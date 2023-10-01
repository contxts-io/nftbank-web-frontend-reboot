'use client';
import { renderToString } from 'react-dom/server';
import dynamic from 'next/dynamic';
import styles from './InventoryItemDetailChart.module.css';
import { useTheme } from 'next-themes';

const COLORS = ['#14B8A6', '#9333EA', '#16A34A', '#CA8A04', '#DC2626'];

type InventoryItemDetailChartProps = any;
const ApexCharts = dynamic(() => import('react-apexcharts'), { ssr: false });

const tooltip = ({ series, seriesIndex, dataPointIndex, w }: any) => {
  return (
    <section
      className={`font-caption-regular ${styles.tooltip} dark:bg-elevation-surface-dark dark:text-text-subtle-dark dark:border-border-bold-dark`}
    >
      <div className={`${styles.header} dark:border-border-bold-dark`}>
        {w.globals.categoryLabels[dataPointIndex]}
      </div>
      <ul className='pt-11'>
        {series.map((item: any, index: number) => {
          return (
            <li key={index}>
              <div className='flex items-center'>
                <div
                  className={`${styles.dot} ${
                    styles[`dot--${index}`]
                  } dark:bg-elevation-surface-dark z-20`}
                />
                <p>{w.globals.seriesNames[index]}</p>
              </div>
              <p className={`text-text-main dark:text-text-main-dark`}>
                {series[index][dataPointIndex]}
              </p>
            </li>
          );
        })}
      </ul>
    </section>
  );
};
const InventoryItemDetailChart = (props: InventoryItemDetailChartProps) => {
  const { theme } = useTheme();
  const borderColor = theme === 'light' ? '#e5e7eb' : '#162130';
  const markerFill = theme === 'light' ? '#FBFBFB' : '#000000';
  const options = {
    chart: {
      id: 'basic-bar',
      toolbar: {
        show: false,
      },
    },
    xaxis: {
      categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998, 1999],
    },
    grid: {
      borderColor: borderColor,
    },
    tooltip: {
      followCursor: true,
      custom: function ({ series, seriesIndex, dataPointIndex, w }: any) {
        return renderToString(
          tooltip({ series, seriesIndex, dataPointIndex, w })
        );
      },
    },
    dataLabel: {
      enabled: false,
    },
    legend: {
      show: false,
    },
    stroke: {
      width: 1,
    },
    fill: {
      colors: COLORS,
      type: 'solid',
      opacity: 1,
    },
    markers: {
      size: 0,
      colors: markerFill,
      strokeColors: COLORS,
      strokeWidth: 2,
      radius: 5,
      hover: {
        size: 5,
        sizeOffset: 1,
      },
    },
  };
  const series = [
    {
      name: 'Estimated',
      data: [30, 40, 45, 50, 49, 60, 70, 91],
    },
    {
      name: 'Trait Floor',
      data: [40, 45, 50, 49, 60, 70, 91, 30],
    },
    {
      name: 'Collection Floor',
      data: [50, 40, 45, 30, 49, 60, 70, 91],
    },
    {
      name: '30d Avg.',
      data: [20, 35, 50, 49, 100, 70, 51, 30],
    },
    {
      name: '90d Avg.',
      data: [140, 40, 53, 79, 60, 70, 41, 30],
    },
  ];
  return (
    <section className='w-full'>
      <ApexCharts
        options={options}
        series={series.map((item, index) => ({
          ...item,
          color: COLORS[index % COLORS.length],
        }))}
        type='line'
        width='100%'
        height='300px'
      />
    </section>
  );
};
export default InventoryItemDetailChart;
