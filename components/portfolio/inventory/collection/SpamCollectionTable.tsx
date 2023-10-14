'use client';
import { useInventoryCollectionsInfinite } from '@/utils/hooks/queries/inventory';
import styles from './SpamCollectionTable.module.css';
import { inventorySpamCollectionAtom } from '@/store/requestParam';
import { useAtom, useAtomValue } from 'jotai';
import Image from 'next/image';
import { currencyAtom } from '@/store/currency';
import { formatCurrency, formatPercent, shortenAddress } from '@/utils/common';
import Ethereum from '@/public/icon/Ethereum';
import { useInView } from 'react-intersection-observer';
import { useEffect, useState } from 'react';
import ClockClockwise from '@/public/icon/ClockClockwise';
import SkeletonLoader from '@/components/SkeletonLoader';
type Props = {
  onClick: (string: boolean) => void;
};
const Dropdown = (props: Props) => {
  return (
    <div className={`font-caption-medium ${styles.dropDown}`}>
      <li
        className='border-b-1 border-[var(--color-border-bold)]'
        onClick={() => props.onClick(true)}
      >
        <p className='hover:bg-red-300'>Spam</p>
      </li>
      <li onClick={() => props.onClick(false)}>
        <p className='hover:bg-red-300'>Non Spam</p>
      </li>
    </div>
  );
};
const SpamCollectionTable = () => {
  const currency = useAtomValue(currencyAtom);
  const [inventoryCollectionRequestParam, setInventoryCollectionRequestParam] =
    useAtom(inventorySpamCollectionAtom);
  const { ref, inView } = useInView();
  const { fetchNextPage, data, status } = useInventoryCollectionsInfinite({
    ...inventoryCollectionRequestParam,
    page: 0,
  });
  const [view, setView] = useState<{ key: string; open: boolean }>({
    key: '',
    open: false,
  });
  const [spamList, setSpamList] = useState<{ key: string; open: boolean }[]>(
    []
  );
  useEffect(() => {
    const isLastPage = data?.pages?.[data.pages.length - 1].isLast;
    !isLastPage &&
      inView &&
      status !== 'loading' &&
      (fetchNextPage(),
      setInventoryCollectionRequestParam((prev) => ({
        ...prev,
        page: prev.page + 1,
      })));
  }, [fetchNextPage, inView]);
  const handleClickSpam = (obj: { key: string; open: boolean }) => {
    setSpamList((prev) =>
      prev.find((item) => item.key === obj.key)
        ? prev.filter((item) => item.key === obj.key).concat(obj)
        : [...prev, obj]
    );
  };
  if (status === 'loading')
    return <SkeletonLoader className='w-full h-[200px]' />;
  return (
    <table className={`font-caption-medium ${styles.table} border-spacing-x-2`}>
      <thead
        className={`sticky top-[-1px] z-10 bg-[var(--color-elevation-surface)]`}
      >
        <tr className={styles.tableHeadRow}>
          <th className='text-left'>Chain</th>
          <th className='text-left'>Collection</th>
          <th className='text-right'>Valuation type</th>
          <th className='text-right'>Realtime NAV</th>
          <th className='text-left'>Status</th>
          <th className='text-right' />
        </tr>
      </thead>
      <tbody>
        {data?.pages.map((page, pageIndex) =>
          page.collections.map((collection, index) => (
            <tr
              key={`${pageIndex}-${index}-${collection.collection.assetContract}`}
              className={styles.tableBodyRow}
            >
              <td className='text-left'>
                {collection.collection.chain.imageUrl ? (
                  <div className='rounded-full h-32 w-32 flex items-center justify-center bg-blue-500 border-1 border-[var(--color-border-main)]'>
                    <Image
                      src={collection.collection.chain.imageUrl}
                      width={16}
                      height={16}
                      alt=''
                    />
                  </div>
                ) : (
                  <Ethereum />
                )}
              </td>
              <td className='text-left flex items-center'>
                <div className='rounded-full h-32 w-32 mr-12 flex items-center justify-center bg-[var(--color-elevation-surface)] border-1 border-[var(--color-border-main)]'>
                  <Image
                    src={
                      collection.collection.imageUrl || '/icon/nftbank_icon.svg'
                    }
                    width={16}
                    height={16}
                    alt={`${collection.collection.name}`}
                  />
                </div>
                {collection.collection.name ||
                  shortenAddress(collection.collection.assetContract)}
              </td>
              <td className='text-right'>
                {collection.valuation.find((collection) => collection.selected)
                  ?.type ||
                  collection.valuation.find((collection) => collection.default)
                    ?.type}
              </td>
              <td className='text-right'>
                {formatCurrency(collection.nav[currency].amount, currency)}
              </td>
              <td className='text-left'>
                <ul
                  onClick={() => {
                    setView({
                      key: `${pageIndex}-${index}`,
                      open: !view.open,
                    });
                  }}
                >
                  {spamList.find((obj) => obj.key === `${pageIndex}-${index}`)
                    ?.open
                    ? 'spam'
                    : 'non spam'}
                  {view.open && view.key === `${pageIndex}-${index}` && (
                    <Dropdown
                      onClick={(open: boolean) =>
                        handleClickSpam({ key: `${pageIndex}-${index}`, open })
                      }
                    />
                  )}
                </ul>
              </td>
              <td className='text-right'>
                {index !== 0 && <ClockClockwise />}
              </td>
            </tr>
          ))
        )}
      </tbody>
      {!data?.pages?.[data.pages.length - 1].isLast && (
        <div ref={ref}>More</div>
      )}
    </table>
  );
};
export default SpamCollectionTable;
