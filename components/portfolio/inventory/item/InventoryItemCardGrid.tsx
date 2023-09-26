'use client';
import styles from './InventoryItemCardGrid.module.css';
import { inventoryItemListAtom } from '@/store/requestParam';
import { useInventoryItemList } from '@/utils/hooks/queries/inventory';
import { useAtom } from 'jotai';
import InventoryItemCard from './InventoryItemCard';

const InventoryItemCardGrid = () => {
  const [requestParam, setRequestParam] = useAtom(inventoryItemListAtom);
  const { data: inventoryItemList, status } =
    useInventoryItemList(requestParam);
  return (
    <section className={styles.cardListSection}>
      {inventoryItemList?.tokens.map((token, index) => {
        return <InventoryItemCard token={token} key={index} />;
      })}
    </section>
  );
};
export default InventoryItemCardGrid;
