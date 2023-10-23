import { currencyAtom } from '@/store/currency';
import { formatCurrency } from '@/utils/common';
import { useMe } from '@/utils/hooks/queries/auth';
import { useInventoryValueHistorical } from '@/utils/hooks/queries/inventory';
import { useAtomValue } from 'jotai';
import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';
import { renderToString } from 'react-dom/server';

const ApexCharts = dynamic(() => import('react-apexcharts'), { ssr: false });
const tooltip = ({ series, seriesIndex, dataPointIndex, w }: any) => {
  return (
    <div className='px-16 py-8 border-1 border-[var(--color-border-bold)] bg-[var(--color-elevation-surface)]'>
      <p className={`font-caption-regular text-[var(--color-text-main)]`}>
        Aug 24
      </p>
    </div>
  );
};

const HistoricalTrendChart = () => {
  const { data: me } = useMe();
  const currency = useAtomValue(currencyAtom);
  const {
    data: inventoryValueHistorical,
    status: statusInventoryValueHistorical,
  } = useInventoryValueHistorical(me.walletAddress);
  const [isPlus, setIsPlus] = useState(false);
  let series = [
    {
      name: 'inventoryValueHistorical',
      data: [],
    },
  ] as { name: string; data: number[] }[];
  useEffect(() => {
    inventoryValueHistorical &&
      (inventoryValueHistorical.data.map((item) => {
        series[0].data.push(parseFloat(item.value[currency].amount));
      }),
      setIsPlus(true));
  }, [inventoryValueHistorical]);
  const lineColor = isPlus
    ? 'var(--color-chart-success)'
    : 'var(--color-chart-danger)';
  const markerFill = 'var(--color-border-selected)';
  const borderColor = 'var(--color-border-accent-gray)';
  const textSubtle = 'var(--color-text-subtle)';
  const minValue = series[0].data[0];
  const options = {
    chart: {
      toolbar: {
        show: false,
      },
    },
    stroke: {
      width: 1,
    },
    dataLabels: {
      enabled: false,
    },
    xaxis: {
      labels: {
        show: false,
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
          colors: textSubtle,
          cssClass: 'font-caption-regular',
        },
      },
    },
    annotations: {
      yaxis: [
        {
          y: minValue,
          borderColor: borderColor,
          borderStyle: 'dashed',
        },
      ],
    },
    markers: {
      size: 0,
      colors: markerFill,
      strokeColors: lineColor,
      strokeWidth: 2,
      radius: 5,
      hover: {
        size: 5,
        sizeOffset: 1,
      },
    },
    fill: {
      type: 'gradient',
      gradient: {
        shade: 'dark',
        type: 'vertical',
        shadeIntensity: 0.5,
        gradientToColors: undefined,
        inverseColors: true,
        opacityFrom: 1,
        opacityTo: 1,
        stops: [0, 10, 100],
        colorStops: [
          {
            offset: 0,
            color: lineColor,
            opacity: 0.4,
          },
          {
            offset: 50,
            color: lineColor,
            opacity: 0.4,
          },
          {
            offset: 100,
            color: lineColor,
            opacity: 0,
          },
        ],
      },
    },
    colors: [lineColor],
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
  return (
    <section className='w-full'>
      <ApexCharts
        options={{
          ...options,
          stroke: { ...options.stroke, curve: 'straight' },
        }}
        type='area'
        series={series}
        height={260}
        width='100%'
      />
    </section>
  );
};
export default HistoricalTrendChart;
