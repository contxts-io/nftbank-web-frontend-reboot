'use client';
import styles from './AcquisitionType.module.css';
import ShoppingCart from '@/public/icon/ShoppingCart';
import Jewel from '@/public/icon/Jewel';
import Parachute from '@/public/icon/Parachute';
import ArrowsDownUp from '@/public/icon/ArrowsDownUp';
import AcquisitionTypePieChart from './AcquisitionTypePieChart';
import { useEffect, useMemo, useState } from 'react';
import CaretDown from '@/public/icon/CaretDown';
import Dropdown from './Dropdown';
import { PERIOD_LIST, TPeriod, TYear } from '@/constants/period';
import { useMe } from '@/utils/hooks/queries/auth';
import { useInventoryAcquisitionTypes } from '@/utils/hooks/queries/inventory';
import { formatCurrency } from '@/utils/common';
import { useAtom, useAtomValue } from 'jotai';
import { currencyAtom } from '@/store/currency';
import { AcquisitionType } from '@/interfaces/activity';
import { analysisAcquisitionParamAtom } from '@/store/requestParam';
import { portfolioUserAtom } from '@/store/portfolio';
import NoData from '@/components/error/NoData';
const LIST = [
  {
    type: 'buy' as const,
    name: 'Buy',
    icon: (
      <ShoppingCart className='fill-[var(--color-icon-accent-green)]' />
    ) as JSX.Element,
    color: 'var(--color-border-accent-green)',
    amount: 0,
  },
  {
    type: 'mint' as const,
    name: 'Mint',
    icon: <Jewel className='fill-[var(--color-icon-accent-blue)]' />,
    color: 'var(--color-border-accent-blue)',
    amount: 0,
  },
  // {
  //   type: 'airdrop' as const,
  //   name: 'Airdrop',
  //   icon: <Parachute className='fill-[var(--color-icon-accent-orange)]' />,
  //   color: 'var(--color-border-accent-orange)',
  //   amount: 0,
  // },
  {
    type: 'transfer' as const,
    name: 'Transfer',
    icon: <ArrowsDownUp className='fill-[var(--color-icon-accent-fuchsia)]' />,
    color: 'var(--color-border-accent-fuchsia)',
    amount: 0,
  },
];
export type _List = (typeof LIST)[number] & Partial<AcquisitionType>;
type _Period = TPeriod & { selected: boolean };
type _Year = TYear & { selected: boolean };
const AcquisitionType = () => {
  const portfolioUser = useAtomValue(portfolioUserAtom);
  const currency = useAtomValue(currencyAtom);
  const [requestParams, setRequestParams] = useAtom(
    analysisAcquisitionParamAtom
  );
  const { data: acquisitionTypes, status: acquisitionTypesStatus } =
    useInventoryAcquisitionTypes({
      ...requestParams,
      ...portfolioUser,
    });
  const [list, setList] = useState<_List[]>(LIST);
  const [selectedPeriod, setSelectedPeriod] = useState<_Period[]>(
    PERIOD_LIST.map((item) => ({
      ...item,
      selected: item.value === 'all',
    })) as _Period[]
  );
  const [selectedYear, setSelectedYear] = useState<_Year[]>([
    { name: 'ALL', value: 'all', selected: true },
    { name: '2024', value: 2024, selected: false },
    { name: '2023', value: 2023, selected: false },
    { name: '2022', value: 2022, selected: false },
  ]);
  useEffect(() => {
    acquisitionTypes?.data &&
      setList(() => {
        return LIST.map((item) => {
          const acquisitionType = acquisitionTypes.data?.find(
            (acquisitionType) =>
              acquisitionType.type.toLowerCase() === item.type.toLowerCase()
          );
          console.log('find acquisitionType', acquisitionType);
          return {
            ...item,
            ...acquisitionType,
          };
        });
      });
    console.log('acquisitionTypes', acquisitionTypes?.data, list);
  }, [acquisitionTypes?.data, selectedYear]);
  useEffect(() => {
    setRequestParams((prev) => {
      return {
        ...prev,
        year: selectedYear.find((item) => item.selected)?.value || 'all',
        // quarter: selectedPeriod.find((item) => item.selected)?.value || 'all',
      };
    });
  }, [selectedPeriod, selectedYear]);
  const totalAcqCount = useMemo(
    () =>
      acquisitionTypes?.data?.reduce((acc, cur) => acc + cur.amount, 0) || 0,
    [acquisitionTypes?.data]
  );
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
          id='acquisition_type_pie_chart_period_filter'
        />
        {/* <Dropdown
          list={selectedPeriod.map((item) => item.name)}
          selected={selectedPeriod.find((item) => item.selected)?.name || 'All'}
          onClick={(name) => handleChangePeriod(name)}
        /> */}
      </div>
      <div className='w-full flex justify-center mt-20'>
        <section className='flex items-center w-[900px]'>
          {acquisitionTypes?.data?.length == 0 ? (
            <div className=' w-full h-[260px] flex justify-center pt-40'>
              <NoData />
            </div>
          ) : (
            <>
              <div className='w-[310px] h-[260px] mr-40 relative'>
                <AcquisitionTypePieChart
                  data={list}
                  totalCount={totalAcqCount}
                  status={acquisitionTypesStatus}
                />
                {acquisitionTypesStatus === 'success' && (
                  <div className='absoluteCenter flex flex-col items-center'>
                    <p className='font-subtitle02-bold text-[var(--color-text-main)] mb-4'>
                      {totalAcqCount}
                    </p>
                    <p className='font-caption-regular text-[var(--color-text-subtle)]'>
                      Total Acq. Count
                    </p>
                  </div>
                )}
              </div>

              <table className={styles.table}>
                <thead>
                  <tr>
                    <th className='text-left'>
                      <p>Acquisition Type</p>
                    </th>
                    <th className='text-right'>
                      <p>Amount</p>
                    </th>
                    <th className='text-right'>
                      <p>Total Cost Basis</p>
                    </th>
                    {/* <th className='text-right'>
                      <p>Activity</p>
                    </th> */}
                  </tr>
                </thead>
                <tbody className='font-caption-medium'>
                  {list.map((item, index) => (
                    <tr key={index}>
                      <td>
                        <div className='flex items-center'>
                          <div
                            className={`flex items-center justify-center rounded-full border-1 w-32 h-32 mr-10 ${
                              styles[`border--${item.type.toLowerCase()}`]
                            }`}
                          >
                            {item.icon}
                          </div>
                          <p>{item.name}</p>
                        </div>
                      </td>
                      <td className='text-right'>
                        <p>{item.amount}</p>
                      </td>
                      <td className='text-right'>
                        <p>
                          {formatCurrency(
                            item.costBasis?.[currency] || '0',
                            currency
                          )}
                        </p>
                      </td>
                      {/* <td className='text-right'>
                        <div className='rotate-270 w-16 h-16 ml-auto'>
                          <CaretDown />
                        </div>
                      </td> */}
                    </tr>
                  ))}
                </tbody>
              </table>
            </>
          )}
        </section>
      </div>
    </section>
  );
};
export default AcquisitionType;
