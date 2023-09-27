import styles from './InventoryItemSection.module.css';
import InventoryItemFilter from './InventoryItemFilter';
import InventoryItemList from './InventoryItemList';
import InventoryItemSelectCollection from './InventoryItemSelectCollection';

const InventoryItemSection = () => {
  return (
    <>
      <InventoryItemSelectCollection />
      <section className={`${styles.container} dark:border-border-main-dark`}>
        <InventoryItemFilter />
        <InventoryItemList />
      </section>
    </>
  );
};
export default InventoryItemSection;
