'use client';
import styles from './InventoryItemCardGrid.module.css';
import { inventoryItemListAtom } from '@/store/requestParam';
import { useInventoryItemInfinite } from '@/utils/hooks/queries/inventory';
import { useAtom } from 'jotai';
import InventoryItemCard from './InventoryItemCard';
import { useEffect, useMemo } from 'react';
import { useInView } from 'react-intersection-observer';

const InventoryItemCardGrid = () => {
  const [requestParam, setRequestParam] = useAtom(inventoryItemListAtom);
  const {
    fetchNextPage,
    data: inventoryItemList,
    status,
  } = useInventoryItemInfinite(requestParam);
  const { ref, inView } = useInView();
  useEffect(() => {
    inView && fetchNextPage();
  }, [fetchNextPage, inView]);
  const mergePosts = useMemo(
    () => inventoryItemList?.pages.flatMap((page) => page.tokens),
    [inventoryItemList?.pages]
  );
  return (
    <section className='w-full h-full overflow-auto'>
      <div className={styles.cardListSection}>
        {mergePosts?.map((token, index) => {
          return <InventoryItemCard token={token} key={index} />;
        })}
      </div>
      <div className='w-full h-1' ref={ref} />
    </section>
  );
};
export default InventoryItemCardGrid;
