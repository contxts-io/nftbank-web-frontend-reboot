import styles from './InventoryItemSection.module.css';
import InventoryItemFilter from './InventoryItemFilter';
import InventoryItemList from './InventoryItemList';

const InventoryItemSection = () => {
  return (
    <section className={`${styles.container} dark:border-border-main-dark`}>
      <InventoryItemFilter />
      <InventoryItemList />
    </section>
  );
};
export default InventoryItemSection;
