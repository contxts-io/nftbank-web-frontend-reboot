'use client';
import { inventoryTypeAtom } from '@/store/settings';
import { useAtom } from 'jotai';

const InventoryTypeSelector = () => {
  const [inventoryType, setInventoryType] = useAtom(inventoryTypeAtom);
  return (
    <div className='w-full flex items-center mt-16'>
      <button
        onClick={() => setInventoryType('collection')}
        className={`${
          inventoryType === 'collection' && 'bg-blue-500 text-white'
        }`}
      >
        Collection
      </button>
      <button
        onClick={() => setInventoryType('item')}
        className={`${inventoryType === 'item' && 'bg-blue-500 text-white'}`}
      >
        Item
      </button>
    </div>
  );
};
export default InventoryTypeSelector;
