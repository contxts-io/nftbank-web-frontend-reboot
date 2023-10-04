import Cancel from '@/public/icon/Cancel';
import styles from './InventoryItemSelectCollection.module.css';
import { selectedCollectionInventoryAtom } from '@/store/portfolio';
import { useAtom } from 'jotai';
import Image from 'next/image';

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
    <div className='font-caption-medium flex items-center h-36 py-10 my-24'>
      <p className='text-text-subtle dark:text-text-subtle-dark mr-12'>
        Filter
      </p>
      {collections?.map((collection, index) => (
        <button
          key={index}
          className={`${styles.box} dark:border-border-brand-dark text-text-brand-dark mr-8`}
          onClick={() => handleClickButton(collection.collection.assetContract)}
        >
          <Image
            src={collection.collection.imageUrl}
            width={20}
            height={20}
            alt={`${collection.collection.name}`}
            className='rounded-full mr-8'
          />
          <p>{collection.collection.name}</p>
          <Cancel className='ml-8' />
        </button>
      ))}
      {collections?.length > 0 && (
        <button
          className='text-text-brand dark:text-text-brand-dark border-0 px-4'
          onClick={() => handleClickClearAll()}
        >
          Clear All
        </button>
      )}
    </div>
  );
};
export default InventoryItemSelectCollection;
