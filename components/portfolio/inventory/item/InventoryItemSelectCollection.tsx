import Cancel from '@/public/icon/Cancel';
import styles from './InventoryItemSelectCollection.module.css';
import { selectedCollectionInventoryAtom } from '@/store/portfolio';
import { useAtom } from 'jotai';
import Image from 'next/image';
import ImagePlaceholder from '@/public/icon/ImagePlaceholder';
import { shortenAddress } from '@/utils/common';

const InventoryItemSelectCollection = () => {
  const [collections, setCollections] = useAtom(
    selectedCollectionInventoryAtom
  );
  const handleClickButton = (collectionId: string) => {
    setCollections((prev) => {
      return prev.filter(
        (item) => item.collection.assetContract !== collectionId
      );
    });
  };
  const handleClickClearAll = () => {
    setCollections([]);
  };
  return (
    <div className='font-caption-medium flex items-center flex-wrap gap-y-8 h-fit'>
      <p className='text-[var(--color-text-subtle)] mr-12'>Filter</p>
      {collections?.map((collection, index) => (
        <button
          key={index}
          className={`${styles.box} mr-8`}
          onClick={() => handleClickButton(collection.collection.assetContract)}
        >
          {collection.collection.imageUrl ? (
            <div className='w-20 h-20 rounded-full overflow-hidden mr-8'>
              <img
                src={collection.collection.imageUrl}
                alt={`${collection.collection.name}`}
                className='rounded-full w-full object-center'
              />
            </div>
          ) : (
            <div className='rounded-full w-20 h-20 flex items-center justify-center border-1 border-[var(--color-border-main)] mr-8'>
              <ImagePlaceholder className='w-12 h-12 fill-[var(--color-background-neutral-bold)]' />
            </div>
          )}
          <p>
            {collection.collection.name ||
              shortenAddress(collection.collection.assetContract)}
          </p>
          <Cancel className='ml-8' />
        </button>
      ))}
      {collections?.length > 0 && (
        <button
          className='text-[var(--color-text-brand)] border-0 px-4'
          onClick={() => handleClickClearAll()}
        >
          Clear All
        </button>
      )}
    </div>
  );
};
export default InventoryItemSelectCollection;
