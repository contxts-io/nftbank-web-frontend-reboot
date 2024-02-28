'use client';
import styles from './InventoryItemCardGrid.module.css';
import { inventoryItemListAtom } from '@/store/requestParam';
import {
  useInventoryItemInfinite,
  useInventoryItemList,
} from '@/utils/hooks/queries/inventory';
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
  const { data: itemListFresh } = useInventoryItemList(requestParam);
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
    () =>
      inventoryItemList?.pages
        .flatMap((page) => page.data)
        .map((item) => {
          const _item = itemListFresh?.data.find(
            (itemFresh) =>
              itemFresh.collection.assetContract ===
                item.collection.assetContract &&
              itemFresh.token.tokenId === item.token.tokenId
          );
          return { ...item, ..._item };
        }),
    [inventoryItemList?.pages, requestParam, itemListFresh]
  );
  return (
    <section className='w-full overflow-auto'>
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
          {mergePosts?.map((token, index) => {
            return token && <InventoryItemCard token={token} key={index} />;
          })}
        </div>
      )}
      <div className='w-full' ref={ref} />
    </section>
  );
};
export default InventoryItemCardGrid;
