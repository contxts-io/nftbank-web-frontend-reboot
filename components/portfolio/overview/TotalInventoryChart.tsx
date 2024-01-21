import dynamic from 'next/dynamic';
import styles from './TotalInventoryChart.module.css';
import { renderToString } from 'react-dom/server';
import { twMerge } from 'tailwind-merge';
import {
  useInventoryCollectionPositionAmount,
  useInventoryCollectionPositionValue,
} from '@/utils/hooks/queries/inventory';
import { useMe } from '@/utils/hooks/queries/auth';
import { useEffect, useState } from 'react';
import { useAtom, useAtomValue } from 'jotai';
import { currencyAtom } from '@/store/currency';
import {
  formatCurrency,
  formatPercent,
  isPlus,
  mappingConstants,
  shortenAddress,
} from '@/utils/common';
import { networkIdAtom, portfolioUserAtom } from '@/store/portfolio';
import CurrencyComponent from '@/components/p/Currency';
const ApexCharts = dynamic(() => import('react-apexcharts'), { ssr: false });
const COLORS = [
  'var(--color-chart-information)',
  'var(--color-chart-accent-teal-boldest)',
  'var(--color-chart-accent-purple-bold)',
  'var(--color-chart-accent-teal-bold)',
  'var(--color-chart-accent-blue-boldest)',
  'var(--color-chart-accent-gray-bolder)',
];
const tooltip = ({
  series,
  seriesIndex,
  dataPointIndex,
  w,
  selected,
  totalInventoryPositionValue,
  totalInventoryPositionAmount,
  currency,
}: any) => {
  const color = w.globals.colors[seriesIndex];
  const label = w.globals.labels[seriesIndex];
  const positionCollection = totalInventoryPositionValue?.[seriesIndex];
  const positionCollectionAmount = parseInt(
    totalInventoryPositionAmount?.[seriesIndex].amount
  );

  const amount = formatCurrency(
    totalInventoryPositionValue?.[seriesIndex]?.value[currency].amount || '0',
    currency
  );
  console.log('totalInventoryPositionAmount', totalInventoryPositionAmount);
  return (
    <div
      className={`relative bg-[var(--color-elevation-surface)] ${
        selected === 'value' ? 'min-w-[240px]' : ''
      }`}
    >
      <div className='w-full font-caption-regular py-8 px-16 flex flex-col items-start border-1 border-[var(--color-border-bold)] bg-[var(--color-elevation-surface)] gap-y-8'>
        <div className='flex items-center'>
          <div
            className={`${
              styles[`dot--${seriesIndex % series.length}`]
            } w-8 h-8 mr-8`}
          />
          <p className={`text-[var(--color-text-main)]`}>{label}</p>
        </div>
        {selected === 'amount' && (
          // <p className={`text-[var(--color-text-main)]`}>
          //   {formatPercent(series[seriesIndex])}
          // </p>
          <div className='w-full'>
            <div className='flex justify-between items-center'>
              <span className='text-[var(--color-text-subtle)] mr-41'>
                Amount
              </span>
              <p>{positionCollectionAmount}</p>
            </div>
            {/* <div className='flex justify-between items-center'>
              <span className='text-[var(--color-text-subtle)] mr-41'>
                Amount Difference(24h)
              </span>
              <p className={`text-[var(--color-text-main)]`}>
                {formatPercent(
                  positionCollection.value[currency].difference?.percentage
                )}
              </p>
            </div> */}
          </div>
        )}
        {selected === 'value' && (
          <div className='w-full'>
            <div className='flex justify-between items-center'>
              <span className='text-[var(--color-text-subtle)] mr-41'>
                {seriesIndex === totalInventoryPositionValue.length - 1
                  ? 'Various Valuation Types'
                  : positionCollection.valuation
                  ? mappingConstants(positionCollection.valuation.type)
                  : 'none'}
              </span>
              <CurrencyComponent value={amount} />
            </div>
            <div className='flex justify-between items-center'>
              <span className='text-[var(--color-text-subtle)] mr-41'>
                Rate of Change(24h)
              </span>
              <p
                className={`${
                  isPlus(
                    positionCollection.value[currency].difference?.percentage
                  ) === '-'
                    ? 'text-[var(--color-text-main)]'
                    : isPlus(
                        positionCollection.value[currency].difference
                          ?.percentage
                      ) === true
                    ? 'text-[var(--color-text-success)]'
                    : 'text-[var(--color-text-danger)]'
                }`}
              >
                {formatPercent(
                  positionCollection.value[currency].difference?.percentage
                )}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
const TotalInventoryChart = (props: {
  selected: 'value' | 'amount';
  totalAmount: number;
}) => {
  const { selected, totalAmount } = props;
  const networkId = useAtomValue(networkIdAtom);
  const portfolioUser = useAtomValue(portfolioUserAtom);
  const currency = useAtomValue(currencyAtom);
  const { data: totalInventoryPositionValue, status } =
    useInventoryCollectionPositionValue({ ...portfolioUser, networkId });
  const { data: totalInventoryPositionAmount, status: statusAmount } =
    useInventoryCollectionPositionAmount({ ...portfolioUser, networkId });
  const [labels, setLabels] = useState<string[]>([]);
  const [series, setSeries] = useState<number[]>([]);
  useEffect(() => {
    selected === 'value' &&
      totalInventoryPositionValue &&
      (setLabels(
        totalInventoryPositionValue?.map(
          (item) =>
            item.collection.name ||
            shortenAddress(item.collection.assetContract)
        )
      ),
      setSeries(
        totalInventoryPositionValue.map((item) =>
          parseFloat(item.value[currency].amount || '0')
        )
      ));
    selected === 'amount' &&
      totalInventoryPositionAmount &&
      (setLabels(
        totalInventoryPositionAmount?.map((item, index) => {
          return (
            item.collection.name ||
            shortenAddress(item.collection.assetContract)
          );
        })
      ),
      setSeries(
        totalInventoryPositionAmount.map(
          (item) => (item.amount / totalAmount) * 100 || 0
        )
      ));
  }, [selected, totalInventoryPositionValue, totalInventoryPositionAmount]);
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
    colors: COLORS,
    tooltip: {
      custom: function ({ series, seriesIndex, dataPointIndex, w }: any) {
        return renderToString(
          tooltip({
            series,
            seriesIndex,
            dataPointIndex,
            w,
            selected,
            totalInventoryPositionValue,
            totalInventoryPositionAmount,
            currency,
          })
        );
      },
    },
    labels: labels,
    plotOptions: {
      customScale: 1,
      pie: {
        size: 260,
        donut: {
          size: '70%',
        },
      },
    },
  };

  return (
    <section className={`${styles.container} relative`}>
      <ApexCharts
        options={{ ...options, chart: { ...options.chart, type: 'donut' } }}
        type={'donut'}
        series={series}
        height={240}
        width={240}
      />
    </section>
  );
};
export default TotalInventoryChart;
