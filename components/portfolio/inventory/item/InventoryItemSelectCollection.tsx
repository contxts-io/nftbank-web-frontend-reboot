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
    <div className='font-caption-medium flex items-center h-full'>
      <p className='text-text-subtle dark:text-text-subtle-dark mr-12'>
        Filter
      </p>
      {collections?.map((collection, index) => (
        <button
          key={index}
          className={`${styles.box} mr-8`}
          onClick={() => handleClickButton(collection.collection.assetContract)}
        >
          {collection.collection.imageUrl ? (
            <Image
              src={collection.collection.imageUrl}
              width={20}
              height={20}
              alt={`${collection.collection.name}`}
              className='w-20 h-20 rounded-full mr-8 border-1 border-[var(--color-border-main)]'
            />
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
