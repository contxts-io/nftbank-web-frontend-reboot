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
import { networkIdAtom, portfolioUserAtom } from '@/store/portfolio';
import DropdownMobile from '@/components/dropdown/DropdownMobile';
import { BasicParam } from '@/interfaces/request';
type Props = {
  portfolioUser?: BasicParam;
};
const TotalInventoryValue = (props: Props) => {
  const currency = useAtomValue(currencyAtom);
  const _portfolioUser = useAtomValue(portfolioUserAtom);
  const [portfolioUser, setPortfolioUser] = useState(
    props.portfolioUser || _portfolioUser
  );
  const networkId = useAtomValue(networkIdAtom);
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState<'value' | 'amount'>('value');
  const { data: totalInventoryPositionValue, status: statusValue } =
    useInventoryCollectionPositionValue({ ...portfolioUser, networkId });
  const { data: totalInventoryPositionAmount, status: statusAmount } =
    useInventoryCollectionPositionAmount({ ...portfolioUser, networkId });
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
        console.log('b ::', b.value[currency].amount);
        return a + parseFloat(b.value[currency].amount || '0');
      }, 0);
    }
    return total;
  }, [totalInventoryPositionValue, currency]);
  const totalAmount = useMemo(() => {
    let total = 0;
    totalInventoryPositionAmount &&
      totalInventoryPositionAmount.map(
        (item) =>
          (total +=
            typeof item.amount === 'string'
              ? parseInt(item.amount)
              : item.amount)
      );
    return total;
  }, [totalInventoryPositionAmount]);
  const handleClickItem = (item: { name: string; value: string }) => {
    setIsOpen(false);
    setSelected(item.value as 'value' | 'amount');
  };
  return (
    <section className={styles.container}>
      <div className={styles.header}>
        <p className={`font-subtitle02-bold text-[var(--color-text-main)]`}>
          Total inventory value
        </p>
        <div className={`font-caption-medium ${styles.selector}`}>
          <Button
            id={'top5_collection_pie_chart_view'}
            className={`${selected === 'value' && styles.selected}`}
            parameter='value'
            onClick={() => handleSelect('value')}
          >
            Value
          </Button>
          <Button
            id={'top5_collection_pie_chart_view'}
            className={`${selected === 'amount' && styles.selected}`}
            parameter='amount'
            onClick={() => handleSelect('amount')}
          >
            Amount
          </Button>
        </div>
        <div className='flex md:hidden'>
          <DropdownMobile
            open={isOpen}
            setOpen={setIsOpen}
            list={[
              { name: 'Value', value: 'value' },
              { name: 'Amount', value: 'amount' },
            ]}
            value={selected.charAt(0).toUpperCase() + selected.slice(1)}
            handleClickItem={(item) =>
              handleClickItem(
                item as {
                  name: string;
                  value: 'value' | 'amount';
                }
              )
            }
          />
        </div>
      </div>
      <div className={styles.body}>
        <div className='w-[200px] h-[200px] md:mr-80 relative'>
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
        <table className='w-[294px] h-[160px] table-auto'>
          <tbody>
            {statusValue === 'success' &&
              selected === 'value' &&
              totalInventoryPositionValue.map((item, index) => {
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
                      <p className='font-caption-medium text-[var(--color-text-main)] mr-20 truncate'>
                        {item.collection.name ||
                          shortenAddress(item.collection.assetContract)}
                      </p>
                    </td>
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
                const total = totalInventoryPositionAmount.reduce((a, b) => {
                  return a + b.amount;
                }, 0);
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
                      <p className='font-caption-medium text-[var(--color-text-main)] mr-20 truncate'>
                        {item.collection.name ||
                          shortenAddress(item.collection.assetContract)}
                      </p>
                    </td>
                    <td className='text-right'>
                      <p
                        className={`font-caption-medium text-[var(--color-text-subtle)] text-right`}
                      >
                        {totalAmount && totalAmount > 0
                          ? formatPercent(
                              (
                                (parseFloat(item.amount.toString() || '0') /
                                  totalAmount) *
                                100
                              ).toString()
                            )
                          : '-'}
                      </p>
                    </td>
                    {/* <td>
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
                    </td> */}
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
