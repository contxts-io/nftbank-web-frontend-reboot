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
import {
  difference,
  formatCurrency,
  formatPercent,
  parseFloatPrice,
} from '@/utils/common';
import { overviewHistoricalValueParamAtom } from '@/store/requestParam';
import { portfolioUserAtom } from '@/store/portfolio';
import CurrencyComponent from '@/components/p/Currency';
import { useDispatchDailyNav } from '@/utils/hooks/queries/dispatch';

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
  // {
  //   name: '3M',
  //   value: '90d',
  // },
  // {
  //   name: 'YTD',
  //   value: 'ytd',
  // },
  // {
  //   name: '1Y',
  //   value: '365d',
  // },
  // {
  //   name: 'MAX',
  //   value: 'all',
  // },
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
  const [isPolling, setIsPolling] = useState<boolean>(true);

  const { data: dispatchDailyNav } = useDispatchDailyNav(
    portfolioUser?.walletAddress || ''
  );
  const { data: inventoryValue, status: statusInventoryValue } =
    useInventoryValuePolling(portfolioUser);
  const {
    data: inventoryValueHistorical,
    status: statusInventoryValueHistorical,
  } = useInventoryValueHistorical(
    {
      ...historicalValueParam,
      ...portfolioUser,
      taskId: dispatchDailyNav?.taskId,
    },
    isPolling
  );
  const handleClickPeriod = (period: { name: string; value: Period }) => {
    console.log('handleClickPeriod', period);
    setSelectedPeriod(period.name);
    setHistoricalValueParam((prev) => ({
      ...prev,
      window: period.value,
    }));
    setIsPolling(true);
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
  useEffect(() => {
    setIsPolling(true);
  }, [portfolioUser]);
  useEffect(() => {
    statusInventoryValueHistorical === 'success' && setIsPolling(false);
  }, [statusInventoryValueHistorical]);
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
      parseFloatPrice(
        inventoryValueHistorical?.data?.[0]?.value[currency] || '0.00'
      );
    return diff;
  }, [
    hoverValue,
    currency,
    inventoryValue,
    selectedPeriod,
    inventoryValueHistorical?.data,
  ]);
  const initialValue = useMemo(() => {
    // const value = parseFloatPrice(
    //   inventoryValueHistorical?.data[0]?.value[currency] || '0.00'
    // );
    const value = parseFloatPrice(
      inventoryValueHistorical?.data?.[0]?.value[currency] || '0.00'
    );
    return value;
  }, [currency, inventoryValueHistorical]);
  useEffect(() => {
    setSelectedPeriod('1W');
    return () => {
      setHistoricalValueParam((prev) => ({
        ...prev,
        window: '7d',
      }));
    };
  }, []);
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
                id={`historical_nav_chart_filter`}
                onClick={() => handleClickPeriod(item)}
                className={`${
                  selectedPeriod === item.name && styles.selected
                } border-0 md:border-1`}
                parameter={item.name}
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
            {`${difference(differenceValue.toString(), currency)} (${
              initialValue && initialValue > 0
                ? difference(
                    ((differenceValue / initialValue) * 100).toString(),
                    'percent'
                  )
                : '-'
            })`}
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
