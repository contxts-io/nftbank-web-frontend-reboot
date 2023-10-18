import dynamic from 'next/dynamic';
import styles from './TotalInventoryChart.module.css';
import { renderToString } from 'react-dom/server';
import { twMerge } from 'tailwind-merge';
const ApexCharts = dynamic(() => import('react-apexcharts'), { ssr: false });
const COLORS = ['#2563EB', '#5EEAD4', '#A855F7', '#14B8A6', '#93C5FD'];
const LABELS = [
  'Genesis Box',
  'The Lockeys',
  'GEISAI 2022 Official NFT',
  'Project NANOPASS',
  'Others',
];
const SERIES = [44, 55, 41, 17, 15];
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
const TotalInventoryChart = () => {
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
      followCursor: false,
      custom: function ({ series, seriesIndex, dataPointIndex, w }: any) {
        return renderToString(
          tooltip({ series, seriesIndex, dataPointIndex, w })
        );
      },
    },
    labels: LABELS,
    plotOptions: {
      customScale: 1,
      pie: {
        size: 280,
        donut: {
          size: '70%',
          labels: {
            show: false,
            name: {
              show: true,
              fontSize: '22px',
              fontFamily: 'Helvetica, Arial, sans-serif',
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
              fontFamily: 'Helvetica, Arial, sans-serif',
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
        series={SERIES}
        height={280}
        width={280}
      />
    </section>
  );
};
export default TotalInventoryChart;
