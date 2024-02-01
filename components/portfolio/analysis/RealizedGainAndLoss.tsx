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
import { portfolioUserAtom } from '@/store/portfolio';
import Info from '@/public/icon/Info';
import { Tooltip } from '@nextui-org/react';
import {
  LATEST_ACQUISITION_DATE,
  UNABLE_TO_CALCULATE_ROI,
} from '@/utils/messages';
import ToggleButton from '@/components/buttons/ToggleButton';
import { Value } from '@/interfaces/collection';
const THEAD = [
  { key: 'item', value: 'Item' },
  { key: 'amount', value: 'Amount' },
  { key: 'costBasis', value: 'Cost basis' },
  { key: 'proceed', value: 'Proceed' },
  { key: 'realizedGainAndLoss', value: 'Realized G&L' },
  { key: 'realizedROI', value: 'Realized ROI' },
  { key: 'acquisitionDate', value: 'Acq. date', tooltip: true },
  { key: 'soldDate', value: 'Sold date' },
  { key: 'activity', value: 'Activity' },
];
type _Year = TYear & { selected: boolean };
type _Period = TPeriod & { selected: boolean };
const RealizedGainAndLoss = () => {
  const currency = useAtomValue(currencyAtom);
  const portfolioUser = useAtomValue(portfolioUserAtom);
  const [showMore, setShowMore] = useState(false);
  const [includeGasUsed, setIncludeGasUsed] = useState<boolean>(true);
  const [requestParams, setRequestParams] = useAtom(
    analysisGainAndLossParamAtom
  );
  const {
    data: realizedTokenList,
    status,
    fetchNextPage,
  } = useInventoryRealizedTokensInfinite({
    ...portfolioUser,
    ...requestParams,
  });
  const [selectedStatus, setSelectedStatus] = useState<_Period[]>(
    PERIOD_LIST.map((item) => ({
      ...item,
      selected: item.value === 'all' ? true : false,
    }))
  );
  const [selectedYear, setSelectedYear] = useState<_Year[]>([
    { name: '2024', value: 2024, selected: false },
    { name: '2023', value: 2023, selected: true },
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
    setShowMore(true);
  };
  useEffect(() => {
    console.log('changed!');
    setRequestParams((prev) => {
      return {
        ...prev,
        year: selectedYear.find((item) => item.selected)?.value || 2023,
      };
    });
  }, [selectedStatus, selectedYear]);

  const mergePosts = useMemo(
    () =>
      realizedTokenList?.pages.map((page, index) => {
        return {
          ...page,
          // data: page.data.map((item) => ({
          //   ...item,
          //   acquisitionPrice: item.acquisitionPrice || {},
          //   proceed: item.proceed || {},

          //   gasFee: includeGasUsed
          //     ? item.gasFee
          //     : ({ usd: '0', eth: '0' } as Value),
          // })),
        };
      }) || [],
    [realizedTokenList?.pages, requestParams, includeGasUsed]
  );
  const latestPage = useMemo(
    () => mergePosts[mergePosts.length - 1],
    [mergePosts]
  );
  useEffect(() => {
    console.log('realizedTokenList', realizedTokenList, includeGasUsed);
  }, [realizedTokenList, includeGasUsed]);
  return (
    <section className={styles.container}>
      <div className={styles.title}>
        <p className='font-subtitle02-bold text-[var(--color-text-main)]'>
          Realized Gain & Loss
        </p>
        <Dropdown
          list={selectedYear.map((item) => item.name)}
          selected={selectedYear.find((item) => item.selected)?.name || '2023'}
          onClick={(name) => handleChangeYear(name)}
          className='w-80'
        />
        {/* <Dropdown
          list={selectedStatus.map((item) => item.name)}
          selected={selectedStatus.find((item) => item.selected)?.name || 'All'}
          onClick={(name) => handleChangeStatus(name)}
          className='w-65'
        /> */}
        {/* <div className='flex px-12 mr-8'>
          <span className='font-button03-medium text-[var(--color-text-subtle)] mr-8'>
            Include Gas fee
          </span>
          <ToggleButton
            onClick={() => setIncludeGasUsed((prev) => !prev)}
            checked={includeGasUsed === true}
            id={''}
          />
        </div> */}
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
                    {item.tooltip ? (
                      <div className='w-full flex items-center justify-end text-[var(--color-icon-subtle)]'>
                        <Tooltip
                          content={LATEST_ACQUISITION_DATE}
                          className='cursor-pointer max-w-[228px] font-caption-regular text-[var(--color-text-main)] bg-[var(--color-elevation-surface)] border-1 border-[var(--color-border-bold)] p-6'
                        >
                          <Info />
                        </Tooltip>
                        <p>{item.value}</p>
                      </div>
                    ) : (
                      <p>{item.value}</p>
                    )}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className='font-caption-medium'>
              {mergePosts?.map((page, pageIndex) =>
                page.data.map((item, index) => {
                  if (showMore === false && pageIndex === 0 && index > 4)
                    return null;
                  let gasFee = includeGasUsed
                    ? parseFloat(item.gasFee[currency])
                    : 0;
                  let costBasis = parseFloat(
                    item.acquisitionPrice[currency] + gasFee
                  );
                  let realizedGainAndLoss =
                    parseFloat(item.proceed[currency]) - costBasis;
                  let realizedROI = realizedGainAndLoss / costBasis;

                  return (
                    <tr
                      key={`${pageIndex}-${index}`}
                      className='text-[var(--color-text-subtle)] hover:text-[var(--color-text-main)]'
                    >
                      <td className='text-left'>
                        <div className='flex items-center gap-x-8'>
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
                          {/* {formatCurrency(
                          item.costBasis[currency] || '0',
                          currency
                        )} */}
                          {includeGasUsed
                            ? formatCurrency(
                                item.gasFee[currency] +
                                  item.acquisitionPrice[currency],
                                currency
                              )
                            : formatCurrency(
                                item.acquisitionPrice[currency],
                                currency
                              )}
                        </p>
                      </td>
                      <td className='text-right'>
                        <p className='text-[var(--color-text-main)]'>
                          {formatCurrency(
                            item.proceed[currency] || '0',
                            currency
                          )}
                        </p>
                      </td>
                      <td className='text-right'>
                        <p
                          className={`${
                            realizedGainAndLoss > 0
                              ? 'text-[var(--color-text-success)]'
                              : 'text-[var(--color-text-danger)]'
                          }`}
                        >
                          {formatCurrency(
                            realizedGainAndLoss.toString(),
                            currency
                          )}
                        </p>
                      </td>
                      <td className='text-right'>
                        <p
                          className={`${
                            isNaN(realizedROI)
                              ? 'text-[var(--color-text-main)]'
                              : realizedROI > 0
                              ? 'text-[var(--color-text-success)]'
                              : 'text-[var(--color-text-danger)]'
                          }`}
                        >
                          {formatPercent(realizedROI.toString())}
                        </p>
                      </td>
                      <td className='text-right'>
                        <p className='text-[var(--color-text-main)]'>
                          {item.acquisitionDate
                            ? formatDate(new Date(item.acquisitionDate))
                            : '-'}
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
                  );
                })
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
