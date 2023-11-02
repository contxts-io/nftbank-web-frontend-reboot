import SkeletonLoader from '@/components/SkeletonLoader';
import { currencyAtom } from '@/store/currency';
import { overviewHistoricalValueParamAtom } from '@/store/requestParam';
import { formatCurrency, formatDate } from '@/utils/common';
import { useMe } from '@/utils/hooks/queries/auth';
import {
  useInventoryValueHistorical,
  useInventoryValuePolling,
} from '@/utils/hooks/queries/inventory';
import { useAtom, useAtomValue } from 'jotai';
import dynamic from 'next/dynamic';
import { useEffect, useMemo, useState } from 'react';
import { renderToString } from 'react-dom/server';

const ApexCharts = dynamic(() => import('react-apexcharts'), { ssr: false });
const tooltip = ({
  series,
  seriesIndex,
  dataPointIndex,
  w,
  period,
  setHoverValue,
  setDiffValue,
}: any) => {
  w.globals &&
    (setHoverValue(w.globals?.series?.[0][dataPointIndex] || null),
    setDiffValue(
      w.globals?.series?.[0][dataPointIndex] - w.globals?.series?.[0][0]
    ));
  return (
    <div className='px-16 py-8 border-1 border-[var(--color-border-bold)] bg-[var(--color-elevation-surface)]'>
      <p className={`font-caption-regular text-[var(--color-text-main)]`}>
        {w.globals.categoryLabels[dataPointIndex]}
      </p>
    </div>
  );
};
type Props = {
  setHoverValue: (value: number | null) => void;
  setDiffValue: (value: number | null) => void;
};
const HistoricalTrendChart = (props: Props) => {
  const { data: me } = useMe();
  const currency = useAtomValue(currencyAtom);
  const [historicalValueParam, setHistoricalValueParam] = useAtom(
    overviewHistoricalValueParamAtom
  );
  const { data: inventoryValue, status: statusInventoryValue } =
    useInventoryValuePolling(me.walletAddress);
  const {
    data: inventoryValueHistorical,
    status: statusInventoryValueHistorical,
  } = useInventoryValueHistorical({
    ...historicalValueParam,
    walletAddress: me.walletAddress,
  });
  const [isPlus, setIsPlus] = useState(false);

  let category: string[] = [];

  let series = [
    {
      name: 'inventoryValueHistorical',
      data: [],
    },
  ] as { name: string; data: (number | null)[] }[];

  let seriesData = useMemo(() => {
    const today = new Date().toLocaleDateString('en-us', {
      month: 'short',
      day: 'numeric',
    });
    let todayValue =
      inventoryValue?.value[currency] &&
      parseFloat(inventoryValue.value[currency].amount || '0'); //현재값
    let _series = series;
    (inventoryValueHistorical &&
      inventoryValueHistorical.data?.map((item, index) => {
        const option: Intl.DateTimeFormatOptions =
          historicalValueParam.window === 'all'
            ? { year: 'numeric', month: 'short', day: 'numeric' }
            : {
                month: 'short',
                day: 'numeric',
              };
        const date = new Date(item.processedAt).toLocaleDateString(
          'en-us',
          option
        );
        const parts = date.replaceAll(',', '').split(' ');
        const yDate = `${parts[2]}, ${parts[0]} ${parts[1]}`;
        historicalValueParam.window === 'all'
          ? category.push(yDate)
          : category.push(date);
        item.value?.[currency]
          ? _series[0].data.push(parseFloat(item.value?.[currency] || '0'))
          : _series[0].data.push(null);
      })) ||
      [];
    historicalValueParam.window !== 'ytd' &&
      todayValue &&
      _series[0].data.push(todayValue); //마지막에 현재 값을 넣어준다. (마지막 값이 없을 경우 그전값을 넣어준다.)

    category.push(today);
    return _series;
  }, [inventoryValueHistorical, currency, category, inventoryValue?.value]);

  useEffect(() => {
    const currentValue = inventoryValue?.value[currency]?.amount
      ? parseFloat(inventoryValue.value[currency].amount || '0')
      : 0;
    seriesData[0].data[0] && seriesData[0].data[0] < currentValue
      ? setIsPlus(true)
      : setIsPlus(false);
  }, [seriesData, inventoryValue?.value]);

  let minValue = useMemo(() => {
    let _series = seriesData;
    let _minimumValue = _series[0]?.data[0] || 0;
    _series[0].data.map((item) => {
      if (item && item < _minimumValue) {
        _minimumValue = item;
      }
    });
    return formatCurrency(_minimumValue.toString(), currency);
  }, [seriesData, currency, inventoryValue?.value]);
  let maxValue = useMemo(() => {
    let _series = seriesData;
    let _maximumValue = 0;
    _series[0].data.map((item) => {
      if (item && item > _maximumValue) {
        _maximumValue = item;
      }
    });
    return formatCurrency(_maximumValue.toString(), currency);
  }, [seriesData, currency, inventoryValue?.value]);
  const lineColor = isPlus
    ? 'var(--color-chart-success)'
    : 'var(--color-chart-danger)';
  const markerFill = 'var(--color-elevation-surface)';
  const borderColor = 'var(--color-border-accent-gray)';
  const textSubtle = 'var(--color-text-subtle)';
  // const minValue = series[0].data[0];
  const options = {
    chart: {
      toolbar: {
        show: false,
      },
      events: {
        // dataPointMouseEnter: function (
        //   event: any,
        //   chartContext: any,
        //   config: any
        // ) {
        //   config.globals &&
        //     (props.setHoverValue(
        //       config.globals?.series?.[0][config.dataPointIndex] || null
        //     ),
        //     props.setDiffValue(
        //       config.globals?.series?.[0][config.dataPointIndex] -
        //         config.globals?.series?.[0][0]
        //     ));
        // },
        mouseLeave: function (event: any, chartContext: any, config: any) {
          // ...
          props.setHoverValue(null);
          props.setDiffValue(null);
        },
      },
    },
    stroke: {
      width: 1,
    },
    dataLabels: {
      enabled: false,
    },
    xaxis: {
      type: 'category' as const,
      categories: category,
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
      tickAmount: 1,
      opposite: true,
      floating: true,
      labels: {
        show: true,
        style: {
          colors: textSubtle,
          cssClass: 'font-caption-regular',
        },
        formatter: function (value: any) {
          return value
            ? formatCurrency(value, currency)
            : formatCurrency('0', currency);
        },
      },
    },
    annotations: {
      yaxis: [
        {
          y: series[0].data[0],
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
          tooltip({
            series,
            seriesIndex,
            dataPointIndex,
            w,
            period: historicalValueParam.window,
            setHoverValue: props.setHoverValue,
            setDiffValue: props.setDiffValue,
          })
        );
      },
    },
  };
  return (
    <section className='w-full relative'>
      {statusInventoryValueHistorical === 'loading' && (
        <SkeletonLoader className='w-full h-[260px]' />
      )}
      {statusInventoryValueHistorical === 'success' && (
        <>
          <div className='absolute right-0 top-0 h-full flex flex-col justify-between items-end font-caption-regular text-[var(--color-text-subtle)]'>
            <p className='w-fit'>{maxValue}</p>
            <p className='w-fit'>{minValue}</p>
          </div>
          <ApexCharts
            options={{
              ...options,
              stroke: { ...options.stroke, curve: 'straight' },
            }}
            type='area'
            series={seriesData}
            height={260}
            width='100%'
          />
        </>
      )}
    </section>
  );
};
export default HistoricalTrendChart;
