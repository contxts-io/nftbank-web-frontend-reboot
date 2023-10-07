'use client';
import MagnifyingGlass from '@/public/icon/MagnifyingGlass';
import styles from './InventoryCollectionSettings.module.css';
import Gear from '@/public/icon/Gear';
import { useAtom } from 'jotai';
import { ChangeEvent, useState } from 'react';
import { inventoryCollectionAtom } from '@/store/requestParam';
import { priceTypeAtom } from '@/store/currency';
import ReactModal from 'react-modal';
import SpamModal from './SpamModal';
import ToggleButton from '@/components/buttons/ToggleButton';
const InventoryCollectionSettings = () => {
  const [inventoryCollection, setInventoryCollection] = useAtom(
    inventoryCollectionAtom
  );
  const [showModal, setShowModal] = useState(false);
  const [priceType, setPriceType] = useAtom(priceTypeAtom);
  const [searchText, setSearchText] = useState<string>('');
  const handleTogglePriceType = () => {
    setPriceType(priceType === 'costBasis' ? 'acquisitionPrice' : 'costBasis');
  };
  const handleInputText = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setSearchText(value);
    (value.length >= 3 || value.length == 0) &&
      setInventoryCollection({
        ...inventoryCollection,
        page: 0,
        searchCollection: e.target.value,
      });
  };
  const handleModalOpen = () => {
    setShowModal(true);
  };
  return (
    <section className={`${styles.container}`}>
      <div className={`${styles.inputContainer}  dark:border-border-main-dark`}>
        <MagnifyingGlass
          className={`${styles.icon} dark:fill-icon-main-dark`}
          width={16}
          height={16}
        />
        <input
          type='text'
          placeholder={'Search collection'}
          className={`${styles.textInput} font-caption-regular placeholder:dark:text-text-subtlest-dark dark:text-text-main-dark`}
          onChange={handleInputText}
          value={searchText}
        />
      </div>
      <div className='flex items-center'>
        <div className='flex mr-8'>
          <p
            className={`font-button03-medium ${styles.pSetting} dark:text-text-subtle-dark mr-8`}
          >
            Include Gas fee
          </p>
          <ToggleButton
            onClick={handleTogglePriceType}
            checked={priceType === 'costBasis'}
            id={''}
          />
        </div>
        <button
          className={`font-button03-medium ${styles.settingButton} dark:border-border-main-dark`}
          onClick={() => handleModalOpen()}
        >
          <Gear className={`${styles.gearIcon} dark:fill-icon-subtle-dark`} />
          <p className='dark:text-text-subtle-dark'>Spam Settings</p>
        </button>
      </div>
      <ReactModal
        isOpen={showModal}
        contentLabel='Minimal Modal Example'
        className='w-fit absolute top-[20%] left-[30%]'
        onRequestClose={() => {
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
    </section>
  );
};
export default InventoryCollectionSettings;
