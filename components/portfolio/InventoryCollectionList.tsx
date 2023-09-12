'use client';
import { ChangeEvent, useEffect, useState } from 'react';
import styles from './InventoryCollectionList.module.css';
import InventoryCollectionTable from './InventoryCollectionTable';
import { useAtom, useAtomValue } from 'jotai';
import { inventoryCollectionAtom } from '@/store/requestParam';
import ReactModal from 'react-modal';
import SpamModal from './SpamModal';
import { currencyAtom, priceTypeAtom } from '@/store/currency';
import { useSearchParams } from 'next/navigation';
import { useInventoryCollectionList } from '@/utils/hooks/queries/inventory';
import { inventoryTypeAtom } from '@/store/settings';
import InventoryItemSection from './InventoryItemSection';

const InventoryCollectionList = () => {
  const searchParams = useSearchParams();
  const walletAddress = searchParams.get('walletAddress') || '';
  console.log('InventoryCollectionList @@@walletAddress: ', walletAddress);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [inventoryCollection, setInventoryCollection] = useAtom(
    inventoryCollectionAtom
  );
  const [priceType, setPriceType] = useAtom(priceTypeAtom);
  const { data: collectionList, status } =
    useInventoryCollectionList(inventoryCollection);
  const [currency, setCurrency] = useAtom(currencyAtom);
  const inventoryType = useAtomValue(inventoryTypeAtom);
  useEffect(() => {
    setInventoryCollection({
      ...inventoryCollection,
      w: walletAddress,
    });
  }, [walletAddress]);
  const handleChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
    setInventoryCollection({
      ...inventoryCollection,
      page: 0,
      searchCollection: e.target.value,
    });
  };
  const handleClickOpen = () => {
    setShowModal(true);
  };
  const handleClickPaging = (option: 'prev' | 'next') => {
    if (option === 'prev' && inventoryCollection.page === 1) return;
    setInventoryCollection({
      ...inventoryCollection,
      page:
        option === 'prev'
          ? inventoryCollection.page - 1
          : inventoryCollection.page + 1,
    });
  };
  const handleTogglePriceType = () => {
    setPriceType(priceType === 'costBasis' ? 'acquisitionPrice' : 'costBasis');
  };
  const handleToggleCurrency = () => {
    setCurrency(currency === 'eth' ? 'usd' : 'eth');
  };
  return (
    <div className={styles.container}>
      <div className={styles.row}>
        <input
          type='text'
          placeholder='Search by collection'
          className={styles.inputSearch}
          onChange={handleChangeInput}
          value={inventoryCollection.searchCollection}
        />
        <div>
          <button onClick={handleTogglePriceType}>{priceType}</button>
          <button onClick={handleToggleCurrency}>{currency}</button>
          <button onClick={handleClickOpen}>Spam settings</button>
        </div>
      </div>
      {inventoryType === 'collection' && <InventoryCollectionTable />}
      {inventoryType === 'item' && <InventoryItemSection />}

      <div className='flex w-full justify-center items-center'>
        <button onClick={() => handleClickPaging('prev')}>PREV</button>
        {collectionList && (
          <p className='mx-10'>
            current : {inventoryCollection.page} / total :
            {Math.ceil(
              collectionList.paging.total / collectionList.paging.limit
            )}
          </p>
        )}
        <button onClick={() => handleClickPaging('next')}>NEXT</button>
      </div>
      <ReactModal
        isOpen={showModal}
        contentLabel='Minimal Modal Example'
        className='w-fit absolute top-[20%] left-[30%]'
        onRequestClose={(e) => {
          setShowModal(false);
        }}
        ariaHideApp={false}
        shouldCloseOnOverlayClick={true}
        overlayClassName={'overlayBackground'}
      >
        <div className='relative w-fit h-fit'>
          <button
            className='absolute top-10 right-10'
            onClick={() => setShowModal(false)}
          >
            close
          </button>
          <SpamModal />
        </div>
      </ReactModal>
    </div>
  );
};
export default InventoryCollectionList;
