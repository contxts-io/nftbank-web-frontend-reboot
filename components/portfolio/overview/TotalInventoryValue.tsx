'use client';
import Button from '@/components/buttons/Button';
import styles from './TotalInventoryValue.module.css';
import { useEffect, useMemo, useState } from 'react';
import {
  formatAmount,
  formatCurrency,
  formatPercent,
  isPlus,
  shortenAddress,
} from '@/utils/common';
import { twMerge } from 'tailwind-merge';
import TotalInventoryChart from './TotalInventoryChart';
import {
  useInventoryCollectionPositionAmount,
  useInventoryCollectionPositionValue,
} from '@/utils/hooks/queries/inventory';
import { useMe } from '@/utils/hooks/queries/auth';
import { useAtomValue } from 'jotai';
import { currencyAtom } from '@/store/currency';
import { useMyWalletList } from '@/utils/hooks/queries/wallet';
import { portfolioUserAtom } from '@/store/portfolio';

const TotalInventoryValue = () => {
  const currency = useAtomValue(currencyAtom);
  const portfolioUser = useAtomValue(portfolioUserAtom);
  const [selected, setSelected] = useState<'value' | 'amount'>('value');
  const { data: totalInventoryPositionValue, status: statusValue } =
    useInventoryCollectionPositionValue(portfolioUser);
  const { data: totalInventoryPositionAmount, status: statusAmount } =
    useInventoryCollectionPositionAmount(portfolioUser);
  const [percent, setPercent] = useState<number[]>([100]);
  useEffect(() => {
    if (totalInventoryPositionValue) {
      const total = totalInventoryPositionValue.reduce((a: number, b) => {
        return a + parseFloat(b.value[currency].amount || '0');
      }, 0);
      console.log('total', total);
      // setPercent(
      //   totalInventoryPositionValue.map((item) =>
      //     formatPercent(item.value[currency].amount / total || 0)
      //   )
      // );
    }
  }, [totalInventoryPositionValue]);
  const handleSelect = (selected: string) => {
    setSelected(selected as 'value' | 'amount');
  };
  const mathFloor = (value: string) => {
    return Math.floor(parseFloat(value)).toString();
  };
  const totalValue = useMemo(() => {
    let total = 0;
    if (totalInventoryPositionValue) {
      total = totalInventoryPositionValue.reduce((a: number, b) => {
        return a + parseFloat(b.value[currency].amount || '0');
      }, 0);
    }
    return total;
  }, [totalInventoryPositionValue]);
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
        <div className='w-[200px] h-[200px] mr-80 relative'>
          <TotalInventoryChart selected={selected} totalAmount={totalAmount} />
          {statusAmount === 'success' && (
            <div className='absoluteCenter flex flex-col items-center'>
              {selected === 'amount' ? (
                <p className='font-subtitle02-bold text-[var(--color-text-main)] mb-4'>
                  {statusAmount === 'success' && totalAmount}
                </p>
              ) : (
                <p className='font-subtitle02-bold mb-4'>
                  <span className={styles.textSubtlest}>
                    {formatCurrency(totalValue.toString(), currency).substring(
                      0,
                      1
                    )}
                  </span>
                  <span className='text-[var(--color-text-main)]'>
                    {/* {mathFloor(totalValue).split('.')[0]} */}
                    {
                      formatCurrency(totalValue.toString(), currency)
                        .substring(1)
                        .split('.')[0]
                    }
                  </span>
                  <span className={styles.textSubtlest}>
                    {`.${
                      formatCurrency(totalValue.toString(), currency).split(
                        '.'
                      )[1] || '00'
                    }`}
                  </span>
                </p>
              )}
              <p className='font-caption-regular text-[var(--color-text-subtle)]'>
                {selected === 'amount' ? 'Total Amount' : 'Total Value'}
              </p>
            </div>
          )}
        </div>
        <table className='w-[460px] h-[160px] table-auto'>
          <tbody>
            {statusValue === 'success' &&
              selected === 'value' &&
              totalInventoryPositionValue.map((item, index) => {
                // const plus = parseFloat(item.change) > 0;
                // const plus =
                //   parseFloat(
                //     item.value[currency].difference.percentage || '0'
                //   ) > 0
                //     ? true
                //     : parseFloat(
                //         item.value[currency].difference.percentage || '0'
                //       ) < 0
                //     ? false
                //     : undefined;
                const plus = isPlus(
                  item.value[currency].difference.percentage || '0'
                );
                const amount = formatCurrency(
                  item.value[currency].amount,
                  currency
                );
                return (
                  <tr key={index} className='h-16'>
                    <td>
                      <div
                        className={twMerge([
                          styles.dot,
                          styles[`dot--${index % 6}`],
                        ])}
                      />
                    </td>
                    <td>
                      <p className='font-caption-medium text-[var(--color-text-main)] w-[208px] mr-20'>
                        {item.collection.name}
                      </p>
                    </td>
                    {/* <td>
                      <p className='font-caption-regular mr-10'>
                        <span className='text-[var(--color-text-main)]'>
                          {amount.split('.')[0]}
                        </span>
                        {item.value[currency].amount && (
                          <span className='!important:text-[var(--color-subtlest)]'>
                            {`.${amount?.split('.')[1]}`}
                          </span>
                        )}
                      </p>
                    </td> */}
                    <td className='text-right'>
                      <p
                        className={`font-caption-medium text-[var(--color-text-subtle)] text-right`}
                      >
                        {totalValue && totalValue > 0
                          ? formatPercent(
                              (
                                (parseFloat(
                                  item.value[currency].amount || '0'
                                ) /
                                  totalValue) *
                                100
                              ).toString()
                            )
                          : '-'}
                      </p>
                    </td>
                    {/* <td>
                      <p className='font-caption-regular text-[var(--color-text-subtle)]'>
                        {item.valuation?.type &&
                          mappingConstants(item.valuation?.type)}
                      </p>
                    </td> */}
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
                          item.collection.name === 'Others' ||
                          item.difference === 0
                            ? 'text-[var(--color-text-main)]'
                            : item.difference > 0
                            ? 'text-[var(--color-text-success)]'
                            : item.difference < 0
                            ? 'text-[var(--color-text-danger)]'
                            : 'text-[var(--color-text-main)]'
                        }`}
                      >
                        {formatAmount(item.difference)}
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
