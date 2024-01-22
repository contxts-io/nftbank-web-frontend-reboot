'use client';
import { useInventoryItemList } from '@/utils/hooks/queries/inventory';
import styles from './InventoryItemList.module.css';
import { useAtom, useAtomValue } from 'jotai';
import { TSort, inventoryItemListAtom } from '@/store/requestParam';
import { currencyAtom, priceTypeAtom } from '@/store/currency';
import React, { useEffect, useState } from 'react';
import InventoryItemTable from './InventoryItemTable';
import DotsNine from '@/public/icon/DotsNine';
import Hamburger from '@/public/icon/Hamburger';
import { inventoryItemViewTypeAtom } from '@/store/settings';
import ToggleButton from '@/components/buttons/ToggleButton';
import InventoryItemCardGrid from './InventoryItemCardGrid';
import Filter from '@/public/icon/Filter';
import ReactModal from 'react-modal';
import InventoryItemDetail from './InventoryItemDetail';
import { selectedTokenAtom } from '@/store/portfolio';
import Button from '@/components/buttons/Button';
import Image from 'next/image';
type Props = {
  isFilterOpen: boolean;
  handleFilterOpen: (state: boolean) => void;
};
const InventoryItemList = (props: Props) => {
  const { isFilterOpen, handleFilterOpen } = props;
  const [requestParam, setRequestParam] = useAtom(inventoryItemListAtom);
  const [itemViewType, setItemViewType] = useAtom(inventoryItemViewTypeAtom);
  const [openedItem, setOpenedItem] = useState<string[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [priceType, setPriceType] = useAtom(priceTypeAtom);
  const { data: inventoryItemList, status } =
    useInventoryItemList(requestParam);
  const currency = useAtomValue(currencyAtom);
  const [selectedToken, setSelectedToken] = useAtom(selectedTokenAtom);
  const handleClickSortButton = (sort: TSort) => {
    const order =
      requestParam.sort !== sort
        ? 'desc'
        : requestParam.order === 'desc'
        ? 'asc'
        : 'desc';
    setRequestParam({
      ...requestParam,
      sort: sort,
      order: order,
    });
  };
  useEffect(() => {
    setRequestParam((prev) => ({
      ...prev,
      page: 1,
      includeGasUsed: priceType === 'costBasis' ? 'true' : 'false',
    }));
  }, [priceType]);

  useEffect(() => {
    selectedToken && setShowModal(true);
  }, [selectedToken]);
  const handleChangePriceType = () => {
    setPriceType((prev) =>
      prev === 'costBasis' ? 'acquisitionPrice' : 'costBasis'
    );
  };

  return (
    <section className={styles.container}>
      <div className='flex py-12 px-24 items-center justify-between'>
        <div>
          {!isFilterOpen && (
            <div
              className={`${styles.filterButton}`}
              onClick={() => handleFilterOpen(true)}
            >
              <Filter />
            </div>
          )}
        </div>
        <div className='flex items-center'>
          {/**
           * 
           * sprint 1
           * 
           * <div className='flex px-12 mr-8'>
            <span className='font-button03-medium text-[var(--color-text-subtle)] mr-8'>
              Include Gas fee
            </span>
            <ToggleButton
              onClick={() => handleChangePriceType()}
              checked={priceType === 'costBasis'}
              id={''}
            />
          </div> */}
          <div className='flex justify-between p-3 items-center border-1 w-72 border-[var(--color-border-main)]'>
            <div
              className={`${styles.viewType} ${
                itemViewType === 'cardView' && styles.checked
              }`}
            >
              <div
                className={`${styles.viewTypeButton}`}
                onClick={() => setItemViewType('cardView')}
                id=''
              >
                <DotsNine className={`${styles.viewTypeButtonIcon}`} />
                {/* <img
                  src='/icon/DotsNine.svg'
                  width={24}
                  height={24}
                  alt=''
                  className='border-0'
                /> */}
              </div>
            </div>
            <div
              className={`${styles.viewType} ${
                itemViewType === 'listView' && styles.checked
              }`}
            >
              <div
                className={`${styles.viewTypeButton}`}
                onClick={() => setItemViewType('listView')}
                id=''
              >
                <Hamburger className={`${styles.viewTypeButtonIcon}`} />
                {/* <img
                  src='/icon/Hamburger.svg'
                  width={24}
                  height={24}
                  alt=''
                  className='border-0'
                /> */}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className='min-h-[300px]'>
        {itemViewType === 'listView' && <InventoryItemTable sticky={true} />}
        {itemViewType === 'cardView' && <InventoryItemCardGrid />}
      </div>
      <ReactModal
        isOpen={showModal}
        contentLabel='Minimal Modal Example'
        className='w-full max-w-[1036px] absolute top-0 right-0'
        onRequestClose={() => {
          setDrawerOpen(false);
          setTimeout(() => {
            setShowModal(false);
          }, 200);
        }}
        ariaHideApp={false}
        shouldCloseOnOverlayClick={true}
        overlayClassName={'overlayBackground'}
        onAfterOpen={() => {
          setDrawerOpen(true);
        }}
      >
        <div className={`${styles.sidebar} ${drawerOpen ? styles.open : ''}`}>
          {selectedToken && <InventoryItemDetail token={selectedToken} />}
        </div>
      </ReactModal>
    </section>
  );
};
export default InventoryItemList;
