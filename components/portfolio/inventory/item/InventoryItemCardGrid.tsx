'use client';
import styles from './InventoryItemCardGrid.module.css';
import { inventoryItemListAtom } from '@/store/requestParam';
import { useInventoryItemInfinite } from '@/utils/hooks/queries/inventory';
import { useAtom } from 'jotai';
import InventoryItemCard from './InventoryItemCard';
import { useEffect, useMemo, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { useInventoryItemPerformance } from '@/utils/hooks/queries/performance';
import ReactQueryClient from '@/utils/ReactQueryClient';
import { Token } from '@/interfaces/collection';

const InventoryItemCardGrid = () => {
  const [requestParam, setRequestParam] = useAtom(inventoryItemListAtom);
  const {
    fetchNextPage,
    data: inventoryItemList,
    status,
  } = useInventoryItemInfinite({ ...requestParam, page: 0 });
  const { data: inventoryItemListPerformance, status: statusPerformance } =
    useInventoryItemPerformance(requestParam);
  const { ref, inView } = useInView();
  useEffect(() => {
    const isLast =
      inventoryItemList?.pages?.[inventoryItemList?.pages.length - 1].isLast;
    !isLast &&
      inView &&
      status !== 'loading' &&
      statusPerformance !== 'loading' &&
      (fetchNextPage(),
      setRequestParam((prev) => ({ ...prev, page: prev.page + 1 })));
  }, [fetchNextPage, inView]);
  useEffect(() => {
    inventoryItemListPerformance &&
      inventoryItemList?.pages &&
      ReactQueryClient.setQueryData(
        ['inventoryItemList', { ...requestParam, page: 0 }],
        {
          ...inventoryItemList,
          pages: inventoryItemList.pages.map(
            (page) =>
              (page.page === inventoryItemListPerformance?.paging.page && {
                ...page,
                tokens: inventoryItemListPerformance.tokens,
              }) ||
              page
          ),
        }
      );
  }, [inventoryItemList, inventoryItemListPerformance, requestParam]);

  const mergePosts = useMemo(
    () => inventoryItemList?.pages,
    [inventoryItemList?.pages, requestParam]
  );
  return (
    <section className='w-full h-full overflow-auto'>
      <div className={styles.cardListSection}>
        {mergePosts?.map((page, pageIndex) => {
          return page.tokens.map((token, index) => {
            return token && <InventoryItemCard token={token} key={index} />;
          });
        })}
      </div>
      <div className='w-full h-43 mt-40' ref={ref} />
    </section>
  );
};
export default InventoryItemCardGrid;
