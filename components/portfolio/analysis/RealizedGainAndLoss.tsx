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
import {
  formatCurrency,
  formatCurrencyOriginal,
  formatDate,
  formatGasFee,
  formatPercent,
  parseFloatPrice,
} from '@/utils/common';
import { portfolioUserAtom } from '@/store/portfolio';
import Info from '@/public/icon/Info';
import { Tooltip } from '@nextui-org/react';
import { LATEST_ACQUISITION_DATE } from '@/utils/messages';
import ToggleButton from '@/components/buttons/ToggleButton';
import { useInView } from 'react-intersection-observer';
import NoData from '@/components/error/NoData';
const THEAD = {
  costBasis: [
    { key: 'item', value: 'Item' },
    { key: 'amount', value: 'Amount' },
    { key: 'costBasis', value: 'Cost basis' },
    { key: 'proceed', value: 'Proceed' },
    { key: 'realizedGainAndLoss', value: 'Realized G&L' },
    { key: 'realizedROI', value: 'Realized ROI' },
    { key: 'acquisitionDate', value: 'Acq. date', tooltip: true },
    { key: 'soldDate', value: 'Sold date' },
    // { key: 'activity', value: 'Activity' },
  ],
  acquisitionPrice: [
    { key: 'item', value: 'Item' },
    { key: 'amount', value: 'Amount' },
    { key: 'costBasis', value: 'Acq. price' },
    { key: 'proceed', value: 'Revenue' },
    { key: 'realizedGainAndLoss', value: 'Realized G&L' },
    { key: 'realizedROI', value: 'Realized ROI' },
    { key: 'acquisitionDate', value: 'Acq. date', tooltip: true },
    { key: 'soldDate', value: 'Sold date' },
    // { key: 'activity', value: 'Activity' },
  ],
};
type _Year = TYear & { selected: boolean };
type _Period = TPeriod & { selected: boolean };
const RealizedGainAndLoss = () => {
  const currency = useAtomValue(currencyAtom);
  const portfolioUser = useAtomValue(portfolioUserAtom);
  const [includeGasUsed, setIncludeGasUsed] = useState<boolean>(false);
  const { ref, inView } = useInView();
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
    page: 0,
  });
  const [selectedStatus, setSelectedStatus] = useState<_Period[]>(
    PERIOD_LIST.map((item) => ({
      ...item,
      selected: item.value === 'all' ? true : false,
    }))
  );
  const [selectedYear, setSelectedYear] = useState<_Year[]>([
    { name: 'ALL', value: 'all', selected: true },
    { name: '2024', value: 2024, selected: false },
    { name: '2023', value: 2023, selected: false },
    { name: '2022', value: 2022, selected: false },
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
  useEffect(() => {
    setRequestParams((prev) => {
      return {
        ...prev,
        page: 0,
        year: 'all',
      };
    });
  }, []);
  useEffect(() => {
    const isLast =
      realizedTokenList?.pages?.[realizedTokenList?.pages.length - 1].isLast;
    !isLast &&
      inView &&
      status !== 'loading' &&
      (fetchNextPage(),
      setRequestParams((prev) => ({ ...prev, page: prev.page + 1 })));
  }, [fetchNextPage, inView]);
  useEffect(() => {
    setRequestParams((prev) => {
      return {
        ...prev,
        page: 0,
        year: selectedYear.find((item) => item.selected)?.value || 'all',
      };
    });
  }, [selectedStatus, selectedYear]);

  const mergePosts = useMemo(() => {
    return realizedTokenList?.pages.flatMap((page) => page.data);
  }, [realizedTokenList?.pages, requestParams, status]);

  return (
    <section className={styles.container}>
      <div className={styles.title}>
        <p className='font-subtitle02-bold text-[var(--color-text-main)]'>
          Realized Gain & Loss
        </p>
        <Dropdown
          id='realized_gain_loss_period_filter'
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
        <div className='ml-auto flex px-12'>
          <span className='font-button03-medium text-[var(--color-text-subtle)] mr-8'>
            Include Gas fee
          </span>
          <ToggleButton
            onClick={() => setIncludeGasUsed((prev) => !prev)}
            checked={includeGasUsed === true}
            id={'realized_gain_loss_gas_fee_toggle'}
          />
        </div>
      </div>
      <div className={styles.tableWrapper}>
        <table className={styles.table}>
          <thead className='font-caption-regular'>
            <tr>
              {THEAD[
                includeGasUsed === true ? 'costBasis' : 'acquisitionPrice'
              ].map((item, index) => (
                <th
                  key={index}
                  className={index === 0 ? 'text-left' : 'text-right'}
                >
                  {item.tooltip ? (
                    <div className='w-full flex items-center justify-end text-[var(--color-icon-subtle)]'>
                      <p className='mr-4'>{item.value}</p>
                      <Tooltip
                        key={'realized-tooltip'}
                        placement={'bottom'}
                        content={LATEST_ACQUISITION_DATE}
                        className='cursor-pointer max-w-[228px] font-caption-regular text-[var(--color-text-main)] bg-[var(--color-elevation-surface)] border-1 border-[var(--color-border-bold)] p-6'
                      >
                        <div className='flex justify-center text-[var(--color-icon-subtle)]'>
                          <Info />
                        </div>
                      </Tooltip>
                    </div>
                  ) : (
                    <p>{item.value}</p>
                  )}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className='font-caption-medium'>
            {mergePosts &&
              mergePosts?.map((item, index) => {
                const acquisitionPrice = parseFloatPrice(
                  item.acquisitionPrice?.[currency]
                );
                const gasFee = parseFloatPrice(item.gasFee?.[currency]);
                const proceedGasFee = parseFloatPrice(
                  item.proceedGasFee?.[currency]
                );
                const costBasis = acquisitionPrice + gasFee;
                const proceed = parseFloatPrice(item.proceed[currency]);
                const realizedGainAndLoss = proceed - acquisitionPrice;
                const isPlus = realizedGainAndLoss > 0;
                const isMinus = realizedGainAndLoss < 0;
                const isZero = realizedGainAndLoss === 0;
                return (
                  <tr
                    key={`realized-${index}`}
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
                          ? formatCurrency(costBasis.toString(), currency)
                          : formatCurrency(
                              acquisitionPrice.toString(),
                              currency
                            )}
                      </p>
                      {includeGasUsed && (
                        <p className={`text-[var(--color-text-brand)] mt-4`}>
                          {`+${parseFloatPrice(gasFee.toFixed(3))}`}
                        </p>
                      )}
                    </td>
                    <td className='text-right'>
                      <p className='text-[var(--color-text-main)]'>
                        {includeGasUsed
                          ? formatCurrency(
                              (proceed - proceedGasFee).toString(),
                              currency
                            )
                          : formatCurrency(proceed.toString(), currency)}
                      </p>
                      {includeGasUsed && (
                        <Tooltip
                          content={formatCurrencyOriginal(
                            proceedGasFee.toString(),
                            currency
                          )}
                          placement='bottom-end'
                          className='font-caption-regular text-[var(--color-text-main)] bg-[var(--color-elevation-surface)] border-1 border-[var(--color-border-bold)] p-6'
                        >
                          <p className={`text-[var(--color-text-brand)] mt-4`}>
                            {formatGasFee(
                              item.proceedGasFee?.[currency],
                              currency
                            )}
                          </p>
                        </Tooltip>
                      )}
                    </td>
                    <td className='text-right'>
                      <p
                        className={`${
                          realizedGainAndLoss > 0
                            ? 'text-[var(--color-text-success)]'
                            : 'text-[var(--color-text-danger)]'
                        }`}
                      >
                        {includeGasUsed
                          ? formatCurrency(
                              (
                                realizedGainAndLoss -
                                gasFee -
                                proceedGasFee
                              ).toString(),
                              currency
                            )
                          : formatCurrency(
                              realizedGainAndLoss.toString(),
                              currency
                            )}
                      </p>
                    </td>
                    <td className='text-right'>
                      <p
                        className={`${
                          isZero
                            ? 'text-[var(--color-text-main)]'
                            : isPlus
                            ? 'text-[var(--color-text-success)]'
                            : 'text-[var(--color-text-danger)]'
                        }`}
                      >
                        {includeGasUsed
                          ? formatPercent(
                              (
                                ((realizedGainAndLoss -
                                  gasFee -
                                  proceedGasFee) /
                                  (costBasis + proceedGasFee)) *
                                100
                              ).toString()
                            )
                          : formatPercent(
                              (
                                (realizedGainAndLoss / acquisitionPrice) *
                                100
                              ).toString()
                            )}
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
                    {/* <td className='text-right'>
                        <div className='rotate-270 w-16 h-16  ml-auto'>
                          <CaretDown />
                        </div>
                      </td> */}
                  </tr>
                );
              })}
          </tbody>
        </table>
        <div ref={ref} className='h-1' />
        {!mergePosts ||
          (mergePosts?.length === 0 && (
            <div className='flex justify-center items-center h-[184px] p'>
              <NoData />
            </div>
          ))}
      </div>
    </section>
  );
};
export default RealizedGainAndLoss;
