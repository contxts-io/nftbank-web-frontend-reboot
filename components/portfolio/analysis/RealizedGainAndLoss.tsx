'use client';
import Button from '@/components/buttons/Button';
import styles from './RealizedGainAndLoss.module.css';
import Image from 'next/image';
import CaretDown from '@/public/icon/CaretDown';
import Export from '@/public/icon/Export';
import Dropdown from './Dropdown';
import { useState } from 'react';
import { STATUS_LIST, TStatus, TYear } from '@/constants/period';
const THEAD = [
  { key: 'item', value: 'Item' },
  { key: 'amount', value: 'Amount' },
  { key: 'costBasis', value: 'Cost basis' },
  { key: 'proceed', value: 'Proceed' },
  { key: 'realizedGainAndLoss', value: 'Realized G&L' },
  { key: 'realizedROI', value: 'Realized ROI' },
  { key: 'acquisitionDate', value: 'Acq. date' },
  { key: 'soldDate', value: 'Sold date' },
  { key: 'activity', value: 'Activity' },
];
type _Year = TYear & { selected: boolean };
type _Status = TStatus & { selected: boolean };
const RealizedGainAndLoss = () => {
  const [selectedStatus, setSelectedStatus] = useState<_Status[]>(
    STATUS_LIST.map((item) => ({
      ...item,
      selected: item.name === 'Overall' ? true : false,
    }))
  );
  const [selectedYear, setSelectedYear] = useState<_Year[]>([
    { name: '2023', value: 2023, selected: true },
    { name: '2022', value: 2022, selected: false },
    { name: '2021', value: 2021, selected: false },
    { name: '2020', value: 2020, selected: false },
  ]);
  const handleChangeYear = (name: string) => {
    setSelectedYear((prev) =>
      prev.map((item) => ({
        ...item,
        selected: item.name === name ? true : false,
      }))
    );
  };
  const handleChangeStatus = (name: string) => {
    setSelectedStatus((prev) =>
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
          Realized Gain & Loss
        </p>
        <Dropdown
          list={selectedStatus.map((item) => item.name)}
          selected={
            selectedStatus.find((item) => item.selected)?.name || 'Overall'
          }
          onClick={(name) => handleChangeStatus(name)}
          className='w-100'
        />
        <Dropdown
          list={selectedYear.map((item) => item.name)}
          selected={selectedYear.find((item) => item.selected)?.name || '2023'}
          onClick={(name) => handleChangeYear(name)}
          className='w-78'
        />
        <Button id='' className='ml-auto'>
          Export
          <Export className='ml-4' />
        </Button>
      </div>
      <div className={styles.tableWrapper}>
        <table className={styles.table}>
          <thead className='font-caption-regular'>
            <tr>
              {THEAD.map((item, index) => (
                <th
                  key={index}
                  className={index === 0 ? 'text-left' : 'text-right'}
                >
                  {item.value}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className='font-caption-medium'>
            <tr>
              <td className='text-left'>
                <div className='flex items-center gap-8'>
                  <div className='w-32 h-32 flex items-center justify-center border-1 border-[var(--color-border-main)]'>
                    <Image
                      src={'/icon/nftbank_icon.svg'}
                      width={32}
                      height={32}
                      alt='nftbank'
                    />
                  </div>
                  <div>
                    <p className='text-[var(--color-text-main)]'>#9061</p>
                    <p className='text-[var(--color-text-subtle)]'>
                      BoredApeYachtClub
                    </p>
                  </div>
                </div>
              </td>
              <td className='text-right'>
                <p className='text-[var(--color-text-main)]'>1</p>
              </td>
              <td className='text-right'>
                <p className='text-[var(--color-text-main)]'>$1,203</p>
              </td>
              <td className='text-right'>
                <p className='text-[var(--color-text-main)]'>$1,203</p>
              </td>
              <td className='text-right'>
                <p>+$1,188</p>
              </td>
              <td className='text-right'>
                <p>+48%</p>
              </td>
              <td className='text-right'>
                <p className='text-[var(--color-text-main)]'>2023/12/11</p>
              </td>
              <td className='text-right'>
                <p className='text-[var(--color-text-main)]'>2023/12/11</p>
              </td>
              <td className='text-right'>
                <div className='rotate-270 w-16 h-16  ml-auto'>
                  <CaretDown />
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className='flex justify-center mt-20'>
        <Button id=''>Show more</Button>
      </div>
    </section>
  );
};
export default RealizedGainAndLoss;
