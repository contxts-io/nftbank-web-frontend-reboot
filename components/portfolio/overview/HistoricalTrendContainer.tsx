'use client';
import Button from '@/components/buttons/Button';
import styles from './HistoricalTrendContainer.module.css';
import { useEffect, useMemo, useState } from 'react';
import HistoricalTrendChart from './HistoricalTrendChart';
import {
  useInventoryValue,
  useInventoryValueHistorical,
  useInventoryValuePolling,
} from '@/utils/hooks/queries/inventory';
import { useMe } from '@/utils/hooks/queries/auth';
import { useAtom, useAtomValue } from 'jotai';
import { currencyAtom } from '@/store/currency';
import { difference, formatCurrency, formatPercent } from '@/utils/common';
import { overviewHistoricalValueParamAtom } from '@/store/requestParam';
import { portfolioUserAtom } from '@/store/portfolio';
import CurrencyComponent from '@/components/p/Currency';
//'1d'| '3d'| '7d'| '30d'| '90d'| 'ytd'| '365d'| 'all'
const PERIOD: { name: string; value: Period }[] = [
  {
    name: '1W',
    value: '7d',
  },
  {
    name: '1M',
    value: '30d',
  },
  {
    name: 'YTD',
    value: 'ytd',
  },
  {
    name: '1Y',
    value: '365d',
  },
  {
    name: 'MAX',
    value: 'all',
  },
];
type Period = '1d' | '3d' | '7d' | '30d' | '90d' | 'ytd' | '365d' | 'all';
const HistoricalTrendContainer = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('1W');
  const portfolioUser = useAtomValue(portfolioUserAtom);
  const currency = useAtomValue(currencyAtom);

  const [historicalValueParam, setHistoricalValueParam] = useAtom(
    overviewHistoricalValueParamAtom
  );
  const [hoverValue, setHoverValue] = useState<number | null>(null);
  const [diffValue, setDiffValue] = useState<number | null>(null);
  const { data: inventoryValue, status: statusInventoryValue } =
    useInventoryValuePolling(portfolioUser);
  const {
    data: inventoryValueHistorical,
    status: statusInventoryValueHistorical,
  } = useInventoryValueHistorical({
    ...historicalValueParam,
    ...portfolioUser,
  });
  const handleClickPeriod = (period: { name: string; value: Period }) => {
    console.log('handleClickPeriod', period);
    setSelectedPeriod(period.name);
    setHistoricalValueParam((prev) => ({
      ...prev,
      window: period.value,
    }));
  };
  const handleHoverValue = (value: number | null) => {
    console.log('handleHoverValue', value);
    setHoverValue(value);
  };
  const total = useMemo(() => {
    let value =
      hoverValue?.toString() ||
      inventoryValue?.value[currency].amount ||
      '0.00';
    return formatCurrency(value, currency);
  }, [hoverValue, currency, inventoryValue]);
  const differenceValue = useMemo(() => {
    let _value =
      hoverValue ||
      parseFloat(inventoryValue?.value[currency].amount || '0.00');

    // const diff =
    //   hoverValue == 0
    //     ? 0 -
    //       parseFloat(
    //         inventoryValueHistorical?.data[0]?.value[currency] || '0.00'
    //       )
    //     : _value -
    //       parseFloat(
    //         inventoryValueHistorical?.data[0]?.value[currency] || '0.00'
    //       );

    const diff =
      _value -
      parseFloat(inventoryValueHistorical?.data[0]?.value[currency] || '0.00');
    return diff;
  }, [hoverValue, currency, inventoryValue]);
  useEffect(() => {
    setSelectedPeriod('1W');
    return () => {
      setHistoricalValueParam((prev) => ({
        ...prev,
        window: '7d',
      }));
    };
  }, []);
  useEffect(() => {
    console.log('hoverValue', hoverValue);
  }, [hoverValue]);
  return (
    <section className={styles.container}>
      <div className={styles.summary}>
        <p className={`font-subtitle02-bold ${styles.title}`}>
          Historical trend
        </p>
        <div className={styles.periodButtons}>
          {PERIOD.map((item, index) => {
            return (
              <Button
                key={index}
                id={`/portfolio/overview/historicalTrend/${item.name}`}
                onClick={() => handleClickPeriod(item)}
                className={`${selectedPeriod === item.name && styles.selected}`}
              >
                {item.name}
              </Button>
            );
          })}
        </div>
      </div>
      <div className={styles.rowEnd}>
        <div className='flex flex-col items-start h-full'>
          <div
            className={`rounded-full animateBlink w-6 h-6 mr-4 ${
              differenceValue && differenceValue > 0
                ? ' bg-[var(--color-background-success-bold)]'
                : ' bg-[var(--color-background-danger-bold)]'
            }`}
          />
        </div>
        <CurrencyComponent value={total} className='font-header03-bold mr-12' />
        {differenceValue && (
          <p
            className={`font-body01-medium ${
              differenceValue && differenceValue > 0
                ? styles.plus
                : styles.minus
            }`}
          >
            {`${difference(
              differenceValue.toString(),
              currency
            )}  (${difference(
              (
                (differenceValue /
                  parseFloat(
                    inventoryValueHistorical?.data[0]?.value[currency] || '1'
                  )) *
                100
              ).toString(),
              'percent'
            )})`}
          </p>
        )}
      </div>
      <HistoricalTrendChart
        setHoverValue={handleHoverValue}
        setDiffValue={setDiffValue}
      />
    </section>
  );
};
export default HistoricalTrendContainer;
