import { useInventoryCollectionsInfinite } from '@/utils/hooks/queries/inventory';
import styles from './SpamCollectionTable.module.css';
import { inventorySpamCollectionAtom } from '@/store/requestParam';
import { useAtom, useAtomValue } from 'jotai';
import Image from 'next/image';
import { currencyAtom } from '@/store/currency';
import { formatCurrency, formatPercent, shortenAddress } from '@/utils/common';
import Ethereum from '@/public/icon/Ethereum';
import { useInView } from 'react-intersection-observer';
import { useEffect } from 'react';
import ClockClockwise from '@/public/icon/ClockClockwise';
const SpamCollectionTable = () => {
  const currency = useAtomValue(currencyAtom);
  const [inventoryCollectionRequestParam, setInventoryCollectionRequestParam] =
    useAtom(inventorySpamCollectionAtom);
  const { ref, inView } = useInView();
  const { fetchNextPage, data, status } = useInventoryCollectionsInfinite({
    ...inventoryCollectionRequestParam,
    page: 0,
  });
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
          <th />
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
                <div className='w-full pr-10'>
                  <p>
                    {formatCurrency(collection.nav[currency].amount, currency)}
                  </p>
                </div>
              </td>
              <td className='text-left'>Non spam</td>
              <td>{index !== 0 && <ClockClockwise />}</td>
            </tr>
          ))
        )}
      </tbody>
      <div ref={ref} />
    </table>
  );
};
export default SpamCollectionTable;
