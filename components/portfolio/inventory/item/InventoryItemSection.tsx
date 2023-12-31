import styles from './InventoryItemSection.module.css';
import InventoryItemFilter from './InventoryItemFilter';
import InventoryItemList from './InventoryItemList';
import InventoryItemSelectCollection from './InventoryItemSelectCollection';
import { useEffect, useState } from 'react';
import CustomValuationSaveToast from './CustomValuationSaveToast';
import { useAtom, useAtomValue } from 'jotai';
import {
  customValuationAtom,
  selectedCollectionInventoryAtom,
} from '@/store/portfolio';

const InventoryItemSection = () => {
  const [isFilterOpen, setIsFilterOpen] = useState<boolean>(true);
  const [customValuations, setCustomValuations] = useAtom(customValuationAtom);
  const collections = useAtomValue(selectedCollectionInventoryAtom);
  useEffect(() => {
    setCustomValuations([]);
  }, []);
  return (
    <section className='sticky top-116 z-0 transition-all duration-200'>
      <div className={collections.length > 0 ? styles.show : styles.hide}>
        <InventoryItemSelectCollection />
      </div>
      <section className={`${styles.container} mt-16`}>
        <div className='w-fit h-full'>
          {isFilterOpen && (
            <InventoryItemFilter handleFilterOpen={setIsFilterOpen} />
          )}
        </div>
        <div className='w-full'>
          <div className='px-12 overflow-hidden'>
            <InventoryItemList
              isFilterOpen={isFilterOpen}
              handleFilterOpen={setIsFilterOpen}
            />
          </div>
        </div>
      </section>
    </section>
  );
};
export default InventoryItemSection;
