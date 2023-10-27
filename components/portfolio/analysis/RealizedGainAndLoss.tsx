'use client';
import Button from '@/components/buttons/Button';
import styles from './RealizedGainAndLoss.module.css';
import Image from 'next/image';
import CaretDown from '@/public/icon/CaretDown';
import Export from '@/public/icon/Export';
import Dropdown from './Dropdown';
import { useEffect, useMemo, useState } from 'react';
import {
  PERIOD_LIST,
  STATUS_LIST,
  TPeriod,
  TStatus,
  TYear,
} from '@/constants/period';
import { useInventoryRealizedTokensInfinite } from '@/utils/hooks/queries/inventory';
import { useMe } from '@/utils/hooks/queries/auth';
import SkeletonLoader from '@/components/SkeletonLoader';
import { useAtom, useAtomValue } from 'jotai';
import { currencyAtom } from '@/store/currency';
import { analysisGainAndLossParamAtom } from '@/store/requestParam';
import { formatCurrency, formatDate, formatPercent } from '@/utils/common';
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
type _Period = TPeriod & { selected: boolean };
const RealizedGainAndLoss = () => {
  const currency = useAtomValue(currencyAtom);
  const [requestParams, setRequestParams] = useAtom(
    analysisGainAndLossParamAtom
  );
  const { data: me } = useMe();
  const { data: realizedTokenList, status } =
    useInventoryRealizedTokensInfinite({
      ...requestParams,
      walletAddress: me.walletAddress,
    });
  const [selectedStatus, setSelectedStatus] = useState<_Period[]>(
    PERIOD_LIST.map((item) => ({
      ...item,
      selected: item.value === 'all' ? true : false,
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
  const handleClickShowMore = () => {
    latestPage?.isLast === false &&
      setRequestParams((prev) => {
        return {
          ...prev,
          limit: 10,
          nextCursor: latestPage.nextCursor,
        };
      });
  };
  useEffect(() => {
    console.log('changed!');
    setRequestParams((prev) => {
      return {
        ...prev,
        year: selectedYear.find((item) => item.selected)?.value || 2023,
        quarter: selectedStatus.find((item) => item.selected)?.value || 'all',
      };
    });
  }, [selectedStatus, selectedYear]);

  const mergePosts = useMemo(
    () => realizedTokenList?.pages || [],
    [realizedTokenList?.pages, requestParams]
  );
  const latestPage = useMemo(
    () => mergePosts[mergePosts.length - 1],
    [mergePosts]
  );
  useEffect(() => {
    console.log('realizedTokenList', realizedTokenList);
  }, [realizedTokenList]);
  return (
    <section className={styles.container}>
      <div className={styles.title}>
        <p className='font-subtitle02-bold text-[var(--color-text-main)]'>
          Realized Gain & Loss
        </p>
        <Dropdown
          list={selectedStatus.map((item) => item.name)}
          selected={selectedStatus.find((item) => item.selected)?.name || 'All'}
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
        {status === 'loading' && (
          <SkeletonLoader className='w-full h-[200px]' />
        )}
        {status === 'success' && (
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
              {mergePosts?.map((page, pageIndex) =>
                page.data.map((item, index) => (
                  <tr
                    key={index}
                    className='text-[var(--color-text-subtle)] hover:text-[var(--color-text-main)]'
                  >
                    <td className='text-left'>
                      <div className='flex items-center gap-8'>
                        <div className='w-32 h-32 flex items-center justify-center border-1 border-[var(--color-border-main)]'>
                          <Image
                            src={`${
                              item.token.imageUrl || '/icon/nftbank_icon.svg'
                            }`}
                            width={32}
                            height={32}
                            alt={`${item.collection.name}-${item.token.tokenId}`}
                          />
                        </div>
                        <div>
                          <p className='text-[var(--color-text-main)]'>
                            {item.token.tokenId}
                          </p>
                          <p className='text-[var(--color-text-subtle)]'>
                            {item.collection.name}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className='text-right'>
                      <p className='text-[var(--color-text-main)]'>
                        {item.amount}
                      </p>
                    </td>
                    <td className='text-right'>
                      <p className='text-[var(--color-text-main)]'>
                        {formatCurrency(
                          item.costBasis[currency].amount || '0',
                          currency
                        )}
                      </p>
                    </td>
                    <td className='text-right'>
                      <p className='text-[var(--color-text-main)]'>
                        {formatCurrency(
                          item.proceed[currency].amount || '0',
                          currency
                        )}
                      </p>
                    </td>
                    <td className='text-right'>
                      <p
                        className={`${
                          parseFloat(item.gainLoss[currency].amount || '0') > 0
                            ? 'text-[var(--color-text-success)]'
                            : 'text-[var(--color-text-danger)]'
                        }`}
                      >
                        {formatCurrency(
                          item.gainLoss[currency].amount || '0',
                          currency
                        )}
                      </p>
                    </td>
                    <td className='text-right'>
                      <p
                        className={`${
                          item.roi[currency] > 0
                            ? 'text-[var(--color-text-success)]'
                            : 'text-[var(--color-text-danger)]'
                        }`}
                      >
                        {formatPercent(item.roi[currency])}
                      </p>
                    </td>
                    <td className='text-right'>
                      <p className='text-[var(--color-text-main)]'>
                        {formatDate(new Date(item.acquisitionDate))}
                      </p>
                    </td>
                    <td className='text-right'>
                      <p className='text-[var(--color-text-main)]'>
                        {formatDate(new Date(item.soldDate))}
                      </p>
                    </td>
                    <td className='text-right'>
                      <div className='rotate-270 w-16 h-16  ml-auto'>
                        <CaretDown />
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        )}
      </div>
      {latestPage?.isLast !== true && (
        <div className='flex justify-center mt-20'>
          <Button id='' onClick={() => handleClickShowMore()}>
            Show more
          </Button>
        </div>
      )}
    </section>
  );
};
export default RealizedGainAndLoss;
