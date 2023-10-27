import styles from './InventoryItemSection.module.css';
import InventoryItemFilter from './InventoryItemFilter';
import InventoryItemList from './InventoryItemList';
import InventoryItemSelectCollection from './InventoryItemSelectCollection';
import { useEffect, useState } from 'react';
import CustomValuationSaveToast from './CustomValuationSaveToast';
import { useAtom } from 'jotai';
import { customValuationAtom } from '@/store/portfolio';

const InventoryItemSection = () => {
  const [isFilterOpen, setIsFilterOpen] = useState<boolean>(true);
  const [customValuations, setCustomValuations] = useAtom(customValuationAtom);
  useEffect(() => {
    setCustomValuations([]);
  }, []);
  return (
    <section className='sticky top-116 z-0'>
      <InventoryItemSelectCollection />
      <section className={`${styles.container}`}>
        <div className='w-fit h-full border-r-1 border-[var(--color-border-main)] '>
          {isFilterOpen && (
            <InventoryItemFilter handleFilterOpen={setIsFilterOpen} />
          )}
        </div>
        <div className='w-full'>
          <div className='flex-grow px-12 overflow-hidden'>
            <InventoryItemList
              isFilterOpen={isFilterOpen}
              handleFilterOpen={setIsFilterOpen}
            />
          </div>
          {customValuations.length > 0 && <CustomValuationSaveToast />}
        </div>
      </section>
    </section>
  );
};
export default InventoryItemSection;
