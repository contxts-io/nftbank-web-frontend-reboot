'use client';
import {
  useInventoryItemInfinite,
  useInventoryItemList,
} from '@/utils/hooks/queries/inventory';
import styles from './InventoryItemList.module.css';
import { useAtom, useAtomValue } from 'jotai';
import { SortOrder, TSort, inventoryItemListAtom } from '@/store/requestParam';
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
import { sendGTMEvent } from '@next/third-parties/google';
import DownloadSimple from '@/public/icon/DownloadSimple';
import { downloadCSVItemList } from '@/apis/inventory';
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
  const currency = useAtomValue(currencyAtom);
  const [selectedToken, setSelectedToken] = useAtom(selectedTokenAtom);
  const { data: inventoryItemList, status } = useInventoryItemInfinite({
    ...requestParam,
    page: 0,
  });
  const handleClickSortButton = (sort: TSort) => {
    const order =
      requestParam.sortCol !== sort
        ? SortOrder.Desc
        : requestParam.sortOrder === SortOrder.Desc
        ? SortOrder.Asc
        : SortOrder.Desc;
    setRequestParam({
      ...requestParam,
      sortCol: sort,
      sortOrder: order,
    });
  };
  useEffect(() => {
    selectedToken && setShowModal(true);
  }, [selectedToken]);
  const handleChangePriceType = () => {
    setPriceType((prev) =>
      prev === 'costBasis' ? 'acquisitionPrice' : 'costBasis'
    );
  };
  const handleChangeViewType = (type: 'listView' | 'cardView') => {
    setItemViewType(type);
    sendGTMEvent({
      event: 'buttonClicked',
      name: 'item_view',
      parameter: type,
    });
  };
  const downloadCSV = async () => {
    await downloadCSVItemList({
      walletAddress: requestParam.walletAddress as string,
      assetContract: requestParam.assetContract,
    })
      .then((response) => {
        // Convert the blob data to a downloadable file

        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', `tokens.csv`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      })
      .catch((error) => {
        console.error('Error fetching CSV data:', error);
      });
  };
  return (
    <section className={`${styles.container}  ${isFilterOpen ? 'pl-12' : ''}`}>
      <div className='flex py-12 items-center justify-between'>
        <div className='ml-12'>
          {!isFilterOpen && (
            <div
              className={`${styles.filterButton}`}
              onClick={() => handleFilterOpen(true)}
            >
              <Filter />
            </div>
          )}
        </div>
        <div className={`flex items-center gap-x-12`}>
          <div className='flex px-12 mr-8'>
            <span className='font-button03-medium text-[var(--color-text-subtle)] mr-8'>
              Include Gas fee
            </span>
            <ToggleButton
              onClick={() => handleChangePriceType()}
              checked={priceType === 'costBasis'}
              id={'item_gas_fee_toggle'}
            />
          </div>
          <div className='flex justify-between p-3 items-center border-1 w-72 border-[var(--color-border-main)]'>
            <div
              className={`${styles.viewType} ${
                itemViewType === 'cardView' && styles.checked
              }`}
            >
              <div
                className={`${styles.viewTypeButton}`}
                onClick={() => handleChangeViewType('cardView')}
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
                onClick={() => handleChangeViewType('listView')}
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
          <Button
            className='!p-9'
            onClick={() => downloadCSV()}
            disabled={
              !inventoryItemList ||
              inventoryItemList?.pages[0].data.length === 0
            }
            id='csv_item_inventory'
          >
            <DownloadSimple />
          </Button>
        </div>
      </div>
      {itemViewType === 'listView' && <InventoryItemTable sticky={true} />}
      {itemViewType === 'cardView' && <InventoryItemCardGrid />}
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
          {selectedToken && (
            <InventoryItemDetail
              token={selectedToken}
              walletAddress={requestParam.walletAddress || ''}
            />
          )}
        </div>
      </ReactModal>
    </section>
  );
};
export default InventoryItemList;
