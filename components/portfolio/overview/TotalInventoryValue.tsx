'use client';
import Button from '@/components/buttons/Button';
import styles from './TotalInventoryValue.module.css';
import { useState } from 'react';
import { formatCurrency } from '@/utils/common';
import { twMerge } from 'tailwind-merge';
import TotalInventoryChart from './TotalInventoryChart';
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
  const [selected, setSelected] = useState<'value' | 'nfts'>('value');
  const handleSelect = (selected: string) => {
    setSelected(selected as 'value' | 'nfts');
  };
  const mathFloor = (value: string) => {
    return Math.floor(parseFloat(value)).toString();
  };
  const total = '165293.12';
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
            className={`${selected === 'nfts' && styles.selected}`}
            onClick={() => handleSelect('nfts')}
          >
            NFTs
          </Button>
        </div>
      </div>
      <div className={styles.body}>
        <div className='w-[260px] h-[260px] mr-80 relative'>
          <TotalInventoryChart />
          <div className='absoluteCenter flex flex-col items-center'>
            {selected === 'nfts' ? (
              <p className='font-subtitle02-bold text-[var(--color-text-main)] mb-4'>
                2312
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
              {selected === 'nfts' ? 'Total Amount' : 'Total Value'}
            </p>
          </div>
        </div>
        <table className='w-[460px] h-[160px] table-auto'>
          <tbody>
            {LIST.map((item, index) => {
              const plus = parseFloat(item.change) > 0;
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
                      {item.name}
                    </p>
                  </td>
                  <td>
                    <p className='font-caption-regular mr-10'>
                      <span className='text-[var(--color-text-main)]'>
                        {
                          formatCurrency(mathFloor(item.value), 'usd').split(
                            '.'
                          )[0]
                        }
                      </span>
                      <span className='!important:text-[var(--color-subtlest)]'>
                        {`.${item.value.split('.')[1]}`}
                      </span>
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
                      {item.change}
                    </p>
                  </td>
                  <td>
                    <p className='font-caption-regular text-[var(--color-text-subtle)]'>
                      {item.valueType}
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
