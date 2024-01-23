'use client';
import styles from './InventoryItemCardGrid.module.css';
import { inventoryItemListAtom } from '@/store/requestParam';
import { useInventoryItemInfinite } from '@/utils/hooks/queries/inventory';
import { useAtom } from 'jotai';
import InventoryItemCard from './InventoryItemCard';
import { useEffect, useMemo } from 'react';
import { useInView } from 'react-intersection-observer';
import ReactQueryClient from '@/utils/ReactQueryClient';
import { Token } from '@/interfaces/token';
import NoData from '@/components/error/NoData';
import FailToLoad from '@/components/error/FailToLoad';

const InventoryItemCardGrid = () => {
  const [requestParam, setRequestParam] = useAtom(inventoryItemListAtom);
  const {
    fetchNextPage,
    data: inventoryItemList,
    status,
  } = useInventoryItemInfinite({ ...requestParam, page: 0 });
  const { ref, inView } = useInView();
  useEffect(() => {
    const isLast =
      inventoryItemList?.pages?.[inventoryItemList?.pages.length - 1].isLast;
    !isLast &&
      inView &&
      status !== 'loading' &&
      (fetchNextPage(),
      setRequestParam((prev) => ({ ...prev, page: prev.page + 1 })));
  }, [fetchNextPage, inView]);

  const mergePosts = useMemo(
    () => inventoryItemList?.pages,
    [inventoryItemList?.pages, requestParam]
  );
  return (
    <section className='w-full h-full overflow-auto'>
      {status === 'error' && (
        <div>
          <FailToLoad />
        </div>
      )}
      {status === 'success' && (!mergePosts || mergePosts.length === 0) && (
        <div>
          <NoData />
        </div>
      )}
      {status === 'success' && mergePosts && mergePosts?.length > 0 && (
        <div className={styles.cardListSection}>
          {mergePosts?.map((page, pageIndex) => {
            return page.data.map((token, index) => {
              return token && <InventoryItemCard token={token} key={index} />;
            });
          })}
        </div>
      )}
      <div className='w-full h-43 mt-40' ref={ref} />
    </section>
  );
};
export default InventoryItemCardGrid;
