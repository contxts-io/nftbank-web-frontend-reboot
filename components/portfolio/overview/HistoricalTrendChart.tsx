import { useTheme } from 'next-themes';
import dynamic from 'next/dynamic';
import { useState } from 'react';
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
  const { theme } = useTheme();
  const [isPlus, setIsPlus] = useState(false);
  const lineColor = isPlus ? '#14b8a6' : '#EF4444';
  const markerFill = theme === 'light' ? '#FBFBFB' : '#000000';
  const borderColor = '#6B7280';
  const textSubtle = theme === 'light' ? '#4B5563' : '#9CA3AF';
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
      labels: {
        show: false,
      },
    },
    annotations: {
      yaxis: [
        {
          y: 40,
          borderColor: borderColor,
          borderStyle: 'dashed',
          label: {
            borderWidth: 0,
            style: {
              color: textSubtle,
              background: 'transparent',
            },
            text: '$90,311.87',
          },
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
      followCursor: true,
      custom: function ({ series, seriesIndex, dataPointIndex, w }: any) {
        return renderToString(
          tooltip({ series, seriesIndex, dataPointIndex, w })
        );
      },
    },
  };
  const series = [
    {
      name: 'Estimated',
      data: [30, 40, 45, 50, 49, 60, 70, 91],
    },
  ];
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
