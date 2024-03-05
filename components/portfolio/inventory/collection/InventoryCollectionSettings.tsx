'use client';
import MagnifyingGlass from '@/public/icon/MagnifyingGlass';
import styles from './InventoryCollectionSettings.module.css';
import { useAtom } from 'jotai';
import { ChangeEvent, useEffect, useState } from 'react';
import { inventoryCollectionAtom } from '@/store/requestParam';
import { priceTypeAtom } from '@/store/currency';
import ReactModal from 'react-modal';
import SpamModal from './SpamModal';
import ToggleButton from '@/components/buttons/ToggleButton';
import Button from '@/components/buttons/Button';
import CloseX from '@/public/icon/CloseX';
import { sendGTMEvent } from '@next/third-parties/google';
const InventoryCollectionSettings = () => {
  const [inventoryCollection, setInventoryCollection] = useAtom(
    inventoryCollectionAtom
  );
  const [showModal, setShowModal] = useState(false);
  const [priceType, setPriceType] = useAtom(priceTypeAtom);
  const [searchText, setSearchText] = useState<string>('');
  const [isPopoverOpen, setIsPopoverOpen] = useState<boolean>(false);
  const [isFocused, setIsFocused] = useState(false);

  const handleTogglePriceType = () => {
    setPriceType(priceType === 'costBasis' ? 'acquisitionPrice' : 'costBasis');
  };
  const handleInputText = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setSearchText(value);
    (value.length >= 3 || value.length == 0) &&
      setInventoryCollection({
        ...inventoryCollection,
        page: 1,
        searchCollection: e.target.value,
      });
  };
  const handleModalOpen = () => {
    setShowModal(true);
  };
  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };
  useEffect(() => {
    sendGTMEvent({
      event: 'inputTextChanged',
      name: 'collection_search',
      parameter: inventoryCollection.searchCollection,
    });
  }, [inventoryCollection.searchCollection]);

  return (
    <section className={`${styles.container}`}>
      <div className='w-full flex items-center'>
        <p className='font-subtitle01-medium text-[var(--color-text-main)]'>
          Collection
        </p>
        <div className='flex items-center gap-12 ml-auto'>
          <div
            className={`${styles.inputContainer} ${
              isFocused ? styles.focused : ''
            } hidden md:flex`}
          >
            <MagnifyingGlass
              className={`${styles.icon}`}
              width={16}
              height={16}
            />
            <input
              type='text'
              placeholder={'Search collection'}
              className={`${styles.textInput} font-caption-regular`}
              onChange={handleInputText}
              value={searchText}
              onFocus={handleFocus}
              onBlur={handleBlur}
            />
          </div>
          <div className='flex items-center'>
            <div className='flex mr-24'>
              <p className={`font-button03-medium ${styles.pSetting} mr-8`}>
                Include Gas fee
              </p>
              <ToggleButton
                onClick={handleTogglePriceType}
                checked={priceType === 'costBasis'}
                id={'collection_gas_fee_toggle'}
              />
            </div>
            {/* <Button
          id={'/portfolio/inventory/collection/spam'}
          onClick={() => handleModalOpen()}
        >
          <Gear className='mr-4' />
          <p>Spam Settings</p>
        </Button> */}
          </div>
        </div>
      </div>
      <div
        className={`${styles.inputContainer} ${
          isFocused ? styles.focused : ''
        } md:hidden flex mt-17`}
      >
        <MagnifyingGlass className={`${styles.icon}`} width={16} height={16} />
        <input
          type='text'
          placeholder={'Search collection'}
          className={`${styles.textInput} font-caption-regular`}
          onChange={handleInputText}
          value={searchText}
          onFocus={handleFocus}
          onBlur={handleBlur}
        />
      </div>
      <ReactModal
        isOpen={showModal}
        contentLabel='Minimal Modal Example'
        className='w-fit absolute top-[50%] left-[50%] transform translate-x-[-50%] translate-y-[-50%]'
        onRequestClose={() => {
          setShowModal(false);
        }}
        ariaHideApp={false}
        shouldCloseOnOverlayClick={true}
        overlayClassName={'overlayBackground'}
      >
        <div className='relative w-full h-full'>
          <Button
            className='absolute top-[32px] right-[32px]'
            onClick={() => setShowModal(false)}
            id='/portfolio/inventory/collection/spam/close'
          >
            <CloseX />
            Close
          </Button>
          <SpamModal />
        </div>
      </ReactModal>
    </section>
  );
};
export default InventoryCollectionSettings;
