'use client';
import Button from '@/components/buttons/Button';
import styles from './TotalInventoryValue.module.css';
import { useMemo, useState } from 'react';
import { formatCurrency, shortenAddress } from '@/utils/common';
import { twMerge } from 'tailwind-merge';
import TotalInventoryChart from './TotalInventoryChart';
import {
  useInventoryCollectionPositionAmount,
  useInventoryCollectionPositionValue,
} from '@/utils/hooks/queries/inventory';
import { useMe } from '@/utils/hooks/queries/auth';
import { useAtomValue } from 'jotai';
import { currencyAtom } from '@/store/currency';
import { PositionCollectionAmount } from '@/interfaces/inventory';
const LIST = [
  {
    name: 'Genesis Box',
    value: '65293.12',
    change: '-2.3%',
    valueType: 'Floor',
  },
  {
    name: 'The Lockeys',
    value: '65293.12',
    change: '+2.3%',
    valueType: 'Estimated',
  },
  {
    name: 'GEISAI 2022 Official NFT',
    value: '65293.12',
    change: '-2.3%',
    valueType: 'Estimated',
  },
  {
    name: 'Project NANOPASS',
    value: '65293.12',
    change: '+2.3%',
    valueType: 'Estimated',
  },
  {
    name: 'Genesis Box',
    value: '65293.12',
    change: '-2.3%',
    valueType: 'Estimated',
  },
];
const COLOR = [
  'var(--color-chart-information)',
  'var(--color-chart-accent-teal-boldest)',
  'var(--color-chart-accent-purple-bold)',
  'var(--color-chart-accent-teal-bold)',
  'var(--color-chart-accent-blue-bold)',
];
const TotalInventoryValue = () => {
  const { data: me } = useMe();
  const currency = useAtomValue(currencyAtom);
  const [selected, setSelected] = useState<'value' | 'amount'>('value');
  const { data: totalInventoryPositionValue, status: statusValue } =
    useInventoryCollectionPositionValue(me.walletAddress);
  const { data: totalInventoryPositionAmount, status: statusAmount } =
    useInventoryCollectionPositionAmount(me.walletAddress);
  const handleSelect = (selected: string) => {
    setSelected(selected as 'value' | 'amount');
  };
  const mathFloor = (value: string) => {
    return Math.floor(parseFloat(value)).toString();
  };
  const total = '165293.12';
  const totalAmount = useMemo(() => {
    let total = 0;
    totalInventoryPositionAmount &&
      totalInventoryPositionAmount.map((item) => (total += item.amount));
    return total;
  }, [totalInventoryPositionAmount]);
  return (
    <section className={styles.container}>
      <div className={styles.header}>
        <p className={`font-subtitle02-bold text-[var(--color-text-main)]`}>
          Total inventory value
        </p>
        <div className={`font-caption-medium ${styles.selector}`}>
          <Button
            id={'/portfolio/overview/totalInventory/value'}
            className={`${selected === 'value' && styles.selected}`}
            onClick={() => handleSelect('value')}
          >
            Value
          </Button>
          <Button
            id={'/portfolio/overview/totalInventory/nfts'}
            className={`${selected === 'amount' && styles.selected}`}
            onClick={() => handleSelect('amount')}
          >
            Amount
          </Button>
        </div>
      </div>
      <div className={styles.body}>
        <div className='w-[260px] h-[260px] mr-80 relative'>
          <TotalInventoryChart selected={selected} totalAmount={totalAmount} />
          <div className='absoluteCenter flex flex-col items-center'>
            {selected === 'amount' ? (
              <p className='font-subtitle02-bold text-[var(--color-text-main)] mb-4'>
                {statusAmount === 'success' && totalAmount}
              </p>
            ) : (
              <p className='font-subtitle02-bold mb-4'>
                <span className='!important:text-[var(--color-subtlest)]'>
                  $
                </span>
                <span className='text-[var(--color-text-main)]'>
                  {mathFloor(total).split('.')[0]}
                </span>
                <span className='!important:text-[var(--color-subtlest)]'>
                  {`.${total.split('.')[1]}`}
                </span>
              </p>
            )}
            <p className='font-caption-regular text-[var(--color-text-subtle)]'>
              {selected === 'amount' ? 'Total Amount' : 'Total Value'}
            </p>
          </div>
        </div>
        <table className='w-[460px] h-[160px] table-auto'>
          <tbody>
            {statusValue === 'success' &&
              selected === 'value' &&
              totalInventoryPositionValue.map((item, index) => {
                // const plus = parseFloat(item.change) > 0;
                const plus = true;
                return (
                  <tr key={index} className='h-16'>
                    <td>
                      <div
                        className={twMerge([
                          styles.dot,
                          styles[`dot--${index % 5}`],
                        ])}
                      />
                    </td>
                    <td>
                      <p className='font-caption-medium text-[var(--color-text-main)] w-[208px] mr-20'>
                        {item.collection.name}
                      </p>
                    </td>
                    <td>
                      <p className='font-caption-regular mr-10'>
                        <span className='text-[var(--color-text-main)]'>
                          {
                            formatCurrency(
                              mathFloor(item.value[currency].amount || '0'),
                              currency
                            ).split('.')[0]
                          }
                        </span>
                        {item.value[currency].amount && (
                          <span className='!important:text-[var(--color-subtlest)]'>
                            {`.${item.value[currency].amount?.split('.')[1]}`}
                          </span>
                        )}
                      </p>
                    </td>
                    <td>
                      <p
                        className={`font-caption-medium mr-20 ' ${
                          plus
                            ? 'text-[var(--color-text-success)]'
                            : 'text-[var(--color-text-danger)]'
                        }`}
                      >
                        {item.value[currency].difference?.percentage}
                      </p>
                    </td>
                    <td>
                      <p className='font-caption-regular text-[var(--color-text-subtle)]'>
                        {item.value[currency].difference?.amount}
                      </p>
                    </td>
                  </tr>
                );
              })}
            {statusAmount === 'success' &&
              selected === 'amount' &&
              totalInventoryPositionAmount.map((item, index) => {
                return (
                  <tr key={index} className='h-16'>
                    <td>
                      <div
                        className={twMerge([
                          styles.dot,
                          styles[
                            `dot--${
                              index % totalInventoryPositionAmount.length
                            }`
                          ],
                        ])}
                      />
                    </td>
                    <td>
                      <p className='font-caption-medium text-[var(--color-text-main)] w-[208px] mr-20'>
                        {item.collection.name ||
                          shortenAddress(item.collection.assetContract)}
                      </p>
                    </td>
                    <td>
                      <p className='font-caption-regular mr-10 text-[var(--color-text-main)]'>
                        {item.amount}
                      </p>
                    </td>
                    <td>
                      <p
                        className={`font-caption-medium mr-20 ' ${
                          item.difference > 0
                            ? 'text-[var(--color-text-success)]'
                            : item.difference < 0
                            ? 'text-[var(--color-text-danger)]'
                            : 'text-[var(--color-text-main)]'
                        }`}
                      >
                        {item.difference}
                      </p>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    </section>
  );
};
export default TotalInventoryValue;
