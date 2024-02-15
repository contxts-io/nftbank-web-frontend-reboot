'use client';
import { renderToString } from 'react-dom/server';
import dynamic from 'next/dynamic';
import styles from './InventoryItemDetailChart.module.css';
import { TokenHistory } from '@/interfaces/valuation';
import { useEffect, useMemo, useState } from 'react';
import { useAtomValue } from 'jotai';
import { currencyAtom } from '@/store/currency';
import {
  customToFixed,
  formatCurrency,
  formatDate,
  mathSqrt,
  reverseMathSqrt,
} from '@/utils/common';
import { TCurrency } from '@/interfaces/constants';
import { ApexOptions } from 'apexcharts';

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
  seriesData,
}: {
  series: number[][];
  seriesIndex: number;
  dataPointIndex: number;
  w: any;
  currency: TCurrency;
  seriesData: Series;
}) => {
  const NULL_MESSAGE = {
    Estimated: 'Not Supported',
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
          // const todayValue =
          //   item[dataPointIndex] || item[dataPointIndex - 1] || 0;
          const todayValue =
            w.globals.initialSeries[index].realData[dataPointIndex] ||
            w.globals.initialSeries[index].realData[dataPointIndex - 1] ||
            0;

          const todayFormattedValue =
            w.globals.initialSeries[index].data[dataPointIndex] ||
            w.globals.initialSeries[index].data[dataPointIndex - 1] ||
            0;

          const todayReversedValue = reverseMathSqrt(todayFormattedValue);

          return (
            <li key={index}>
              <div className='flex items-center'>
                <div className={`${styles.dot} ${styles[`dot--${index}`]}`} />
                <p>{w.globals.seriesNames[index]}</p>
              </div>
              <p className={`text-[var(--color-text-main)]`}>
                {w.globals.initialSeries[index].noDataIndex.includes(index)
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
  realData: (number | null)[];
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
        realData: [],
        noDataIndex: [],
      },
      {
        id: 'floor',
        name: 'Collection Floor',

        data: [],
        realData: [],
        noDataIndex: [],
      },
      // {
      //   id: 'traitFloor',
      //   name: 'Trait Floor',
      //
      // data: [],
      // realData: [],
      // noDataIndex: [],
      // },
      {
        id: 'd30Avg',
        name: '30d Avg.',

        data: [],
        realData: [],
        noDataIndex: [],
      },
      {
        id: 'd90Avg',
        name: '90d Avg.',

        data: [],
        realData: [],
        noDataIndex: [],
      },
    ];

    historicalData &&
      historicalData.map((item, index) => {
        const date = item.processedAt.split(' ')[0]?.replaceAll('-', '/');
        category.push(date);
        const keys = Object.keys(item) as (keyof typeof item)[];
        keys.map((key) => {
          key !== 'processedAt' &&
            _seriesData.map((series) => {
              if (key === series.id) {
                const prevValue = index > 0 ? series.data[index - 1] : null;
                const value =
                  item[key]?.[currency] && item[key]?.[currency] !== 'nan'
                    ? item[key]?.[currency]
                    : prevValue?.toString();
                if (
                  item[key]?.[currency] &&
                  item[key]?.[currency] !== 'nan' &&
                  item[key]?.[currency] !== 'None'
                ) {
                  series.data.push(
                    mathSqrt(parseFloat(item[key]?.[currency] || '0'))
                  );
                  series.realData.push(
                    parseFloat(item[key]?.[currency] || '0')
                  );
                } else {
                  series.noDataIndex.push(index);
                  series.data.push(
                    prevValue
                      ? mathSqrt(parseFloat(prevValue?.toString()))
                      : null
                  );
                  series.realData.push(
                    prevValue ? parseFloat(prevValue?.toString()) : null
                  );
                }
              }
            });
        });
      });
    return _seriesData;
  }, [historicalData, currency, category]);
  const maxYValue = useMemo(() => {
    function _findMaxValue(dataArray: number[]) {
      if (dataArray.length === 0) {
        return undefined; // 배열이 비어있을 경우 undefined 반환 또는 다른 적절한 값 설정
      }

      return Math.max(...dataArray);
    }
    // 'data' 배열의 최댓값 찾기
    let maxValues = seriesData.map((series) =>
      _findMaxValue(series.data as number[])
    );

    // 최종 최대값 찾기
    let overallMaxValue = _findMaxValue(maxValues as number[]);
    return overallMaxValue;
  }, [seriesData]);
  const options: ApexOptions = {
    chart: {
      id: 'basic-bar',
      toolbar: {
        show: false,
      },
      animations: {
        enabled: false,
        easing: 'easeinout',
        speed: 800,
        animateGradually: {
          enabled: true,
          delay: 150,
        },
        dynamicAnimation: {
          enabled: true,
          speed: 350,
        },
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
      max: maxYValue,
      tickAmount: 6,

      labels: {
        style: {
          colors: axisColor,
          fontSize: '12px',
        },
        formatter: function (value: any) {
          return value
            ? formatCurrency(
                reverseMathSqrt(value).toString(),
                currency
              ).substring(1)
            : value;
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
        seriesData,
      }: {
        series: number[][];
        seriesIndex: number;
        dataPointIndex: number;
        w: any;
        seriesData: Series;
      }) {
        return renderToString(
          tooltip({
            series,
            seriesIndex,
            dataPointIndex,
            w,
            currency,
            seriesData: seriesData,
          })
        );
      },
    },
    dataLabels: {
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
          // data: item.data.map((value) => mathSqrt(value || 0)),
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
