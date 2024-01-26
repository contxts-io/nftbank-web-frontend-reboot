'use client';
import { renderToString } from 'react-dom/server';
import dynamic from 'next/dynamic';
import styles from './InventoryItemDetailChart.module.css';
import { TokenHistory } from '@/interfaces/valuation';
import { useEffect, useMemo } from 'react';
import { useAtomValue } from 'jotai';
import { currencyAtom } from '@/store/currency';
import { customToFixed, formatCurrency, formatDate } from '@/utils/common';
import { TCurrency } from '@/interfaces/constants';

const COLORS = [
  'var(--color-chart-accent-teal-bold)',
  'var(--color-chart-accent-lime-bold)',
  'var(--color-chart-accent-yellow-bolder)',
  'var(--color-chart-accent-red-bold)',
  'var(--color-chart-accent-purple-bold)',
];

const ApexCharts = dynamic(() => import('react-apexcharts'), { ssr: false });

const tooltip = ({
  series,
  seriesIndex,
  dataPointIndex,
  w,
  currency,
}: {
  series: number[][];
  seriesIndex: number;
  dataPointIndex: number;
  w: any;
  currency: TCurrency;
}) => {
  const NULL_MESSAGE = {
    Estimated: 'No Listings',
    'Collection Floor': 'No Listings',
    'Trait Floor': 'No Listings',
    '30d Avg.': 'No Trade Data',
    '90d Avg.': 'No Trade Data',
  };
  return (
    <section className={`font-caption-regular ${styles.tooltip}`}>
      <div className={`${styles.header}`}>
        {w.globals.categoryLabels[dataPointIndex]}
      </div>
      <ul className='pt-11'>
        {series.map((item, index: number) => {
          const label = w.globals.seriesNames[index];
          const todayValue =
            item[dataPointIndex] || item[dataPointIndex - 1] || 0;
          const yesterdayValue = item[dataPointIndex - 1] || 0;
          const change = todayValue - yesterdayValue;
          console.log(
            'label : ',
            label,
            ' : ',
            todayValue,
            ' : ',
            yesterdayValue,
            ' : ',
            change
          );
          return (
            <li key={index}>
              <div className='flex items-center'>
                <div className={`${styles.dot} ${styles[`dot--${index}`]}`} />
                <p>{w.globals.seriesNames[index]}</p>
              </div>
              <p className={`text-[var(--color-text-main)]`}>
                {change === 0
                  ? NULL_MESSAGE[label as keyof typeof NULL_MESSAGE]
                  : formatCurrency(todayValue?.toString() || '0', currency)}
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
      },
      {
        id: 'floor',
        name: 'Collection Floor',
        data: [],
      },
      // {
      //   id: 'traitFloor',
      //   name: 'Trait Floor',
      //   data: [],
      //   noDataIndex: [],
      // },
      {
        id: 'd30Avg',
        name: '30d Avg.',
        data: [],
      },
      {
        id: 'd90Avg',
        name: '90d Avg.',
        data: [],
      },
    ];
    historicalData &&
      historicalData.map((item, index) => {
        const _date = formatDate(new Date(item.processedAt)).split('/');
        console.log('_date', _date);
        const date = `${_date[0]}/${_date[1].replace(
          /^0+/,
          ''
        )}/${_date[2].replace(/^0+/, '')}`;
        category.push(date);
        const keys = Object.keys(item) as (keyof typeof item)[];
        console.log('item :', item, ', keys : ', keys);
        keys.map((key) => {
          key !== 'processedAt' &&
            _seriesData.map((series) => {
              if (key === series.id) {
                const prevValue = index > 0 ? series.data[index - 1] : null;
                // console.log('prevValue : ', prevValue);
                const value =
                  item[key]?.[currency] && item[key]?.[currency] !== 'nan'
                    ? item[key]?.[currency]
                    : prevValue?.toString();
                console.log('value : ', value);
                series.data.push(parseFloat(value || '0'));
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
      custom: function ({
        series,
        seriesIndex,
        dataPointIndex,
        w,
      }: {
        series: number[][];
        seriesIndex: number;
        dataPointIndex: number;
        w: any;
      }) {
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
  useEffect(() => {
    console.log('finally seriesData : ', seriesData);
  }, [seriesData]);
  return (
    <section className='w-full'>
      <ApexCharts
        options={options}
        series={seriesData.map((item, index) => ({
          ...item,
          color: COLORS[index],
        }))}
        type='line'
        width='100%'
        height='340px'
      />
    </section>
  );
};
export default InventoryItemDetailChart;
