'use client';
import Button from '@/components/buttons/Button';
import styles from './AcquisitionType.module.css';
import ShoppingCart from '@/public/icon/ShoppingCart';
import Jewel from '@/public/icon/Jewel';
import Parachute from '@/public/icon/Parachute';
import ArrowsDownUp from '@/public/icon/ArrowsDownUp';
import AcquisitionTypePieChart from './AcquisitionTypePieChart';
import { useEffect, useState } from 'react';
import CaretDown from '@/public/icon/CaretDown';
import Dropdown from './Dropdown';
import { PERIOD_LIST, TPeriod, TYear } from '@/constants/period';
const LIST = [
  {
    type: 'buy',
    name: 'BUY',
    icon: <ShoppingCart className='fill-[var(--color-icon-accent-green)]' />,
    color: 'var(--color-border-accent-green)',
    amount: 40,
    costBasis: 1203,
  },
  {
    type: 'mint',
    name: 'MINT',
    icon: <Jewel className='fill-[var(--color-icon-accent-blue)]' />,
    color: 'var(--color-border-accent-blue)',
    amount: 40,
    costBasis: 1203,
  },
  {
    type: 'free_mint',
    name: 'FREE MINT',
    icon: <Jewel className='fill-[var(--color-icon-accent-gray)]' />,
    color: 'var(--color-border-accent-gray)',
    amount: 40,
    costBasis: 1203,
  },
  {
    type: 'airdrop',
    name: 'AIRDROP',
    icon: <Parachute className='fill-[var(--color-icon-accent-orange)]' />,
    color: 'var(--color-border-accent-orange)',
    amount: 40,
    costBasis: 1203,
  },
  {
    type: 'transfer',
    name: 'TRANSFER',
    icon: <ArrowsDownUp className='fill-[var(--color-icon-accent-fuchsia)]' />,
    color: 'var(--color-border-accent-fuchsia)',
    amount: 40,
    costBasis: 1203,
  },
];
type _Period = TPeriod & { selected: boolean };
type _Year = TYear & { selected: boolean };
const AcquisitionType = () => {
  const [list, setList] = useState<any[]>([]);
  const [selectedPeriod, setSelectedPeriod] = useState<_Period[]>(
    PERIOD_LIST.map((item) => ({
      ...item,
      selected: item.value === 'all',
    })) as _Period[]
  );
  const [selectedYear, setSelectedYear] = useState<_Year[]>([
    { name: '2023', value: 2023, selected: true },
    { name: '2022', value: 2022, selected: false },
    { name: '2021', value: 2021, selected: false },
    { name: '2020', value: 2020, selected: false },
  ]);
  useEffect(() => {
    setList(LIST);
  }, []);
  const handleChangePeriod = (name: string) => {
    setSelectedPeriod((prev) =>
      prev.map((item) => ({
        ...item,
        selected: item.name === name ? true : false,
      }))
    );
  };
  const handleChangeYear = (name: string) => {
    setSelectedYear((prev) =>
      prev.map((item) => ({
        ...item,
        selected: item.name === name ? true : false,
      }))
    );
  };
  return (
    <section className={styles.container}>
      <div className={styles.title}>
        <p className='font-subtitle02-bold text-[var(--color-text-main)]'>
          Acquisition Type
        </p>
        <Dropdown
          list={selectedYear.map((item) => item.name)}
          selected={selectedYear.find((item) => item.selected)?.name || '2023'}
          onClick={(name) => handleChangeYear(name)}
          className='w-78'
        />
        <Dropdown
          list={selectedPeriod.map((item) => item.name)}
          selected={selectedPeriod.find((item) => item.selected)?.name || 'All'}
          onClick={(name) => handleChangePeriod(name)}
        />
      </div>
      <div className='w-full flex justify-center mt-20'>
        <section className='flex gap-80 items-center w-[858px]'>
          <AcquisitionTypePieChart data={list} />
          <table className={styles.table}>
            <thead>
              <tr>
                <th className='text-left'>Acquisition Type</th>
                <th className='text-right'>Amount</th>
                <th className='text-right'>Total Cost Basis</th>
                <th className='text-right'>Activity</th>
              </tr>
            </thead>
            <tbody className='font-caption-medium'>
              {list.map((item, index) => (
                <tr key={index}>
                  <td>
                    <div className='flex items-center'>
                      <div
                        className={`flex items-center justify-center rounded-full border-1 w-32 h-32 mr-10 ${
                          styles[`border--${item.type}`]
                        }`}
                      >
                        {item.icon}
                      </div>
                      <p>{item.name}</p>
                    </div>
                  </td>
                  <td className='text-right'>
                    <p>40</p>
                  </td>
                  <td className='text-right'>
                    <p>$1,203</p>
                  </td>
                  <td className='text-right'>
                    <div className='rotate-270 w-16 h-16 ml-auto'>
                      <CaretDown />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      </div>
    </section>
  );
};
export default AcquisitionType;
