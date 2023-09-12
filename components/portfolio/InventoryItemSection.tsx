import styles from './InventoryItemSection.module.css';
import InventoryItemFilter from './InventoryItemFilter';

const InventoryItemSection = () => {
  return (
    <section className={styles.container}>
      <InventoryItemFilter />
    </section>
  );
};
export default InventoryItemSection;
