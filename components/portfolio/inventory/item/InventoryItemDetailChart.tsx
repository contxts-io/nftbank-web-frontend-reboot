'use client';
import { renderToString } from 'react-dom/server';
import dynamic from 'next/dynamic';
import styles from './InventoryItemDetailChart.module.css';
import { TokenHistory } from '@/interfaces/valuation';
import { useEffect, useMemo } from 'react';
import { useAtomValue } from 'jotai';
import { currencyAtom } from '@/store/currency';
import { customToFixed, formatCurrency, formatDate } from '@/utils/common';

const COLORS = [
  'var(--color-chart-accent-teal-bold)',
  'var(--color-chart-accent-purple-bold)',
  'var(--color-chart-accent-lime-bold)',
  'var(--color-chart-accent-yellow-bolder)',
  'var(--color-chart-accent-red-bold)',
];

const ApexCharts = dynamic(() => import('react-apexcharts'), { ssr: false });

const tooltip = ({ series, seriesIndex, dataPointIndex, w, currency }: any) => {
  console.log('w', w);
  return (
    <section className={`font-caption-regular ${styles.tooltip}`}>
      <div className={`${styles.header}`}>
        {w.globals.categoryLabels[dataPointIndex]}
      </div>
      <ul className='pt-11'>
        {series.map((item: any, index: number) => {
          return (
            <li key={index}>
              <div className='flex items-center'>
                <div className={`${styles.dot} ${styles[`dot--${index}`]}`} />
                <p>{w.globals.seriesNames[index]}</p>
              </div>
              <p className={`text-[var(--color-text-main)]`}>
                {formatCurrency(series[index][dataPointIndex], currency)}
              </p>
            </li>
          );
        })}
      </ul>
    </section>
  );
};
type InventoryItemDetailChartProps = { historicalData: TokenHistory };
type Series = {
  id: string;
  name: string;
  data: (number | null)[];
  noDataIndex: number[];
}[];
const InventoryItemDetailChart = ({
  historicalData,
}: InventoryItemDetailChartProps) => {
  const borderColor = 'var(--color-border-main)';
  const markerFill = 'var(--color-elevation-surface)';
  const axisColor = 'var(--color-text-subtle)';
  const currency = useAtomValue(currencyAtom);

  let category: string[] = [];

  let seriesData = useMemo(() => {
    let _seriesData: Series = [
      {
        id: 'estimate',
        name: 'Estimated',
        data: [],
        noDataIndex: [],
      },
      {
        id: 'floor',
        name: 'Collection Floor',
        data: [],
        noDataIndex: [],
      },
      {
        id: 'traitFloor',
        name: 'Trait Floor',
        data: [],
        noDataIndex: [],
      },
      {
        id: 'd30Avg',
        name: '30d Avg.',
        data: [],
        noDataIndex: [],
      },
      {
        id: 'd90Avg',
        name: '90d Avg.',
        data: [],
        noDataIndex: [],
      },
    ];
    historicalData &&
      historicalData.map((item, index) => {
        const _date = formatDate(new Date(item.processedAt)).split('/');
        const date = `${_date[1]}/${_date[2]}`;
        category.push(date);
        const keys = Object.keys(item) as (keyof typeof item)[];
        keys.map((key) => {
          key !== 'processedAt' &&
            _seriesData.map((series) => {
              if (key === series.id) {
                const prevValue =
                  index > 0 ? series.data[index - 1] || null : null;
                const value = item[key]?.[currency]
                  ? item[key]?.[currency]
                  : prevValue?.toString();
                value
                  ? series.data.push(parseFloat(value))
                  : (series.data.push(null), series.noDataIndex.push(index));
              }
            });
        });
      });
    return _seriesData;
  }, [historicalData, currency, category]);

  const options = {
    chart: {
      id: 'basic-bar',
      toolbar: {
        show: false,
      },
    },
    xaxis: {
      type: 'category' as const,
      tickAmount: 10,
      categories: category,
      labels: {
        rotate: 0,
        style: {
          colors: axisColor,
          fontSize: '12px',
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
      tickAmount: 6,
      labels: {
        style: {
          colors: axisColor,
          fontSize: '12px',
        },
        formatter: function (value: any) {
          return value ? customToFixed(value) : value;
        },
      },
    },
    grid: {
      borderColor: borderColor,
    },
    tooltip: {
      followCursor: true,
      custom: function ({ series, seriesIndex, dataPointIndex, w }: any) {
        return renderToString(
          tooltip({ series, seriesIndex, dataPointIndex, w, currency })
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

  return (
    <section className='w-full'>
      <ApexCharts
        options={options}
        series={seriesData.map((item, index) => ({
          ...item,
          color: COLORS[index % COLORS.length],
        }))}
        type='line'
        width='100%'
        height='340px'
      />
    </section>
  );
};
export default InventoryItemDetailChart;
