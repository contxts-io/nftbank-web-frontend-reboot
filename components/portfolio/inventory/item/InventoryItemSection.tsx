import styles from './InventoryItemSection.module.css';
import InventoryItemFilter from './InventoryItemFilter';
import InventoryItemList from './InventoryItemList';
import InventoryItemSelectCollection from './InventoryItemSelectCollection';
import { useState } from 'react';

const InventoryItemSection = () => {
  const [isFilterOpen, setIsFilterOpen] = useState<boolean>(true);
  return (
    <section className='sticky top-116 z-0'>
      <InventoryItemSelectCollection />
      <section className={`${styles.container} dark:border-border-main-dark`}>
        {isFilterOpen && (
          <InventoryItemFilter handleFilterOpen={setIsFilterOpen} />
        )}
        <InventoryItemList
          isFilterOpen={isFilterOpen}
          handleFilterOpen={setIsFilterOpen}
        />
      </section>
    </section>
  );
};
export default InventoryItemSection;
